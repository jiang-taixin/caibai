<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="扫码" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="codeNumber" placeholder="出货汇总单二维码" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" style="width: 30px;height: 30px;"
							@click="startScan"></u-button>
					</view>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="search" style="width: 30px;height: 30px;"
							@click="startSearch"></u-button>
					</view>
				</u-col>
			</u-row>
		</div>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="扫码" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="barCode" placeholder="包码" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" style="width: 30px;height: 30px;"
							@click="startScanPackage"></u-button>
					</view>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="plus" style="width: 30px;height: 30px;"
							@click="addPackage"></u-button>
					</view>
				</u-col>
			</u-row>
		</div>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="质检人" size=13></u--text>
			</view>

			<u--input font-size=13 v-model="qualityInspector" border="surround" :disabled="true">
			</u--input>
		</div>
		<uni-table ref="table" border stripe emptyText="暂无更多数据" class="custom-list" type="selection"
			@selection-change="selectionChange">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">序号</uni-th>
				<uni-th align="center">暂收时间</uni-th>
				<uni-th align="center">暂收确认状态</uni-th>
				<uni-th align="center">出货数量</uni-th>
				<uni-th align="center">出货克重</uni-th>
				<uni-th align="center">出货毛重</uni-th>
				<uni-th align="center">采购订单号</uni-th>
				<uni-th align="center">订单行项目号</uni-th>
				<uni-th align="center">商品编号</uni-th>
				<uni-th align="center">商品描述</uni-th>
				<uni-th align="center">包码</uni-th>
				<uni-th align="center">订单数量</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData">
				<uni-td>{{index+1}}</uni-td>
				<uni-td>{{item.temprecDate}}</uni-td>
				<uni-td>{{item.itemStatus}}</uni-td>
				<uni-td>{{item.sendCount}}</uni-td>
				<uni-td>{{item.sendTotalGram}}</uni-td>
				<uni-td>{{item.grossWeight}}</uni-td>
				<uni-td>{{item.poCode}}</uni-td>
				<uni-td>{{item.poItemCode}}</uni-td>
				<uni-td>{{item.materielCode}}</uni-td>
				<uni-td>{{item.materielDesc}}</uni-td>
				<uni-td>{{item.barCode}}</uni-td>
				<uni-td>{{item.goodsPurchaseNum}}</uni-td>
			</uni-tr>
		</uni-table>

		<view style="margin-top: 30px;">
			<u-row style="margin-bottom: 10px;">
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="receiveConfirm" text="暂收确认"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="createInspection" text="创建送检单"
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
				codeNumber: "", //出货汇总单单号
				qualityInspector: "", //质检人
				barCode: "", //包码
				selectedList: [], //选中的列表数据
				tableData: [],
			}
		},
		mounted() {
			this.qualityInspector = "当前用户";
		},
		methods: {
			startSearch() {
				if (this.codeNumber === '' || this.codeNumber === undefined) {
					this.$toast.showToast("请先扫描出货汇总单");
					return;
				}
				var opts = {
					url: ``,
					method: 'post'
				};
				let vm = this;
				var param = {
					"interface_num": "MOBSCMD0001",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"deliveryCode": this.codeNumber
					},
				};
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					console.log("======================res:",res);
					if (res.data.code === "200") {
						//收到数据将暂收时间转为日期格式   状态转换为文字描述
						if (res.data.data.length != 0) {
							for (let i in res.data.data) {
								res.data.data[i].temprecDate = this.$dateTrans.formatMsToDate(res.data.data[i].temprecDate);
								switch (res.data.data[i].itemStatus) {
									case "0":
										res.data.data[i].itemStatus = "";
										break;
									case "1":
										res.data.data[i].itemStatus = "";
										break;
									case "2":
										res.data.data[i].itemStatus = "已确认暂收";
										break;
										
									default:
								}
							}
						}
						this.tableData = res.data.data;
					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
				});
			},
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
			blur(){
			},
			addPackage() {
				if (this.barCode === '' || this.barCode === undefined) {
					this.$toast.showToast("请先扫描包码");
					return;
				}
				//点击添加扫描到的包码与列表中包码一致则选中当前行
				for (let i in this.tableData) {
					if (this.tableData[i].barCode == this.barCode) {
						this.$refs.table.toggleRowSelection(parseInt(i), true);
					}
				}
				this.barCode = null;
			},
			startScanPackage() {
				let vm = this;
				uni.scanCode({
					success: function(res) {
						if (res.errMsg == "scanCode:ok") {
							vm.$nextTick(() => {
								vm.barCode = res.result;
								//this.addPackage();
							});
						} else {
							this.$toast.showToast("扫码失败，请重试");	
						}
					}
				});
			},
			createInspection() {
				uni.navigateTo({
					url: 'createInspection'
				});
			},
			selectionChange(res) {
				this.selectedList = res.detail.index;
				
			},
			receiveConfirm() {
				var opts = {
					url: ``,
					method: 'post'
				};
				let vm = this;
				var bodyList = [];
				for (var i = 0; i < this.selectedList.length; i++) {
					this.tableData[this.selectedList[i]].itemStatus = "2";
					bodyList.push(this.tableData[this.selectedList[i]]);
				}

				var param = {
					"interface_num": "MOBSCMD0002",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": bodyList,
				};
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					console.log("************res:",res);
					if (res.data.code === "200") {
						this.$toast.showToast("提交成功");
						
					} else {
						this.$toast.showToast("提交失败，请重试");
						
					}
				});
			}
		}
	}
</script>

<style>

</style>
