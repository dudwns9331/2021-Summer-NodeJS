// @ts-check

const fs = require('fs');

/**
 *
 * @param {string} fileName
 */

function readFileInPromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (error, value) => {
      if (error) {
        reject(error);
      }
      resolve(value);
    });
  });
}

fs.promises
  .readFile('ModernExample.js', 'utf-8')
  .then((value) => console.log(value));
readFileInPromise('ModernExample.js').then((value) => console.log(value));

// 위의 코드는 아래와 같이 바뀔 수 있다.

async function main() {
  try {
    const result = await fs.promises.readFile('ModernExample.js', 'utf-8');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

main();
