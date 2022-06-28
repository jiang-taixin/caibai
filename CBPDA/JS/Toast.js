import Vue from 'vue'

const showToast = (message) => {
	uni.showToast({
		icon: "none",
		title: message,
		duration: 1500,
	});
}

export default function(Vue) {
	Vue.prototype.$toast = {
		showToast,
	}
}
