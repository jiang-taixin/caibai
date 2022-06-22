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
			<view class="desc-text">
				<u--text type="primary" text="质检人" size=13></u--text>
			</view>

			<u--input font-size=13 v-model="qualityInspector" border="surround" disabled=true>
			</u--input>
		</div>
		<uni-table border stripe emptyText="暂无更多数据" class="custom-list" type="selection"
			@selection-change="selectionChange">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">序号</uni-th>
				<uni-th align="left">暂收时间</uni-th>
				<uni-th align="center">采购订单号</uni-th>
				<uni-th align="center">订单行项目号</uni-th>
				<uni-th align="left">商品编号</uni-th>
				<uni-th align="left">商品描述</uni-th>
				<uni-th align="left">包码</uni-th>
				<uni-th align="left">订单数量</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData">
				<uni-td>{{index}}</uni-td>
				<uni-td>{{item.temprecDate}}</uni-td>
				<uni-td>{{item.poCode}}</uni-td>
				<uni-td>{{item.poItemCode}}</uni-td>
				<uni-td>{{item.materielCode}}</uni-td>
				<uni-td>{{item.materielDesc}}</uni-td>
				<uni-td>{{item.barCode}}</uni-td>
				<uni-td>{{item.goodsPurchaseNum}}</uni-td>
			</uni-tr>
		</uni-table>

		<view style="width: 80%;margin-left: 10%;margin-top: 30px;">
			<u-button type="primary" @click="create" text="创建送检单">
			</u-button>
		</view>
		<u-toast ref="uToast" />

		<u-popup :show="showCreatePage" mode="bottom" @close="close">
			<view>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">送检单号:</text>
					</view>
					<view style="float:left;width: 220px;">
						<!--u--text改text u--text在微信小程序中v-text无效-->
						<text v-text="inspectionCode" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">总件数:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="totalNum" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">送检人:</text>
					</view>
					<u--input font-size=13 v-model="inspectionName" border="surround" clearable>
					</u--input>

				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">状态:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text style="font-size: 13px;">新建状态</text>
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">送检单类型:</text>
					</view>
					<view style="float:left;width: 220px;">
						<uni-data-select v-model="inspectionCategory" :localdata="category" @change="changeAngecy">
						</uni-data-select>
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">送检机构:</text>
					</view>
					<view style="float:left;width: 220px;">
						<uni-data-select v-model="inspectionAngecy" :localdata="angecy" @change="changeAngecy">
						</uni-data-select>
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">送检日期:</text>
					</view>
					<view style="float:left;width: 220px;">
						<uni-datetime-picker v-model="inspectionDate" type="date" :value="single" start="2021-3-20"
							end="2099-6-20" @change="changeDate" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">备注:</text>
					</view>
					<u--input font-size=13 v-model="remarks" border="surround" clearable>
					</u--input>
				</div>

				<u-row>
					<u-col span="6">
						<div class="col-layout">
							<u-button type="primary" @click="confirmCreate" text="确认"
								style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
						</div>
					</u-col>
					<u-col span="6">
						<div class="col-layout">
							<u-button type="warning" @click="cancelCreate" text="取消"
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
				codeNumber: "", //出货汇总单单号
				qualityInspector: "", //质检人
				tableData: [],
				selectedList:[],      //选中行数组
				showCreatePage: false, //显示创建页面
				inspectionCode: "", //送检单号
				totalNum: 2, //总件数
				inspectionName: "", //送检人
				remarks: "", //备注
				inspectionCategory: "", //送检类型
				inspectionDate: "", //送检日期
				inspectionAngecy: "", //送检机构
				angecy: [{
						value: 0,
						text: "首检"
					},
					{
						value: 1,
						text: "国检"
					}
				],
				category: [{
						value: 0,
						text: "贵金属首检送检单"
					},
					{
						value: 1,
						text: "镶嵌国检送检单"
					},
					{
						value: 2,
						text: "摆件国检送检单"
					},
				],
			}
		},
		methods: {
			startSearch() {
				if (this.codeNumber === '' || this.codeNumber === undefined) {
					this.$refs.uToast.error(`请先扫描出货汇总单`);
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
					console.log("*******response:", res);
					uni.hideLoading();
					if (res.data.code === "200") {
						//收到数据将暂收时间转为日期格式   状态转换为文字描述
						if (res.data.data.length != 0) {
							for (let i in res.data.data) {
								res.data.data[i].temprecDate = this.$dateTrans.formatMsToDate(res.data.data[i]
									.temprecDate);
							}
						}
						this.tableData = res.data.data;
					} else {
						this.$refs.uToast.error('获取数据失败，请重试');
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
							this.$refs.uToast.success(`扫码失败，请重试`);
						}

					}
				});
			},
			selectionChange(){
				this.selectedList = res.detail.index;
			},
			create() {
				this.showCreatePage = true;
				this.angecy = [{
						value: 0,
						text: "首检"
					},
					{
						value: 1,
						text: "国检"
					},
					{
						value: 1,
						text: "国检"
					},
				];
			},
			confirmCreate() {
				if (this.inspectionName === '' || this.inspectionName === undefined) {
					this.$refs.uToast.error(`请先输入送检人姓名`);
					return;
				}
				if (this.inspectionDate === '' || this.inspectionDate === undefined) {
					this.$refs.uToast.error(`请选择送检时间`);
					return;
				}
				if (this.inspectionCategory === '' || this.inspectionCategory === undefined) {
					this.$refs.uToast.error(`请选择送检类别`);
					return;
				}
				if (this.inspectionAngecy === '' || this.inspectionAngecy === undefined) {
					this.$refs.uToast.error(`请选择送检机构`);
					return;
				}
				
				var opts = {
					url: ``,
					method: 'post'
				};
				let vm = this;
				var bodyList = [];
				for (var i = 0; i < this.selectedList.length; i++) {
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
					this.showCreatePage = false;
					if (res.data.code === "200") {
						this.$refs.uToast.success('提交成功');
					} else {
						this.$refs.uToast.error('提交失败，请重试');
					}
				});
				
				this.category.find((item) => {
				   if(item.value === parseInt(this.inspectionCategory)){
				     console.log("category:",item.text);
				   }
				 });
			},
			cancelCreate() {
				this.showCreatePage = false;
			}
		}
	}
</script>

<style>

</style>
