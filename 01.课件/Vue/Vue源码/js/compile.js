function Compile(el, vm) {
  // this.$compile = new Compile("#app", vm);
//   this->com对象

    this.$vm = vm;

    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        this.$fragment = this.node2Fragment(this.$el);

        this.init();

        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->app元素节点,this->com对象

        // 文档碎片中,也可以存放节点,不过在这里面存放的节点,页面上看不到
        var fragment = document.createDocumentFragment(),
            child;

        // 循环获取app节点中的子节点内容,只要有子节点都存入文档碎片中,直到没有子节点为止
        // 目的:为了减少重绘重排的次数,提高页面渲染性能
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // 第一次进入:this->com对象,el->文档碎片对象
        // 第二次进入:this->com对象,el->p元素节点

        // childNodes中会存放当前节点中,所有直系子节点组成的伪数组
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        //第一次进入: [text节点,p元素节点,text节点].forEach(function(node) {
        //第二次进入: [text节点].forEach(function(node) {
            // 获取p元素文本内容->"{{msg}}"
        //     var text = node.textContent;

        //      正则表达式中,如果使用括号,意思就是对内部的内容进行分组,后续可以直接获取到这一部分的内容
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         com.compile(p元素节点);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         com.compileText(text节点, "msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         com.compileElement(node);
        //     }
        // });

    },

    compile: function(node) {
        // 此处就是在准备解析Vue的指令,例如:v-if,v-for
        //  com.compile(p元素节点);
        // attributes->用于获取当前节点身上所有的标签属性节点组成的数组
        var nodeAttrs = node.attributes,
            me = this;

        // console.log(node.attributes);

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

        // [class属性节点].forEach(function(attr) {
        //     var attrName = attr.name;
        //     if (com.isDirective(attrName)) {
        //         var exp = attr.value;
        //         var dir = attrName.substring(2);

        //         if (me.isEventDirective(dir)) {
        //             compileUtil.eventHandler(node, me.$vm, exp, dir);
        //         } else {
        //             compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        //         }

        //         node.removeAttribute(attrName);
        //     }
        // });

    },

    compileText: function(node, exp) {
        //com.compileText(text节点, "msg");
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, "msg");
        
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // compileUtil.text(text节点, vm, "msg");
        this.bind(node, vm, exp, 'text');
        // compileUtil.bind(text节点, vm, "msg", 'text');

    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // compileUtil.bind(text节点, vm, "msg", 'text');

        // 此行代码可以获取到文本的更新器函数,用于更新某个节点的文本内容
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(text节点, compileUtil._getVMVal(vm, "msg"));
        // updaterFn && updaterFn(text节点, "hello mvvm");

        /*
            每执行一次bind方法,就会创建一个对应的watcher对象
            完整说法:项目中,每具有一个插值表达式,就会生成一个对应的watcher对象
        */
        // new Watcher(vm, exp, function(value, oldValue) {
        //     updaterFn && updaterFn(node, value, oldValue);
        // });

    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // 该函数的目的:为了读取data中对应的属性值,并返回
        // compileUtil._getVMVal(vm, "msg")
        var val = vm._data;

        // exp->["msg"]
        // exp->["person","name"]
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
            // 第一次执行回调函数:k->"person"
            // 第二次执行回调函数:k->"name"

        //     val = vm._data["person"];
        //     val = person['name'];
        // });

        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // updaterFn(text节点, "hello mvvm");
        // 这一行代码,通过传入的节点,对其文本内容进行替换操作
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};