<template>
	<view>
		<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" width="100%"></u--image>
		<div style="width: 80%;display:inline-block;margin-top: 30px;margin-left: 10%;">
			<view style="float:left;width: 70px;">
				<text style="font-size: 13px;">用户名</text>
			</view>
			<u--input font-size=13 v-model="username" border="surround" clearable>
			</u--input>
		</div>
		<div style="width: 80%;display:inline-block;margin-top: 30px;margin-left: 10%;">
			<view style="float:left;width: 70px;">
				<text style="font-size: 13px;">密码</text>
			</view>
			<u--input type="password" font-size=13 v-model="password" border="surround" clearable>
			</u--input>
		</div>

		<view style="width: 80%;margin-left: 10%;margin-top: 30px;">
			<u-button type="primary" @click="login" text="登录">
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
			}
		},
		methods: {
			login() {
				if (this.username === "" || this.password === "") {
					this.$toast.showToast("请先输入账号和密码");
					return;
				}
				var opts = {
					url: `http://10.10.2.133:8080/auth/realms/caibai/protocol/openid-connect/token`,
					method: 'post'
				};
				uni.showLoading({
					title: '加载中...'
				});
				var param = {
					"client_id": "dorado_dev",
					"grant_type": "password",
					"username": this.username,
					"password": this.password,
				};
				this.$http.getTokenRequest(opts, param).then((res) => {
					uni.hideLoading();
					console.log("===========get token res:", res);
					if (res.statusCode == 200) {
						this.getUserMessage(res.data.access_token);
					} else {
						this.$toast.showToast(`${res.data.error_description}`);
					}
				});
			},
			getUserMessage(token) {
				console.log("============start get user information with token:", token);

				var userData = {
					"userName": "user1",
					"employeeCode": "NO09090909",
					"identity": "admin",
				};
				this.$userInfo.setUserInfo(userData);

				uni.switchTab({
					url: '/pages/home/home',
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style>

</style>
