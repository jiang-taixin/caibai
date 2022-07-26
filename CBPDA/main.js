import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import myRequest from './http/http.js'
Vue.prototype.$http = myRequest

import dateTrans from './JS/dateTrans.js'
Vue.use(dateTrans)
import toast from './JS/Toast.js'
Vue.use(toast)
import userInfo from './JS/userInfo.js'
Vue.use(userInfo)

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
