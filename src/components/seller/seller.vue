<template>
	<div class="seller" v-el:seller>
		<div class="seller-content">
			<div class="overview">
				<div class="desc">
					<h2 class="title">{{seller.name}}</h2>
					<div class="star-wrapper">
						<v-star :score="seller.score" :size="36"></v-star>
						<span class="rating-count">({{seller.ratingCount}})</span>
						<span class="sell-count">月售{{seller.sellCount}}单</span>
					</div>
					<div class="favorite" @click="toggleFavorite" >
						<span class="icon-favorite" :class="{select: isFavorite}" transition="fade"></span>
						<span class="text" v-text="favoriteText"></span>
					</div>
				</div>
				<ul class="other">
					<li>
						<div class="title">起送价</div>
						<div class="content">
							<span class="number">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li>
						<div class="title">商家配送</div>
						<div class="content">
							<span class="number">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li>
						<div class="title">平均配送事件</div>
						<div class="content">
							<span class="number">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="container">
				<h2 class="title">公告与活动</h2>
				<p class="bulletin">{{seller.bulletin}}</p>
				<ul class="supports-wrapper">
					<li class="support-item" v-for="support in seller.supports">
						<v-support :support="support" :size="12"></v-support>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="container">
				<h2 class="title">商家实景</h2>
				<div class="pics-scroll" v-el:pics>
					<ul class="pics-wrapper" v-el:picswrapper>
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" alt="">
						</li>
					</ul>
				</div>
			</div>
			<v-split></v-split>
			<div class="container">
				<h2 class="title">商家信息</h2>
				<ul class="infos-wrapper">
					<li class="info-item" v-for="info in seller.infos" v-text="info"></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import support from 'components/support/support'
export default {
	props: {
		seller: {
			type: Object
		}
	},
	components: {
		'v-star': star,
		'v-split': split,
		'v-support': support
	},
	created() {
		this.$nextTick(() => {
			this.scroll = new BScroll(this.$els.seller, {
				click: true
			})
			let initWidth = this.seller.pics.length * (120 + 6) - 6
			this.$els.picswrapper.style.width = `${initWidth}px`
			this.picsScroll = new BScroll(this.$els.pics, {
				scrollX: true
			})
		})
	},
	data() {
		return {
			isFavorite: false,
			favoriteText: '收藏'
		}
	},
	methods: {
		toggleFavorite() {
			this.isFavorite = !this.isFavorite
			if (this.isFavorite) {
				this.favoriteText = '已收藏'
			} else {
				this.favoriteText = '收藏'
			}
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../common/scss/mixin.scss';
.seller {
	position: absolute;
	top: 170px;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	.seller-content {
		.overview {
			padding: 18px 18px 0;
			.desc {
				position: relative;
				padding-bottom: 18px;
				@include border-1px(rgba(7,17,27,.1))
				.title {
					font-size: 14px;
					font-weight: 700;
					color: rgb(7,17,27);
				}
				.star-wrapper {
					margin-top: 8px;
					font-size: 0;
					.rating-count, .sell-count{
						display: inline-block;
						padding-left: 8px;
						vertical-align: top;
						line-height: 18px;
						font-size: 10px;
						color: rgb(77,85,93);
					}
					.sell-count {
						padding-left: 12px;
					}
				}
				.favorite {
					position: absolute;
					right: 0;
					top: 0;
					width: 48px;
					text-align: center;
					.icon-favorite {
						display: block;
						font-size: 24px;
						color: rgb(147,153,159);
						&.fade-transition {
							transition: all .2s;
						}
						&.fade-leave, &.fade-enter {
							transition: all .2s;
						}
					}
					.select {
						color: rgb(240,20,20);
					}
					.text {
						display: block;
						margin-top: 4px;
						font-size: 10px;
						color: rgb(77,85,93);
					}
				}
			}
			.other {
				display: flex;
				padding: 18px 0;
				> li {
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7,17,27,.1);
					&:last-child {
						border-width: 0px;
					}
					.title {
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.content {
						margin-top: 4px;
						font-size: 10px;
						.number {
							font-size: 24px;
						}
					}
				}
			}
		}
		.container {
			padding: 18px 18px 0;
			.title {
				font-size: 14px;
				color: rgb(7,17,27);
				font-weight: 700;
			}
			.bulletin {
				line-height: 24px;
				padding: 8px 12px 16px;
				font-size: 12px;
				color: rgb(240,20,20);
				@include border-1px(rgba(7,17,27,.1));
			}
			.supports-wrapper {
				.support-item {
					padding: 18px 0;
					@include border-1px(rgba(7,17,27,.1));
					&:last-child {
						@include border-none;
					}
				}
			}
			.pics-scroll {
				padding: 12px 0 18px;
				font-size: 0;
				overflow: hidden;
			}
			.pics-wrapper{
				.pic-item {
					display: inline-block;
					width: 120px;
					height: 90px;
					margin-right: 6px;
					&:last-child {
						margin-right: 0;
					}
					> img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.infos-wrapper {
				margin-top: 12px;
				.info-item {
					line-height: 16px;
					padding: 18px 12px;
					font-size: 12px;
					color: rgb(7,17,27);
					@include border-top-1px(rgba(7,17,27,.1));
				}
			}
		}
	}
}
</style>