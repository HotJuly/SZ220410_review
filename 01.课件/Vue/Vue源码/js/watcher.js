function Watcher(vm, exp, cb) {

  // new Watcher(vm, "msg", function(value, oldValue) {
      // 此处通过闭包的形式,缓存了"msg"对应的更新器函数(文本更新器)
      // 此处还是使用了闭包,缓存了当前表达式对应的文本节点,方便后续修改
  //     textUpdater && textUpdater(text节点, value, oldValue);
  // });
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

  this.depIds = {};

  this.value = this.get();

}

Watcher.prototype = {
  update: function () {
    //     watcher.update();
    this.run();
  },
  run: function () {
    // this->watcher对象

    // 获取当前的插值表达式的最新结果
    var value = this.get();

    //获取到更新之前的旧值数据
    var oldVal = this.value;

    if (value !== oldVal) {
      // 将最新结果存入value属性中,留作下次使用
      this.value = value;
      
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // watcher.addDep(dep);
    // this->watcher

    // a.hasOwnProperty('b')=>意思是在a对象上检查是否存在b属性,如果存在返回true,不然就是false
    // 如果depIds中,没有存储当前这个dep对象,那么就进入该判断
    if (!this.depIds.hasOwnProperty(dep.id)) {

      // 此处,watcher对象通过depIds收集到了与他相关的dep对象
      // 简单来说,插值表达式找到了与他相关的响应式属性
      this.depIds[dep.id] = dep;

      dep.addSub(this);
      // dep.addSub(watcher);
    }
  },
  get: function () {
    // this->watcher对象
    Dep.target = this;
    // Dep.target = watcher;

    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    // this->watcher对象
    var val = this.vm._data;

    var exp = this.exp.split(".");

    exp.forEach(function (k) {
      val = val[k];
    });
    
    // ["msg"].forEach(function (k) {
    //   val = vm._data["msg"];
    // });
    
    return val;
  },
};
