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
				<u--text type="primary" text="送检单号" size=13></u--text>
			</view>

			<u--input font-size=13 v-model="inspectionNumber" border="surround" disabled=true>
			</u--input>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="质检人" size=13></u--text>
					</view>

					<u--input font-size=13 v-model="modelNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="送检单类型" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="inspectionType" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="送检时间" size=13></u--text>
					</view>

					<u--input font-size=13 v-model="inspectionTime" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="送检机构" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="inspectionAngecy" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>

		<uni-table ref="table" border stripe emptyText="暂无更多数据" class="custom-list" type="selection"
			@selection-change="selectionChange">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">序号</uni-th>
				<uni-th align="center">采购订单号</uni-th>
				<uni-th align="center">订单行项目号</uni-th>
				<uni-th align="center">商品编号</uni-th>
				<uni-th align="center">商品描述</uni-th>
				<uni-th align="center">包码</uni-th>
				<uni-th align="center">订单数量</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData">
				<uni-td>{{index}}</uni-td>
				<uni-td>{{item.orderCode}}</uni-td>
				<uni-td>{{item.itemNum}}</uni-td>
				<uni-td>{{item.productCode}}</uni-td>
				<uni-td>{{item.productDesc}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.orderNum}}</uni-td>
			</uni-tr>
		</uni-table>

		<view style="width: 80%;margin-left: 10%;margin-top: 30px;">
			<u-button type="primary" @click="exportData" text="导出数据">
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
				inspectionNumber: "", //送检单号
				inspectionType: "", //送检单类型
				inspectionTime: "", //送检时间
				selectAngecy: "", //送检时间
				inspectionAngecy: "", //送检机构
				tableData: [{
					orderCode: "YHD1110000",
					itemNum: "001",
					productCode: "P109",
					productDesc: "product description",
					packageCode: "PAC123",
					orderNum: 12
				}, {
					orderCode: "YHD11100002",
					itemNum: "002",
					productCode: "P102",
					productDesc: "product description",
					packageCode: "PAC122",
					orderNum: 11
				}, {
					orderCode: "YHD11100003",
					itemNum: "003",
					productCode: "P103",
					productDesc: "product descriptionproduct descriptionproduct descriptionproduct descriptionproduct descriptionproduct description",
					packageCode: "PAC120",
					orderNum: 10
				}],
			}
		},
		methods: {
			startSearch() {
				
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
			changeAngecy(e) {
				this.selectAngecy = e;
			},
			changeDate(e) {
				this.inspectionTime = e;
				console.log("change date :", this.inspectionTime);
			},
			exportData() {
				// 列标题
				let str =
					'<tr><td bgcolor="gray">采购订单号</td><td bgcolor="gray">订单行项目号</td><td bgcolor="gray">商品编号</td><td bgcolor="gray">商品描述</td><td bgcolor="gray">包码</td><td bgcolor="gray">订单数量</td></tr>'
				// 循环遍历，每行加入tr标签，每个单元格加td标签
				for (let i = 0; i < this.tableData.length; i++) {
					str += '<tr>'
					for (let item in this.tableData[i]) {
						str += `<td>${this.tableData[i][item] + '\t'}</td>`
					}
					str += '</tr>'
				}
				let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
				        xmlns:x="urn:schemas-microsoft-com:office:excel" 
				        xmlns="http://www.w3.org/TR/REC-html40">
						<body>
						<h4>送检单明细信息</h4>
						<table border="1" width="100%" cellspacing="0"">${str}</table>
						<br><br>
						<hr/>
						<font color="red">不要基于此邮件进行回复</font>
						</body>
						</html>`

				wx.cloud.callFunction({
					name: "sendEmail",
					//发送邮件需要的信息
					data: {
						_recipients: "taixin.jiang@accenture.com", //收件人
						_html: template,
					},
					success(res) {
						console.log("发送成功", res)
					},
					fail(res) {
						console.log("发送失败", res)
					}
				})
			}
		}
	}
</script>

<style>

</style>
