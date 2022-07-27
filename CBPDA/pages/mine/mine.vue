<template>
	<view>
		
		<div class="divContainer" style="margin-top: 60px;">
			<u-row justify="space-between" gutter="1">
				<u-col span="4">
					<u--image width="100" height="100" src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle"></u--image>
				</u-col>
				<u-col span="8">
					<div class="divContainer">
						<view >
							<u--text type="primary" text="账号" size=13></u--text>
						</view>
					
						<u--input font-size=13 v-model="userInfo.username" border="surround" :disabled="true">
						</u--input>
					</div>
					<div class="divContainer">
						<view >
							<u--text type="primary" text="中文名" size=13></u--text>
						</view>
					
						<u--input font-size=13 v-model="userInfo.cname" border="surround" :disabled="true">
						</u--input>
					</div>
				</u-col>
				
			</u-row>
		</div>
		<div class="divContainer" style="margin-top: 50px;">
			<view >
				<u--text type="primary" text="英文名" size=13></u--text>
			</view>
		
			<u--input font-size=13 v-model="userInfo.ename" border="surround" :disabled="true">
			</u--input>
		</div>
		
		<div class="divContainer">
			<view>
				<u--text type="primary" text="手机号" size=13></u--text>
			</view>
		
			<u--input font-size=13 v-model="userInfo.mobile" border="surround" :disabled="true">
			</u--input>
		</div>
		<div class="divContainer">
			<view>
				<u--text type="primary" text="电子邮箱" size=13></u--text>
			</view>
		
			<u--input font-size=13 v-model="userInfo.email" border="surround" :disabled="true">
			</u--input>
		</div>
		
		
		<view style="width: 80%;margin-left: 10%;margin-top: 30px;">
			<u-button type="error" @click="logout" text="注销账号">
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					username:"",
					cname:"",
					ename:"",
					mobile:"",
					email:"",
				}
			}
		},
		mounted() {
			this.userInfo = this.$userInfo.getUserInfo();
		},
		methods: {
			logout(){
				uni.removeStorageSync("userInfo");
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
