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
 *  -  이 프로젝트 내의 다른 파일은 상대경로를 지정해 가져온다.
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
