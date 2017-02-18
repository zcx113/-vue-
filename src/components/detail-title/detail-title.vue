<template>
	<div class="detail-title">
		<span class="decorate"></span>
		<span class="text">{{title}}</span>
		<span class="decorate"></span>
	</div>
</template>

<script>
	export default {
		props: {
			title: String
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.detail-title{
		display: flex;
		.decorate{
			flex: 1;
			height: 8px;
			line-height: 8px;
			border-bottom: 1px solid rgba(255,255,255,.2);
		}
		.text{
			padding: 0 12px;
			font-size: 14px;
			font-weight: 700;
			color: white;
		}
	}
</style>