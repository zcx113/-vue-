<template>
	<div class="shopcart">
		<div class="content">
			<div class="shopcart-left" :class="{highlight: totalCount > 0}" @click="toggleList()">
				<div class="logo-wrapper" >
					<span class="icon-shopping_cart"></span>
					<span class="num">{{totalCount}}</span>
				</div>
				<div class="price">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元起</div>
			</div>
			<div class="shopcart-right">
				<div class="pay" :class='{enough: this.totalPrice >= this.minPrice}' @click="payment()">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<div v-for="ball in balls" transition="drop" class="ball" v-show="ball.show" >
				<div class="inner inner-hook"></div>
			</div>
		</div>
		<div class="showcart-list" v-show="listShow" transition="fold">
			<div class="list-header">
				<h3 class="title">购物车</h3>
				<a class="empty" @click="empty()">清空</a>
			</div>
			<div class="list-content" v-el:list-content>
				<ul>
					<li v-for="food in selectFoods" class="food-item">
						<h4 class="name">{{food.name}}</h4>
						<div class="price">
							<font>￥</font>
							<span class="num">{{food.price}}</span>
						</div>
						<div class="cartcontroll-wrapper">
							<v-cartcontrol :food="food"></v-cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="list-mock" v-show="listShow" transition="fade" @click="toggleList()"></div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

