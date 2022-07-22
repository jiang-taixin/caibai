<template>
	<view>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="类型" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="type" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="部门" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="department" border="surround">
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="库位" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="storagePosition" border="surround">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="证章号/工号" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="employeeNumber" border="surround">
					</u--input>
				</div>
			</u-col>
		</u-row>

		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" class="desc-text-edit" text="过账日期" size=13></u--text>
			</view>
			<uni-datetime-picker v-model="date" type="date" start="2021-3-20" end="2099-6-20"/>
		</div>

		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="上架仓位(抽屉号)" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="warehousePosition" placeholder="请扫码" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" @click="startScanWarehouse"
							style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
				<u-col span="1">
					
				</u-col>
			</u-row>
		</div>

		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="分配号/条形码/包码" size=13></u--text>
					</view>
					<uni-easyinput :focus="focus" v-model="codeNumber" placeholder="扫码或填写分配号" @blur="blur" clearable>
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

		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="数量/克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="number_weight" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="合计" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="total" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="次要数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondaryNumber" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="次要合计" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondaryTotal" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
		</u-row>

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
						<u-button type="error" @click="cancel" text="取消"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;">
						</u-button>
					</div>
				</u-col>
			</u-row>
		</view>
		<view style="margin-top: 30px;">
			<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">标签名称</uni-th>
					<uni-th align="center">条形码</uni-th>
					<uni-th align="center">仓位</uni-th>
					<uni-th align="center">次要数量</uni-th>
					<uni-th align="center">主要数量/克重</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in tableData">
					<uni-td>{{item.tagName}}</uni-td>
					<uni-td>{{item.barCode}}</uni-td>
					<uni-td>{{item.position}}</uni-td>
					<uni-td>{{item.subQualityPiece}}</uni-td>
					<uni-td>{{item.qualityPiece}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:"901",                //类型
				department:"",             //部门
				storagePosition:"",        //库位
				employeeNumber:"",         //员工号
				date:"",                   //日期
				warehousePosition:"",      //上架仓位
				codeNumber:"",             //条形码、包码
				number_weight:0,          //数量、克重
				total:0,                  //合计
				secondaryNumber:0,        //次要数量
				secondaryTotal:0,         //次要合计
				tableData:[],
				focus:false,
			}
		},
		mounted() {
			this.employeeNumber = "NO0001";
			this.date = this.$dateTrans.getDateString();
		},
		onLoad(option) {
			this.department = option.launchDepartment;
			this.storagePosition = option.launchWarehouse;
		},
		methods: {
			startScanWarehouse(){
				let vm = this;
				uni.scanCode({
					success: function(res) {
						if (res.errMsg == "scanCode:ok") {
							vm.$nextTick(() => {
								vm.warehousePosition = res.result;
							});
						} else {
							this.$toast.showToast("扫码失败，请重试");
						}
							
					}
				});
			},
			startScan(){
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
			blur(e){
				if (e.target.value == '') {
					return;
				};
				this.codeNumber = e.target.value;
				this.startSearch();
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
					console.log("===================res:",res);
					if (res.statusCode === 200) {
						if(res.data.s_flag == "F"){
							this.$toast.showToast(`${res.data.m_ess}`);
						}
						else{
							this.number_weight = 0;
							this.secondaryNumber = 0;
							this.tableData = [];
							res.data.forEach(element => {
								if(element.position == "0000009999" && element.qualityPiece !== 0 && element.subQualityPiece !== 0){
									var dataBody = {};
									dataBody.tagName = element.tagName;
									dataBody.createdBy = this.employeeNumber;
									dataBody.accountingYear = this.$dateTrans.getYear();
									dataBody.materialDecDate = this.$dateTrans.getDateString();
									dataBody.moveType = this.type;
									dataBody.loanType = "H";
									dataBody.shopCode = element.shopCode;
									dataBody.stockPlace = element.stockPalce;
									dataBody.waraHouse = element.waraHouse;
									dataBody.goodArea = element.goodsArea;
									dataBody.position = element.position;
									dataBody.materielCode = element.materialCode;
									dataBody.batch = element.batch;
									dataBody.barCode = element.barCode;
									dataBody.fph = element.fph;
									dataBody.packageCode = element.packageCode;
									dataBody.qualityPiece = element.qualityPiece;
									dataBody.subQualityPiece = element.subQualityPiece;
									dataBody.subUnit = element.subUnit;
									dataBody.baseUnit = element.baseUnit;
									dataBody.moveReason = "";
									this.number_weight += element.qualityPiece;
									this.secondaryNumber += element.subQualityPiece;
									this.tableData.push(dataBody);
								}
							});
							this.total += this.number_weight;
							this.secondaryTotal += this.secondaryNumber;
						}
						
					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
					
				});
			},
			confirm(){
				if (this.tableData.length === 0) {
					this.$toast.showToast("请先扫描包码或条码获取数据");
					return;
				}
				if (this.warehousePosition === '' || this.warehousePosition === undefined) {
					this.$toast.showToast("请先扫描或输入上架仓位");
					return;
				}
				var opts = {
					url: ``,
					method: 'post'
				};
				uni.showLoading({
					title: '加载中...'
				});
				this.focus = false;
				this.tableData.forEach(element => {
					element.postingDate = this.date;
				})
				var changeData = JSON.parse(JSON.stringify(this.tableData));
				changeData.forEach(element => {
					element.position = this.warehousePosition;
					element.loanType = "S";
				});
				var header = {
					"createdBy":this.employeeNumber,
					"accountingYear":this.$dateTrans.getYear(),
					"materialDecDate":this.$dateTrans.getDateString(),
					"postingYear":this.date
				}
				var param = {
					"interface_num": "MOBSCMD0016",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"header": header,
						"originalData":this.tableData,
						"changeData":changeData
					},
				};
				console.log("===================data:",param);
				
				uni.hideLoading();
				return;
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					console.log("===================res:",res);
					if (res.statusCode === 200) {
						if(res.data.s_flag == "F"){
							this.$toast.showToast(`${res.data.m_ess}`);
						}
						else{
							this.codeNumber = "";
							this.$nextTick(function() {
								this.focus = true;
							});
						}
						
					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
					
				});
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
