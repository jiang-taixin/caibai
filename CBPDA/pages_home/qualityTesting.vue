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
			<view class="desc-text">
				<u--text type="primary" class="desc-text" text="前置单号" size=13></u--text>
			</view>

			<u--input font-size=13 v-model="bookCode" border="surround" :disabled="true">
			</u--input>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="质检人" size=13></u--text>
					</view>

					<u--input font-size=13 v-model="qualityInspector" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="供应商" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="supplier" border="surround" :disabled="true">
					</u--input>
				</div>

			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="无损件数" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="undamagedNum" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="有损件数" size=13></u--text>
					</view>

					<u--input font-size=13 v-model="damageNum" border="surround" :disabled="true">
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

					<u--input font-size=13 v-model="modelNum" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="采购件数" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="purchaseNum" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="贵金属材质" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="material" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="质检件数" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="testNum" border="surround" :disabled="true">
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
					<u--input font-size=13 v-model="qualifiedNumber" border="surround" type="number" @blur="qualifiedBlur">
					</u--input>

				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="合格克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="qualifiedWeight" border="surround" clearable>
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
					<!-- <zb-dropdown v-model="item.reason" :data="reason">
					</zb-dropdown> -->
					<uni-data-select v-model="item.reason" :localdata="reason"></uni-data-select>
				</uni-td>
				<uni-td>
					<!-- <uni-easyinput type="number" v-model="item.number" placeholder="输入数量" @blur="blur" @confirm="numberConfirm">
					</uni-easyinput> -->
					<input type="number" v-model="item.number" @blur="blur" @confirm="numberConfirm" placeholder="输入数量"/>
				</uni-td>
				<uni-td>
					<view style="width: 25px;height:25px">
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
			<u-row style="margin-bottom: 10px;">
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
				damageNum: "", //有损件数
				undamagedNum: "", //无损件数
				supplier: "", //供应商
				modelNum: "", //款号
				purchaseNum: "", //采购件数
				material: "", //贵金属材质
				qualifiedNumber:0,   //合格件数
				qualifiedWeight:"",   //合格克重
				testNum: 0,
				total: 0, //不合格总计
				tableData: [],
				reason: [],
				disabled:false,    //提交按钮是否可点击
				headerMessage :"",//用于保存扫码后获取的信息
			}

		},
		mounted() {
			//页面加载完成之后的操作
			this.qualityInspector = "当前用户";
			let vm = this;
			uni.getStorage({
				key: "reasonList",
				success(res) {
					vm.reason = res.data;
				}
			})
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
					"interface_num": "MOBSCMD0006",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"barCode": this.codeNumber
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					console.log("*************res:",res);
					uni.hideLoading();
					if (res.data.code === "200") {
						this.disabled = false;
						this.headerMessage = res.data.data;
						this.bookCode = this.headerMessage.bookCode;
						this.supplier = this.headerMessage.supName;
						this.damageNum = this.headerMessage.damageInspectCounts;      
						this.undamagedNum = this.headerMessage.undamageInspectCounts;
						this.modelNum = this.headerMessage.materielCode;
						this.purchaseNum = this.headerMessage.goodsPurchaseNum;
						this.material = this.headerMessage.goodsMetalMaterial;
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
			commit() {
				
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
				
				this.headerMessage["comeGood"] = this.testNum;//质检数量
				this.headerMessage["comeGram"] = "";//质检克重
				this.headerMessage["qualifiedQuantity"] = this.qualifiedNumber;//合计合格数量
				this.headerMessage["unqualifiedQuantity"] = this.total;//合计不合格数量
				this.headerMessage["qualifiedGram"] = this.qualifiedWeight;//合计合格克重
				this.headerMessage["unqualifiedGram"] = "";//合计不合格克重
				this.headerMessage["preCode"] = this.headerMessage.bookCode;//预约单号
				this.headerMessage["preItemCode"] = this.headerMessage.itemCode;//预约单行项目
				this.headerMessage["temprecType"] = "1";//质检类型
				this.headerMessage["temprecStatus"] = "1";//质检状态
				
				var body = {
					"faws":bodyList,
					"header":this.headerMessage
				};
				var param = {
					"interface_num": "MOBSCMD0007",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": body,
				};
				this.disabled = true;
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.httpRequest(opts, param).then((res) => {
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
			qualifiedBlur(){
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
				
				if(this.qualifiedNumber !== ''){
					this.testNum = parseInt(this.total) + parseInt(this.qualifiedNumber);
				}else{
					this.testNum = parseInt(this.total);
				}
			}
		}
	}
</script>

<style>

</style>
