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
