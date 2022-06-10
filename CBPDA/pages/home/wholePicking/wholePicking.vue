<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<u--text type="primary" class="desc-text-edit" text="配货单" size=13></u--text>
					<u--input font-size=13 v-model="codeNumber" placeholder="扫描或输入配货单" border="surround" clearable>
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
			<u--text type="primary" class="desc-text-edit" text="P/S/W" size=13></u--text>
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
			<u--text type="primary" class="desc-text" text="计划总数" size=13></u--text>
			<u--input font-size=13 v-model="total" placeholder="" border="surround" disabled=true>
			</u--input>
		</div>
		<u-row>
			<u-col span="6">
				<div class="col-layout">
					<u--text type="primary" class="desc-text" text="合计数量" size=13></u--text>
					<u--input font-size=13 v-model="totalNum" border="surround" disabled=true>
					</u--input>
				</div>
			</u-col>
			<u-col span="6">
				<div class="col-layout">
					<u--text type="primary" class="desc-text-edit" text="扫码输入" size=13></u--text>
					<!-- <u--input font-size=13 v-model="inputNum" border="surround" @blur="blured" @change="change" clearable>
					</u--input> 
					u-input控件有问题 blur取不到值-->
					<uni-easyinput v-model="inputNum" placeholder="扫码输入" @blur="blur">
					</uni-easyinput>
				</div>

			</u-col>
		</u-row>
		<uni-list class="custom-list">
			<uni-list-item clickable="true" style="font-size: 13px;" direction="column" v-for="(item, index) in tableData" @click="clickItem(index)">
				<template v-slot:body>
					<div style="width: 100%;display:inline-block" >
						<u--text text="SOU:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.SOU" size=13 style="float:left;width: 200px;"></u--text>
						<uni-tag :circle="true" :inverted="true" :text="`${index + 1}`" type="success" size="mini"/>
					</div>
					
					<div style="width: 100%;display:inline-block" >
						<u--text text="商品条码:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.barCode" size=13 style="float:left;width: 220px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="商品包码:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.packageCode" size=13 style="float:left;width: 220px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="标签名称:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.tagName" size=13 style="float:left;width: 220px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="仓位:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.location" size=13 style="float:left;width: 220px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="数量:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.mainNum" size=13 style="float:left;width: 220px;"></u--text>
					</div>
					<div style="width: 100%;display:inline-block" >
						<u--text text="款号:" size=13 style="float:left;width: 70px;"></u--text>
						<u--text v-text="item.location" size=13 style="float:left;width: 220px;"></u--text>
					</div>
				</template>
			</uni-list-item>
		</uni-list>
		<div style="position: fixed;bottom: 0px;width: 100%;background-color:aquamarine;">
			<u-row >
				<u-col span="4">
					<div class="col-layout">
						<u-button type="primary" @click="commit" text="确认"
							style="width: 80%;margin-left: 10%;"></u-button>
					</div>
				</u-col>
				<u-col span="4">
					<div class="col-layout">
						<u-button type="primary" @click="toDamage" text="暂存"
							style="width: 80%;margin-left: 10%;">
						</u-button>
					</div>
				</u-col>
				<u-col span="4">
					<div class="col-layout">
						<u-button type="primary" @click="toDamage" text="保存"
							style="width: 80%;margin-left: 10%;">
						</u-button>
					</div>
				</u-col>
			</u-row>
		</div>
		<u-toast ref="uToast" />
		<u-popup :show="showEditPage" mode="bottom"  @close="close">
		    <view>
				<div style="width: 100%;display:inline-block" >
					<u--text text="SOU:" size=13 style="float:left;width: 70px;"></u--text>
					<u--text v-text="tableData[selectedIndex].SOU" size=13 style="float:left;width: 220px;"></u--text>
				</div>
	            <div style="width: 100%;display:inline-block" >
	            	<u--text text="标签名称:" size=13 style="float:left;width: 70px;"></u--text>
	            	<u--text v-text="tableData[selectedIndex].tagName" size=13 style="float:left;width: 220px;"></u--text>
	            </div>
	            <div style="width: 100%;display:inline-block" >
	            	<u--text text="商品条码:" size=13 style="float:left;width: 70px;"></u--text>
	            	<u--text v-text="tableData[selectedIndex].barCode" size=13 style="float:left;width: 220px;"></u--text>
	            </div>
	            <div style="width: 100%;display:inline-block" >
	            	<u--text text="商品包码:" size=13 style="float:left;width: 70px;"></u--text>
	            	<u--text v-text="tableData[selectedIndex].packageCode" size=13 style="float:left;width: 220px;"></u--text>
	            </div>
				<div style="width: 100%;display:inline-block" >
					<u--text text="仓位:" size=13 style="float:left;width: 70px;"></u--text>
					<u--text v-text="tableData[selectedIndex].location" size=13 style="float:left;width: 220px;"></u--text>
				</div>
				<div style="width: 100%;display:inline-block" >
					<u--text text="物料名称:" size=13 style="float:left;width: 70px;"></u--text>
					<u--text v-text="tableData[selectedIndex].location" size=13 style="float:left;width: 220px;"></u--text>
				</div>
				<div style="width: 100%;display:inline-block" >
					<u--text text="款号:" size=13 style="float:left;width: 70px;"></u--text>
					<u--text v-text="tableData[selectedIndex].location" size=13 style="float:left;width: 220px;"></u--text>
				</div>
	            <div style="width: 100%;display:inline-block" >
	            	<u--text text="数量:" size=13 style="float:left;width: 70px;"></u--text>
					<u--input font-size=13 v-model="mainNum" border="surround" clearable>
					</u--input>
	            </div>
	            
	            <div style="width: 100%;display:inline-block" >
	            	<u--text text="备注:" size=13 style="float:left;width: 70px;"></u--text>
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
				total:"",     //计划总数
				totalNum: "", //合计数量
				inputNum: "", //扫码输入号码
				tableData:[
					{tagName:"tag1",
					barCode:"1111111111111111111111",
					packageCode:"PACK123434556665555",
					mainNum:"120",
					SOU:"SOU111111",
					location:"ABV1111",
					modelNum:"KUAN111",
					
					remarks:"备注信息1，备注信息",
					},
					{tagName:"tag123",
					barCode:"33212111111111111111",
					packageCode:"PACK1232332226665555",
					mainNum:"10",
					SOU:"SOU22222",
					location:"ABV2222",
					modelNum:"KUAN222",
					
					remarks:"备注信息2，备注信息",
					},
					{tagName:"tag3",
					barCode:"33333333333333333333",
					packageCode:"PACK444444444444444444444",
					mainNum:"110",
					SOU:"SOU33333",
					location:"ABV3333",
					modelNum:"KUAN333",
					
					remarks:"备注信息3，备注信息",
					}
				],
				showEditPage:false,      //是否显示编辑页面
				selectedIndex:0,         //当前选中的数据行
				mainNum:"",              //数量、克重    用于当前行的信息编辑
				remarks:"",              //备注   用于当前行的信息编辑
			}
		},
		onLoad: function(option) {
			//获取url中传入的参数
			console.log(option.date);
		},
		methods: {
			clickItem(e){
				this.selectedIndex = e;
				console.log("click item :",e);
				this.showEditPage = true;
				console.log("*******************:",this.tableData[this.selectedIndex].tagName);
				
				//
				this.mainNum = this.tableData[this.selectedIndex].mainNum;
				this.remarks = this.tableData[this.selectedIndex].remarks;
			},
			close(){
				this.showEditPage = false;
			},
			confirmEdit(){
				this.tableData[this.selectedIndex].mainNum = this.mainNum;
				this.tableData[this.selectedIndex].remarks = this.remarks;
				
				this.showEditPage = false;
			},
			cancelEdit(){
				this.showEditPage = false;
			},
			deleteItem(){
				this.tableData.splice(this.selectedIndex,1);
				this.showEditPage = false;
			},
			blur (e){
				//扫码结束获取信息并更新进列表
				console.log("blur :",e.target.value);
			}
		}
	}
</script>

<style>

</style>
