import Vue from 'vue'

//该方法用于给日期、时间补零
var addZero = function(num) {
	if (parseInt(num) < 10) {
		num = "0" + num
	}
	return num
}


const formatMsToDate = (ms) => {
	if (ms) {
		var oDate = new Date(ms),
			oYear = oDate.getFullYear(),
			oMonth = oDate.getMonth() + 1,
			oDay = oDate.getDate(),
			oHour = oDate.getHours(),
			oMin = oDate.getMinutes(),
			oSen = oDate.getSeconds(),
			oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' +
			addZero(oMin) + ':' + addZero(oSen);
		return oTime;
	} else {
		return ""
	}
}

export default function(Vue) {
	//添加全局API
	Vue.prototype.$dateTrans = {
		formatMsToDate
	}
}
