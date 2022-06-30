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
						<u--text type="primary" text="合计次要数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondaryNumber" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="合计数量/克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="mainNumber" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		
		<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">凭证</uni-th>
				<uni-th align="center">分配号</uni-th>
				<uni-th align="center">小计次要数量</uni-th>
				<uni-th align="center">库位</uni-th>
				<uni-th align="center">仓位</uni-th>
				<uni-th align="center">凭证日期</uni-th>
				<uni-th align="center">小计数量/克重</uni-th>
				<uni-th align="center">状态</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
				<uni-td>{{item.tagName}}</uni-td>
				<uni-td>{{item.location}}</uni-td>
				<uni-td>{{item.mainNum}}</uni-td>
				<uni-td>{{item.barCode}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.secondaryNum}}</uni-td>
				<uni-td>{{item.materialName}}</uni-td>
				<uni-td>{{item.modelNum}}</uni-td>
			</uni-tr>
		</uni-table>
		
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
				codeNumber:"",
				mainNumber:"",    //合计数量
				secondaryNumber:"",//合计次要数量
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
