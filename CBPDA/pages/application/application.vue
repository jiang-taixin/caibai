<template>
	<view>
		<view style="margin-top: 50px;">
			<u-grid :border="false" col="3" @click="click">
				<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex"
					v-if="listItem.platform.indexOf(platfrom) !== -1">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="60" color="#2a439c">
					</u-icon>
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
					name: 'star',
					title: 'RFID',
					platform: ["APP"],
				}, ],
			}
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
		},
		methods: {
			click(name) {
				switch (name) {
					case 0:
						uni.navigateTo({
							url: '/pages_home/RFIDDemo'
						});
						break;


					default:
						uni.navigateTo({
							url: '/pages_home/RFIDDemo'
						});
				}
			},
		}
	}
</script>

<style>

</style>
