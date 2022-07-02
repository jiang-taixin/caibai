<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="扫码" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="codeNumber" placeholder="扫码或填写包码" border="surround" clearable>
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
			<view class="desc-text-edit">
				<u--text type="primary" text="质检类别" size=13></u--text>
			</view>
			<uni-data-select v-model="selectCategory" :localdata="category" @change="changeCategory"></uni-data-select>
		</div>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="前置单号" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="bookCode" border="surround" disabled=true>
			</u--input>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="质检人" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="qualityInspector" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="供应商" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="supplier" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="款号" size=13></u--text>
					</view>

					<u--input font-size=13 v-model="modelNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="贵金属材质" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="material" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="采购件数" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="purchaseNum" border="surround" disabled=true>
			</u--input>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="出货件数" size=13></u--text>
					</view>

					<u--input font-size=13 v-model="shipmentNumber" border="surround" type="number" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="出货克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="shipmentWeight" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="质检件数" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="testNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="质检克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="testWeight" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="合格件数" size=13></u--text>
					</view>
					<u--input type="number" font-size=13 v-model="qualifiedNum" border="surround" clearable>
					</u--input>

				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="合格克重" size=13></u--text>
					</view>
					<u--input type="number" font-size=13 v-model="qualifiedWeight" border="surround" clearable>
					</u--input>

				</div>
			</u-col>
		</u-row>

		<uni-table border stripe emptyText="暂无更多数据" style="margin-left: 5px;margin-right: 5px;">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center" width="30" style="font-size: 12px;">序号</uni-th>
				<uni-th align="center" width="80" style="font-size: 12px;">不合格原因</uni-th>
				<uni-th align="center" width="60" style="font-size: 12px;">不合格件数</uni-th>
				<uni-th align="center" width="25" style="font-size: 12px;">操作</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData">
				<uni-td>{{index}}</uni-td>
				<uni-td>
					<uni-data-select v-model="item.reason" :localdata="reason" @change="changeReason"></uni-data-select>
				</uni-td>
				<uni-td>
					<uni-easyinput type="number" v-model="item.number" placeholder="输入数量" @blur="blur"
						@confirm="numberConfirm">
					</uni-easyinput>
				</uni-td>
				<uni-td>
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" @click="del(index)" icon="minus" size="mini">
						</u-button>
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>
		<u-row justify="space-between" style="margin-top: 20px;">
			<u-col span="3">
				<view style="width: 30px;height: 30px;">
					<u-button type="primary" @click="add" text="+" size="mini">
					</u-button>
				</view>

			</u-col>
			<u-col span="3">
			</u-col>
			<u-col span="3">
				<u--text type="primary" text="总计:" align="right"></u--text>
			</u-col>
			<u-col span="3">
				<div>{{total}}</div>
			</u-col>
		</u-row>
		<view style="margin-top: 30px;">
			<u-row>
				<u-col span="6">
					<div class="col-layout">
						<u-button v-bind:disabled="disabled" type="primary" @click="commit" text="提交"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="toDamage" text="抽检录入"
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
				codeNumber: "", //条形码或二维码
				qualityInspector: "", //质检人
				bookCode: "",      //前置单号
				shipmentNumber:"", //出货件数
				shipmentWeight:"", //出货克重
				supplier: "", //供应商
				modelNum: "", //款号
				purchaseNum: "", //采购件数
				testNum:0,   //质检件数
				testWeight:"",//质检克重
				material: "", //贵金属材质
				total: 0, //不合格总计
				selectCategory: "", //质检类别
				qualifiedNum: "", //合格件数
				qualifiedWeight: "", //合格克重
				tableData: [],
				reason: [],
				category:[],
				disabled:false,    //提交按钮是否可点击
				detailMessage :"",//用于保存扫码后获取的信息
			}
		},
		mounted() {
			//页面加载完成之后的操作
			this.qualityInspector = "当前用户";
			let vm = this;
			uni.getStorage({
				key:"reasonList",
				success(res) {
					vm.reason = res.data;
				}
			});
			uni.getStorage({
				key:"typeList",
				success(res) {
					vm.category = res.data;
				}
			});
		},
		methods: {
			startSearch() {
				if (this.codeNumber === '' || this.codeNumber === undefined) {
					this.$toast.showToast("请先扫描包码");
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
					"interface_num": "MOBSCMD0008",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"barCode": this.codeNumber
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					if (res.data.code === "200") {
						this.detailMessage = res.data.data;
						this.bookCode = this.detailMessage.preCode;
						this.supplier = this.detailMessage.supName;
						this.modelNum = this.detailMessage.materielCode;
						this.material = this.detailMessage.goodsMetalMaterial;
						this.purchaseNum = this.detailMessage.goodsPurchaseNum;
						this.shipmentNumber = this.detailMessage.sendCount;//出货件数
						this.shipmentWeight = this.detailMessage.sendTotalGram;//出货克重
						//initalReviewNum是否初检参数
						if(this.detailMessage.initalReviewNum === 0 || this.detailMessage.initalReviewNum === null){
							this.testNum = this.detailMessage.sendCount;
							this.testWeight = this.detailMessage.sendTotalGram;
						}
						else{
							var number = parseInt(this.detailMessage.sendCount/10);
							number === 0?this.testNum = 1:this.testNum = number;
							this.testWeight = this.detailMessage.sendTotalGram/10;
						}
						
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
			changeCategory(e) {
				this.selectCategory = e;
			},
			changeReason(e) {
				console.log("change reason :", e);
			},
			commit() {
				if (this.qualifiedNum === '' || this.qualifiedNum === undefined) {
					this.$toast.showToast("请输入合格件数");
					return;
				};
				if (this.qualifiedWeight === '' || this.qualifiedWeight === undefined) {
					this.$toast.showToast("请输入合格克重");
					return;
				};
				var opts = {
					url: ``,
					method: 'post'
				};
				
				var bodyList = [];
				for (var i = 0; i < this.tableData.length; i++) {
					var argument = {
						"unqualifiedReason":this.tableData[i].reason,
						"unqualifiedQuantity":this.tableData[i].number,
					}
					bodyList.push(argument);
				};
				this.detailMessage["comeGood"] = this.testNum;//质检件数
				this.detailMessage["comeGram"] = this.testWeight;//质检克重
				this.detailMessage["qualifiedGram"] = this.qualifiedWeight;//合格克重
				this.detailMessage["qualifiedQuantity"] = this.qualifiedNum;//合格件数
				this.detailMessage["checkCategory"] = this.selectCategory;//质检类别
				this.detailMessage["temprecType"] = "1";//质检类型
				this.detailMessage["temprecStatus"] = "1";//质检状态
				this.detailMessage["remarks"] = "20220630";//质检状态
				
				var body = {
					"faws":bodyList,
					"detail":this.detailMessage
				};
				var param = {
					"interface_num": "MOBSCMD0009",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": body,
				};
				uni.showLoading({
					title: '加载中...'
				});
				this.disabled = true;
				this.$http.httpRequest(opts, param).then((res) => {
					console.log("*****************response:",res);
					uni.hideLoading();
					if (res.data.code === "200") {
						this.$toast.showToast("提交成功");
					} else {
						this.disabled = false;
						this.$toast.showToast("提交失败");
						
					}
				});
			},
			toDamage() {
				uni.navigateTo({
					url: 'damageTesting'
				});
			},
			add() {
				this.tableData.push({
					reason: "",
					number: ""
				});
			},
			del(index) {
				this.tableData.splice(index, 1);
				this.getTotal();
			},
			blur() {
				this.getTotal();
			},
			numberConfirm() {
				this.getTotal();
			},
			getTotal() {
				this.total = 0;
				this.tableData.forEach(element => {
					if (element.number !== '' && element.number.toString() !== 'NaN') {
						this.total += parseInt(element.number);
					}
				});
			}
		}
	}
</script>

<style>

</style>
