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

// 立即执行
function debounce(fn, delay, immediate = true) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    immediate && !timer && fn.apply(this, args)
    timer = setTimeout(() => {
      timer = null
      !immediate && fn.apply(this, args)
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

// 立即执行
function throttle(fn, delay, immediate = true) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        !immediate && fn.apply(this, args)
      }, delay)
      immediate && fn.apply(this, args)
    }
  }
}
