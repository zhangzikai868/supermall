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

// 日期格式化
export function dateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  };
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
}
