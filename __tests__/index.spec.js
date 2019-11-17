const debounce = require('../src/main').default;
const { debounce: debounce2 } = require('lodash');

describe('Tests', () => {
  it('Simple', async () => {
    const f = ns => ns[0];
    const acc = [];
    const dF = debounce(f, 100, acc);
    const ldF = debounce2(f, 100);
    expect(await dF(1)).toEqual(1);
    expect(ldF([1])).toEqual(undefined);
    for (let i = 2; i < 10; i++) {
      dF(i);
    }
    expect(acc).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    expect(await dF(10)).toEqual(2);
  });
  it('Canonical use case - performance', () => {
    const arr = [];
    const f = debounce(els => Object.assign(arr, els), 100);
    const arr2 = [];
    const f2 = el => arr2.push(el);
    const arr3 = [];
    const f3 = debounce2(el => arr3.push(el), 100);
    const arr4 = [];
    const f4 = new Proxy(el => arr4.push(el), {
      apply(t, _, args) {
        return t(...args);
      },
    });
    console.time('debounce');
    for (let i = 0; i < 1000000; i++) {
      f(i);
    }
    console.timeEnd('debounce');
    console.time('no debounce');
    for (let i = 0; i < 1000000; i++) {
      f2(i);
    }
    console.timeEnd('no debounce');
    console.time('lodash debounce');
    for (let i = 0; i < 1000000; i++) {
      f3(i);
    }
    console.timeEnd('lodash debounce');
    console.time('proxified function');
    for (let i = 0; i < 1000000; i++) {
      f4(i);
    }
    console.timeEnd('proxified function');
  });
  it('More arity', async () => {
    const f = debounce(
      (args, a) => console.log(args) || args.reduce((acc, el) => acc + el),
      100,
    );
    expect(await f(1, 2)).toEqual(3);
  });
});
