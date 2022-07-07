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
				<u--text type="primary" text="SOU码" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="SOU" border="surround" disabled=true>
			</u--input>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="送检人" size=13></u--text>
					</view>
					<u--input font-size=13 border="surround" v-model="qualityInspector" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="有损检测件数" size=13></u--text>
					</view>
					</u--input>
					<u--input font-size=13 border="surround" v-model="damageNum" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="送检时间" size=13></u--text>
					</view>
					<uni-datetime-picker v-model="inspectionTime" type="date" :value="single" start="2021-3-20"
						end="2099-6-20" @change="changeDate" />
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="送检机构" size=13></u--text>
					</view>
					<uni-data-select v-model="selectAngecy" :localdata="angecy" @change="changeAngecy">
					</uni-data-select>
				</div>
			</u-col>
		</u-row>
		<div style="margin-top: 10px;margin-left: 5%;width: 90%;">
			<view class="desc-text">
				<u--text type="primary" text="有损检测" size=13></u--text>
			</view>
		</div>
		<uni-table border stripe emptyText="暂无更多数据" style="margin-left: 5px;margin-top: 5px;">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center" width="30" style="font-size: 12px;">序号</uni-th>
				<uni-th align="center" width="80" style="font-size: 12px;">克重</uni-th>
				<uni-th align="center" width="60" style="font-size: 12px;">件数</uni-th>
				<uni-th align="center" width="30" style="font-size: 12px;">操作</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData">
				<uni-td>{{index}}</uni-td>
				<uni-td>
					<uni-easyinput v-model="item.checkWeight" placeholder="输入克重" style="90%">
					</uni-easyinput>
				</uni-td>
				<uni-td>
					<text>1</text>
				</uni-td>
				<uni-td>
					<view style="width: 25px;height:25px">
						<u-button type="primary" @click="del(index)" icon="minus" size="mini">
						</u-button>
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>
		<u-row justify="space-between" style="margin-top: 5px;">
			<u-col span="3">
				<view style="width: 30px;height: 30px;">
					<u-button type="primary" @click="add" text="+" size="mini">
					</u-button>
				</view>
			</u-col>
			<u-col span="3">
			</u-col>
			<u-col span="3">
			</u-col>
			<u-col span="3">
			</u-col>
		</u-row>
		<view style="width: 80%;margin-left: 10%;margin-top: 30px;">
			<u-button type="primary" @click="commit" text="提交" >
			</u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber: "", //条形码或二维码
				qualityInspector: "", //送检人
				SOU: "", //SOU
				damageNum: 0, //有损检测件数
				inspectionTime: "", //送检时间
				selectAngecy: 0, //送检机构
				tableData: [],
				receiveData: {},
				angecy: [],
			}
		},
		mounted() {
			//页面加载完成之后的操作
			this.qualityInspector = "当前用户";
			
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1):nowDate.getMonth() + 1;
			var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
			var dateStr = year + "-" + month + "-" + day;
			this.inspectionTime = dateStr;
			
			let vm = this;
			uni.getStorage({
				key:"organList",
				success(res) {
					vm.angecy = res.data;
				},
				fail(e) {
				}
			})
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
					"interface_num": "MOBSCMD0003",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"barCode": this.codeNumber
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					if (res.data.code === "200") {
						this.receiveData = res.data.data;
						this.SOU = res.data.data.sou;
						this.damageNum = res.data.data.checkNumber;
						this.tableData = res.data.data.details;
					} else {
						this.$toast.showToast("获取数据失败，请重试");
						
					}
				});
			},
			commit() {
				var opts = {
					url: ``,
					method: 'post'
				};
				if (this.inspectionTime === '' || this.inspectionTime === undefined) {
					this.$toast.showToast("请选择送检时间并重试");
					
					return;
				}
				if (this.tableData.length < this.damageNum) {
					this.$toast.showToast("提交量必须与有损件数一致");
					
					return;
				}
				let vm = this;
				this.tableData.forEach(function(element, index) {
					element["itemCode"] = index;
					element["checkEndDate"] = vm.inspectionTime;
					element["checkType"] = vm.selectAngecy;
					element["spotCheckCode"] = vm.receiveData.spotCheckCode;
				});
				this.receiveData.details = this.tableData;
				this.receiveData.inspectDate = this.inspectionTime;
				this.receiveData.inspectBy = this.qualityInspector;
				this.receiveData.inspectOrgan = this.selectAngecy;
				var bodyList = this.receiveData;
				var param = {
					"interface_num": "MOBSCMD0004",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": bodyList,
				};
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.httpRequest(opts, param).then((res) => {
					console.log("*******response:", res);
					uni.hideLoading();
					if (res.data.code === "200") {
						this.$toast.showToast("提交成功");
						
					} else {
						this.$toast.showToast("提交失败");
						
					}
				});
			},
			changeAngecy(e) {
				this.selectAngecy = e;
			},
			changeDate(e) {
				this.inspectionTime = e;
				console.log("change date :", this.inspectionTime);
			},
			add() {
				if (this.tableData.length >= parseInt(this.damageNum)) {
					this.$toast.showToast("已达有损件数上限");
					
					return;
				} else {
					this.tableData.push({
						checkWeight: ""
					});
				}
			},
			del(index) {
				this.tableData.splice(index, 1);
			},
		}
	}
</script>

<style>

</style>
