<template>
	<view>
		<view class="tabs">
			<view class="tab_item" :class="{cur:index === tabCur}" v-for="(item, index) in ['装箱配送确认模式', '自取确认模式']"
				:key="index" @click="tabSelect(index)">{{ item }}</view>
		</view>
		<view v-show="tabCur === 0">
			<u-row>
				<u-col span="6">
					<div class="col-layout">
						<view class="desc-text-edit">
							<u--text type="primary" text="配送交接人" size=13></u--text>
						</view>
						<u--input style="height: 35px;" font-size=13 border="surround" v-model="handoverPerson">
						</u--input>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<view class="desc-text-edit">
							<u--text type="primary" text="箱子类型" size=13></u--text>
						</view>
						<uni-data-select v-model="boxType" :localdata="types">
						</uni-data-select>
					</div>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="6">
					<div class="col-layout">
						<view class="desc-text-edit">
							<u--text type="primary" text="状态" size=13></u--text>
						</view>
						<uni-data-select v-model="boxStatus" :localdata="status">
						</uni-data-select>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<view class="desc-text-edit">
							<u--text type="primary" text="箱子编码" size=13></u--text>
						</view>
						</u--input>
						<u--input style="height: 35px;" font-size=13 border="surround" v-model="boxCode">
						</u--input>
					</div>
				</u-col>
			</u-row>
			<u-button type="primary" @click="search" text="查询"
				style="width: 80%;margin-left: 10%;margin-bottom: 10px;margin-top: 10px;"></u-button>

			<uni-table border stripe emptyText="暂无更多数据" class="custom-list" type="selection"
			@selection-change="selectionChange">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">箱子</uni-th>
					<uni-th align="center">配送交接人</uni-th>
					<uni-th align="center">装箱单</uni-th>
					<uni-th align="center">状态</uni-th>
					<uni-th align="center">装箱单类型</uni-th>
					<uni-th align="center">主门店</uni-th>
					<uni-th align="left">日期</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
					<uni-td>{{item.boxName}}</uni-td>
					<uni-td>{{item.handover}}</uni-td>
					<uni-td>{{item.packageCode}}</uni-td>
					<uni-td>{{item.boxType}}</uni-td>
					<uni-td>{{item.packageType}}</uni-td>
					<uni-td>{{item.shopName}}</uni-td>
					<uni-td>{{item.date}}</uni-td>
				</uni-tr>
			</uni-table>

		</view>
		<view v-show="tabCur === 1">
			<div class="divContainer">
				<u-row justify="space-between" gutter="1">
					<u-col span="9">
						<view class="desc-text-edit">
							<u--text type="primary" text="配货单" size=13></u--text>
						</view>
						<uni-easyinput :focus="focus" v-model="codeNumber" placeholder="扫码输入,手动输入" @blur="blur" clearable>
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
						<view class="desc-text-edit">
							<u--text type="primary" text="收货门店" size=13></u--text>
						</view>
						<uni-data-select v-model="selectStore" :localdata="stores" @change="changeStore">
						</uni-data-select>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<view class="desc-text-edit">
							<u--text type="primary" text="专柜" size=13></u--text>
						</view>
						<uni-data-select v-model="selectCounter" :localdata="counters">
						</uni-data-select>
					</div>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="6">
					<div class="col-layout">
						<view class="desc-text-edit">
							<u--text type="primary" text="制单日期-起" size=13></u--text>
						</view>
						<uni-datetime-picker v-model="startTime" type="date" start="2021-3-20"
							end="2099-6-20" />
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<view class="desc-text-edit">
							<u--text type="primary" text="制单日期-止" size=13></u--text>
						</view>
						<uni-datetime-picker v-model="endTime" type="date" start="2021-3-20"
							end="2099-6-20" />
					</div>
				</u-col>
			</u-row>
			<uni-table border stripe emptyText="暂无更多数据" class="custom-list" type="selection"
			@selection-change="selectionChangeSec">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">配货单号</uni-th>
					<uni-th align="center">单据类型</uni-th>
					<uni-th align="center">专柜</uni-th>
					<uni-th align="center">收货门店</uni-th>
					<uni-th align="center">商品大类</uni-th>
					<uni-th align="center">总件数</uni-th>
					<uni-th align="left">日期</uni-th>
					<uni-th align="left">状态</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in tableDataSec">
					<uni-td>{{item.packingCode}}</uni-td>
					<uni-td>{{item.orderType}}</uni-td>
					<uni-td>{{item.receiveCounterCode}}</uni-td>
					<uni-td>{{item.receiveShopCode}}</uni-td>
					<uni-td>{{item.category}}</uni-td>
					<uni-td>{{item.totalNumber}}</uni-td>
					<uni-td>{{item.createdDate}}</uni-td>
					<uni-td>{{item.orderStatus2}}</uni-td>
				</uni-tr>
			</uni-table>

		</view>
		<div style="position: fixed;bottom: 0px;width: 100%;background-color:aquamarine;">
			<u-row>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="confirm" text="确认" style="width: 80%;margin-left: 10%;">
						</u-button>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="error" @click="cancel" text="取消" style="width: 80%;margin-left: 10%;">
						</u-button>
					</div>
				</u-col>
			</u-row>
		</div>
		<u-popup :show="showEditPage" mode="bottom">
			<view>
				
				<div class="divContainer">
					<view class="desc-text-edit">
						<u--text type="primary" text="备注" size=13></u--text>
					</view>
					<textarea placeholder="输入备注信息"
						style="width: 100%;margin-top: 5px;background-color: aliceblue;font-size: 13px;" v-model="remarks"
						maxlength="-1"></textarea>
				</div>
		
				<u-row>
					<u-col span="6">
						<div class="col-layout">
							<u-button type="primary" @click="confirmEdit" text="确认"
								style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
						</div>
					</u-col>
					<u-col span="6">
						<div class="col-layout">
							<u-button type="warning" @click="cancelEdit" text="取消"
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
				tabCur: 0,
				handoverPerson:"",//交接人
				boxType:"",//箱子类型
				types:[],//箱子类型列表
				boxStatus:"",//箱子状态
				status:[],//箱子状态列表
				boxCode:"",//箱子编码
				codeNumber:"",//配货单号
				selectStore:"",//收货门店
				stores:[],//门店列表
				selectCounter:"",//专柜
				counters:[],//专柜列表
				startTime:"",//开始时间
				endTime:"",//截止时间
				showEditPage: false, //是否显示编辑页面
				selectedIndex:0,//当前选中行
				remarks:"",//备注   用于当前行的信息编辑
				tableData:[{
					"boxName":"BOX111",
					"handover":"H0009",
					"packageCode":"ZXD238383",
					"boxType":"正常",
					"packageType":"TYPE",
					"shopName":"SHOP1111",
					"date":"2022-07-21"
				}],
				selectedList: [], //选中行数组
				tableDataSec:[],
				selectedListSec: [], //选中行数组
				focus:false,
			}
		},
		mounted() {
			this.handoverPerson = "NO0001";
			this.startTime = this.$dateTrans.getDateString();
			this.endTime = this.$dateTrans.getNextWeekDateString();
			//获取箱子类型和箱子状态
			let vm = this;
			uni.getStorage({
				key:"boxTypeList",
				success(res) {
					vm.types = res.data;
				},
				fail(e) {
				}
			});
			uni.getStorage({
				key:"boxStatusList",
				success(res) {
					vm.status = res.data;
				},
				fail(e) {
				}
			});
			uni.getStorage({
				key:"departmentList",
				success(res) {
					vm.stores = res.data;
				},
				fail(e) {
				}
			});
			
		},
		methods: {
			tabSelect(index) {
				if (this.tabCur === index) return;
				this.tabCur = index;
			},
			search(){
				//装箱配送确认模式搜索
			},
			rowClick(item,index){
				this.selectedIndex = index;
				this.showEditPage = true;
			},
			confirmEdit() {
				//确认编辑
				this.showEditPage = false;
				this.tableData[this.selectedIndex].reamrk = this.remarks;
				console.log("===============table data:",this.tableData);
			},
			cancelEdit() {
				this.showEditPage = false;
			},
			selectionChange(res){
				this.selectedList = res.detail.index;
			},
			selectionChangeSec(res){
				this.selectedListSec = res.detail.index;
			},
			changeStore(e){
				if(e !== ""){
					this.getCounters();
				}
				//console.log("==================change store:",e);
			},
			getCounters(){
				//console.log("==================get counters");
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
			blur(e){
				if (e.target.value == '') {
					return;
				};
				this.codeNumber = e.target.value;
				this.startSearch();
			},
			startSearch() {
				if (this.codeNumber === '' || this.codeNumber === undefined) {
					this.$toast.showToast("请先扫描配货单");
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
					"interface_num": "MOBSCMD0017",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"poCode": this.codeNumber
					},
				};
				this.focus = false;
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						if(res.data.header.pickingSelf == "0"){
							var dataBody = {};
							dataBody.packingCode = res.data.header.poCode;
							dataBody.orderType = res.data.header.orderType;
							dataBody.receiveCounterCode = res.data.header.receiveCounterCode;
							dataBody.receiveShopCode = res.data.header.receiveShopCode;
							dataBody.category = res.data.header.category;
							dataBody.totalNumber = res.data.header.totalNumber;
							dataBody.createdDate = this.$dateTrans.formatMsToDate(res.data.header.createdDate);
							if(res.data.header.orderStatus2 === "4"){
								dataBody.orderStatus2 = "待确认出库";
							}
							this.tableDataSec.push(dataBody);
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
			confirm(){
				console.log("===========click confirm ,tab :",this.tabCur);
				console.log("===========click confirm ,list 1 :",this.selectedList);
				console.log("===========click confirm ,list 2 :",this.selectedListSec);
				
			},
			cancel(){
				uni.navigateBack({
				
				});
			},
		}
	}
</script>

<style lang="scss">
	.tabs {
		display: flex;
		justify-content: space-evenly;
		font-size: 32rpx;
		background-color: #FFF;
		color: #A9A9A9;
	}

	.tab_item {
		height: 114rpx;
		line-height: 100rpx;

		&.cur {
			position: relative;
			color: #1e00ed;

			&::after {
				content: '';
				width: 100rpx;
				height: 6rpx;
				position: absolute;
				bottom: 20rpx;
				left: 50%;
				margin-left: -50rpx;
				background-color: #1e00ed;
			}
		}
	}
</style>
