<script>
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			wx.cloud.init({
				env:"caibai-dev-8gi415mp2b8cd338",
				traceUser:true,
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import url('./static/style/main.css');
</style>