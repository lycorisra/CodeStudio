import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    template: '<span>sss</span>',
    components: { App },
    render: h => h(App),// 这一句代码不能少，否则无法挂载Vue实例
    mounted: () => {
        console.log('hello');
    }
})
