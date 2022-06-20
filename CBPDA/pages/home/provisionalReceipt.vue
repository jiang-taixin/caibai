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
					<u--input font-size=13 v-model="packageNumber" placeholder="包码" border="surround" clearable>
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

			<u--input font-size=13 v-model="qualityInspector" border="surround" disabled=true>
			</u--input>
		</div>
		<uni-table ref="table" border stripe emptyText="暂无更多数据" class="custom-list" type="selection"
			@selection-change="selectionChange">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">序号</uni-th>
				<uni-th align="left">暂收时间</uni-th>
				<uni-th align="left">暂收确认状态</uni-th>
				<uni-th align="center">采购订单号</uni-th>
				<uni-th align="center">订单行项目号</uni-th>
				<uni-th align="left">商品编号</uni-th>
				<uni-th align="left">商品描述</uni-th>
				<uni-th align="left">包码</uni-th>
				<uni-th align="left">订单数量</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
				<uni-td>{{index}}</uni-td>
				<uni-td>{{item.receiveDate}}</uni-td>
				<uni-td>{{item.receiveStatus}}</uni-td>
				<uni-td>{{item.orderCode}}</uni-td>
				<uni-td>{{item.itemNum}}</uni-td>
				<uni-td>{{item.productCode}}</uni-td>
				<uni-td>{{item.productDesc}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.orderNum}}</uni-td>
			</uni-tr>
		</uni-table>

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
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber:"",                   //出货汇总单单号
				qualityInspector:"",             //质检人
				packageNumber:"",                //包码
				tableData: [{
					receiveDate: "2022-6-16",
					receiveStatus: "",
					orderCode: "YHD1110000",
					itemNum: "001",
					productCode: "P109",
					productDesc: "product description",
					packageCode: "PAC123",
					orderNum: 12
				}, {
					receiveDate: "2022-6-12",
					receiveStatus: "",
					orderCode: "YHD11100002",
					itemNum: "002",
					productCode: "P102",
					productDesc: "product description",
					packageCode: "PAC122",
					orderNum: 11
				}, {
					receiveDate: "2022-6-13",
					receiveStatus: "",
					orderCode: "YHD11100003",
					itemNum: "003",
					productCode: "P103",
					productDesc: "product description",
					packageCode: "PAC120",
					orderNum: 10
				}],
			}
		},
		methods: {
			startSearch() {
				this.$refs.uToast.success(`search with ${this.codeNumber}`)
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
							this.$refs.uToast.success(`扫码失败，请重试`);
						}
			
					}
				});
			},
			addPackage() {
				this.$refs.uToast.success(`search with ${this.packageNumber}`)
			},
			startScanPackage() {
				let vm = this;
				uni.scanCode({
					success: function(res) {
						if (res.errMsg == "scanCode:ok") {
							vm.$nextTick(() => {
								vm.packageNumber = res.result;
							});
						} else {
							this.$refs.uToast.success(`扫码失败，请重试`);
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
				console.log("selectionChange", res.details.index);
			},
			receiveConfirm() {
				//用于设置某一行被选中
				this.$refs.table.toggleRowSelection(2,true);
			}
		}
	}
</script>

<style>

</style>
