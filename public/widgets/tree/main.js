import Vue from 'vue'
import App from './app'

var vm = new Vue({
	el: '#app',
	template: '<div class="content"><App/></div>',
	components: { App }
});
