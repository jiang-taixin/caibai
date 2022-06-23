import {
	API_BASE_DEVELOPMENT,API_BASE_PRODUCTION
} from '../http/config.js'

var baseUrl = "";

if (process.env.NODE_ENV === 'development') {
	// TODO
	baseUrl = API_BASE_DEVELOPMENT;
}
if (process.env.NODE_ENV === 'production') {
	// TODO
	baseUrl = API_BASE_PRODUCTION;
}

const httpRequest = (opts, data) => {
	//1.请求的一些默认信息
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "*/*",
			"Content-Type": "application/json",
			"username": "user",
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json',
			"username": "user",
		},
		dataType: 'json',
	}
	var time = format(new Date(), "yyyy-MM-dd HH:mm:ss");
	httpDefaultOpts.data["source_system"] = "MOBILE";
	httpDefaultOpts.data["request_time"] = time;
	httpDefaultOpts.data["bus_key"] = "WGEC";
	httpDefaultOpts.data["bus_type"] = "001";
	console.log(`----------start request with url :${httpDefaultOpts.url}`);
	console.log('----------start request with data :', httpDefaultOpts.data);

	return new Promise((resolve, reject) => {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
};
//带Token请求
const httpTokenRequest = (opts, data) => {
	let token = "";
	uni.getStorage({
		key: 'token',
		success: function(ress) {
			token = ress.data
		}
	});
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	return new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
};

var format = function(time, format) {
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'dd':
				return tf(t.getDate());
				break;
			case 'HH':
				return tf(t.getHours());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
		}
	})
};

export default {
	baseUrl,
	httpRequest,
	httpTokenRequest
}
