const objs = [
  {
    foo: {
      bar: {
        baz: 1,
      },
    },
  },
  {},
  {
    foo: {},
  },
];

console.log(
  objs.map((obj) => {
    const { foo } = obj;
    if (foo) {
      const { bar } = foo;
      if (bar) {
        return bar.baz;
      }
    }
    return undefined;
  })
);

// 위의 코드 결과는 아래와 같다.
// optinal chaining
console.log(objs.map((obj) => obj.foo?.bar?.baz));
