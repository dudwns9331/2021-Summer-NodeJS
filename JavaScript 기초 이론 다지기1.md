# 자바스크립트 기초 이론 다지기1 - Call Stack, non-blocking I/O, event Loop

2021-08-06

Node를 잘 이해하기 위해서는 자바스크립트의 동시성 모델에 대해 잘 이해해야 한다. 효과적인 코드 구조를 잘 잡기 힘들다.

자바스크립트의 실행 모델은 `event loop`, `call stack`, `callback queue` 개념으로 이루어진다.

<br>

### 자바스크립트와 Event Loop, Main Thread

이벤트 루프 모델은 여러 스레드를 이용한다. 그 중 우리가 작성한 자바스크립트 코드가 실행되는 스레드를 `메인 스레드` 라고 부른다. `한 Node.js 프로세스에서 메인 스레드는 하나이며, 한 순간에 한 줄씩만 실행한다.`(프로그램이 어떤 상황에 어떤 상태일 것이다 라고 예측하는 것이 수월하다.) 그러나 그 외의 일(file I/O, network ... ) 을 하는 `워커 스레드`는 여럿이 있을 수 있다.

<br>

### Call Stack

콜 스택이란, 지금 시점까지 불린 함수들의 스택이다. 함수가 호출될 때 쌓이고, 리턴할 때 빠진다.

#### Run-to-completion

이벤트 루프가 다음 콜백을 처리하려면 지금 처리하고 있는 콜백의 실행이 완전히 끝나야 한다. call stack이 완전히 빌 때까지 처리한다는 것과 동일하다.

<br>

<p align="center">

<img src="https://github.com/dudwns9331/2021-Summer-NodeJS/blob/master/images/callback.PNG" width="600px" height="180px"/>

</p>

<br>

### Callback Queue

콜백 큐(메세지 큐)는 앞으로 실행할 콜백(함수와 인자)들을 쌓아두는 큐이다. 콜백은 브라우저나 Node가 어떤 일이 발생한다면(event) 메인 스레드에 이를 알려주기 위해(callback) 사용된다.

이벤트는 파일 처리의 완료, 네트워크 작업의 완료, 타이머 호출 등이 있다.

<p align="center">

<img src="https://github.com/dudwns9331/2021-Summer-NodeJS/blob/master/images/callback-queue.PNG" width="600px" height="330px"/>

</p>

<br>

### Event Loop - Callback Queue

```js
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');
```

어떤 순서로 출력되는가?

> 1, 3, 2 콜백에 대한 실행이 없기 때문에 브라우저나 노드가 일정 시간이 지나고 나서야 콜백에 넣기 때문에 Call Stack 이 다 비워지고 난 후에 안에 있는 콜백을 실행하게 된다.

<br>

### Event Loop - Blocking

```js
setInterval(() => {
  console.log('Hey!');
  while (true) {}
}, 1000);
```

5초동안 메세지는 몇 번이나 출력되는 것이 맞는가?

> 1번이다. while loop 가 도는 동안에 call stack 이 절대 비지 않기 때문이다.

<br>

이 동안은 callback queue에서 콜백을 꺼낼 수 없기 때문에, setInterval 이 아무리 콜백을 쌓아도 메인 스레드에서 실행될 수 없다. 이런 경우를 event loop 를 block 한다고 한다.

<br>

### non-blocking I/O & offloading

```js
// 여기서 Node에게 파일을 읽어달라고 요청하고, 워커 스레드에서 파일을 읽기 시작한다.
fs.readFile(fileName, (err, data) => {
  // Node가 파일을 다 읽고 나면
  // 1. callback queue에 이 함수에 err, data 인자를 채워서 넣고
  // 2. callback queue에서 꺼내질 때 이 부분이 실행된다.
});

// readFile의 호출이 끝난 직후 바로 이 함수를 실행하게 된다.
// 이는 여전히 같은 콜백을 처리하는 중이기 때문이다.
someTask();
```

브라우저나 Node.js에서나, Web API 혹은 Node API의 동작이 끝나면 callback queue 에 등록한다. 브라우저나 Node 가 요청 받은 일을 하고 있는 동안 메인 스레드와 이벤트 루프는 영향을 받지 않고 계속 실행된다. 이를 `offloading` 이라고 하며, `Node 서버의 메인 스레드가 하나임에도 불구하고 빠르게 동작할 수 있는 이유`이다.

<p align="center">

<img src="https://github.com/dudwns9331/2021-Summer-NodeJS/blob/master/images/event-loop.PNG" width="600px" height="435px"/>

</p>

1. callback queue에서 콜백을 꺼내고 (없다면 생길 때까지 기다리고)

2. 그 콜백의 처리가 끝날 때까지 실행하고

3. 이를 반복한다.
