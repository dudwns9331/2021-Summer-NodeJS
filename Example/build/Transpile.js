(() => {
  // src/Transpile.js
  var objs = [
    {
      foo: {
        bar: {
          baz: 1
        }
      }
    },
    {},
    {
      foo: {}
    }
  ];
  console.log(objs.map((obj) => {
    const { foo } = obj;
    if (foo) {
      const { bar } = foo;
      if (bar) {
        return bar.baz;
      }
    }
    return void 0;
  }));
  console.log(objs.map((obj) => obj.foo?.bar?.baz));
})();
