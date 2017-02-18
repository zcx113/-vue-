<template>
	<div class="star">
		<span v-for="star in starContainer" class="star-item" :class="[starSize,star]" track-by="$index"></span>
	</div>
</template>

<script>
	const LEN = 5
	const CLS_ON = 'on'
	const CLS_HALF = 'half'
	const CLS_OFF = 'off'
	export default {
		props: {
			score: Number,
			size: Number
		},
		computed: {
			starContainer: function() {
				let onLength = Math.floor(this.score)
				let decimals = this.score % 1 !== 0
				let starContainer = []
				for (let i = 0; i < onLength; i++) {
					starContainer.push(CLS_ON)
				}
				if (decimals) {
					starContainer.push(CLS_HALF)
				}
				while (starContainer.length < LEN) {
					starContainer.push(CLS_OFF)
				}
				return starContainer
			},
			starSize: function() {
				return 'star' + this.size
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../common/scss/mixin.scss';
	.star{
		display: inline-block;
		.star-item{
			display: inline-block;
			background-repeat: no-repeat;

			&.star24{
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px;
				&.on{
					@include bg-image('star24_on')
				}
				&.half{
					@include bg-image('star24_half')
				}
				&.off{
					@include bg-image('star24_off')
				}
			}
			&.star36{
				width: 15px;
				height: 15px;
				margin-right: 6px;
				background-size: 15px 15px;
				&.on{
					@include bg-image('star36_on')
				}
				&.half{
					@include bg-image('star36_half')
				}
				&.off{
					@include bg-image('star36_off')
				}
			}
			&.star48{
				width: 20px;
				height: 20px;
				margin-right: 24px;
				background-size: 20px 20px;
				&.on{
					@include bg-image('star48_on')
				}
				&.half{
					@include bg-image('star48_half')
				}
				&.off{
					@include bg-image('star48_off')
				}
			}
			&:last-child{
				margin-right: 0;
			}
		}
	}
</style>