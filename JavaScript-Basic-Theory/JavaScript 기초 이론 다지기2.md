# 자바스크립트 기초 이론 다지기2 - scope, hoisting

2021-08-06

### Hoisting - var, function

```js
console.log(x);
var x = 1;

var x;
console.log(x);
x = 1;
```

위 코드와 아래 코드는 동일하다.

var 키워드는 `hoisting` 이라는 특징을 가지는데 `hoisting` 이란 변수의 선언(만)을 해당 스코프의 맨 위로 끌어 올리는 것을 뜻한다. `function` 또한 `hoisting` 의 대상이다.

<br>

```js
console.log(x);
x = 1;
```

var도 없다면 변수의 선언 자체가 이루어지지 않으므로 ReferenceError가 발생한다.

<br>

### Function, lexical scope

<br>

<p align="center">

<img src="https://github.com/dudwns9331/2021-Summer-NodeJS/blob/master/images/event-loop.PNG" width="600px" height="435px"/>

</p>

<br>

코드의 어떤 식별자가 실제로 어떤 값이 가리키는지를 결정하는 것을 `binding` 이라고 한다. 자바스크립트에서 binding은 lexical scope를 통해 이루어진다. lexical scope란 간단히 말하자면 안쪽에서 바깥쪽 변수에 접근할 수 있다는 뜻이다.

<br>

```js
function foo() {
  var x = 'hello';
  console.log(x); // hello
}

console.log(x); // ReferenceError
```

Lexical scope 에서는 밖에서 안을 참조할 수는 없다.

<br>

```js
var x = 'hello';

function foo() {
  console.log(x); // hello
}

console.log(x); // hello
```

이 경우 두 x가 모두 같은 문자열 객체를 가리킨다.

<br>

```js
var x = 1;
if (true) {
  var x = 2;
}

console.log(x); // 2
```

var 는 block scoping의 대상이 아니다. (그러나 let과 const는 block scoping이 된다.)
