<template>
	<view>
		<u-swiper :list="list1" :radius="0" indicator></u-swiper>
		<u-grid :border="false" col="3">
			<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex"
				v-if="listItem.platform.indexOf(platfrom) !== -1" @click="click(listItem)">
				<view style="height: 15px;"></view>
				<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="60" color="#2a439c"></u-icon>
				<text class="grid-text">{{listItem.title}}</text>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platfrom: "",
				list: [{
						tag: '0',
						name: '/static/i1.png',
						title: '初检信息录入',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '1',
						name: '/static/i2.png',
						title: '入库前质检',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '2',
						name: '/static/i3.png',
						title: '有损检验',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '3',
						name: '/static/i4.png',
						title: '回货暂收',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '4',
						name: '/static/i5.png',
						title: '创建送检单',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '6',
						name: '/static/i7.png',
						title: '整单配货',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '7',
						name: '/static/i8.png',
						title: '交接',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '8',
						name: '/static/i9.png',
						title: '上架',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '9',
						name: '/static/i10.png',
						title: '库存上架',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '11',
						name: '/static/i12.png',
						title: '仓位调整',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '12',
						name: '/static/i13.png',
						title: '库位调整',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '14',
						name: '/static/i15.png',
						title: '配送出库确认',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '15',
						name: '/static/i16.png',
						title: '取检确认',
						platform: ["APP", "WEIXIN", "H5"],
					},
				],
				list1: [
					'/static/1.png',
					'/static/2.png',
					'/static/3.png',
				],
				userInfo: {},
			}
		},
		onShow() {
			// 如果没登录    去登录页面
			this.userInfo = this.$userInfo.getUserInfo();
			if (this.userInfo === undefined || this.userInfo === '') {
				uni.redirectTo({
					url: "/pages_login/login",
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		},
		mounted() {
			//页面加载完成获取枚举值并缓存在本地
			this.getAngecy(); //送检机构
			this.getInspectionCategory(); //送检单类型
			this.getReason(); //不合格原因
			this.getTestingCategory(); //质检类别
			this.getDepartment(); //获取发货部门和库位
			this.getBoxStatus(); //获取箱子状态
			this.getBoxType(); //获取箱子类型
		},
		created() {
			//判断平台类型    设置模块是否显示
			let platform = undefined;
			// #ifdef APP-PLUS
			platform = "APP";
			// #endif
			// #ifdef APP-PLUS-NVUE
			platform = "APP";
			// #endif
			// #ifdef H5
			platform = "H5";
			// #endif
			// #ifdef MP-WEIXIN
			platform = "WEIXIN";
			// #endif
			this.platfrom = platform;
			console.log("========================= platform :", this.platfrom);
		},
		methods: {
			click(item) {
				switch (parseInt(item.tag)) {
					case 0:
						uni.navigateTo({
							url: '/pages_home/qualityTesting'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages_home/frontTesting'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '/pages_home/damageTesting'
						});
						break;

					case 3:
						uni.navigateTo({
							url: '/pages_home/provisionalReceipt'
						});
						break;
					case 4:
						uni.navigateTo({
							url: '/pages_home/createInspection'
						});
						break;
					case 5:
						uni.navigateTo({
							url: '/pages_home/pickingManagement'
						});
						break;
					case 6:
						uni.navigateTo({
							url: '/pages_home/wholeOrderDistribution'
						});
						break;
					case 7:
						uni.navigateTo({
							url: '/pages_home/handover'
						})
						break;
					case 8:
						uni.navigateTo({
							url: '/pages_home/launch'
						});
						break;
					case 9:
						uni.navigateTo({
							url: '/pages_home/stockLaunch'
						});
						break;
					case 10:
						uni.navigateTo({
							url: '/pages_home/stockCheck'
						});
						break;
					case 11:
						uni.navigateTo({
							url: '/pages_home/positionAdjustment'
						});
						break;
					case 12:
						uni.navigateTo({
							url: '/pages_home/locationAdjustment'
						});
						break;
					case 13:
						uni.navigateTo({
							url: '/pages_home/packing'
						});
						break;
					case 14:
						uni.navigateTo({
							url: '/pages_home/deliveryConfirm'
						});
						break;
					case 15:
						uni.navigateTo({
							url: '/pages_home/inspectionConfirm'
						});
						break;

					default:
						uni.navigateTo({
							url: '/pages_home/qualityTesting'
						});
				}
			},
			getAngecy() {
				//获取检测机构
				var opts = {
					url: ``,
					method: 'post'
				};
				var param = {
					"interface_num": "MOBSCMD0005",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"enumCode": "PO_CHECK_TYPE"
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					if (res.data.code === "200") {
						var organList = [];
						if (res.data.data.PO_CHECK_TYPE.length != 0) {
							for (let i in res.data.data.PO_CHECK_TYPE) {
								organList.push({
									"text": res.data.data.PO_CHECK_TYPE[i].name,
									"value": res.data.data.PO_CHECK_TYPE[i].code,
								});
							}
						}
						uni.setStorage({
							key: 'organList',
							data: organList,
							success: function() {}
						});
					} else {
						this.$toast.showToast("获取检测机构失败，请刷新页面");

					}
				});
			},
			getInspectionCategory() {
				//获取送检单类别
				var opts = {
					url: ``,
					method: 'post'
				};
				var param = {
					"interface_num": "MOBSCMD0005",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"enumCode": "INSPECT_TYPE"
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					if (res.data.code === "200") {
						var categoryList = [];
						if (res.data.data.INSPECT_TYPE.length != 0) {
							for (let i in res.data.data.INSPECT_TYPE) {
								categoryList.push({
									"text": res.data.data.INSPECT_TYPE[i].name,
									"value": res.data.data.INSPECT_TYPE[i].code,
								});
							}
						}
						uni.setStorage({
							key: 'categoryList',
							data: categoryList,
							success: function() {}
						});
					} else {
						this.$toast.showToast("获取送检单类别失败，请刷新页面");

					}
				});
			},
			getReason() {
				//获取不合格原因
				var opts = {
					url: ``,
					method: 'post'
				};
				var param = {
					"interface_num": "MOBSCMD0005",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"enumCode": "TEMPREC_UNQ_REASON"
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					if (res.data.code === "200") {
						var reasonList = [];
						if (res.data.data.TEMPREC_UNQ_REASON.length != 0) {
							for (let i in res.data.data.TEMPREC_UNQ_REASON) {
								reasonList.push({
									"text": res.data.data.TEMPREC_UNQ_REASON[i].name,
									"value": res.data.data.TEMPREC_UNQ_REASON[i].code,
								});
							}
						}
						uni.setStorage({
							key: 'reasonList',
							data: reasonList,
							success: function() {}
						});
					} else {
						this.$toast.showToast("获取不合格原因失败，请刷新页面");

					}
				});
			},
			getTestingCategory() {
				//获取质检类别
				var opts = {
					url: ``,
					method: 'post'
				};
				var param = {
					"interface_num": "MOBSCMD0005",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"enumCode": "CHECK_CATEGORY"
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					if (res.data.code === "200") {
						var typeList = [];
						if (res.data.data.CHECK_CATEGORY.length != 0) {
							for (let i in res.data.data.CHECK_CATEGORY) {
								typeList.push({
									"text": res.data.data.CHECK_CATEGORY[i].name,
									"value": res.data.data.CHECK_CATEGORY[i].code,
								});
							}
						}
						uni.setStorage({
							key: 'typeList',
							data: typeList,
							success: function() {}
						});
					} else {
						this.$toast.showToast("获取质检类别失败，请刷新页面");

					}
				});
			},
			getDepartment() {
				//获取发货部门和库位信息
				var opts = {
					url: ``,
					method: 'post'
				};
				var param = {
					"interface_num": "MOBSCMD0012",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					if (res.statusCode === 200) {
						var departmentList = [];
						var dataList = [];
						if (res.data.length != 0) {
							for (var i = 0; i < res.data.length; i++) {
								if (departmentList.indexOf(res.data[i].shopCode) == -1) {
									departmentList.push(res.data[i].shopCode);
								}
							};
							departmentList.forEach(element => {
								var deparment = {
									"text": element,
									"value": element,
									"warehouseList": [],
								};
								dataList.push(deparment);
								res.data.forEach(element => {
									if (element.shopCode == deparment.value) {
										var warehouse = {
											"text": element.stockPalceName,
											"value": element.stockPalce,
										};
										deparment.warehouseList.push(warehouse);
									}
								})

							})
						}
						uni.setStorage({
							key: 'departmentList',
							data: dataList,
							success: function() {}
						});
					} else {
						//this.$toast.showToast("获取质检类别失败，请刷新页面");
					}
				});
			},
			getBoxType() {
				var opts = {
					url: ``,
					method: 'post'
				};
				var param = {
					"interface_num": "MOBSCMD0005",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"enumCode": "BOX"
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					if (res.data.code === "200") {
						var typeList = [];
						if (res.data.data.BOX.length != 0) {
							for (let i in res.data.data.BOX) {
								typeList.push({
									"text": res.data.data.BOX[i].name,
									"value": res.data.data.BOX[i].code,
								});
							}
						}
						uni.setStorage({
							key: 'boxTypeList',
							data: typeList,
							success: function() {}
						});
						this.types = typeList;
					} else {
						this.$toast.showToast("获取检测机构失败，请刷新页面");

					}
				});
			},
			getBoxStatus() {
				var opts = {
					url: ``,
					method: 'post'
				};
				var param = {
					"interface_num": "MOBSCMD0005",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"enumCode": "MASTER_BOX_STATUS"
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					if (res.data.code === "200") {
						var statusList = [];
						if (res.data.data.MASTER_BOX_STATUS.length != 0) {
							for (let i in res.data.data.MASTER_BOX_STATUS) {
								statusList.push({
									"text": res.data.data.MASTER_BOX_STATUS[i].name,
									"value": res.data.data.MASTER_BOX_STATUS[i].code,
								});
							}
						}
						uni.setStorage({
							key: 'boxStatusList',
							data: statusList,
							success: function() {}
						});
						this.status = statusList;
					} else {
						this.$toast.showToast("获取检测机构失败，请刷新页面");
					}
				});
			}
		}
	}
</script>

<style>

</style>
