/**
 * @Description: 轮询执行方法
 * @param {func} function 需要轮询的方法
 * @param {time} number 轮询间隔,默认1s
 * @param {endTime} number 可轮询时间, 为空时一直轮询
 * @param {immedaite} boolean 第一次是否立即执行
 */
const pollingFunction = (func, time = 1000, endTime, immediate = false) => {
  immediate && func(); //是否立即执行一次，由实际决定
  const startTime = new Date().getTime();
  const pollTimer = setInterval(() => {
    const nowTime = new Date().getTime();
    if (endTime && nowTime - startTime >= endTime) {
      pollTimer && clearInterval(pollTimer);
    }
    func();
  }, time);
  return pollTimer;
};
export default pollingFunction;
