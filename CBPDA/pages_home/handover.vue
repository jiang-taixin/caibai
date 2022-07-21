<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="扫码" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="codeNumber" placeholder="扫码或填写分配号" border="surround" clearable>
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

		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="凭证" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="voucher" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="总数量/克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="mainNumber" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
		</u-row>

		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="总次要数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondaryNumber" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="状态" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="status" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
		</u-row>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" class="desc-text-edit" text="过账日期" size=13></u--text>
			</view>
			<uni-datetime-picker v-model="date" type="date" start="2021-3-20" end="2099-6-20" />
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="备注" size=13></u--text>
			</view>
			<textarea placeholder="输入备注信息"
				style="width: 100%;margin-top: 5px;background-color: aliceblue;font-size: 13px;" v-model="remarks"
				maxlength="-1"></textarea>
		</div>

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
		<u-modal :show="show" title="提示" :showCancelButton="true" @confirm="commit" @cancel="close" :asyncClose="true">
			<text>本次过账时是否自动产生901上架单</text>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber: "", //分配号
				voucher: "", //凭证
				mainNumber: "", //总数量
				secondaryNumber: "", //总次要数量
				remarks: "", //备注
				status: "", //状态
				date: "", //过账日期
				show: false, //弹出模态窗
				data: "",
			}
		},
		mounted() {
			this.date = this.$dateTrans.getDateString();
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
					"interface_num": "MOBSCMD0020",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": {
						"materialDecStatus": "3",
						"codeNumber": this.codeNumber
					},
				};
				this.$http.httpRequest(opts, param).then((res) => {
					console.log("============res:", res);
					uni.hideLoading();
					if (res.statusCode === 200) {

						this.data = res.data;
						this.voucher = res.data.materialDecCode;
						this.mainNumber = res.data.totalQuality;
						this.secondaryNumber = res.data.totalSubQualityPiece;
						this.remarks = res.data.remarks;
						switch (res.data.materialDecStatus) {
							case "1":
								this.status = "新建状态";
								break;
							case "2":
								this.status = "已入库过账";
								break;
							case "3":
								this.status = "待交接";
								break;
							case "4":
								this.status = "待上架";
								break;
							case "5":
								this.status = "已冲销";
								break;

							default:
								this.status = res.data.materialDecStatus;
						}


					} else {
						this.$toast.showToast("获取数据失败，请重试");
					}
				});
			},
			confirm() {
				this.show = true;
			},
			close() {
				this.data.preOpt = "0";
				this.commitData();
			},
			commit() {
				this.data.preOpt = "1";
				this.commitData();
			},
			commitData(){
				this.show = false;
				var opts = {
					url: ``,
					method: 'post'
				};
				uni.showLoading({
					title: '加载中...'
				});
				this.data.postingDate = this.date;
				this.data.remarks = this.remarks;
				var param = {
					"interface_num": "MOBSCMD0021",
					"serial_no": "123456789",
					"access_token": "abc",
					"bus_data": this.data,
				};
				this.$http.httpRequest(opts, param).then((res) => {
					uni.hideLoading();
					console.log("****************res:", res);
					if (res.statusCode === 200) {
						this.$toast.showToast("提交成功");
					} else {
						this.$toast.showToast("提交失败");
					}
				});
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
