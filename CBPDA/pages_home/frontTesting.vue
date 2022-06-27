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
			<u--input font-size=13 v-model="supplier" border="surround" disabled=true>
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

					<u--input font-size=13 border="surround" type="number" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="出货克重" size=13></u--text>
					</view>
					<u--input font-size=13 border="surround" disabled=true>
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
					<u--input font-size=13 border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="质检克重" size=13></u--text>
					</view>
					<u--input font-size=13 border="surround" disabled=true>
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
					<u--input font-size=13 v-model="qualifiedNum" border="surround" clearable>
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
						<u-button type="primary" @click="commit" text="提交"
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeNumber: "", //条形码或二维码
				qualityInspector: "26314", //质检人
				damageNum: "10", //有损件数
				undamagedNum: "5", //无损件数
				supplier: "supplier1", //供应商
				modelNum: "model12345", //款号
				purchaseNum: "100", //采购件数
				material: "贵金属", //贵金属材质
				total: 0, //不合格总计
				selectCategory: "", //质检类别
				qualifiedNum: "", //合格件数
				qualifiedWeight: "", //合格克重
				tableData: [],
				reason: [],
				category:[],
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
				this.$refs.uToast.success(`search with ${this.codeNumber}`)
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
							this.$refs.uToast.error(`扫码失败，请重试`);
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
