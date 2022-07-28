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
					url: `/token`,
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
				this.$http.keyCloakRequest(opts, param).then((res) => {
					console.log("==============token res:",res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.getUserName(res.data.access_token);
					} else {
						if(res.data.error === "invalid_grant"){
							this.$toast.showToast("无效的用户名凭证,请检查用户名或密码");
						}
						else{
							this.$toast.showToast(`${res.data.error_description}`);
						}
					}
				});
			},
			getUserName(token) {
				var opts = {
					url: `/userinfo`,
					method: 'get',
					token:token
				};
				uni.showLoading({
					title: '加载中...'
				});
				
				this.$http.keyCloakRequest(opts, null).then((res) => {
					console.log("==============username:",res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.getUserMessage(res.data.preferred_username);
					} else {
						if(res.data.error === "invalid_token"){
							this.$toast.showToast("Token无效，请重新尝试登录");
						}
						else{
							this.$toast.showToast(`${res.data.error_description}`);
						}
					}
				});
			},
			getUserMessage(username){
				var opts = {
					url: ``,
					method: 'post'
				};
				uni.showLoading({
					title: '加载中...'
				});
				var param = {
					"interface_num": "MOBSCMD0025",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"userName": username
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					console.log("==============login res:",res);
					if (res.statusCode === 200) {
						if (res.data.s_flag == "F") {
							this.$toast.showToast(`${res.data.m_ess}`);
						} else {
							var userData = {
								"username": res.data.data.username,     //用户名
								"cname":res.data.data.cname,            //中文名
								"ename": res.data.data.ename,           //英文名
								"mobile": res.data.data.mobile,         //手机号
								"email":res.data.data.email            //邮箱
							};
							this.$userInfo.setUserInfo(userData);
							
							uni.switchTab({
								url: '/pages/home/home',
								animationType: 'pop-in',
								animationDuration: 200
							});
						}
						
					} else {
						this.$toast.showToast("登录失败,请重新尝试登录");
					}
				});
			}
		}
	}
</script>

<style>

</style>
