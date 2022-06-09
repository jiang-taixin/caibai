<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<u--text type="primary" class="desc-text-edit" text="配货单"></u--text>
					<u--input v-model="codeNumber" placeholder="扫描或输入配货单" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="1">
					<view>
						<u-button type="primary" :plain="true" icon="scan" style="width: 30px;height: 30px;"
							@click="startScan"></u-button>
					</view>
				</u-col>
				<u-col span="1">
					<view>
						<u-button type="primary" :plain="true" icon="search" style="width: 30px;height: 30px;"
							@click="startSearch"></u-button>
					</view>
				</u-col>
			</u-row>
		</div>
		<div class="divContainer">
			<u--text type="primary" class="desc-text-edit" text="P/S/W"></u--text>
			<u-row justify="space-between" gutter="1">
				<u-col span="4">
					<u--input v-model="department" border="surround" disabled=true>
					</u--input>
				</u-col>
				<u-col span="4">
					<u--input v-model="warehouse" border="surround" clearable>
					</u--input>
				</u-col>
				<u-col span="4">
					<u--input v-model="number" border="surround" disabled=true>
					</u--input>
				</u-col>
			</u-row>
		</div>
		<div class="divContainer">
			<u--text type="primary" class="desc-text" text="推荐仓位"></u--text>
			<u-row>
				<u-col span="6">
					<u--input v-model="recommend" placeholder="" border="surround" disabled=true>
					</u--input>
				</u-col>
				<u-col span="6">
					<u--input v-model="steps" placeholder="" border="surround" disabled=true>
					</u--input>
				</u-col>
			</u-row>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<u--text type="primary" class="desc-text" text="款号"></u--text>
					<u--input v-model="modelNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<u--text type="primary" class="desc-text" text="名称"></u--text>
					<u--input v-model="name" border="surround" disabled=true>
					</u--input>
				</div>

			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<u--text type="primary" class="desc-text" text="分配数量"></u--text>
					<u--input v-model="distributeNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<u--text type="primary" class="desc-text" text="SOU"></u--text>
					<u--input v-model="SOU" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
		</u-row>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<u--text type="primary" class="desc-text" text="合计数量"></u--text>
					<u--input v-model="totalNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<u--text type="primary" class="desc-text-edit" text="扫码输入"></u--text>
					<u--input v-model="inputNum" border="surround" clearable>
					</u--input>
				</div>

			</u-col>
		</u-row>
		<uni-list class="custom-list">
			<uni-list-item clickable="true" style="font-size: 13px;" direction="column" v-for="(item, index) in tableData" @click="clickItem">
				<template v-slot:body>
					<div style="width: 100%;display:inline-block" >
						<u--text text="标签名称:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.tagName" size=13 style="float:left;width: 150px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="商品条码:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.barCode" size=13 style="float:left;width: 150px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="商品包码:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.packageCode" size=13 style="float:left;width: 150px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="数量/克重:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.mainNum" size=13 style="float:left;width: 150px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="次要数量:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.secondaryNum" size=13 style="float:left;width: 220px;background-color: blue;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="仓位:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.location" size=13 style="float:left;width: 200px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="物料名称:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.location" size=13 style="float:left;width: 200px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="款号:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.location" size=13 style="float:left;width: 200px;"></u--text>
					</div>
				</template>
			</uni-list-item>
		</uni-list>
		<u-button type="primary" @click="commit" text="提交"
			style="width: 80%;margin-left: 10%;margin-top: 30px;"></u-button>
		<u-toast ref="uToast" />
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
				tableData:[
					{tagName:"tag1",
					barCode:"1111111111111111111111",
					packageCode:"PACK123434556665555",
					mainNum:"120/50",
					secondaryNum:"100",
					location:"ABV1111"
					},
					{tagName:"tag123",
					barCode:"33212111111111111111",
					packageCode:"PACK1232332226665555",
					mainNum:"10/50",
					secondaryNum:"80",
					location:"ABV2222"
					},
					{tagName:"tag3",
					barCode:"33333333333333333333",
					packageCode:"PACK444444444444444444444",
					mainNum:"110/80",
					secondaryNum:"90",
					location:"ABV3333"
					}
				],
			}
		},
		onLoad: function(option) {
			//获取url中传入的参数
			console.log(option.date);
		},
		methods: {
			clickItem(e){
				console.log("click item :",e);
			},
		}
	}
</script>

<style>

</style>
