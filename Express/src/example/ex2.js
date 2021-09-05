/* eslint-disable no-console */
// @ts-check

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.set('views', 'src/views')
app.set('view engine', 'pug')

const userRouter = express.Router()

const PORT = 5000

/**
 * get() 함수 안에는 앞에 있는 인자는 path pattern 혹은 path 가 들어가고
 * 뒤에 있는 함수는 req(요청), res(응답) 을 처리해주는 함수가 들어간다.
 * +, *, $, (), 등등 정규식을 통해서 패턴을 정의할 수 있다.
 * 또한, Array 값으로 넣어줄 수도 있다.
 */

// app.get('/ab?cd', (req, res) => {
//   res.send('Root - GET')
// })

// app.post('/', (req, res) => {
//   res.send('Root - POST')
// })

const USERS = {
  15: {
    nickname: 'foo',
  },
  16: {
    nickname: 'bar',
  },
}

userRouter.get('/', (req, res) => {
  res.send('User list')
})

// 콜론은 path 파라미터이다.

userRouter.param('id', (req, res, next, value) => {
  // console.log(`id parameter`, value)
  // @ts-ignore
  req.user = USERS[value]
  next()
})

// path 파라미터에 미리 등록된 콜백이 있다면
// 다음과 같이 파라미터에 걸렸을 때 콜백을 실행한다.

// /users/15
userRouter.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
    })
  }

  //   console.log('userRouter get ID')
  //   // @ts-ignore
  //   res.send(req.user) // req 가 알아서 json 형식으로 변환시켜준다.
})

userRouter.post('/', (req, res) => {
  // Register user
  res.send('User registered.')
})

userRouter.post('/:id/nickname', (req, res) => {
  // req.body : {"nickname : "bar"}
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated : ${nickname}`)
})

app.use('/users', userRouter)

app.use('/public', express.static('src/public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port ${PORT}`)
})
