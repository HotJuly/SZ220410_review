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
  /*
    需求:当某个属性的值发生修改的时候,页面自动展示最新的结果
    拆解:
        1.当某个属性的值发生修改的时候
          通过Object.defineProperty可以将一个属性变为get/set方法
            通过set方法,我们可以知道开发者是否有修改某个属性值

        2.页面自动展示最新的结果
          可以通过原生DOM的增删改查,对页面节点进行修改,从而展示最新结果
  
  */

  /*
    MVVM源码第二部分:数据劫持
    劫持:将某个人绑架,限制他的人身自由,强迫他做一些自己不想做的事
  
    目的:将data中所有的属性都变成get/set方法,从而可以监视到用户是否有修改属性值的操作

    次数:4次(数据劫持的次数与data对象中所有的属性个数有关)

    流程:
      1.将data对象传入observe函数中,判断data是不是一个对象
      2.如果是一个对象,就创建一个ob实例对象,并执行walk方法
      3.在walk方法中,会获取到所有的直系属性名进行遍历,执行defineReactive方法
      4.在defineReactive方法中,
        1.创建一个对应的dep对象
        2.将当前属性的value,传入observe函数中,进行深度数据劫持
          如果value是一个对象数据类型,就回到流程1,继续递归
        3.执行Object.defineProperty方法,对data对象中所有的属性进行重写操作
          -将value属性的值使用闭包的方式保存起来,留作后面使用
          -将对应的属性改为get/set方法
            如果开发者读取当前属性的值,就会执行get方法,并返回闭包val中的数据
            如果开发者修改当前属性的值,就会执行set方法
              -判断新值是否等于旧值,如果相同就直接返回
              -将新值存入闭包中,留作下次使用
              -将传入的新值进行深度数据劫持操作
              -使用dep.notify方法通知DOM进行更新
  
  */
  observe(data, this);
  // observe(data, vm);

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
