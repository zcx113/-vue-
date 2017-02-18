<template>
	<div class="food" v-show="showFlag" transition="fade" v-el:food>
		<div class="food-wrapper">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h2 class="title">{{food.name}}</h2>
					<div class="detail">
						<p class="extra">
							<span class="sellCount">月售{{food.sellCount}}份</span><span>好评率 {{food.rating}}%</span>
						</p>
						<p class="price">
							<span class="new"><font>￥</font>{{food.price}}</span>
							<span class="old" v-show='food.oldPrice'><font>￥</font>{{food.oldPrice}}</span>
						</p>
					</div>
				</div>
				<div class="buy" v-show="!food.count || food.count === 0" @click="addFirst" transition="delay">加入购物车</div>
				<div class="cartcontrol-wrapper" v-show="food.count > 0">
					<v-cartcontrol :food="food"></v-cartcontrol>
				</div>
			</div>
			<div class="info-wrapper" v-show="food.info">
				<v-split></v-split>
				<div class="info">
					<h3 class="title">商品介绍</h3>
					<p class="content">{{food.info}}</p>
				</div>
			</div>
			<div class="rattings-wrapper">
				<v-split></v-split>
				<h3 class="title">商品评价</h3>
				<div class="select-wrapper">
					<v-ratingselect :desc="desc" :ratings="ratings" :only-content="onlyContent"></v-ratingselect>
				</div>
				<div class="rating-wrapper" v-show="food.ratings && food.ratings.length > 0">
					<ul>
						<li class="rating-item" v-for="rating in food.ratings" v-show="isShowRating(rating.rateType,rating.text)">
							<div class="user-wrapper">
								<span class="time" v-text="rating.rateTime | formatDate"></span>
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" alt="" class="avatar">
								</div>
							</div>
							<div class="text">
								<span :class="{'icon-thumb_down': rating.rateType === 1, 'icon-thumb_up': rating.rateType === 0}"></span>
								{{rating.text}}
							</div>
						</li>
					</ul>
				</div>
				<div class="rating-none" v-show="!food.ratings || food.ratings.length === 0">尚无评价</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'
import {formatDate} from 'common/js/date'
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
	props: {
		food: {
			type: Object
		}
	},
	data() {
		return {
			showFlag: false,
			desc: {
				all: '全部',
				positive: '推荐',
				negative: '吐槽'
			},
			ratings: [],
			onlyContent: true,
			selectType: ALL
		}
	},
	methods: {
		show() {
			this.showFlag = true
			this.$nextTick(() => {
				this.ratings = this.food.ratings
				if (!this.scroll) {
					this.scroll = new BScroll(this.$els.food, {
						click: true
					})
				} else {
					this.scroll.refresh()
				}
			})
		},
		hide() {
			this.showFlag = false
		},
		addFirst(e) {
			if (this.food.count === undefined) {
				Vue.set(this.food, 'count', 1)
			} else {
				this.food.count = 1
			}
			// console.log(e.target || e.srcElement)
			this.$dispatch('addCart', e.target || e.srcElement)
		},
		isShowRating(type, text) {
			this.$nextTick(() => {
				this.scroll.refresh()
			})
			if (this.onlyContent && !text) {
				return false
			}
			if (this.selectType === ALL) {
				return true
			} else {
				return this.selectType === type
			}
		}
	},
	components: {
		'v-cartcontrol': cartcontrol,
		'v-split': split,
		'v-ratingselect': ratingselect
	},
	events: {
		'ratings.only': function(onlyContent) {
			this.onlyContent = onlyContent
		},
		'ratings.changetype': function(type) {
			this.selectType = type
		}
	},
	filters: {
		formatDate(time) {
			let date = new Date(time)
			return formatDate(date, 'yyyy-MM-dd hh:mm')
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../common/scss/mixin.scss';
	.food{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 48px;
		z-index: 8;
		background-color: white;
		&.fade-transition{
			transition: all .3s;
			transform: translate3d(0,0,0)
		}
		&.fade-leave,&.fade-enter{
			transform: translate3d(100%,0,0)
		}
		.food-wrapper{
			.food-content{
				position: relative;
				.image-header{
					position: relative;
					width: 100%;
					height: 0;
					padding-top: 100%;
					> img{
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
					}
					.back{
						position: absolute;
						left: 6px;
						top: 6px;
						width: 24px;
						height: 24px;
						padding: 6px;
						text-align: center;
						> i{
							display: block;
							font-size: 18px;
							color: white;
						}
					}
				}
				.content{
					padding: 18px;
					.title{
						font-size: 14px;
						font-weight: 700;
						color: rgb(7,17,27);
					}
					.detail{
						.extra{
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
					}
				}
				.cartcontrol-wrapper,.buy{
					position: absolute;
					right: 18px;
					bottom: 18px;
				}
				.buy{
					width: 74px;
					height: 24px;
					border-radius: 12px;
					line-height: 24px;
					text-align: center;
					font-size: 10px;
					background-color: rgb(0,160,220);
					color: white;
					&.delay-transition {
						opacity: 1;
						transition: all .2s;

					}
					&.delay-leave, &.delay-enter {
						opacity: 0;
					}
				}	
			}
			.info-wrapper .info{
				padding: 18px;
				.title {
					font-size: 16px;
					color: rgb(7,17,27);
				}
				.content {
					padding: 6px 8px 0;
					line-height: 24px;
					font-size: 12px;
					color: rgb(77,85,93)

				}
			}
			.rattings-wrapper {
				.title {
					padding: 18px 0 0 18px;
					font-size: 16px;
					color: rgb(7,17,27);
				}
				.select-wrapper {

				}
				.rating-wrapper{
					border-top: 1px solid rgba(7,17,27,.1);
					.rating-item {
						margin: 18px;
						@include border-1px(rgba(7,17,27,.1));
						&:last-child {
							@include border-none;
						}
						.user-wrapper {
							position: relative;
							color: rgb(147,153,159);
							font-size: 10px;
							line-height: 12px;
							.user{
								position: absolute;
								right: 0;
								top: 0;
								font-size: 0;
								.name {
									vertical-align: top;
									font-size: 10px;
								}
								.avatar {
									width: 12px;
									height: 12px;
									margin-left: 6px;
									border-radius: 50%;
								}
							}
						}
						.text {
							line-height: 24px;
							font-size: 10px;
							padding: 6px  0 18px;
							.icon-thumb_down, .icon-thumb_up {
								vertical-align: middle;
								font-size: 12px;
								color: rgb(0,160,220);
							}
							.icon-thumb_down{
								color: rgb(147,153,159)
							}
						}
					}
				}
			}
			.rating-none{
				padding: 0 18px;
				line-height: 48px;
				text-align: center;
				border-top: 1px solid rgba(7,17,27,.1);
				color: rgb(147,153,159);
			}
		}
	}
</style>