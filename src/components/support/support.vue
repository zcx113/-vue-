<template>
	<div class="support" :class='clsSize'>
		
		<span class="text" :class='lines'>
			<span class="icon" :class='classMap[support.type]' v-show="support.type >= 0"></span>{{support.description}}
		</span> 
	</div>
</template>

<script>
export default {
	props: {
		support: Object,
		size: Number,
		ellipsis: Number
	},
	computed: {
		clsSize: function() {
			return 'support_' + this.size
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee', 'special3']
		if (this.ellipsis) {
			this['lines'] = 'lines' + this.ellipsis
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../common/scss/mixin.scss';
	@import '../../common/scss/base.scss';
	.support{
		font-size: 0;
		.icon{
			display: inline-block;
			vertical-align: top;
			margin-right: 4px;
			background-repeat: no-repeat;
			&.decrease{
				@include bg-image('decrease_1');
			}
			&.discount{
				@include bg-image('discount_1');
			}
			&.guarantee{
				@include bg-image('guarantee_1');
			}
			&.invoice{
				@include bg-image('invoice_1');
			}
			&.special{
				@include bg-image('special_1');
			}
			&.special3{
				@include bg-image('special_3');
			}

		}
		.text{
			@extend .align-vertical;
		}
		&.support_10{
			.text{
				line-height: 12px;
				font-size: 10px;
			}
			.icon{
				width: 12px;
				height: 12px;
				background-size: 12px 12px;
			}
		}
		&.support_12{
			.text{
				line-height: 16px;
				font-size: 12px;
				&.lines3{
					@include ellipsis(3);
					line-height: 14px;
				}
			}
			.icon{
				width: 16px;
				height: 16px;
				background-size: 16px 16px;
			}
		}
	}
</style>