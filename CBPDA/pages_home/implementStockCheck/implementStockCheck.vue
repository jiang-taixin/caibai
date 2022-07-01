<template>
	<view>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" class="desc-text" text="盘点单号" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="checkCode" border="surround" disabled=true>
			</u--input>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" class="desc-text-edit" text="日期" size=13></u--text>
			</view>
			<uni-datetime-picker v-model="date" type="date" :value="single" start="2021-3-20" end="2099-6-20"
				@change="changeDate" />
		</div>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" class="desc-text" text="盘点库位" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="checkWarehousePosition" border="surround" disabled=true>
			</u--input>
		</div>

		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="4">
					<view>
						<checkbox-group @change="selectRecheck">
							<label>
								<checkbox value="cb" color="#000000" style="transform:scale(0.7)" />重复盘
							</label>
						</checkbox-group>
					</view>
				</u-col>
				<u-col span="4">
					<div class="col-layout">
						<u-button type="primary" :plain="true" @click="clear" text="小计清零"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;">
						</u-button>
					</div>
				</u-col>
				<u-col span="4">
					<div class="col-layout">
						<u-button type="primary" :plain="true" @click="confirm" text="确认"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;">
						</u-button>
					</div>
				</u-col>
			</u-row>
		</div>

		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="10">
					<view class="desc-text-edit">
						<u--text type="primary" text="条码/包码/分配号" size=13></u--text>
					</view>
					<u--input ref="input" font-size=13 v-model="barCode" placeholder="请扫码" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" @click="startScan"
							style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
			</u-row>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="数量/克重" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="number_weight" border="surround" type="number"
						@blur="qualifiedBlur">
					</u--input>

				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="次要数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondaryNumber" border="surround" clearable>
					</u--input>
				</div>
			</u-col>
		</u-row>

		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="小计" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="subtotal" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="小计次要数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondary_subtotal" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>

		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="累计数" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="grandtotal" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="累计次要数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="secondary_grandtotal" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>


		<view style="margin-top: 30px;">
			<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">款号</uni-th>
					<uni-th align="center">商品条码</uni-th>
					<uni-th align="center">标签名称/款式描述</uni-th>
					<uni-th align="center">账面数量/克重</uni-th>
					<uni-th align="center">账面数量</uni-th>
					<uni-th align="center">实际数量/克重</uni-th>
					<uni-th align="center">实际数量</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
					<uni-td>{{item.tagName}}</uni-td>
					<uni-td>{{item.location}}</uni-td>
					<uni-td>{{item.mainNum}}</uni-td>
					<uni-td>{{item.barCode}}</uni-td>
					<uni-td>{{item.packageCode}}</uni-td>
					<uni-td>{{item.packageCode}}</uni-td>
					<uni-td>{{item.packageCode}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkCode: "", //盘点单号
				date: "",
				checkWarehousePosition: "", //盘点库位
				barCode: "", //包码、条码
				number_weight: "", //数量、克重
				secondaryNumber: "", //次要数量
				subtotal: "", //小计
				secondary_subtotal: "", //小计次要数量
				grandtotal: "", //累计数
				secondary_grandtotal: "", //累计次要数量
				isRecheck: false,

			}
		},
		methods: {
			clear() {
				
				this.$nextTick(()=>{ 
					console.log("******************:",this.$refs.input.focus);
					this.$refs.input.focus = true;
				});
			},
			confirm() {

			},
			startScan() {
				let vm = this;
				uni.scanCode({
					success: function(res) {
						if (res.errMsg == "scanCode:ok") {
							vm.$nextTick(() => {
								vm.barCode = res.result;
							});
						} else {
							this.$toast.showToast("扫码失败，请重试");
						}

					}
				});
			},
			selectRecheck() {
				this.isRecheck = !this.isRecheck;
			},
		}
	}
</script>

<style>

</style>
