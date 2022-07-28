<template>
	<view>
		<view style="margin-top: 30px;">
			<u-grid :border="false" col="3">
				<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex"
					v-if="listItem.platform.indexOf(platfrom) !== -1" @click="click(listItem)">
					<view style="height: 15px;"></view>
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="60" color="#2a439c"></u-icon>
					<text class="grid-text">{{listItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
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
						tag: '5',
						name: '/static/i6.png',
						title: '逐条拣货配货',
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
						tag: '10',
						name: '/static/i11.png',
						title: '盘点',
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
						tag: '13',
						name: '/static/i14.png',
						title: '装箱',
						platform: ["APP", "WEIXIN", "H5"],
					},
					{
						tag: '14',
						name: '/static/i15.png',
						title: '配送出库确认',
						platform: ["APP", "WEIXIN", "H5"],
					},
				]
			}
		},
		mounted() {
			
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

					default:
						uni.navigateTo({
							url: '/pages_home/qualityTesting'
						});
				}
			},
		}
	}
</script>

<style>

</style>
