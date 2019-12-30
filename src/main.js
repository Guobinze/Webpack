import './assets/index.css' // 必须写成这种相对路径的写法，否则打包失败
import Vue from 'vue';
import App from './App';
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
});
