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
				<u--text type="primary" text="推荐仓位" size=13></u--text>
			</view>
			<u-row>
				<u-col span="6">
					<u--input font-size=13 v-model="recommend" placeholder="" border="surround" :disabled="true">
					</u--input>
				</u-col>
				<u-col span="6">
					<u--input font-size=13 v-model="steps" placeholder="" border="surround" :disabled="true">
					</u--input>
				</u-col>
			</u-row>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="款号" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="modelNum" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="名称" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="name" border="surround" :disabled="true">
					</u--input>
				</div>

			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="分配数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="distributeNum" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="SOU" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="SOU" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
		</u-row>
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
					<uni-easyinput v-model="inputNum" placeholder="扫码输入" @blur="blur" :disabled="disabled" clearable>
					</uni-easyinput>
				</div>

			</u-col>
		</u-row>

		<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">标签名称</uni-th>
				<uni-th align="center">仓位</uni-th>
				<uni-th align="center">数量/克重</uni-th>
				<uni-th align="center">商品条码</uni-th>
				<uni-th align="center">商品包码</uni-th>
				<uni-th align="center">次要数量</uni-th>
				<uni-th align="center">物料名称</uni-th>
				<uni-th align="center">款号</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
				<uni-td>{{item.tagName}}</uni-td>
				<uni-td>{{item.position}}</uni-td>
				<uni-td>{{item.qualityPiece}}</uni-td>
				<uni-td>{{item.barCode}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.subQualityPiece}}</uni-td>
				<uni-td>{{item.materielDesc}}</uni-td>
				<uni-td>{{item.materielCode}}</uni-td>
			</uni-tr>
		</uni-table>

		<div style="position: fixed;bottom: 0px;width: 100%;background-color:aquamarine;">
			<u-row>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="commit" text="确认" style="width: 80%;margin-left: 10%;" :disabled="disabled">
						</u-button>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="save" text="保存" style="width: 80%;margin-left: 10%;" :disabled="disabled">
						</u-button>
					</div>
				</u-col>
			</u-row>
		</div>
		<u-popup :show="showEditPage" mode="bottom" @close="close">
			<view>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">标签名称:</text>
					</view>
					<view style="float:left;width: 220px;">
						<!--u--text改text u--text在微信小程序中v-text无效-->
						<text v-text="tableData.length > 0?[selectedIndex].tagName:''" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">商品条码:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].barCode:''"
							style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">商品包码:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].packageCode:''"
							style="font-size: 13px;" />
					</view>

				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">仓位:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].position:''"
							style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">物料名称:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].materielDesc:''"
							style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">款号:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData.length > 0?tableData[selectedIndex].materielCode:''"
							style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">数量/克重:</text>
					</view>
					<u--input font-size=13 v-model="mainNum" border="surround" clearable>
					</u--input>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">次要数量:</text>
					</view>
					<u--input font-size=13 v-model="secondaryNum" border="surround" clearable>
					</u--input>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">备注:</text>
					</view>
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
		<u-modal :show="show" title="提示" :showCancelButton="true" @confirm="confirm" @cancel="close" :asyncClose="true">
			<text>确认过账？</text>
		</u-modal>
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
				recommend: "", //推荐库位
				steps: "0/0", //进度步数
				nowStep: 0, //当前进度
				sumStep: 0, //进度总数
				modelNum: "", //款号
				name: "", //名称
				distributeNum: "", //分配数量
				SOU: "", //SOU
				totalNum: "", //合计数量
				inputNum: "", //扫码输入号码
				tableData: [],
				showEditPage: false, //是否显示编辑页面
				selectedIndex: 0, //当前选中的数据行
				mainNum: "", //数量、克重    用于当前行的信息编辑
				secondaryNum: "", //次要数量    用于当前行的信息编辑
				remarks: "", //备注   用于当前行的信息编辑
				masterData: [],
				disabled:false,   //控制过账后数据是否可编辑
				show:false,       //弹出模态窗
			}
		},
		onNavigationBarButtonTap(val) {
			if (val.index === 0) {
				//下一步
				if (this.nowStep < this.sumStep) {
					this.nowStep = this.nowStep + 1;
					this.steps = `${this.nowStep}/${this.sumStep}`;
					this.reload();
				}

			} else {
				//上一步
				if (this.nowStep > 1) {
					this.nowStep = this.nowStep - 1;
					this.steps = `${this.nowStep}/${this.sumStep}`;
					this.reload();
				}
			}
		},
		onLoad: function(option) {
			//获取url中传入的参数
			this.department = option.selectDepartment;
			this.warehouse = option.selectWarehouse;
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
			startSearch() {
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
						this.masterData = res.data;
						this.sumStep = res.data.detail.length;
						this.nowStep = 1;
						this.steps = `${this.nowStep}/${this.sumStep}`;
						this.modelNum = res.data.detail[0].materielCode;
						this.name = res.data.detail[0].materielDesc;
						this.SOU = res.data.detail[0].sou;
						this.distributeNum = res.data.detail[0].allotNum;
						this.recommend = res.data.detail[0].shopCode;
						this.tableData = res.data.detail[0].itemList;
						this.totalNum = this.tableData.length;
						if(res.data.header.orderStatus !== "2" && res.data.header.orderStatus !== "3"){
							this.disabled = false;
						}
						else{
							this.disabled = true;
						}

					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
				});
			},
			rowClick(item, index) {
				this.selectedIndex = index;
				this.showEditPage = true;
				this.mainNum = this.tableData[this.selectedIndex].qualityPiece;
				this.secondaryNum = this.tableData[this.selectedIndex].subQualityPiece;
				this.remarks = this.tableData[this.selectedIndex].reamrk;
			},
			close() {
				this.showEditPage = false;
			},
			confirmEdit() {
				this.tableData[this.selectedIndex].qualityPiece = this.mainNum;
				this.tableData[this.selectedIndex].subQualityPiece = this.secondaryNum;
				this.tableData[this.selectedIndex].reamrk = this.remarks;
				this.showEditPage = false;
			},
			cancelEdit() {
				this.showEditPage = false;
			},
			deleteItem() {
				this.tableData.splice(this.selectedIndex, 1);
				this.showEditPage = false;
				this.totalNum = this.tableData.length;
			},
			blur(e) {
				//扫码结束获取信息并更新进列表
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
					"interface_num": "MOBSCMD0015",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"codeNumber": e.target.value,
						"sou": this.SOU,
					},
				};
				
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					this.inputNum = "";
					console.log("*****************res:", res);
					if (res.statusCode === 200) {
						res.data.forEach(element => {
							if(this.tableData.length < this.distributeNum){
								var dataBody = {};
								dataBody.tagName = element.tagName;
								dataBody.position = element.position;
								dataBody.qualityPiece = element.qualityPiece;
								dataBody.barCode = element.barCode;
								dataBody.packageCode = element.packageCode;
								dataBody.subQualityPiece = element.subQualityPiece;
								dataBody.materielDesc = element.materialDesc;
								dataBody.materielCode = element.materialCode;
								dataBody.poItemCode = this.nowStep;
								this.tableData.push(dataBody);
							}
							else{
								this.$toast.showToast("已达最大量");
							}
						});
						this.totalNum = this.tableData.length;
					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
				});
			},
			commit() {
				if (this.nowStep < this.sumStep) {
					this.nowStep = this.nowStep + 1;
					this.steps = `${this.nowStep}/${this.sumStep}`;
					this.reload();
				}
				else{
					this.show = true;
				}
			},
			close(){
				this.show = false;
			},
			confirm(){
				//提交数据
				this.show = false;
				if(this.masterData.detail.length != 0){
					this.setItemCode();
				}
				else{
					this.$toast.showToast("请先添加数据再提交");
					return;
				}
				console.log("===========commit data:",this.masterData);
			},
			save() {
				this.show = false;
				if(this.masterData.detail.length != 0){
					this.setItemCode();
				}
				else{
					this.$toast.showToast("请先添加数据再提交");
					return;
				}
			},
			prefixInteger(num, n) {
				return (Array(n).join(0) + num).slice(-n);
			},
			setItemCode(){
				//给每条数据添加item号 提交前添加防止删除操作时出现重复item号
				for (var i = 0; i < this.masterData.detail.length; i++) {
					for (var j = 0; j < this.masterData.detail[i].itemList.length; j++) {
						this.masterData.detail[i].itemList[j].itemCode = `${i+1}${this.prefixInteger(j+1,3)}`;
					};
				};
			},
			reload() {
				this.modelNum = this.masterData.detail[this.nowStep - 1].materielCode;
				this.name = this.masterData.detail[this.nowStep - 1].materielDesc;
				this.SOU = this.masterData.detail[this.nowStep - 1].sou;
				this.distributeNum = this.masterData.detail[this.nowStep - 1].allotNum;
				this.recommend = this.masterData.detail[this.nowStep - 1].shopCode;
				this.tableData = this.masterData.detail[this.nowStep - 1].itemList;
				this.totalNum = this.tableData.length;
			}
		}
	}
</script>

<style>

</style>
