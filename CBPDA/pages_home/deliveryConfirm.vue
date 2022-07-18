<template>
	<view>
		<view class="tabs">
			<view class="tab_item" :class="{cur:index === tabCur}" v-for="(item, index) in ['装箱配送确认模式', '自取确认模式']"
				:key="index" @click="tabSelect(index)">{{ item }}</view>
		</view>
		<view v-if="tabCur === 0">
			<div class="divContainer">
				<view class="desc-text-edit">
					<u--text type="primary" text="配送交接人" size=13></u--text>
				</view>
				<uni-data-select v-model="selectDepartment" :localdata="department" @change="changeDepartment">
				</uni-data-select>
			</div>
			<div class="divContainer">
				<view class="desc-text-edit">
					<u--text type="primary" text="箱子" size=13></u--text>
				</view>
				<uni-data-select v-model="selectDepartment" :localdata="department" @change="changeDepartment">
				</uni-data-select>
			</div>
			<div class="divContainer">
				<view class="desc-text-edit">
					<u--text type="primary" text="状态" size=13></u--text>
				</view>
				<u--input font-size=13 v-model="employeeNumber" border="surround" clearable>
				</u--input>
			</div>
			
			<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">箱子</uni-th>
					<uni-th align="center">配送交接人</uni-th>
					<uni-th align="center">装箱单</uni-th>
					<uni-th align="center">状态</uni-th>
					<uni-th align="center">装箱单类型</uni-th>
					<uni-th align="center">主门店</uni-th>
					<uni-th align="left">日期</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
					<uni-td>{{item.tagName}}</uni-td>
					<uni-td>{{item.position}}</uni-td>
					<uni-td>{{item.qualityPiece}}</uni-td>
					<uni-td>{{item.sou}}</uni-td>
					<uni-td>{{item.barCode}}</uni-td>
					<uni-td>{{item.packageCode}}</uni-td>
					<uni-td>{{item.materielCode}}</uni-td>
				</uni-tr>
			</uni-table>
			
		</view>
		<view v-else>
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
			
			<uni-table border stripe emptyText="暂无更多数据" class="custom-list">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">箱子</uni-th>
					<uni-th align="center">配送交接人</uni-th>
					<uni-th align="center">装箱单</uni-th>
					<uni-th align="center">状态</uni-th>
					<uni-th align="center">装箱单类型</uni-th>
					<uni-th align="center">主门店</uni-th>
					<uni-th align="left">日期</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in tableData" @row-click="rowClick(item,index)">
					<uni-td>{{item.tagName}}</uni-td>
					<uni-td>{{item.position}}</uni-td>
					<uni-td>{{item.qualityPiece}}</uni-td>
					<uni-td>{{item.sou}}</uni-td>
					<uni-td>{{item.barCode}}</uni-td>
					<uni-td>{{item.packageCode}}</uni-td>
					<uni-td>{{item.materielCode}}</uni-td>
				</uni-tr>
			</uni-table>

		</view>
		<view style="margin-top: 30px;">
			<u-row style="margin-top: 50px;">
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
				tabCur: 0
			}
		},
		methods: {
			tabSelect(index) {
				console.log("*******************", index);
				if (this.tabCur === index) return;
				this.tabCur = index
			}

		}
	}
</script>

<style lang="scss">
	.tabs {
		display: flex;
		justify-content: space-evenly;
		font-size: 32rpx;
		background-color: #FFF;
		color: #A9A9A9;
	}

	.tab_item {
		height: 114rpx;
		line-height: 100rpx;

		&.cur {
			position: relative;
			color: #F62D5C;

			&::after {
				content: '';
				width: 36rpx;
				height: 6rpx;
				position: absolute;
				bottom: 20rpx;
				left: 50%;
				margin-left: -18rpx;
				background-color: #F62D5C;
			}
		}
	}
</style>
