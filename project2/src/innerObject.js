/* eslint-disable no-console */

// @ts-check

/**
 * dirname 은 현재 실행되고 있는 파일의 디렉토리를 출력함
 * filename 은 현재 실행되고 있는 파일을 출력함
 */
console.log('__dirname', __dirname)
console.log('__filename', __filename)

process.stdin.setEncoding('utf-8')
process.stdin.on('data', (data) => {
  console.log(data, data.length)
})

// 들어오는 입력을 바로 내보내준다.
process.stdin.pipe(process.stdout)

// setInterval(() => {
//   console.log('Interval')
// }, 1000)

// setTimeout(() => {
//   console.log('Timeout')
// }, 1000)

const os = require('os')

console.log(
  ['arch', os.arch()],
  ['platform', os.platform()],
  ['cpus', os.cpus()]
)

const path = require('path')
const fs = require('fs')

// 여러 경로를 합쳐준다. 절대경로 생성!
const filePath = path.resolve(__dirname, './test.txt')
console.log('filePath', filePath)

const fileContent = fs.readFileSync(filePath, 'utf-8')
console.log(fileContent)
