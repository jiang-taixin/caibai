import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import myRequest from './http/http.js'
Vue.prototype.$http = myRequest
import {angecy,reason,category} from './common/js/common.js'
Vue.prototype.angecy = angecy
Vue.prototype.reason = reason
Vue.prototype.category = category

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
