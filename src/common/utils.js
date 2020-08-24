// 公共的工具类、方法
// 函数防抖
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeoutF(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    });
  };
}
