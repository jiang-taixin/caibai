<template>
	<view>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="发货部门" size=13></u--text>
			</view>
			<uni-data-select v-model="selectDepartment" :localdata="department" @change="changeDepartment">
			</uni-data-select>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="发货库位" size=13></u--text>
			</view>
			<uni-data-select v-model="selectWarehouse" :localdata="warehouse" @change="changeWarehouse">
			</uni-data-select>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="工号" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="employeeNumber" border="surround" clearable>
			</u--input>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="日期" size=13></u--text>
			</view>
			<uni-datetime-picker v-model="date" type="date" :value="single" start="2021-3-20" end="2099-6-20"
				@change="changeDate" />
		</div>
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
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				department: [],
				selectDepartment: "DC80", //选中发货部门
				warehouse: [],
				selectWarehouse: "", //选中库位
				employeeNumber: "", //工号
				date: "", //日期
			}
		},
		mounted() {
			this.employeeNumber = "NO0001";
			this.date = this.$dateTrans.getDateString();
			let vm = this;
			uni.getStorage({
				key:"departmentList",
				success(res) {
					vm.department = res.data;
					vm.warehouse = res.data.find(item => item.value == vm.selectDepartment).warehouseList;
				},
				fail(e) {
				}
			});
		},
		methods: {
			changeDepartment(e) {
				this.selectDepartment = e;
				this.warehouse = this.department.find(item => item.value == this.selectDepartment).warehouseList;

			},
			changeWarehouse(e) {
				this.selectWarehouse = e;

			},
			changeDate(e) {
				this.date = e;

			},
			confirm() {
				if (this.selectDepartment === '' || this.selectDepartment === undefined) {
					this.$toast.showToast("请选择发货部门并重试");
					
					return;
				}
				if (this.selectWarehouse === '' || this.selectWarehouse === undefined) {
					this.$toast.showToast("请选择库位并重试");
					
					return;
				}
				if (this.employeeNumber === '' || this.employeeNumber === undefined) {
					this.$toast.showToast("请填写工号并重试");
					
					return;
				}
				if (this.date === '' || this.date === undefined) {
					this.$toast.showToast("请选择时间并重试");
					
					return;
				}
				uni.navigateTo({
					url: `wholePicking/wholePicking?selectDepartment=${this.selectDepartment}&selectWarehouse=${this.selectWarehouse}&date=${this.date}`
					//url:`picking/picking?test=1`
				})
			},
			cancel() {
				
				uni.navigateBack({

				});
			},
		}
	}
</script>

<style>

</style>
