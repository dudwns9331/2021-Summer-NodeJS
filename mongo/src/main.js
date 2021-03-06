// @ts-check

// Formatting, Linting, Type Checking
// Formatting : Prettier
// Linting : ESLint
// TypeChecking : TypeScript

const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end('Hello!')
})

const PORT = 4000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is listening at port ${PORT}.`)
})
