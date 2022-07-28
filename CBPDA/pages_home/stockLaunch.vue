<template>
	<view>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="上架部门" size=13></u--text>
			</view>
			<uni-data-select v-model="launchDepartment" :localdata="department" @change="changeDepartment">
			</uni-data-select>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" text="上架库位" size=13></u--text>
			</view>
			<uni-data-select v-model="launchWarehouse" :localdata="warehouse" @change="changeWarehouse">
			</uni-data-select>
		</div>
		<div class="divContainer">
			<view class="desc-text">
				<u--text type="primary" text="证章号/工号" size=13></u--text>
			</view>
			<u--input font-size=13 v-model="employeeNumber" border="surround" clearable :disabled="true">
			</u--input>
		</div>
		<div class="divContainer">
			<view class="desc-text-edit">
				<u--text type="primary" class="desc-text-edit" text="日期" size=13></u--text>
			</view>
			<uni-datetime-picker v-model="date" type="date" start="2021-3-20" end="2099-6-20"
				@change="changeDate" />
		</div>
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
				department: [],
				launchDepartment: "DC80", //上架部门
				warehouse: [],
				launchWarehouse: "", //上架库位
				employeeNumber: "", //工号
				date: "", //日期
			}
		},
		mounted() {
			var userinfo = this.$userInfo.getUserInfo();
			this.employeeNumber = userinfo.username;
			this.date = this.$dateTrans.getDateString();
			let vm = this;
			uni.getStorage({
				key:"departmentList",
				success(res) {
					vm.department = res.data;
					vm.warehouse = res.data.find(item => item.value == vm.launchDepartment).warehouseList;
				},
				fail(e) {
				}
			});
		},
		methods: {
			changeDepartment(e) {
				this.launchDepartment = e;
				this.warehouse = this.department.find(item => item.value == this.launchDepartment).warehouseList;
			},
			changeWarehouse(e) {
				this.launchWarehouse = e;
			},
			changeDate(e) {
				this.date = e;
			},
			confirm() {
				if (this.launchDepartment === '' || this.launchDepartment === undefined) {
					this.$toast.showToast("请选择上架部门并重试");
					return;
				}
				if (this.launchWarehouse === '' || this.launchWarehouse === undefined) {
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
				//console.log("---------select department :", this.department.find(item => item.value === this.launchDepartment).text);
				uni.navigateTo({
					url: `implementLaunch/implementLaunch?launchDepartment=${this.launchDepartment}&launchWarehouse=${this.launchWarehouse}&date=${this.date}`
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
