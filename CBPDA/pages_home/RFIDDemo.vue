<template>
	<view>
		<button type="default" @click="start">开始扫描</button>
		<button type="default" @click="stop">停止扫描</button>
		<text>{{text}}</text>
		<text>{{message}}</text>
		<uni-table border stripe emptyText="暂无更多数据" style="margin-left: 5px;margin-top: 5px;">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center" width="30" style="font-size: 12px;">RFID</uni-th>
				
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item, index) in tableData">
				<uni-td>{{item}}</uni-td>
				
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	let rfidModule = uni.requireNativePlugin("RFIDLib")
	export default {
		data() {
			return {
				text:"RFID number",
				message:"",
				tableData:[],
			}
		},
		methods: {
			start(){
				rfidModule.startScan((res) => {
					if(res.code === "201"){
						console.log("RFID init fail");
						return;
					};
					this.text = `number :${res.count}`;
					this.message = res.message;
					this.tableData = res.rfidList;
				})
			},
			stop(){
				rfidModule.stopScan();
			}
		}
	}
</script>

<style>

</style>
