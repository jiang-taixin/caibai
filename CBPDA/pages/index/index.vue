<template>
	<view>
		<u-swiper :list="list1" @change="change" :radius="0" @click="click" indicator></u-swiper>
		<u-grid :border="false" col="3" @click="click">
			<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex"
				v-if="listItem.platform.indexOf(platfrom) !== -1">
				<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="60"></u-icon>
				<text class="grid-text">{{listItem.title}}</text>
			</u-grid-item>
		</u-grid>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platfrom: "",
				title: 'Hello',
				value: 0,
				list: [{
						name: 'search',
						title: '初检信息录入',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						name: 'setting',
						title: '入库前质检',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						name: 'setting',
						title: '有损检验',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						name: 'car',
						title: '逐条拣货配货',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						name: 'car-fill',
						title: '整单配货',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						name: 'reload',
						title: '回货暂收',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						name: 'heart',
						title: '创建送检单',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						name: 'list-dot',
						title: '送检单明细',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						name: 'list',
						title: '取检确认',
						platform: ["APP", "WEIXIN", "H5"],
					},
				],
				list1: [
					'/static/1.png',
					'/static/2.png',
					'/static/3.png',
				]
			}
		},
		onLoad() {

		},
		beforeCreate() {

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
			console.log("********* platform :", this.platfrom);
		},
		methods: {
			click(name) {
				switch (name) {
					case 0:
						uni.navigateTo({
							url: '/pages/home/qualityTesting'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/home/frontTesting'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/home/damageTesting'
						});
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/home/pickingManagement'
						});
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/home/wholeOrderDistribution'
						});
						break;
					case 5:
						uni.navigateTo({
							url: '/pages/home/provisionalReceipt'
						});
						break;
					case 6:
						uni.navigateTo({
							url: '/pages/home/createInspection'
						});
						break;	
					case 7:
						uni.navigateTo({
							url: '/pages/home/inspectionDetail'
						});
						break;
					case 8:
						uni.navigateTo({
							url: '/pages/home/inspectionConfirm'
						});
						break;	
					default:
						uni.navigateTo({
							url: '/pages/home/qualityTesting'
						});
				}
			}

		}
	}
</script>

<style>
	
</style>
