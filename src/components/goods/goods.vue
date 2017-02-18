<template>
	<div class="goods">
		<div class="menu-wrapper" v-el:menu-wrapper>
			<ul class="menu-list">
				<li v-for='item in supports' class="menu-item" :class="{current: $index===scrollY}" @click='selectMenu($index,$event)'>
					<div class="cell">
						<v-support :support="item" :size='12' :ellipsis='3'></v-support>
					</div>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" v-el:foods-wrapper>
			<div class="scroll-hook">
				<ul class="foods" v-for='item in goods'>
					<li class="food-title">
						<h1>{{item.name}}</h1>
					</li>
					<ul class="food-list" >
						<li class="food-item" v-for="food in item.foods" @click="selectFoodAction(food, $event)">
							<div class="avatar">
								<img :src="food.icon" alt="">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">
									{{food.description}}
								</p>
								<p class="extra">
									<span class="sellCount">月售{{food.sellCount}}份</span><span>好评率 {{food.rating}}%</span>
								</p>
								<p class="price">
									<span class="new"><font>￥</font>{{food.price}}</span>
									<span class="old" v-show='food.oldPrice'><font>￥</font>{{food.oldPrice}}</span>
								</p>
								<div class="cartcontrol-wrapper">
									<v-cartcontrol :food="food"></v-cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</ul>
			</div>
		</div>
	</div>
	<v-shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></v-shopcart>
	<v-food :food="selectFood" v-ref:food></v-food>
</template>

<script>
	import support from 'components/support/support'
	import BScroll from 'better-scroll'
	import shopcart from 'components/shopcart/shopcart'
	import cartcontrol from 'components/cartcontrol/cartcontrol'
	import food from 'components/food/food'
	const ERR_OK = 0
	export default {
		data() {
			return {
				goods: [],
				supports: [],
				listHeight: [],
				scrollY: 0,
				selectFood: {}
			}
		},
		created() {
			this.$http.get('api/goods').then(res => {
				res = res.body
				if (res.errno === ERR_OK) {
					this.goods = res.data
					let i
					let len = this.goods.length
					for (i = 0; i < len; i++) {
						let support = {
							type: this.goods[i].type === -1 ? -1 : 5,
							description: this.goods[i].name
						}
						this.supports.push(support)
					}

					this.$nextTick(() => {
						this._initScroll()
						this._calculateHeight()
					})
				}
			})
		},
		components: {
			'v-support': support,
			'v-shopcart': shopcart,
			'v-cartcontrol': cartcontrol,
			'v-food': food
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$els.menuWrapper, {
					click: true
				})
				this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
					probeType: 3,
					click: true
				})

				this.foodsScroll.on('scroll', (pos) => {
					let _scrollY = Math.abs(Math.round(pos.y))
					for (let i = 1; i < this.listHeight.length; i++) {
						if (_scrollY >= this.listHeight[i - 1] && _scrollY < this.listHeight[i]) {
							this.scrollY = i - 1
						}
					}
				})
			},
			_calculateHeight() {
				let foodsList = this.$els.foodsWrapper.getElementsByClassName('foods')
				// this.listHeight = []
				this.listHeight.push(0)
				for (let i = 0; i < foodsList.length; i++) {
					let height1 = foodsList[i].clientHeight
					let height2 = this.listHeight[i] + height1
					this.listHeight.push(height2)
				}
			},
			selectMenu(index, event) {
				if (!event._constructed) {
					return
				}
				let foodList = this.$els.foodsWrapper.getElementsByClassName('foods')
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el, 300)
				// this.foodsScroll.scrollTo(0, this.listHeight[index], 300)
			},
			_drop(target) {
				// 动画优化
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target)
				})
			},
			selectFoodAction(food, e) {
				if (!e._constructed) {
					return
				}
				this.selectFood = food
				this.$refs.food.show()
			}
		},
		props: {
			seller: Object
		},
		computed: {
			selectFoods: function() {
				let foods = []
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		events: {
			addCart(target) {
				this._drop(target)
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../common/scss/mixin.scss';
	@import '../../common/scss/base.scss';
	.goods{
		display: flex;
		position: absolute;
		top: 170px;
		left: 0;
		right: 0;
		bottom: 48px;
		overflow: hidden;
		.menu-wrapper{
			width: 80px;
			background-color: #f3f5f7;

			.menu-list{
				display: table;
				.menu-item{
					padding: 0px 12px;
					background-color: #f3f5f7;
					.cell{
						display: table-cell;
						vertical-align: middle;
						height: 54px;
						width: 66px;
						line-height: 14px;
						font-size: 12px;
						color: rgb(77,85,93);
						@include border-1px(rgba(7,17,27,.1));
					}
					&:last-child .cell{
						@include border-none;
					}
					&.current{
						background-color: white;
						.cell{
							@include border-none;
						}
						
					}	
				}
			}
		}
		.foods-wrapper{
			flex: 1;
			.food-title{
				height: 26px;
				line-height: 26px;
				padding-left: 14px;
				font-size: 12px;
				color: rgb(147,153,159);
				background-color: #f3f5f7;
				border-left: 2px solid #d9dde1;
			}
			.food-list{
				.food-item{
					display: flex;
					margin: 18px;
					padding-bottom: 18px;
					@include border-1px(rgba(7,17,27,.1));
					&:last-child{
						@include border-none;
						margin-bottom: 0;
					}
					.avatar{
						display: inline-block;
						> img{
							width: 57px;
							height: 57px;
						}
					}
					.content{
						position: relative;
						flex: 1;
						display: inline-block;
						padding-left: 10px;
						vertical-align: top;
						.name{
							font-size: 14px;
							font-weight: 700;
							margin-top: 2px;
						}
						.desc,.extra{
							margin-top: 8px;
							font-size: 10px;
							color: rgb(147,153,159);
						}
						.extra .sellCount{
							margin-right: 12px;
						}
						.price{
							line-height: 24px;
							>span >font{
								font-size: 10px;
							}
							.new{
								font-size: 14px;
								margin-right: 8px;
								font-weight: bold;
								color: rgb(240,20,20);
							}
							.old{
								font-size: 10px;
								font-weight: 700;
								color: rgb(147,153,159);
								text-decoration: line-through;
							}
						}
						.cartcontrol-wrapper{
							position: absolute;
							bottom: 0;
							right: 0;
						}


					}
				}
			}
		}
	}
</style>