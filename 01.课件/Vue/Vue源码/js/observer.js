function Observer(data) {
    // data->vm._data,this->ob对象
    this.data = data;

    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
    // this.walk(data);//走起
        var me = this; 

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        
        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm");
        // });
    },
    convert: function(key, val) { 
        //     ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 
        // this->ob对象

        // 创建一个全新的dep对象
        // 每一个直系属性名会生成一个对应的dep对象
        // 最终总结:data中每有一个属性,就会创建一个对应的dep对象
        var dep = new Dep();  

        // 此处会深度递归当前的data对象,对内部所有的对象进行数据劫持
        var childObj = observe(val);
        // var childObj = observe("hello mvvm");
        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 在执行该代码之前,data对象中就已经存在msg属性了,也就是说此处是在重写属性,不是新增属性

        // Vue会将data中所有的属性都进行数据劫持,变为响应式属性,每个属性都拥有get/set方法
        // 注意:本来一个属性具有get/set方法之后,会丢失value属性,但是Vue使用闭包的形式缓存了value值

        // Object.defineProperty(vm._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //      如果新值与旧值相同,那么后续代码就不会执行
        //      小总结:也就是说,如果新值等于旧值,那么页面就不会发生变化(不会重新渲染)
        //         if (newVal === val) {
        //             return;
        //         }

        //          将闭包val中的数据全部丢弃,换成最新的数据,留作以后使用
        //         val = newVal;

        //          此处就是响应式属性第二个创建时机
        //          如果当前响应式属性的最新值是一个对象类型,那么内部所有的属性都会被进行深度数据劫持/
        //          所有属性都会变成响应式属性
        //         childObj = observe(newVal);
                
        //          通过dep.notify方法通知视图进行更新
        //         dep.notify();
        //     }
        // });
    }
    
};


function observe(value, vm) {
  // observe(data, vm);

//   此处在检查data是否有值,同时判断是否是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {

        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
        
    }
};

Dep.target = null;