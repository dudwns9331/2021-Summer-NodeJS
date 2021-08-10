# 자바스크립트 기초 이론 다지기3 - Closure

2021-08-09

### Closure

closure = function + environment<br>
closure는 function이 하나 생길 때마다 하나씩 생긴다.<br>
environment는 함수 자신을 둘러싼 접근할 수 있는 모든 스코프를 뜻한다.

```js
function and(x) {
  return function print(y) {
    return x + ' and ' + y;
  };
}

const saltAnd = and('salt');
console.log(saltAnd('pepper')); // salt and pepper
console.log(saltAnd('sugar')); // salt and sugar

const waterAnd = and('water');
console.log(waterAnd('juice')); // water and juice
```

and 함수로 만들어진 saltAnd의 closure는 함수 `print` 와 `x->"salt"` 인 환경이다.

closure는 higher-order function을 만드는데 유용한다. and() 는 higher-order 함수이다. 다른 함수를 이용하는 고차함수.

`saltAnd` 와 `waterAnd` 모두 함수는 같은 `print` 이지만, 각각 주어진 변수가 다르다. `saltAnd` 는 x가 `"salt"`, `waterAnd` 는 x가 `"water"` 로 바인딩 되어 있다. **즉, 둘은 서로 다른 closure를 형성하고 있다.**

<br>

Closure 의 예시

```js
function getCounter() {
  var result = {
    count: count,
    total: 0,
  };

  function count() {
    result.total += 1;
  }

  return result;
}

var counter = getCounter();
counter.count();
counter.count();

console.log(counter.total);
```

다음 코드의 정답은 2이다.

```js
function getCounter() {
  var result = { count: count, total: 0 };
  function count() {
    result.total += 1;
  }
  return result;
}

var counterA = getCounter();
counterA.count();
counterA.count();

var counterB = getCounter();
counterB.count();

console.log(counterA.total, counterB.total);
```

counterA : 첫 getCounter 실행 때 만들어진 total과 count로 이루어진 객체

counterB : 두번째 getCounter 실행 때 만들어진 total과 count로 이루어진 객체

정답은 2, 1 이다.

```js

var numCounters = 0
fuction getCounter() {
    numCounters += 1

    var result = { count : count, total : 0}
    function count() {result.total += 1}
    return result
}

var counterA = getCounter();
counterA.count();
counterA.count();

var counterB = getCounter();
counterB.count();

console.log(counterA.total, counterB.total, numCounters);
```

정답은 2, 1, 2 이다.

`getCounter()` 가 실행될 때마다 `numCounters` 는 증가한다.

---

closure 는 function 과 변수들의 합이다. closure 자체는 함수가 선언될 때마다 매번 새로 생긴다.

### [closure 설명 자세히 MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
