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
    响应式
    需求:当某个属性的值发生修改的时候,页面自动展示最新的结果
    拆解:
        1.当某个属性的值发生修改的时候
          通过Object.defineProperty可以将一个属性变为get/set方法
            通过set方法,我们可以知道开发者是否有修改某个属性值

        2.页面自动展示最新的结果
          可以通过原生DOM的增删改查,对页面节点进行修改,从而展示最新结果

    准备工作:
      1.在bind方法中,创建watcher的实例对象
      2.创建实例对象的过程中,会将Dep.target赋值为当前watcher对象
        并调用get方法,获取当前表达式的属性值
      3.在这个获取属性值的过程中,会触发数据劫持的get方法
      4.由于当前Dep.target存储这watcher对象,所以get方法中的dep.depend方法会触发
      5.depend方法中,会调用watcher的addDep方法,收集与当前watcher相关的所有dep对象
      6.在addDep方法中,会调用dep的addSub方法,收集与当前响应式属性相关的watcher对象

    流程:
      1.对vm.msg进行赋值操作,会触发数据代理的set方法

      2.数据代理的set方法中,会执行vm._data.msg = 新值这行代码
        该代码会修改_data对象中的某些属性,从而触发数据劫持的set方法
        
      3.在数据劫持的set方法被触发的时候,会调用dep.notify方法通知DOM进行更新

      4.notify方法中,会遍历subs数组,使用内部的每个watcher对象,调用他们的update方法

      5.watcher的update方法被调用之后,会通过get方法获取当前的最新值,并与上次存储的旧值比较
      
      6.如果新值不等于旧值,那么就调用watcher身上的cb函数

      7.cb函数被调用之后,会执行之前闭包缓存的文本更新期函数,更新指定的DOM节点
  
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
          也就是说,每个响应式属性都会生成一个对应的dep对象
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

  /*
    MVVM源码第三部分:模版解析
    目的:
      1.将el元素的中内容作为模板解析,将差值表达式变成对应的状态数据显示
      2.根据项目情况,生成watcher对象

    流程:
      1.将el属性传入Compile方法中,该方法会找到页面对应的真实DOM
      2.将el元素中的所有子节点都转移到文档碎片中
      3.开始解析文档碎片中的内容,获取到文档碎片中所有的子节点,并进行遍历操作
      4.根据不同的节点类型,执行不同的功能
        -如果是元素节点,就获取他所有的标签属性,检查是否具有Vue指令
        -如果是文本节点,而且满足插值语法的正则匹配,就开始解析该文本节点的内容
          每个插值表达式都会触发一次bind方法
      5.在bind方法中,会获取到文本更新器函数,以及当前差值表达式对应的状态数据结果
        -调用文本更新期函数,更新当前文本节点的内容
        -同时创建一个watcher对象
          也就是说,每个插值表达式会生成一个对应的watcher对象

  */
  this.$compile = new Compile(options.el || document.body, this);
  // this.$compile = new Compile("#app", vm);

  /*
    问题1:请问Vue2更新数据是同步更新还是异步更新?
      同步更新

    问题2:请问Vue1更新数据是同步更新还是异步更新?
      同步更新
  
    问题3:请问Vue2更新DOM是同步更新还是异步更新?
      异步更新
        严格来说是微任务,Vue2会将更新DOM的函数交给nextTick执行

    问题4:请问Vue1更新DOM是同步更新还是异步更新?
      同步更新
        Vue1的响应式流程中,所有的代码都是同步执行,不存在异步任务,所以是同步更新

    问题5:请问Vue1更新DOM的范围是多大?(项目,组件,节点)
      只更新某个节点(精准更新)

    问题6:请问Vue2更新DOM的范围是多大?(项目,组件,节点)
      整个组件更新(范围更新)

        从表面上来看,Vue1更新范围更小,更加精准,而Vue2更新范围更大,很可能出现误杀情况
          性能:
            Vue1给每个插值表达式都准备了一个对应watcher对象,所以才能精准更新
              但是会消耗大量的内存

            Vue2是给每个组件准备一个对应的watcher对象,所以是范围更新
              好处就是较少了内存的消耗
              Vue2也考虑到了误杀的可能性,所以有虚拟DOM和diff算法的加入

    问题7:请问Vue1中使用下标操作数组的内容,是否具有响应式效果?
      可以使用下标操作数组,具有响应式效果

    问题8:请问Vue2中使用下标操作数组的内容,是否具有响应式效果?
      不能使用下标操作数组,不具有响应式效果
        从问题7中可以得知,响应式原理其实是可以把数组的下标变成响应式的效果的

        问题:Vue2为什么不将数组的下标做成响应式的?
        答案:这都是尤大大故意的
          因为尤大大考虑到开发者对于数组的数据操作频率很低
            我们平常最多的操作,就是插入数据,删除数据,排序数据等操作,很少会指定某个下标进行操作
            尤大大考虑如果数组的下标也生成dep对象,那么消耗的内存会更大,所以取消了这部分的响应式处理
        
        问题:那么Vue2中要如何操作数据,才会有响应式的效果?
        答案:
          使用数组的7种重写过的方法,就可以实现响应式的效果
          7种:push,pop,shift,unshift,splice,sort,reverse

        问题:Vue2是如何做到不对数组的下标进行响应式处理的?
        答案:故意不对数组的下标进行数据劫持
          其实就是数据劫持的时候,使用Array.isArray方法判断当前数据是否是一个数组
            如果是数组,就使用for循环的形式,跳过对数组下标的数据劫持,但是内部的内容还是会进行数据劫持
            注意:数组中的对象的属性还是会被数据劫持,所以开发中,我们可以使用Object.freeze对该数组中的内容进行数据冻结

        问题:Vue2中是如何重写上述的7种方法的?
        答案:Vue2会使用Object.create方法,创建一个全新的对象,该对象的__proto__指向Array.prototype,
          接着会将这个全新的对象,作为data中所有数组的__proto__使用

  */
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
