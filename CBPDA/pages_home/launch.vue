<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="扫码" size=13></u--text>
					</view>
					<uni-easyinput v-model="codeNumber" placeholder="扫码或填写分配号" @blur="blur" clearable>
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
						<u--text type="primary" text="合计次要数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondaryNumber" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="合计数量/克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="mainNumber" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
		</u-row>
		<uni-table border stripe emptyText="暂无更多数据" class="custom-list" type="selection"
			@selection-change="selectionChange">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center" width="90">分配号</uni-th>
				<uni-th align="center" width="50">件数</uni-th>
				<uni-th align="center" width="120">仓位</uni-th>
				<uni-th align="center">凭证</uni-th>
				<uni-th align="center">库位</uni-th>
				<uni-th align="center" width="120">小计数量/克重</uni-th>
				<uni-th align="center">状态</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData">
				<uni-td>{{item.fph}}</uni-td>
				<uni-td>{{item.qualityTotal}}</uni-td>
				<uni-td><input type="text" style="width: 100px;border-style: dashed;font-size: 13px;" v-model="item.position" placeholder="输入仓位"/></uni-td>
				<uni-td>{{item.materialDecCode}}</uni-td>
				<uni-td>{{item.shopCode}}</uni-td>
				<uni-td>{{item.subQualityTotal}}</uni-td>
				<uni-td v-if="parseInt(item.materialDecStatus) === 1">新建状态</uni-td>
				<uni-td v-else-if="parseInt(item.materialDecStatus) === 2">已入库过账</uni-td>
				<uni-td v-else-if="parseInt(item.materialDecStatus) === 3">待交接</uni-td>
				<uni-td v-else-if="parseInt(item.materialDecStatus) === 4">待上架</uni-td>
				<uni-td v-else>已冲销</uni-td>
			</uni-tr>
		</uni-table>

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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber: "",
				mainNumber: 0, //合计数量
				selectedList: [], //选中行数组
				secondaryNumber: 0, //合计次要数量
				tableData: [],
			}
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
			blur(e){
				if (e.target.value == '') {
					return;
				};
				this.codeNumber = e.target.value;
				this.startSearch();
			},
			startSearch() {
				if (this.codeNumber === '' || this.codeNumber === undefined) {
					this.$toast.showToast("请先扫描分配号");
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
					"interface_num": "MOBSCMD0022",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"materialDecStatus":"4",
						"codeNumber": this.codeNumber
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						if(res.data.s_flag == "F"){
							this.$toast.showToast(`${res.data.m_ess}`);
						}
						else{
							this.tableData = res.data;
							this.mainNumber = 0;
							this.secondaryNumber = 0;
							this.tableData.forEach(element => {
								
								this.mainNumber += element.subQualityTotal;
								this.secondaryNumber += element.qualityTotal;
								element.subQualityTotal = (element.subQualityTotal/2).toFixed(2);
								element.qualityTotal = (element.qualityTotal/2).toFixed(2);
							});
						}
						this.mainNumber = (this.mainNumber/2).toFixed(2);
						this.secondaryNumber = (this.secondaryNumber/2).toFixed(2);
						
					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
				});
			},
			confirm() {
				if (this.selectedList.length === 0) {
					this.$toast.showToast("请先勾选数据");
					return;
				}
				var opts = {
					url: ``,
					method: 'post'
				};
				
				var bodyList = [];
				for (var i = 0; i < this.selectedList.length; i++) {
					var item = this.tableData[this.selectedList[i]];
					item.postingDate = this.$dateTrans.getDateString();
					bodyList.push(item);
				};
				var param = {
					"interface_num": "MOBSCMD0023",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": bodyList,
				};
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						if(res.data.s_flag == "F"){
							this.$toast.showToast(`${res.data.m_ess}`);
						}
						else{
							this.$toast.showToast("提交成功");
							for (var i = 0; i < this.selectedList.length; i++) {
								this.tableData.splice(this.selectedList[i],1);
							};
							this.mainNumber = 0;
							this.secondaryNumber = 0;
						}
						
					} else {
						this.$toast.showToast("提交失败");
					}
				});
			},
			selectionChange(res) {
				this.selectedList = res.detail.index;
			},
			cancel() {
				uni.navigateBack({

				});
			},
		}
	}
</script>

<style>

</style>
