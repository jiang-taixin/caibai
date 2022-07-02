<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="扫码" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="codeNumber" placeholder="扫码或填写分配号" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" @click="startScan"
							style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="search" @click="startSearch"
							style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
			</u-row>
		</div>
		
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="凭证" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="voucher" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="总数量/克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="mainNumber" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="总次要数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondaryNumber" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="库位" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="storagePosition" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="仓位" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="warehousePosition" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="状态" size=13></u--text>
					</view>	
					<u--input font-size=13 v-model="status" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="备注" size=13></u--text>
			</view>
			<textarea placeholder="输入备注信息" style="width: 100%;margin-top: 5px;background-color: aliceblue;font-size: 13px;" v-model="remarks" maxlength="-1"></textarea>
		</div>
		
		<view style="margin-top: 30px;">
			<u-row style="margin-bottom: 10px;">
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="confirm" text="确认"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="cancel" text="取消"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;">
						</u-button>
					</div>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber:"",    //分配号
				voucher:"",       //凭证
				mainNumber:"",    //总数量
				secondaryNumber:"",//总次要数量
				storagePosition:"",//库位
				warehousePosition:"",//仓位
				remarks:"",          //备注
				status:"",           //状态
			}
		},
		methods: {
			startScan() {
				let vm = this;
				uni.scanCode({
					success: function(res) {
						if (res.errMsg == "scanCode:ok") {
							vm.$nextTick(() => {
								vm.codeNumber = res.result;
							});
						} else {
							this.$toast.showToast("扫码失败，请重试");
						}
			
					}
				});
			},
			startSearch(){
				
			},
			confirm(){
				console.log("****************remarks:",this.remarks);
			},
			cancel(){
				uni.navigateBack({
				
				});
			},
		}
	}
</script>

<style>

</style>
