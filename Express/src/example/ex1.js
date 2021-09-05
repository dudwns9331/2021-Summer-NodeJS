/* eslint-disable no-console */
// @ts-check

const express = require('express')

const fs = require('fs')

const app = express()
const PORT = 5000

/**
 * 미들웨어가 언제 끝나는지에 대한 것은
 * 프로그래머만 정의할 수 있기 때문에
 * next() 가 호출되기 전에는 미들웨어가 끝났다고
 * 판단하지 않는다. 그래서 다음 미들웨어가 실행되지 않는다.
 * 미들웨어는 위에서부터 정의된 대로 쭉 내려온다.
 *
 * 여기서 미들웨어가 끝난다는 것은 하나의 request 요청에 대해서
 * response 응답이 왔다는 것임. 따라서 밑에있는 함수와 순서를 바꾸게
 * 되면 더이상 미들웨어는 실행되지 않는다.
 */
app.use(
  '/',
  async (req, res, next) => {
    console.log('Middleware 1-1')

    const fileContent = await fs.promises.readFile('.prettierrc')
    const requestAt = new Date()

    // @ts-ignore
    req.requestAt = requestAt
    // @ts-ignore
    req.fileContent = fileContent

    setTimeout(() => {
      next()
    }, 1000)
  },
  (req, res, next) => {
    console.log('Middleware 1-2')
    next()
  }
)

/* 수 많은 MiddleWare 들..  있을 수 있음.. */

app.use((req, res) => {
  console.log('Middleware 2')
  // @ts-ignore
  res.send(`Hello express! : Requested at ${req.requestAt}, ${req.fileContent}`)
})

app.listen(PORT, () => {
  console.log(`The Express Server is listening at port :${PORT}`)
})
