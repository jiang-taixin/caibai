<template>
	<view>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="工厂" size=13></u--text>
			</view>
			<uni-data-select v-model="selectFactory" :localdata="factory" @change="changeDepartment">
			</uni-data-select>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit""">
				<u--text type="primary" text="库位" size=13></u--text>
			</view>
			<uni-data-select v-model="selectWarehousePosition" :localdata="warehousePosition" @change="changeWarehouse">
			</uni-data-select>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="盘点人" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="checker" border="surround" clearable>
			</u--input>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="复核人" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="reviewer" border="surround" clearable>
			</u--input>
		</div>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="盘点枪" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="check_gun" border="surround" disabled=true>
			</u--input>
		</div>
		
		<view style="margin-top: 30px;">
			<u-row style="margin-top: 50px;">
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="confirm" text="确认"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="error" @click="cancel" text="取消"
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
				selectFactory:"",            //工厂
				factory:[],
				selectWarehousePosition:"",  //库位
				warehousePosition:[],
				checker:"",                  //盘点人
				reviewer:"",                 //复核人
				check_gun:"",                //盘点枪
			}
		},
		methods: {
			confirm() {
				uni.navigateTo({
					url: `implementStockCheck/implementStockCheck`
				})
			},
			cancel(){
				uni.navigateBack({
				});
			}
		}
	}
</script>

<style>

</style>
