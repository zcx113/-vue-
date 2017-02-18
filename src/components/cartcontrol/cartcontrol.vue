<template>
	<div class="cartcontrol">
		<div class="cart-decrease" v-show="food.count" @click.stop.prevent="decreaseCart($event)" transition="move">
			<i class="icon-remove_circle_outline"></i>
		</div>
		<div class="cart-count" v-show="food.count">{{food.count}}</div>
		<div class="cart-add" @click.stop.prevent="addCart($event)">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	props: {
		food: Object
	},
	methods: {
		addCart(e) {
			console.log(e)
			if (!e._constructed) {
				return
			}
			if (!this.food.count) {
				Vue.set(this.food, 'count', 1)
			} else {
				this.food.count += 1
			}
			this.$dispatch('addCart', e.target || e.srcElement)
		},
		decreaseCart(e) {
			if (!e._constructed) {
				return
			}
			if (this.food.count) {
				this.food.count--
			}
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.cartcontrol{
		font-size: 0;
		.cart-decrease,.cart-add{
			display: inline-block;
			padding: 0 6px;
			> i{
				display: inline-block;
				width: 24px;
				height: 24px;
				font-size: 24px;
				color: rgb(0,160,220);
			}
		}
		.cart-count{
			display: inline-block;
			width: 12px;
			line-height: 24px;
			vertical-align: top;
			text-align: center;
			font-size: 10px;
			color: rgb(147,153,159);

		}
		.move-transition{
			transition: all .2s linear;
			transform: rotate(0deg);
		}
		.move-leave,.move-enter{
			opacity: 0;
			transform: rotate(180deg) translateX(-24px);
		}
	}
</style>