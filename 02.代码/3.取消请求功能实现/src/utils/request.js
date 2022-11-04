import axios from 'axios';
import store from '../store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    // console.log('config',config)

    // 获取到当前请求的路径
    const url = config.url;

    config.cancelToken = new CancelToken((cb)=>{
        // 该函数会同步执行,与Promise的执行器是相同的效果
        // cb,如果被调用,就会取消当前请求
        store.commit('ADD_FN',{url,cb})
    })
    return config
})

request.interceptors.response.use((response)=>{
    // console.log(response)

    // 获取到已经响应的请求路径
    const url = response.config.url;

    store.commit('REMOVE_FN',url)

    return response.data;
})

export default request