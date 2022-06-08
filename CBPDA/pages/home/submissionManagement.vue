<template>
	<view>
		<div id="scanDiv" style="width: 100%;margin-top: 20px;">
			<u-button type="primary" icon="map" text="扫描送货单基本信息" style="width:40%;float: left;margin-left: 5%;" @click="getBasicMessage"></u-button>
			<u-button type="primary" icon="map" text="扫描送货单详细信息" style="width:40%;margin-right: 5%;" @click="getDetailMessage"></u-button>
		</div>
		
		
		<div id="basicDiv" style="width:80%;margin-left: 10%; margin-top: 20px;">
			<u--text type="primary" text="送货单基本信息"></u--text>
			<u--text type="info" text="送货单号"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="送货单审核状态"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="送货单类型"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="送货单状态"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="供应商编码"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="供应商名称"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
		</div>
		
		
		<div id="detailDiv" style="width:80%;margin-left: 10%; margin-top: 20px;">
			<u--text type="primary" text="送货单详细信息"></u--text>
			<u--text type="info" text="采购订单号"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="订单行项目"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="商品编号"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="商品描述"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="克重段"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
			<u--text type="info" text="指圈值"></u--text>
			<u--input
			    border="surround"
				disabled="true"
			  >
			</u--input>
		</div>
		
		<div id="messageDiv" style="width:80%;margin-left: 10%; margin-top: 20px;">
			<u--text type="primary" text="补充送检单信息"></u--text>
			<u--form
				labelPosition="left"
				:model="model1"
				:rules="rules"
				ref="form1">
				
					<u-form-item
						label="送检日期"
						borderBottom
						@click="showDate = true; hideKeyboard()"
						ref="item1">
						<u--input
							v-model="date"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择日期"
							border="none">
						</u--input>
						<u-icon
							slot="right"
							name="arrow-right">
						</u-icon>
					</u-form-item>
					
					<u-form-item
						label="送检机构"
						borderBottom
						@click="showOrganization = true; hideKeyboard()"
						ref="item1">
						<u--input
							v-model="organization"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择机构"
							border="none">
						</u--input>
						<u-icon
							slot="right"
							name="arrow-right">
						</u-icon>
					</u-form-item>
					<u-form-item
						label="备注信息"
						borderBottom
						ref="item1">
						<u--input
							v-model="remark"
							border="none">
						</u--input>
					</u-form-item>
			</u--form>
		</div>
		
		<u-button type="primary" text="创建送检单" style="width: 80%;margin-left: 10%;margin-top: 50px;"></u-button>
		<u-action-sheet
						:show="showOrganization"
						:actions="actions"
						title="选择送检机构"
						@close="showOrganization = false"
						@select="organizationSelect"
				>
		</u-action-sheet>
		<u-datetime-picker
		    :show="showDate"
            v-model="date"
			@confirm="dateSelect"
			@cancel="showDate = false"
			mode="date">
		</u-datetime-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import http from '../../http/http.js'
	export default {
		data() {
			return {
				actions: [{name: '机构1',},{name: '机构2',},{name: '机构3',},],
				showOrganization:false,
				organization:"",
				showDate:false,
				date:"",
				opts:{
					url: 'f/rest/real/54433',
					method: 'get'
				},
				param:{
					deviceId: this.deviceCode,
					deviceName: this.deviceName
				}
			}
		},
		methods: {
			getBasicMessage(){
				//this.$refs.uToast.success(`get basic message`);
				http.httpRequest(this.opts,null).then((res) => {
					this.$refs.uToast.success(res);
				});
				
			},
			getDetailMessage(){
				this.$refs.uToast.success(`get detail message`)
			},
			organizationSelect(e){
				this.$refs.uToast.success(`select origanization${e.name}`);
				this.organization = e.name
			},
			dateSelect(e){
				this.$refs.uToast.success(`select date${e.date}`);
				this.date = e.date
			},
		}
	}
</script>

<style>

</style>
