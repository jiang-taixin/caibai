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
					<view class="desc-text">
						<u--text type="primary" text="部门" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="department" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
		</u-row>
		
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<view class="desc-text">
						<u--text type="primary" text="证章号/工号" size=13></u--text>
					</view>
					<u--input font-size=13 v-model="employeeNumber" border="surround" :disabled="true">
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				
			</u-col>
		</u-row>
		
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" class="desc-text-edit" text="日期" size=13></u--text>
			</view>
			<uni-datetime-picker v-model="date" type="date" :value="single" start="2021-3-20" end="2099-6-20"
				@change="changeDate" />
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="移动原因" size=13></u--text>
			</view>
			<uni-data-select v-model="launchWarehouse" :localdata="warehouse" @change="changeWarehouse">
			</uni-data-select>
		</div>
		
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="库位-到" size=13></u--text>
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
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<view class="desc-text-edit">
						<u--text type="primary" text="仓位-到" size=13></u--text>
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
					<uni-th align="center">库位-从</uni-th>
					<uni-th align="center">仓位-从</uni-th>
					<uni-th align="center">标签名称</uni-th>
					<uni-th align="center">商品条码</uni-th>
					<uni-th align="center">数量/克重</uni-th>
					<uni-th align="center">次要数量</uni-th>
					<uni-th align="center">物料名称</uni-th>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
