import Vue from 'vue'

//该方法用于给日期、时间补零
var addZero = function(num) {
	if (parseInt(num) < 10) {
		num = "0" + num
	}
	return num
}

//毫秒转为日期格式
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

const getDateString = () => {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1):nowDate.getMonth() + 1;
	var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	var dateStr = year + "-" + month + "-" + day;
	return dateStr;
}

const getNextWeekDateString = () => {
	var nowDate = new Date();
	nowDate = nowDate.setDate(nowDate.getDate()+7);
	nowDate = new Date(nowDate);
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1):nowDate.getMonth() + 1;
	var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	var dateStr = year + "-" + month + "-" + day;
	return dateStr;
}

const getYear = () => {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	return year;
}

export default function(Vue) {
	//添加全局API
	Vue.prototype.$dateTrans = {
		formatMsToDate,
		getDateString,
		getYear,
		getNextWeekDateString
	}
}
