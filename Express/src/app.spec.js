/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */

const supertest = require('supertest')
const app = require('./app')

const request = supertest(app)

test('retrieve user json', async () => {
  const result = await request.get('/users/15').accept('application/json')
  console.log(result.body)

  // result 의 body 가 다음과 같은 형식을 따르는가?
  expect(result.body).toMatchObject({
    nickname: expect.any(String),
  })
})

test('retrieve user page', async () => {
  const result = await request.get('/users/15').accept('text/html')

  expect(result.text).toMatch(/^<html>.*<\/html>$/)
})

test('update nickname', async () => {
  const newNickname = 'newNickname'

  const res = await request
    .post('/users/15/nickname')
    .send({ nickname: newNickname })
  expect(res.status).toBe(200)

  const userResult = await request.get('/users/15').accept('application/json')
  expect(userResult.status).toBe(200)
  expect(userResult.body).toMatchObject({
    nickname: newNickname,
  })
})
