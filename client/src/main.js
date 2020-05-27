import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css'; // 默认主题


import './assets/css/icon.css';

import 'babel-polyfill';

import global_ from './components/common/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面




Vue.config.productionTip = false;
Vue.config.tools = true;

Vue.use(ElementUI, {
    size: 'small'
});

router.beforeEach((to, from, next) => {
    const role = sessionStorage.getItem('userName');
    if (!role && to.path !== '/') {
        next('/');
    } else {
        next();
    }
});




new Vue({
    router,
   
    render: h => h(App)
}).$mount('#app');
