import Vue from 'vue'

const setUserInfo = (userInfo) => {
	uni.setStorageSync("userInfo",userInfo);
}

const getUserInfo = () => {
	const info =  uni.getStorageSync("userInfo");
	return info;
}

export default function(Vue) {
	Vue.prototype.$userInfo = {
		setUserInfo,
		getUserInfo
	}
}
