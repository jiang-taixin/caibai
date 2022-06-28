<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="配货单" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="codeNumber" placeholder="扫描或输入配货单" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" @click="startScan" style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="search" @click="startSearch" style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
			</u-row>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="P/S/W" size=13></u--text>
			</view>
			<u-row justify="space-between" gutter="1">
				<u-col span="4">
					<u--input font-size=13 v-model="department" border="surround" disabled=true>
					</u--input>
				</u-col>
				<u-col span="4">
					<u--input font-size=13 v-model="warehouse" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="4">
					<u--input font-size=13 v-model="number" border="surround" disabled=true>
					</u--input>
				</u-col>
			</u-row>
		</div>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="推荐仓位" size=13></u--text>
			</view>
			<u-row>
				<u-col span="6">
					<u--input font-size=13 v-model="recommend" placeholder="" border="surround" disabled=true>
					</u--input>
				</u-col>
				<u-col span="6">
					<u--input font-size=13 v-model="steps" placeholder="" border="surround" disabled=true>
					</u--input>
				</u-col>
			</u-row>
		</div>
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
						<u--text type="primary" text="名称" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="name" border="surround" disabled=true>
					</u--input>
				</div>

			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="分配数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="distributeNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="SOU" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="SOU" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="合计数量" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="totalNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="扫码输入" size=13></u--text>
					</view>
					<!-- <u--input font-size=13 v-model="inputNum" border="surround" @blur="blured" @change="change" clearable>
					</u--input> 
					u-input控件有问题 blur取不到值-->
					<uni-easyinput v-model="inputNum" placeholder="扫码输入" @blur="blur">
					</uni-easyinput>
				</div>

			</u-col>
		</u-row>

		<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">标签名称</uni-th>
				<uni-th align="left">仓位</uni-th>
				<uni-th align="left">数量/克重</uni-th>
				<uni-th align="center">商品条码</uni-th>
				<uni-th align="center">商品包码</uni-th>
				<uni-th align="left">次要数量</uni-th>
				<uni-th align="left">物料名称</uni-th>
				<uni-th align="left">款号</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
				<uni-td>{{item.tagName}}</uni-td>
				<uni-td>{{item.location}}</uni-td>
				<uni-td>{{item.mainNum}}</uni-td>
				<uni-td>{{item.barCode}}</uni-td>
				<uni-td>{{item.packageCode}}</uni-td>
				<uni-td>{{item.secondaryNum}}</uni-td>
				<uni-td>{{item.materialName}}</uni-td>
				<uni-td>{{item.modelNum}}</uni-td>
			</uni-tr>
		</uni-table>

		<div style="position: fixed;bottom: 0px;width: 100%;background-color:aquamarine;">
			<u-row>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="commit" text="确认" style="width: 80%;margin-left: 10%;">
						</u-button>
					</div>
				</u-col>
				<u-col span="6">
					<div class="col-layout">
						<u-button type="primary" @click="toDamage" text="暂存" style="width: 80%;margin-left: 10%;">
						</u-button>
					</div>
				</u-col>
			</u-row>
		</div>
		<u-popup :show="showEditPage" mode="bottom" @close="close">
			<view>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">标签名称:</text>
					</view>
					<view style="float:left;width: 220px;">
						<!--u--text改text u--text在微信小程序中v-text无效-->
						<text v-text="tableData[selectedIndex].tagName" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">商品条码:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData[selectedIndex].barCode" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">商品包码:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData[selectedIndex].packageCode" style="font-size: 13px;" />
					</view>

				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">仓位:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData[selectedIndex].location" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">物料名称:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData[selectedIndex].materialName" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">款号:</text>
					</view>
					<view style="float:left;width: 220px;">
						<text v-text="tableData[selectedIndex].modelNum" style="font-size: 13px;" />
					</view>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">数量/克重:</text>
					</view>
					<u--input font-size=13 v-model="mainNum" border="surround" clearable>
					</u--input>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">次要数量:</text>
					</view>
					<u--input font-size=13 v-model="secondaryNum" border="surround" clearable>
					</u--input>
				</div>
				<div style="width: 100%;display:inline-block">
					<view style="float:left;width: 70px;">
						<text style="font-size: 13px;">备注:</text>
					</view>
					<u--input font-size=13 v-model="remarks" border="surround" clearable>
					</u--input>
				</div>

				<u-row>
					<u-col span="4">
						<div class="col-layout">
							<u-button type="primary" @click="confirmEdit" text="确认"
								style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
						</div>
					</u-col>
					<u-col span="4">
						<div class="col-layout">
							<u-button type="warning" @click="cancelEdit" text="取消"
								style="width: 80%;margin-left: 10%;margin-bottom: 10px;">
							</u-button>
						</div>
					</u-col>
					<u-col span="4">
						<div class="col-layout">
							<u-button type="error" @click="deleteItem" text="删除"
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
				codeNumber: "", //条形码或二维码
				department: "", //传入的发货部门
				warehouse: "", //传入的发货库位
				number: "", //
				recommend: "", //推荐库位
				steps: "", //进度步数
				modelNum: "", //款号
				name: "", //名称
				distributeNum: "", //分配数量
				SOU: "", //SOU
				totalNum: "", //合计数量
				inputNum: "", //扫码输入号码
				tableData: [{
						tagName: "tag1",
						barCode: "1111111111111111111111",
						packageCode: "PACK123434556665555",
						mainNum: "120",
						secondaryNum: "100",
						location: "ABV1111",
						modelNum: "KUAN111",
						materialName: "物料111",
						remarks: "备注信息1，备注信息",
					},
					{
						tagName: "tag123",
						barCode: "33212111111111111111",
						packageCode: "PACK1232332226665555",
						mainNum: "10",
						secondaryNum: "80",
						location: "ABV2222",
						modelNum: "KUAN222",
						materialName: "物料222",
						remarks: "备注信息2，备注信息",
					},
					{
						tagName: "tag3",
						barCode: "33333333333333333333",
						packageCode: "PACK444444444444444444444",
						mainNum: "110",
						secondaryNum: "90",
						location: "ABV3333",
						modelNum: "KUAN333",
						materialName: "物料333",
						remarks: "备注信息3，备注信息",
					}
				],
				showEditPage: false, //是否显示编辑页面
				selectedIndex: 0, //当前选中的数据行
				mainNum: "", //数量、克重    用于当前行的信息编辑
				secondaryNum: "", //次要数量    用于当前行的信息编辑
				remarks: "", //备注   用于当前行的信息编辑
			}
		},
		onNavigationBarButtonTap(val) {
			console.log("------- click nav button:", val);
			if (val.index === 0) {
				console.log("下一步");
			} else {
				console.log("上一步");
			}
		},
		onLoad: function(option) {
			//获取url中传入的参数
			console.log(option.date);
		},
		methods: {
			rowClick(item, index) {
				console.log("*******************:", item);
				this.selectedIndex = index;

				this.showEditPage = true;
				//
				this.mainNum = this.tableData[this.selectedIndex].mainNum;
				this.secondaryNum = this.tableData[this.selectedIndex].secondaryNum;
				this.remarks = this.tableData[this.selectedIndex].remarks;
			},
			close() {
				this.showEditPage = false;
			},
			confirmEdit() {
				this.tableData[this.selectedIndex].mainNum = this.mainNum;
				this.tableData[this.selectedIndex].secondaryNum = this.secondaryNum;
				this.tableData[this.selectedIndex].remarks = this.remarks;

				this.showEditPage = false;
			},
			cancelEdit() {
				this.showEditPage = false;
			},
			deleteItem() {
				this.tableData.splice(this.selectedIndex, 1);
				this.showEditPage = false;
			},
			blur(e) {
				//扫码结束获取信息并更新进列表
				console.log("blur :", e.target.value);
			}
		}
	}
</script>

<style>

</style>
