const requests = Promise.all([
  new Promise(resolve => setTimeout(() => resolve('hello'), 1500)),
  new Promise(resolve => setTimeout(() => resolve('world'), 1000)),
]);

const requests2 = Promise.all([
  requests,
  new Promise(resolve => setTimeout(() => resolve(2), 150)),
  new Promise(resolve => setTimeout(() => resolve(3), 100)),
]);

console.log(await requests2);