<template>
	<view>
		<div class="divContainer">
			<u--text type="primary" class="desc-text-edit" text="发货部门" size=13></u--text>
			<uni-data-select v-model="selectDepartment" :localdata="department" @change="changeDepartment">
			</uni-data-select>
		</div>
		<div class="divContainer">
			<u--text type="primary" class="desc-text-edit" text="发货库位" size=13></u--text>
			<uni-data-select v-model="selectWarehouse" :localdata="warehouse" @change="changeWarehouse">
			</uni-data-select>
		</div>
		<div class="divContainer">
			<u--text type="primary" class="desc-text-edit" text="工号" size=13></u--text>
			<u--input font-size=13 v-model="employeeNumber" border="surround" clearable>
			</u--input>
		</div>
		<div class="divContainer">
			<u--text type="primary" class="desc-text-edit" text="日期" size=13></u--text>
			<uni-datetime-picker v-model="date" type="date" :value="single" start="2021-3-20" end="2099-6-20"
				@change="changeDate" />
		</div>
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				department: [{ //发货部门
						value: 0,
						text: "DC80"
					},
					{
						value: 1,
						text: "DC81"
					},
				],
				selectDepartment: 0,            //选中发货部门
				warehouse: [{ //库位
						value: 0,
						text: "仓库1"
					},
					{
						value: 1,
						text: "仓库2"
					},
				],
				selectWarehouse: "",             //选中库位
				employeeNumber:"",               //工号
				date:"",                         //日期
			}
		},
		mounted(){
			this.employeeNumber = "NO0001";
			var myDate = new Date();
			var time = myDate.toLocaleDateString().split('/').join('-');
			this.date = time;
		},
		methods: {
			changeDepartment(e) {
				this.selectDepartment = e;
				
			},
			changeWarehouse(e) {
				this.selectWarehouse = e;
				
			},
			changeDate(e) {
				this.date = e;
				
			},
			confirm(){
				this.$refs.uToast.success(`confirm`);
				if (this.selectDepartment === '' || this.selectDepartment === undefined) {
					this.$refs.uToast.error(`请选择发货部门并重试`);
					return;
				}
				if (this.selectWarehouse === '' || this.selectWarehouse === undefined) {
					//this.$refs.uToast.error(`请选择库位并重试`);
					//return;
				}
				if (this.employeeNumber === '' || this.employeeNumber === undefined) {
					this.$refs.uToast.error(`请填写工号并重试`);
					return;
				}
				if (this.date === '' || this.date === undefined) {
					this.$refs.uToast.error(`请选择时间并重试`);
					return;
				}
				console.log("---------select department :",this.department.find(item => item.value === this.selectDepartment).text);
				console.log("---------select warehouse :",this.warehouse.find(item => item.value === this.selectDepartment).text);
				console.log("---------date :",this.date);
				uni.navigateTo({
					url:`picking/picking?selectDepartment=${this.selectDepartment}&selectWarehouse=${this.selectWarehouse}&date=${this.date}`
					//url:`picking/picking?test=1`
				})
			},
			cancel(){
				this.$refs.uToast.success(`cancel`);
				uni.navigateBack({
					
				});
			},
		}
	}
</script>

<style>
	
</style>
