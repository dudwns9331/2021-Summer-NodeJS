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

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: 'my_first_post',
    title: 'My First Post',
    content: 'hello!',
  },
  {
    id: 'my_second_post',
    title: 'My second Post',
    content: 'Second Post',
  },
]

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  // 정규식 패턴이다.
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_/]+)$/
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  // post 의 정보를 json 파일로 돌려주는 API
  if (req.url === '/posts' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(result))

    // 포스트를 가져오는 API
  } else if (postIdRegexResult && req.method === 'GET') {
    // GET /posts/:id
    const postId = postIdRegexResult[1]
    const post = posts.find((_post) => _post.id === postId)

    if (post) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(post))
    } else {
      req.statusCode = 404
      res.end('Post Not Found')
    }

    // 포스트를 생성하는 API
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8')
    req.on('data', (data) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */

      /** @type {CreatePostBody} */
      const body = JSON.parse(data)
      posts.push({
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        title: body.title,
        content: body.content,
      })
    })

    res.statusCode = 200
    res.end('Creating Post')
  } else {
    req.statusCode = 404
    res.end('Not Found')
  }
})

const PORT = 4000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is listening at port: ${PORT}`)
})
