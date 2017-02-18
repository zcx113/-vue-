<template>
	<div class="ratings" v-el:ratings>
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<p class="title">综合评分</p>
					<p class="rank">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<div class="star-wrapper">
							<v-star :score="seller.score" :size="36"></v-star>
						</div>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<div class="star-wrapper">
							<v-star :score="seller.serviceScore" :size="36"></v-star>
						</div>
						<span class="score">{{seller.score}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">送达事件</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<v-split></v-split>
			<div class="rating-wrapper" >
				<v-ratingselect :ratings="ratings" :only-content="onlyContent" :select-type="selectType"></v-ratingselect>
				<ul class="rating-container">
					<li class="rating-item" v-for="rating in ratings" v-show="isShowRating(rating.rateType,rating.text)">
						<img :src="rating.avatar" alt="" class="avatar">
						<div class="content">
							<div class="name">{{rating.username}}</div>
							<div class="star-wrapper">
								<v-star :score="rating.score" :size="24"></v-star>
								<span class="delivery">{{rating.deliveryTime}}分钟后送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend-wrapper">
								<span :class="{'icon-thumb_down': rating.rateType === 1, 'icon-thumb_up': rating.rateType === 0}"></span>
								<span class="recommend" v-for="recommend in rating.recommend">{{recommend}}</span>
							</div>
							<div class="time" v-text="rating.rateTime | formatDate"></div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import {formatDate} from 'common/js/date'
import star from 'components/star/star'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'

const ERR_OK = 0
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1

export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			ratings: [],
			onlyContent: true,
			selectType: ALL
		}
	},
	created() {
		this.$http.get('/api/ratings').then((rsp) => {
			rsp = rsp.body
			if (rsp.errno === ERR_OK) {
				this.ratings = rsp.data
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$els.ratings, {
						click: true
					})
				})
			}
		})
	},
	components: {
		'v-star': star,
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
	methods: {
		isShowRating(type, text) {
			this.$nextTick(() => {
				this.scroll.refresh()
			})
			if (this.onlyContent && text.length === 0) {
				return false
			}
			if (this.selectType === ALL) {
				return true
			} else {
				return this.selectType === type
			}
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
@import "../../common/scss/mixin.scss";
.ratings{
	position: absolute;
	top: 170px;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	.rating-content{
		.overview{
			display: flex;
			padding: 18px 0;
			.overview-left {
				width: 137px;
				text-align: center;
				border-right: 1px solid rgba(7,17,27,.1);
				@media screen and (max-width: 320px) {
					width: 110px;
				} 
				.score {
					line-height: 28px;
					font-size: 24px;
					font-weight: 700;
					color: rgb(255,153,0);

				}
				.title {
					padding-top: 6px;
					font-size: 12px;
					color: rgb(7,17,27);
				}
				.rank {
					padding-top: 8px;
					font-size: 10px;
					color: rgb(147,153,159);
				}
			}
			.overview-right {
				flex: 1;
				padding: 0 24px;
				@media screen and (max-width: 320px) {
					padding: 0 6px;
				} 
				.score-wrapper {
					font-size: 0;
					line-height: 18px;
					.title {
						vertical-align: top;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.star-wrapper {
						vertical-align: top;
						display: inline-block;
						margin: 0 12px;
					}
					.score {
						font-size: 12px;
						color: rgb(255,153,0);

					}
					.delivery {
						margin-left: 12px;
						font-size: 12px;
						color: rgb(147,153,159);
					}
				}
			}
		}
		.rating-wrapper{
			.rating-container {
				border-top: 1px solid rgba(7,17,27,.1);
				padding: 0 18px;
				.rating-item {
					display: flex;
					padding: 18px 0;
					@include border-1px(rgba(7,17,27,.1));
					&:last-child {
						@include border-none;
					}
					.avatar {
						width: 28px;
						height: 28px;
						border-radius: 50%;

					}
					.content {
						position: relative;
						flex: 1;
						padding-left: 12px;
						.name {
							font-size: 10px;
							color: rgb(7,17,27);
							line-height: 12px;
						}
						.star-wrapper {
							margin-top: 4px;
							.delivery {
								padding-left: 6px;
								color: rgb(147,153,159);
								line-height: 12px;
							}
						}
						.text {
							padding-top: 6px;
							font-size: 12px;
							line-height: 18px;
						}
						.recommend-wrapper {
							margin-top: 8px;
							font-size: 0;
							.icon-thumb_down, .icon-thumb_up {
								font-size: 12px;
								line-height: 18px;
								color: rgb(183,187,191)
							}
							.icon-thumb_up {
								color: rgb(0,160,220);
							}
							.recommend {
								display: inline-block;
								line-height: 16px;
								padding: 0 6px;
								margin: 0  0 4px 8px;
								vertical-align: top;
								border-radius: 1px;
								border: 1px solid rgba(7,17,27,.1);
								font-size: 9px;
								color: rgb(147,153,159);
							}
						}
						.time {
							position: absolute;
							right: 0;
							top: 0;
							line-height: 12px;
							color: rgb(147,153,159);
							font-size: 10px;
						}
					}
				}
			}
		}
	}
}
</style>