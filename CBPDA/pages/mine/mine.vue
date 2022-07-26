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
					
						<u--input font-size=13 v-model="account" border="surround" :disabled="true">
						</u--input>
					</div>
					<div class="divContainer">
						<view >
							<u--text type="primary" text="角色" size=13></u--text>
						</view>
					
						<u--input font-size=13 v-model="role" border="surround" :disabled="true">
						</u--input>
					</div>
				</u-col>
				
			</u-row>
		</div>
		<div class="divContainer" style="margin-top: 50px;">
			<view >
				<u--text type="primary" text="姓名" size=13></u--text>
			</view>
		
			<u--input font-size=13 v-model="name" border="surround" :disabled="true">
			</u--input>
		</div>
		
		<div class="divContainer">
			<view>
				<u--text type="primary" text="手机号" size=13></u--text>
			</view>
		
			<u--input font-size=13 v-model="phone" border="surround" :disabled="true">
			</u--input>
		</div>
		<div class="divContainer">
			<view>
				<u--text type="primary" text="电子邮箱" size=13></u--text>
			</view>
		
			<u--input font-size=13 v-model="email" border="surround" :disabled="true">
			</u--input>
		</div>
		
		
		<view style="width: 80%;margin-left: 10%;margin-top: 30px;">
			<u-button type="primary" @click="logout" text="注销账号">
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:"USER001",
				name:"系统管理员",
				phone:"18907865432",
				email:"18907865432@126.com",
				role:"管理员",
			}
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
