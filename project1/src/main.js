// @ts-check

// 프레임워크 없이 간단한 토이 프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 * - 인증 로직은 넣지 않습니다.
 * - RESTful API를 사용합니다.
 *
 * npm install --save-dev nodemon 서버를 다시 껐다 키는 번거로움 교정
 * npm run server 를 통해서 nodemon 을 사용한다.
 * package.json 에 script 부분을 추가해야 한다.
 *
 * JSDoc 을 통해서 표준화된 타입 정보를 만들 수 있다.
 */

const http = require('http')
const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Not Found.')
      return
    }

    const regexResult = route.url.exec(req.url)

    if (!regexResult) {
      res.statusCode = 404
      res.end('Not Found.')
      return
    }

    /** @type {Object.<string, *> | undefined} */
    const reqBody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8')
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data))
            } catch {
              reject(new Error('Ill-formed json'))
            }
          })
        }))) ||
      undefined

    const result = await route.callback(regexResult, reqBody)
    res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }

  main()
})

const PORT = 4000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is listening at port: ${PORT}`)
})
