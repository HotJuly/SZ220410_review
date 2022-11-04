import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes,asyncRoutes,anyRoutes } from '@/router'
import router from '@/router'
import {cloneDeep} from 'lodash';

function filterAsyncRoutes(asyncRoutes,routeNames){
  /*
    根据当前账号的权限,过滤出一个当前账号能访问的异步路由对象组成的数组
    返回值数据类型:routeObj[]
      数组中的每个都是异步路由对象

      asyncRoutes->当前项目所有的异步路由对象组成的数组
      routeNames->当前账号能访问的路由别名组成的数组

      filter方法
        返回值一定是一个全新的数组(不会影响到旧数组)
          如果回调函数中返回true,那么当前选项就会保留
          如果回调函数中返回false,那么当前选项就会被过滤

        注意:最终,无论如何过滤,留下的数据类型一定不会发生变化
  */
  const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{
    const name = routeObj.name;

    // if(routeObj.children&&routeObj.children.length){
    if(routeObj.children?.length){
      routeObj.children = filterAsyncRoutes(routeObj.children,routeNames);
    }

    return routeNames.includes(name);
  })

  return newAsyncRoutes;
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 用于存储当前账号的按钮级别的权限
    buttons:[],

    // 用于存储当前账号的路由级别的权限
    routeNames:[],

    // 用于存储当前帐号能访问的所有路由对象,目的是为了解决左侧列表的显示问题
    routes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION: (state,data) => {
    const {buttons,routes} = data;
    state.buttons = buttons;
    state.routeNames = routes;

    // console.log(1)
    const newAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes),routes);
    // console.log('newAsyncRoutes',newAsyncRoutes)
    router.addRoutes(newAsyncRoutes)

    // state.routes = constantRoutes.concat(newAsyncRoutes,anyRoutes);
    state.routes = [...constantRoutes,...newAsyncRoutes,...anyRoutes];

  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data
        // console.log(data)

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSION', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

