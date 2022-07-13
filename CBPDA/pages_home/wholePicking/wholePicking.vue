<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="配货单" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="codeNumber" placeholder="扫描或输入配货单" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" @click="startScan" style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="search" @click="startSearch" style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
			</u-row>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="P/S/W" size=13></u--text>
			</view>
			<u-row justify="space-between" gutter="1">
				<u-col span="4">
					<u--input font-size=13 v-model="department" border="surround" :disabled="true">
					</u--input>
				</u-col>
				<u-col span="4">
					<u--input font-size=13 v-model="warehouse" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="4">
					<u--input font-size=13 v-model="number" border="surround" :disabled="true">
					</u--input>
				</u-col>
			</u-row>
		</div>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="计划总数" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="total" placeholder="" border="surround" :disabled="true">
			</u--input>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="合计数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="totalNum" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="扫码输入" size=13></u--text>
					</view>
					<uni-easyinput v-model="inputNum" placeholder="扫码输入" @blur="blur">
					</uni-easyinput>
				</div>

			</u-col>
		</u-row>
		<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">标签名称</uni-th>
				<uni-th align="center">仓位</uni-th>
				<uni-th align="center">数量</uni-th>
				<uni-th align="center">SOU</uni-th>
				<uni-th align="center">商品条码</uni-th>
				<uni-th align="center">商品包码</uni-th>
				<uni-th align="left">款号</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
				<uni-td>{{item.tagName}}</uni-td>
				<uni-td>{{item.position}}</uni-td>
				<uni-td>{{item.totalAmount}}</uni-td>
				<uni-td>{{item.SOU}}</uni-td>
				<uni-td>{{item.barCode}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.materielCode}}</uni-td>
			</uni-tr>
		</uni-table>
		<div style="position: fixed;bottom: 0px;width: 100%;background-color:aquamarine;">
			<u-row>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="commit" text="确认" style="width: 80%;margin-left: 10%;">
						</u-button>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="toDamage" text="保存" style="width: 80%;margin-left: 10%;">
						</u-button>
					</div>
				</u-col>
			</u-row>
		</div>
		<u-popup :show="showEditPage" mode="bottom" @close="close">
			<view>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">SOU:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].SOU:''" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">标签名称:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].tagName:''" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">商品条码:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].barCode:''" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">商品包码:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].packageCode:''" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">仓位:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].position:''" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">物料名称:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].materielDesc:''" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">款号:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].materielCode:''" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
					<text style="font-size: 13px;">数量:</text></view>
					<u--input font-size=13 v-model="mainNum" border="surround" clearable>
					</u--input>
				</div>

				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
					<text style="font-size: 13px;">备注:</text></view>
					<u--input font-size=13 v-model="remarks" border="surround" clearable>
					</u--input>
				</div>

				<u-row>
					<u-col span="4">
						<div class="col-layout">
							<u-button type="primary" @click="confirmEdit" text="确认"
								style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
						</div>
					</u-col>
					<u-col span="4">
						<div class="col-layout">
							<u-button type="warning" @click="cancelEdit" text="取消"
								style="width: 80%;margin-left: 10%;margin-bottom: 10px;">
							</u-button>
						</div>
					</u-col>
					<u-col span="4">
						<div class="col-layout">
							<u-button type="error" @click="deleteItem" text="删除"
								style="width: 80%;margin-left: 10%;margin-bottom: 10px;">
							</u-button>
						</div>
					</u-col>
				</u-row>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber: "", //条形码或二维码
				department: "", //传入的发货部门
				warehouse: "", //传入的发货库位
				number: "100", //数量
				total: "", //计划总数
				totalNum: "", //合计数量
				inputNum: "", //扫码输入号码
				tableData: [],
				showEditPage: false, //是否显示编辑页面
				selectedIndex: 0, //当前选中的数据行
				mainNum: "", //数量、克重    用于当前行的信息编辑
				remarks: "", //备注   用于当前行的信息编辑
				masterData:[],
			}
		},
		onLoad: function(option) {
			//获取url中传入的参数
			this.department = option.selectDepartment;
			this.warehouse = option.selectWarehouse;
			console.log(option.date);
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
					"interface_num": "MOBSCMD0014",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"poCode": this.codeNumber
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					console.log("*****************res:", res);
					if (res.statusCode === 200) {
						
				
					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
				});
			},
			clickItem(e) {
				this.selectedIndex = e;
				console.log("click item :", e);
				this.showEditPage = true;
				this.mainNum = this.tableData[this.selectedIndex].totalAmount;
				this.remarks = this.tableData[this.selectedIndex].remark;
			},
			rowClick(item, index){
				this.selectedIndex = index;
				this.showEditPage = true;
				
				//
				this.mainNum = this.tableData[this.selectedIndex].totalAmount;
				this.remarks = this.tableData[this.selectedIndex].remark;
			},
			close() {
				this.showEditPage = false;
			},
			confirmEdit() {
				this.tableData[this.selectedIndex].totalAmount = this.mainNum;
				this.tableData[this.selectedIndex].remark = this.remarks;

				this.showEditPage = false;
			},
			cancelEdit() {
				this.showEditPage = false;
			},
			deleteItem() {
				this.tableData.splice(this.selectedIndex, 1);
				this.showEditPage = false;
			},
			blur(e) {
				//扫码结束获取信息并更新进列表
				console.log("blur :", this.inputNum);
			}
		}
	}
</script>

<style>

</style>
