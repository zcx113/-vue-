<template>
	<div class="ratingselect">
		<div class="types">
			<div class="block" :class="{active: selectType === 2}" @click="changeType(2,$event)">
				{{desc.all}}<span class="num">{{allNum}}</span>
			</div>
			<div class="block" :class="{active: selectType === 0}" @click="changeType(0,$event)">
				{{desc.positive}}<span class="num">{{positiveNum}}</span>
			</div>
			<div class="block negative" :class="{active: selectType === 1}" @click="changeType(1,$event)"> 
				{{desc.negative}}<span class="num">{{negativeNum}}</span>
			</div>
		</div>
		<div class="switch" :class="{on: onlyContent}" @click="toggleOnly">
			<i class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
	props: {
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: true
		},
		ratings: {
			type: Array,
			default() {
				return []
			}
		}
	},
	computed: {
		allNum() {
			return this.ratings.length
		},
		positiveNum() {
			let positives = this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE
			})
			return positives.length
		},
		negativeNum() {
			let nagatives = this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE
			})
			return nagatives.length
		}
	},
	methods: {
		toggleOnly: function(e) {
			if (!e._constructed) {
				return
			}
			this.onlyContent = !this.onlyContent
			this.$dispatch('ratings.only', this.onlyContent)
		},
		changeType: function(type, e) {
			if (!e._constructed) {
				return
			}
			this.selectType = type
			this.$dispatch('ratings.changetype', this.selectType)
		}
	}
}
</script>

<style lang="scss" rel="sheetstyle/scss" scoped>
@import '../../common/scss/mixin.scss';
.ratingselect{
	padding: 18px;
	.types {
		font-size: 0;
		padding-bottom: 18px;
		@include border-1px(rgba(7,17,27,.1));
		.block {
			display: inline-block;
			height: 28px;
			line-height: 28px;
			padding: 0 12px;
			margin-right: 8px;
			border-radius: 1px;
			font-size: 12px;
			color: rgb(77,85,93);
			background-color: rgba(0,160,220,.2);
			&.active {
				color: white;
				background-color: rgb(0,160,220);
			}
			&.negative {
				background-color: rgba(77,85,93,.2);
				&.active{
					background-color: rgb(77,85,93);
				}
			}
			.num{
				// vertical-align: top;
				padding-left: 2px;
				font-size: 8px;
			}
		}
	}
	.switch {
		padding: 12px 0 0;
		color: rgb(147,153,159);
		font-size: 0;
		.icon-check_circle{
			display: inline-block;
			vertical-align: top;
			font-size: 24px;
			line-height: 24px;
		}
		.text{
			line-height: 24px;
			font-size: 12px;
			padding-left:4px;
		}
		&.on .icon-check_circle {
			color: #00b43c;
		}
	}
}
</style>