function debounce(fn, delay = 300) {
  let timer = null;
  if (timer) {
    clearTimeout(timer)
  }
  return function() {
    let context = this
    let args = arguments
    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, delay)
  }
}

function throttle(fn, delay = 300) {
  let old = Date.now()
  return function() {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - old > delay) {
      fn.apply(context, args)
      old = Date.now()
    }
  }
}