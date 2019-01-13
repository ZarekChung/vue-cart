// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios' //使用ajax的套件
import VueAxios from 'vue-axios'//將套件轉為vue
import App from './App'
import router from './router'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
axios.defaults.withCredentials = true;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
// console.log("to",to,"from",from,"next",next);
if(to.meta.requiresAuth){
// console.log("需要驗證")
const api = `${process.env.API_PATH}/api/user/check`;
  
  axios.post(api).then((response) => {
  // console.log(response.data);
  if(response.data.success){
    next();
  }else{
    next({
      path:'/login',
    })
  }
})
}else{
  next();
}
})