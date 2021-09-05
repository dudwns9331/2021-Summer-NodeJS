# Node.js 핵심 개념 정리

## CommonJS & ECMAScript

### main.js

```js
/* eslint-disable no-console */
// @ts-check

/**
 * require 함수는 Node에서 제공하는 함수이다.
 * https://nodejs.org/api/modules.html
 * Node에서 제공하는 함수나 문법을 공부할 때는 다음과 같은 공식
 * 문서가 가장 적합하다.
 * require는 모듈을 가져오는 방식이다. 각 파일 하나하나가 모듈이 될 수 있고
 * 모듈을 가져오는 함수로 require를 사용한다.
 * module.require() 함수와 같음
 * var require: NodeRequire
 */

console.log(require('./animals'))

/**
 * path 는 파일이 어디에 있는지에 대한 정보
 * paths 는 어디에서 import 가능한지에 대한 정보
 * paths 는 절대경로를 했을 때 가져올 수 있는 파일들의 위치이다.
 * filename 은 실행되고 있는 파일의 이름이다.
 */

const { path, paths, filename } = module

console.log({
  path,
  paths,
  filename,
})

/**
 * 여러 개를 불러와서 사용하더라도 전부 같은 객체를 사용한다.
 */

// ./ 는 상대경로로 가져온다.
const animalsA = require('./animals')
const animalsB = require('./animals')
const animalsC = require('./animals')

console.log(animalsA, animalsB, animalsC)

// 동일 객체로 사용된다.
console.log(animalsA === animalsB)
console.log(animalsA === animalsC)

/**
 * CommonJS : require
 *  - node standard library에 있는 모듈은 절대경로를 지정해 가져온다.
 *  - 이 프로젝트 내의 다른 파일은 상대경로를 지정해 가져온다.
 *  - node_modules 안에 있는 파일들은 절대경로를 통해서 가져온다.
 *
 *  - 절대경로를 지정하면 module.paths의 경로 중
 *    순서대로 검사하여 해당 모듈이 있으면
 *    가장 첫 번째 것을 가져온다.
 *
 */

// eslint-disable-next-line import/order

// const http = require('http')
// console.log(http)
```

<br>

### animals.js

```js
/* eslint-disable no-console */
const animals = ['dog', 'cat']

/**
 * require 를 3번 사용하여 저장하더라도 출력은 하나만 된다.
 */
console.log('animals.js Loaded!')

module.exports = animals
```

<br>

### birds.js

```js
module.exports = ['Sparrow', 'Sea Gull']
```

<br>

### main.mjs

```js
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import animals from './animals.mjs'
import birds from './birds.js'

/**
 * ECMA 방식에서는 CommonJS 방식도 사용할 수 있다.
 * mjs 는 ECMA 방식 파일의 확장자이다.
 * CommonJS : require 를 사용
 * ECMAScript는 export, import 사용
 */

console.log(animals)
console.log(birds)
```

<br>

### animals.mjs

```js
const animals = ['dog', 'cat']

export default animals
```

<br>

## npm

Node Package Manager, Registry 이다. 핵심적인 저장소이다.

```s
npm install decamelize
```

```json
{
  "dependencies": {
    "decamelize": "^5.0.0"
  }
}
```

lock.json 을 사용하는 경우는 협업하는 경우에 실제로 사용되는 패키지에 대해서 생기는 여러가지 문제를 해결할 수 있다. 설치된 패키지들의 실제 정보가 들어간다.

index.js 라는 파일은 폴더를 require 하는 것과 동일한 효과를 나타낸다.

`--save-dev` 는 개발하는 환경에서만 필요한 패키지라는 뜻이다.

`--production` 이라는 옵션을 통해서 필요한 일부분만 다운로드 가능하다.

패키지의 버전은 의존성에 따라서 엄청나게 꼬여있을 수 있기 때문에 버전을 관리하는 것이 중요하다.

> npm update decamelize => 마이너 버전만 끌어올릴 수 있는 최대로 올라간다. ~와 ^도 의미가 있음.

<br>

### CI

`./node_modules/.bin/eslint src/**/*` 로 Linter를 통한 오류 캐치가 가능하다.

`package.json` 에 script 기능을 사용해서 해당 스크립트에 대한 실행기 가능하다. npm run {테스트 이름} 을 통해서 프로젝트를 관리하는 스크립트를 넣어 확인한다.

<br>

### yarn?

npm 보다 빠르다고 했다. npm과는 거의 비슷하다.

```s
npm install -g yarn
yarn add -D eslint
```

다음 명령어를 통해서 다운로드가 가능하다. yarn 은 add 커맨드를 사용하고 --save-dev 와 같은 옵셔으로 -D 를 사용한다. 스크립트를 정의하고 사용하는 것은 yarn 이 더 편리하다.

<br>

## Node.js 내장 객체들

### innerObject.js

```js
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
```
