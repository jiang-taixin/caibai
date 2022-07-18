<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="条码/包码/分配号" size=13></u--text>
					</view>
					<uni-easyinput v-model="codeNumber" placeholder="扫描或输入条码/包码" @blur="blur" clearable>
					</uni-easyinput>
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
		
		<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">款号</uni-th>
				<uni-th align="center">标签名称</uni-th>
				<uni-th align="center">供应商</uni-th>
				<uni-th align="center">商品条码</uni-th>
				<uni-th align="center">名称</uni-th>
				<uni-th align="center">可用</uni-th>
				<uni-th align="center">冻结</uni-th>
				<uni-th align="center">非限制-次要</uni-th>
				<uni-th align="center">限制-次要</uni-th>
				<uni-th align="center">基本单位</uni-th>
				<uni-th align="center">次要单位</uni-th>
				<uni-th align="center">工厂</uni-th>
				<uni-th align="center">库位/仓位</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
				<uni-td>{{item.materialCode}}</uni-td>
				<uni-td>{{item.tagName}}</uni-td>
				<uni-td>{{item.supName}}</uni-td>
				<uni-td>{{item.barCode}}</uni-td>
				<uni-td>{{item.materialDesc}}</uni-td>
				<uni-td>{{item.qualityPiece}}</uni-td>
				<uni-td>{{item.limitQualityPiece}}</uni-td>
				<uni-td>{{item.subQualityPiece}}</uni-td>
				<uni-td>{{item.subLimitQualityPiece}}</uni-td>
				<uni-td>{{item.baseUnit}}</uni-td>
				<uni-td>{{item.subUnit}}</uni-td>
				<uni-td>{{item.shopCode}}</uni-td>
				<uni-td>{{item.stockPalce}}</uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber: "", //条码或包码
				tableData:[],
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
				if (this.codeNumber === '' || this.codeNumber === undefined) {
					this.$toast.showToast("请先扫描包码");
					return;
				}
				var opts = {
					url: ``,
					method: 'post'
				};
				uni.showLoading({
					title: '加载中...'
				});
				var param = {
					"interface_num": "MOBSCMD0016",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"codeNumber": this.codeNumber,
					},
				};
				
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					this.inputNum = "";
					console.log("*****************res:", res);
					if (res.statusCode === 200) {
						this.tableData = res.data;
					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
				});
			},
			blur(e) {
				if (e.target.value == '') {
					return;
				};
				var opts = {
					url: ``,
					method: 'post'
				};
				uni.showLoading({
					title: '加载中...'
				});
				var param = {
					"interface_num": "MOBSCMD0016",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"codeNumber": e.target.value,
					},
				};
				
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					this.codeNumber = "";
					console.log("*****************res:", res);
					if (res.statusCode === 200) {
						this.tableData = res.data;
					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
				});
			},
		}
	}
</script>

<style>

</style>
