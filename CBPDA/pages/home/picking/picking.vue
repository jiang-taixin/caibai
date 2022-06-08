<template>
	<view>
		<div class="divContainer">
			<u-row justify="space-between" gutter="1">
				<u-col span="9">
					<u--text type="primary" class="desc-text-edit" text="配货单" color="black"></u--text>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad: function(option) {
			//获取url中传入的参数
			console.log(option.date);
		},
		methods: {

		}
	}
</script>

<style>
	.divContainer {
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.col-layout {
		width: 90%;
		height: 60px;
		margin-left: 5%;
		margin-top: 10px;
	}

	.desc-text {
		background-color: #e1a7a0;
	}

	.desc-text-edit {
		background-color: #3ec6c7;
	}

	.table-layout {
		/*margin-left: 5%;*/
		margin-top: 10px;
	}

	.table-th {
		width: 100;
	}

	.c-column {
		display: flex;
		flex-direction: column;
	}

	.c-filling {
		height: 200px;
		flex-grow: 1;
		margin-top: 10px;
	}

	.c-row {
		display: flex;
		flex-direction: row;
	}
</style>
