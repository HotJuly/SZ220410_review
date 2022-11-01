/*
  由于ES6模块化的特性,无论一个文件被引入多少次,最终内部代码只会执行一次
*/
const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  // 只要主线程代码执行结束,微任务开始执行,那么pending就会变为false
  pending = false

  // 此处在将callbacks数组进行浅拷贝
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()

  // 此处会开启一个微任务,并将flushCallbacks作为成功回调函数执行
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  // 如果是通过this.$nextTick调用的,那么vm自动会被指定为当前组件实例对象

  // 收集开发者传入nextTick的回调函数
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })

  if (!pending) {
    pending = true

    // 无论执行多少次nextTick,只会调用一次timerFunc,也就是说只会开启一个微任务
    timerFunc()
  }
}

/*
  nextTick源码重点
    1.无论调用多少次nextTick,都只会开启一个微任务
    2.nextTick会使用callbacks数组,去收集当前开发者传入的所有的cb回调函数
    3.当nextTick专用的微任务被执行的时候,回调函数内部会使用for循环,
      遍历callbacks数组,执行内部收集的所有的cb函数
    4.在nextTick源码中,会测试当前的运行环境
      如果不支持Promise,那么就是用mutationobserver微任务替代
      如果mutationobserver微任务也不支持,就是用setTimeout进行替代



  Vue更新DOM的整体流程:
    1.当开发者修改了某个响应式属性的值时,会触发dep.notify方法(准备开始更新DOM)
    2.在dep.notify方法中,会调用watcher.update方法
    3.在watcher.update方法中,会调用queueWatcher方法
    4.在queueWatcher方法中,Vue将更新DOM的方法传入nextTick函数中
*/

