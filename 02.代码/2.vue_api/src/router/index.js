import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/Home';
import About from '@/components/About'

Vue.use(VueRouter);

export default new VueRouter({
    mode:"hash",
    // mode:"history",
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{
                isShowHeader:true
            }
        },
        {
            path:"/about",
            component:About,
            meta:{
                isShowHeader:false
            }
        },
    ]
})