export default {
	data() {
		return {
			balls: [
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
			],
			dropBalls: [],
			fold: true
		}
	},
	props: {
		deliveryPrice: {
			type: Number,
			default: 0
		},
		minPrice: {
			type: Number,
			default: 0
		},
		selectFoods: {
			type: Array,
			default: function() {
				return [
					{
						price: 0,
						count: 0
					}
				]
			}
		}
	},
	computed: {
		totalPrice: function() {
			let count = 0
			let len = this.selectFoods.length
			for (let i = 0; i < len; i++) {
				count += this.selectFoods[i].count * this.selectFoods[i].price
			}
			return count
		},
		totalCount: function() {
			let count = 0
			let len = this.selectFoods.length
			for (let i = 0; i < len; i++) {
				count += this.selectFoods[i].count
			}
			return count
			// for()
		},
		payDesc: function() {
			if (this.totalPrice === 0) {
				return '￥' + this.minPrice + '起送'
			} else if (this.totalPrice < this.minPrice) {
				return '还差￥' + (this.minPrice - this.totalPrice) + '起送'
			} else {
				return '去结算'
			}
		},
		listShow: function() {
			if (this.totalCount <= 0) {
				this.fold = true
				return false
			}
			let show = !this.fold
			if (show) {
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$els.listContent, {
							click: true
						})
					} else {
						this.scroll.refresh()
						console.log(this.scroll.refresh)
					}
				})
			}
			return show
		}
	},
	methods: {
		drop(tg) {
			for (let i = 0; i < this.balls.length; i++) {
				let ball = this.balls[i]
				if (!ball.show) {
					ball.show = true
					ball.el = tg
					this.dropBalls.push(ball)
					return
				}
			}
		},
		toggleList() {
			if (this.totalCount > 0) {
				this.fold = !this.fold
			}
		},
		empty() {
			this.selectFoods.forEach(function(food) {
				food.count = 0
			})
		},
		payment() {
			if (this.totalPrice >= this.minPrice) {
				console.log(window.alert)
				window.alert(`需支付￥${this.totalPrice}`)
			}
		}
	},
	transitions: {
		drop: {
			beforeEnter (el) {
				let count = this.balls.length
				while (count--) {
					let ball = this.balls[count]
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect()
						let x = rect.left - 32
						let y = -(window.innerHeight - rect.top - 22)
						el.style.display = ''
						el.style.webkitTransform = `translate3d(0,${y}px,0)`
						el.style.transform = `translate3d(0,${y}px,0)`
						let inner = el.getElementsByClassName('inner-hook')[0]
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`
						inner.style.transform = `translate3d(${x}px,0,0)`
					}
				}
			},
			enter (el) {
				let redraw = el.offsetHeight
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)'
					el.style.transform = 'translate3d(0,0,0)'
					let inner = el.getElementsByClassName('inner-hook')[0]
					inner.style.webkitTransform = 'translate3d(0,0,0)'
					inner.style.transform = 'translate3d(0,0,0)'
				})
			},
			afterEnter (el) {
				let ball = this.dropBalls.shift()
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
			}
		}
	},
	components: {
		'v-cartcontrol': cartcontrol
	}

}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../common/scss/base.scss';
	@import '../../common/scss/mixin.scss';
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 48px;
		z-index: 10;
		.content{
			position: relative;
			z-index: 99;
			display: flex;
			color: rgba(255,255,255,.4);
			background-color: #141d27;
			.shopcart-left{
				flex: 1;
				font-size: 0;
				&.highlight{
					.logo-wrapper{
						.num{
							display: block;
							position: absolute;
							right: 0;
							top: 0;
							width: 24px;
							height: 16px;
							line-height: 16px;
							border-radius: 12px;
							@extend .ellipsis;
							text-align: center;
							color: white;
							font-size: 9px;
							background-color: rgb(240,20,20);
						}
						.icon-shopping_cart{
							background-color: rgb(0,160,220);
							color: white;
						}
					}
					.price{
						color: white;
					}
				}
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top: -10px;
					width: 56px;
					height: 56px;
					margin: 0 18px;
					padding: 6px;
					border-radius: 50%;
					background-color: #141d27;
					.num{
						display: none;
					}
					.icon-shopping_cart{
						display: block;
						height: 100%;
						border-radius: 50%;
						text-align: center;
						font-size: 24px;
						line-height: 44px;
						background-color: #2b343c;
					}
				}
				.price{
					display: inline-block;
					height: 24px;
					line-height: 24px;
					margin-top: 12px;
					padding-right: 12px;
					vertical-align: top;
					border-right: 1px solid rgba(255,255,255,.1);
					font-size: 18px;
					font-weight: 700;
				}
				.desc{
					display: inline-block;
					line-height: 48px;
					padding-left: 12px;
					vertical-align: top;
					font-size: 10px;
				}
			}
			.shopcart-right{
				width: 105px;
				background-color: #2b333b;
				.pay{
					padding: 0 8px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
					&.enough{
						background-color: #00b43c;
						color: white
					}
				}
			}
		}
		.ball-container{
			.ball{
				position: fixed;
				bottom: 22px;
				left: 32px;
				z-index: 999;
			}
			.drop-transition{
				transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
				transform: translate3d(0,0,0);
				.inner {
					transition: all .4s linear;
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background-color: rgb(0,160,240);
				}
			}
		}
		.showcart-list{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			z-index: 98;
			background-color: white;
			&.fold-transition{
				transition: all .5s;
				transform: translate3d(0,-100%,0);
			}
			&.fold-leave,&.fold-enter{
				transition: all .5s;
				transform: translate3d(0,0%,0);
			}
			.list-header{
				display: flex;
				height: 40px;
				line-height: 40px;
				background-color: #f3f5f7;
				border-bottom: 1px solid rgba(7,17,27,.1);
				.title{
					flex: 1;
					padding-left: 18px;
					font-size: 14px;
					color: rgb(7,17,27);
				}
				.empty{
					padding: 0 18px;
					font-size: 12px;
					color: rgb(0,160,220);
					text-align: right;
				}
			}
			.list-content{
				max-height: 221px;
				overflow: hidden;
				.food-item{
					display: flex;
					height: 48px;
					line-height: 48px;
					margin: 0 18px;
					@include border-1px(rgba(7,17,27,.1))
					.name{
						flex: 1;
						@extend .ellipsis;
					}
					.price{
						padding-right: 12px;
						color: rgb(240,20,20);
						font-size: 0;
						.num{
							font-size: 14px;
							font-weight: 700;
						}
						font{
							font-size: 10px;
						}
					}
					.cartcontroll-wrapper{
						padding: 12px 0;
					}
					&:last-child{
						@include border-none;
					}
				}
			}
		}
	}
	.list-mock{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		backdrop-filter: blur(10px);
		background-color: rgba(7,17,27,.6);
		&.fade-transition{
			transition: all .5s;
			translate: translate3d(0,0,0)
		}
		&.fade-leave,&.fade-enter{
			opacity: 0;
		}
	}
</style>