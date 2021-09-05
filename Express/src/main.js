/* eslint-disable no-console */
// @ts-check

const app = require('./app')

const PORT = 5000

app.listen(PORT, () => {
  console.log(`The Express Server is Listening at port ${PORT}`)
})
