// @ts-check

/**
 *
 * @param {number} duration
 */
async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, duration);
  });
}

async function main() {
  console.log('frist');
  await sleep(100);
  console.log('second');
  await sleep(100);
  console.log('third');
  await sleep(100);
  console.log('finish!');
}

main();
