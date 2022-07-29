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

			<u--input font-size=13 v-model="qualityInspector" border="surround" :disabled="true">
			</u--input>
		</div>
		
		

		<uni-table ref="table" border stripe emptyText="暂无更多数据" class="custom-list" type="selection"
			@selection-change="selectionChange">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">序号</uni-th>
				<uni-th align="center">取检状态</uni-th>
				<uni-th align="center">检测编号</uni-th>
				<uni-th align="center">名称</uni-th>
				<uni-th align="center">标称含量</uni-th>
				<uni-th align="center">成色编码</uni-th>
				<uni-th align="center">克重(总质量)</uni-th>
				<uni-th align="center">长度</uni-th>
				<uni-th align="center">指圈号</uni-th>
				<uni-th align="center">配件</uni-th>
				<uni-th align="center">非金属标识</uni-th>
				<uni-th align="center">包条码</uni-th>
				<uni-th align="center">条形码</uni-th>
				<uni-th align="center">批次号</uni-th>
				<uni-th align="center">订单号</uni-th>
				<uni-th align="center">供货单位</uni-th>
				<uni-th align="center">供货商编码</uni-th>
				<uni-th align="center">款式条码</uni-th>
				<uni-th align="center">备注</uni-th>
				<uni-th align="center">标称金重</uni-th>
				<uni-th align="center">件附加费值</uni-th>
				<uni-th align="center">辅助编号</uni-th>
				<uni-th align="center">参考零售价</uni-th>
				<uni-th align="center">圈口号</uni-th>
				<uni-th align="center">检测结算供方</uni-th>
				<uni-th align="center">证书结算单位</uni-th>
				<uni-th align="center">检测费</uni-th>
				<uni-th align="center">送检日期</uni-th>
				<uni-th align="center">出货汇总单号</uni-th>
				<uni-th align="center">SOU号</uni-th>
				<uni-th align="center">送检机构</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData">
				<uni-td>{{index+1}}</uni-td>
				<uni-td>{{item.status}}</uni-td>
				<uni-td>{{item.itemNum}}</uni-td>
				<uni-td>{{item.productCode}}</uni-td>
				<uni-td>{{item.productDesc}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.orderNum}}</uni-td>
				<uni-td>{{item.orderCode}}</uni-td>
				<uni-td>{{item.itemNum}}</uni-td>
				<uni-td>{{item.productCode}}</uni-td>
				<uni-td>{{item.productDesc}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.orderNum}}</uni-td>
				<uni-td>{{item.orderCode}}</uni-td>
				<uni-td>{{item.itemNum}}</uni-td>
				<uni-td>{{item.productCode}}</uni-td>
				<uni-td>{{item.productDesc}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.orderNum}}</uni-td>
				<uni-td>{{item.orderCode}}</uni-td>
				<uni-td>{{item.itemNum}}</uni-td>
				<uni-td>{{item.productCode}}</uni-td>
				<uni-td>{{item.productDesc}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.orderNum}}</uni-td>
				<uni-td>{{item.orderCode}}</uni-td>
				<uni-td>{{item.itemNum}}</uni-td>
				<uni-td>{{item.productCode}}</uni-td>
				<uni-td>{{item.productDesc}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.orderNum}}</uni-td>
			</uni-tr>
		</uni-table>

		<view style="width: 80%;margin-left: 10%;margin-top: 30px;">
			<u-button type="primary" @click="confirm" text="取检确认">
			</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber: "", //出货汇总单单号
				qualityInspector: "", //质检人
				tableData: [{
					status:"",
					orderCode: "YHD1110000",
					itemNum: "001",
					productCode: "P109",
					productDesc: "product description",
					packageCode: "PAC123",
					orderNum: 12
				}, {
					status:"",
					orderCode: "YHD11100002",
					itemNum: "002",
					productCode: "P102",
					productDesc: "product description",
					packageCode: "PAC122",
					orderNum: 11
				}, {
					status:"",
					orderCode: "YHD11100003",
					itemNum: "003",
					productCode: "P103",
					productDesc: "product description",
					packageCode: "PAC120",
					orderNum: 10
				}],
				selectedList:[],
			}
		},
		mounted() {
			var userinfo = this.$userInfo.getUserInfo();
			this.qualityInspector = userinfo.username;
		},
		methods: {
			startSearch() {
				for (let i in this.tableData) {
						this.$refs.table.toggleRowSelection(parseInt(i), true);
				}
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
			selectionChange(res) {
				this.selectedList = res.detail.index;
				console.log("==============select list:",this.selectedList);
			},
			confirm() {
				this.selectedList.forEach(element => {
					this.tableData[element].status = "已取检";
				});
			}
		}
	}
</script>

<style>

</style>
