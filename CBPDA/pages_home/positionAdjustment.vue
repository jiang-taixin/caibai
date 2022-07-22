<template>
	<view>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="类型" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="type" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="部门" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="department" border="surround">
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="库位" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="storagePosition" border="surround">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="证章号/工号" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="employeeNumber" border="surround">
					</u--input>
				</div>
			</u-col>
		</u-row>
		
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" text="移动原因" size=13></u--text>
					</view>
					<uni-data-select v-model="moveReason" :localdata="reason" @change="changeReason">
					</uni-data-select>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text-edit">
						<u--text type="primary" class="desc-text-edit" text="日期" size=13></u--text>
					</view>
					<uni-datetime-picker v-model="date" type="date" :value="single" start="2021-3-20" end="2099-6-20"
						@change="changeDate" />
				</div>
			</u-col>
		</u-row>
		
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="仓位-到" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="toPosition" placeholder="请扫码" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" @click="startScanPosition"
							style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
				<u-col span="1">
					
				</u-col>
			</u-row>
		</div>
		
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="分配号/条形码/包码" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="codeNumber" placeholder="请扫码或输入" border="surround" clearable>
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
		
		<view style="margin-top: 30px;">
			<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">仓位</uni-th>
					<uni-th align="center">标签名称</uni-th>
					<uni-th align="center">款号</uni-th>
					<uni-th align="center">商品条码</uni-th>
					<uni-th align="center">数量/克重</uni-th>
					<uni-th align="center">次要数量</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
					<uni-td>{{item.tagName}}</uni-td>
					<uni-td>{{item.location}}</uni-td>
					<uni-td>{{item.mainNum}}</uni-td>
					<uni-td>{{item.barCode}}</uni-td>
					<uni-td>{{item.packageCode}}</uni-td>
					<uni-td>{{item.packageCode}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		
		<view style="margin-top: 30px;">
			<u-row>
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
		
		<u-popup :show="showEditPage" mode="bottom" @close="close">
			<view>
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
				type:"",       //类型
				department:"",  //部门
				
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
				remarks: "", //备注   用于当前行的信息编辑
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
