<template>
	<view>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="装箱单号" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="SOU" border="surround" :disabled="true">
			</u--input>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="装箱单类型" size=13></u--text>
			</view>
			<uni-data-select v-model="launchWarehouse" :localdata="warehouse" @change="changeWarehouse">
			</uni-data-select>
		</div>

		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="部门" size=13></u--text>
			</view>
			<uni-data-select v-model="launchWarehouse" :localdata="warehouse" @change="changeWarehouse">
			</uni-data-select>
		</div>

		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="箱子" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="warehousePosition" placeholder="请扫码" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view style="width: 30px;height: 30px;">
						<u-button type="primary" :plain="true" icon="scan" @click="startScanWarehouse"
							style="width: 30px;height: 30px;"></u-button>
					</view>
				</u-col>
				<u-col span="1">

				</u-col>
			</u-row>
		</div>

		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="主门店" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="SOU" border="surround">
			</u--input>
		</div>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="证章号/工号" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="SOU" border="surround" :disabled="true">
			</u--input>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" class="desc-text-edit" text="日期" size=13></u--text>
			</view>
			<uni-datetime-picker v-model="date" type="date" :value="single" start="2021-3-20" end="2099-6-20"
				@change="changeDate" />
		</div>

		<view style="margin-top: 30px;">
			<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">序号</uni-th>
					<uni-th align="center">配货单号</uni-th>
					<uni-th align="center">收货门店</uni-th>
					<uni-th align="center">专柜</uni-th>
					<uni-th align="center">总件数</uni-th>
					<uni-th align="center">品种一级</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
					<uni-td>{{index}}</uni-td>
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
				<u-col span="4">
					<div class="col-layout">
						<u-button type="primary" @click="confirmEdit" text="保存"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;"></u-button>
					</div>
				</u-col>
				<u-col span="4">
					<div class="col-layout">
						<u-button type="warning" @click="cancelEdit" text="装箱完成"
							style="width: 80%;margin-left: 10%;margin-bottom: 10px;">
						</u-button>
					</div>
				</u-col>
				<u-col span="4">
					<div class="col-layout">
						<u-button type="error" @click="deleteItem" text="取消"
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

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
