//@ts-check

/* eslint-disable no-new */
/* eslint-disable no-console */

new Promise((resolve, reject) => {
  console.log('Inside promise');
  console.log('before resolve');
  reject(new Error('first reject'));
  resolve('First resolve');
  console.log('after resolve');
})
  .then((value) => {
    console.log('Inside first then');
    console.log('value', value);
  })
  .catch((error) => {
    console.log('error', error);
  });

function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
}

sleep()
  .then((value) => {
    console.log(value);
    return sleep();
  })
  .then((value) => {
    console.log(value);
    return sleep();
  })
  .then((value) => {
    console.log(value);
    return sleep();
  })
  .then((value) => {
    console.log(value);
    return sleep();
  });

sleep();
