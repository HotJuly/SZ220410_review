function MVVM(options) {
  /*
    this->vm对象
    options->{
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          }
        }
      }
  */

  this.$options = options;

  // 此处的this._data,其实就是Vue2中的this.$data
  var data = this._data = this.$options.data;
  // var data = (this._data = this.$options.data);
  // var data = this.$options.data; this._data = this.$options.data

  var me = this;


  /*
    MVVM源码第一部分:数据代理

    代理:我们找代理商买酒,代理商会找厂家拿酒,接着代理商会将酒给到我们
        在这个过程中,代理其实就是起到搬运作用,他没有存储酒的能力

    目的:主要就是为了方便开发者书写代码,写代码的时候可以少写._data,方便快速读取数据
        也就是说,其实数据代理并不是响应式的必不可少的一环

    次数:2次(代理的次数与data对象的直系属性个数有关)

    流程:
      1.Vue会使用Object.keys获取data对象身上,所有的直系属性名组成的数组
      2.对该数组进行遍历操作,将每个属性名都传入_proxy方法中
      3.在_proxy方法中,Vue会对vm对象进行处理,根据data对象中的属性,给vm也来一份相同的属性名
        但是,这些属性都是访问描述符,他们具有get和set方法

        如果我们读取这些属性的属性值,就会触发get方法,
          在get方法中,会自动读取vm._data中的对应属性值
          
        如果我们修改这些属性的属性值,就会触发set方法,
          在set方法中,会自动修改vm._data中的对应属性值


  */

  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  // ["msg","person"].forEach(function (key) {
  //   vm._proxy("msg");
  // });

  observe(data, this);

  this.$compile = new Compile(options.el || document.body, this);

}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
  //   vm._proxy("msg");
  // this->vm,key=>"msg"
    var me = this;

    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });

    // Object.defineProperty方法可以给一个对象添加或者修改某个属性
    // 平常使用字面形式创建的对象,会具有key和value属性,value会真实存放数据
    // 而通过Object.defineProperty方法,可以将一个属性变成访问描述符
    // 访问描述符就是说一个属性具有get/set方法,但是不具有value值

    // 在这行代码之前,vm对象身上是没有msg属性,也就是说此处是在新增属性

    // 当用户读取msg属性的值的时候,就会执行get函数中的代码,
    // 最终将函数的返回值作为属性值进行返回,例如:console.log(this.msg)


    // 当用户修改msg属性的值的时候,就会执行set函数中的代码,例如:this.msg=123;

    // Object.defineProperty(vm, "msg", {
    //   configurable: false, //不能重复定义
    //   enumerable: true, //可以遍历
    //   get: function proxyGetter() {
    //     return vm._data["msg"];
    //   },
    //   set: function proxySetter(newVal) {
    //     vm._data["msg"] = newVal;
    //   },
    // });

  },
};
