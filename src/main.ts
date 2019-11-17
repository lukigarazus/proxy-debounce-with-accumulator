export default (fn, delay: number, acc?: any[]) => {
  console.log(fn.length);
  let timeout;
  let accumulator = acc || [];
  let cResolve = arg => {
    return arg;
  };
  const timeoutFunction = () => {
    const result = fn(accumulator);
    accumulator.length = 0;
    cResolve(result);
  };
  return new Proxy(fn, {
    apply(_, __, args) {
      clearTimeout(timeout);
      cResolve(undefined);
      return new Promise(resolve => {
        cResolve = resolve;
        accumulator.push(...args);
        timeout = setTimeout(timeoutFunction, delay);
      });
    },
  });
};
