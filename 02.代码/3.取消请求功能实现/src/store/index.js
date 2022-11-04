import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        // 该对象用于记录哪些请求出去了,还没回来
        fns:{}
    },
    mutations:{
        ADD_FN(state,{url,cb}){
            state.fns[url] = cb;
        },
        REMOVE_FN(state,url){
            delete state.fns[url];
        },
        CLEAR_FN(state){
            // Object.values可以获取到某个对象,所有属性值组成的数组
            Object.values(state.fns).forEach((cb)=>{
                // cb&&cb();
                cb?.();
            })
        }
    }
})