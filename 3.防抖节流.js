function debounce(fn, delay = 300) {
  let timer = null;
  if (timer) {
    clearTimeout(timer)
  }
  return function() {
    timer = setTimeout(() => {
      fn.apply(this, argument)
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