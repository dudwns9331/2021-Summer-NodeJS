# 자바스크립트 기초 이론 다지기3 - prototype

2021-08-10

### prototype

클래슬를 정의하기 전에 function 으로 정의했었다.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function greet() {
  return `hi, ${this.name}`;
};

function Student(name) {
  this.__prototype__constructor(name);
}

Student.prototype.study = function study() {
  return `${this.name} is studying`;
};

Object.setPrototypeOf(Student.prototype, Person.prototype);

const me = new Student('YeongJun');
console.log(me.greet());
console.log(me.study());

console.log(me instanceof Student);
console.log(me instanceof Person);
```

`new` 로 함수를 부르게 되면 함수는 생성자의 역할을 한다. `this` 는 새로 만들어지는 오브젝트에게 바인딩 된다. 객체에 대해서 특정 값을 묻는다며 protoType chain 을 따라서 resolution 이 발생한다.

instanceof 키워드는 prototype의 체크를 위해서 사용한다. 배열과 객체에서 많이 사용된다.

<br>

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `hi ${this.name}.`;
  }
}

class Student extends Person {
  constructor(name) {
    super(name);
  }

  study() {
    return `${this.name} is studying.`;
  }
}

const me = new Student('YeongJun');
console.log(me.stduy());
console.log(me.greet());
```

위 코드는 함수형태로 작성한 것과 같은 내용이다. prototype chain 의 형태도 똑같이 작동한다.
