<template>
	<div class="header" >
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="desc">
					{{seller.description}} / {{seller.deliveryTime}}分钟到达
				</div>
				<!-- <div class="support" v-if="seller.supports">
					<span class="icon" :class='classMap[seller.supports[0].type]'></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div> -->
				<div class="support-wrapper" v-if='seller.supports'>
					<v-support :support="seller.supports[0]" :size="10"></v-support>
				</div>


				<div class="support-count" v-if="seller.supports" @click="showDetail()"
>					<span class="count-text">{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper " @click='showDetail()'>
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="">
		</div>
		<div class="detail" v-show="detailShow" transition='fade'>
			<div class="detail-wrapper">
				<h1 class="name">{{seller.name}}</h1>
				<div class="star-wrapper">
					<v-star :score='seller.score' :size='48'></v-star>
				</div>
				<div class="title-wrapper">
					<v-title title="优惠信息"></v-title>
				</div>
				<div class="supports-wrapper">
					<v-support v-for='support in seller.supports' :support="support" :size="12"></v-support>
				</div>
				<div class="title-wrapper">
					<v-title title="商家公告"></v-title>
				</div>
				<div class="bulletin-detail">
					{{seller.bulletin}}
				</div>
			</div>
			<div class="detail-close" >
				<i class="icon-close" @click='hideDetail()'></i>
			</div>
		</div>
	</div>
</template>

<script>
	// data方法返回跟踪依赖的变量
	import star from 'components/star/star'
	import title from 'components/detail-title/detail-title'
	import support from 'components/support/support'
	export default {
		props: {
			seller: Object
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		},
		data() {
			return {
				detailShow: false
			}
		},
		methods: {
			showDetail() {
				this.detailShow = true
			},
			hideDetail() {
				this.detailShow = false
			}
		},
		components: {
			'v-star': star,
			'v-title': title,
			'v-support': support
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scope>

	@import '../../common/scss/mixin.scss';
	@import '../../common/scss/base.scss';

	.header{
		position: relative;
		background-color: rgba(0,17,27,.2);
		color: white;
		overflow: hidden;
		.content-wrapper{
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0;
			.avatar{
				position: absolute;
				left: 24px;
				top: 24px;
				> img{
					width: 64px;
					height: 64px;
					border-radius: 2px;
				}
			}
			.content{
				position: relative;
				vertical-align: top;
				margin-left: 80px;
				font-size: 12px;

				.title{
					.brand{
						display: inline-block;
						width: 30px;
						height: 18px;
						vertical-align: top;
						@include bg-image('brand');
						background-size: 30px 18px;
						background-repeat: no-repeat;
					}
					margin-bottom: 8px;
					font-size: 16px;
					line-height: 16px;
					font-weight: bold;
				}
				.desc{
					margin-bottom: 10px;
				}
				
				.support-count{
					position: absolute;
					height: 24px;
					line-height: 24px;
					padding: 0 8px;
					right: 0;
					bottom: 0;
					border-radius: 14px;
					font-size: 0;
					background-color: rgba(0,0,0,.2);
					.count-text{
						vertical-align: top;
						font-size: 10px;
					}
					.icon-keyboard_arrow_right{
						display: inline-block;
						vertical-align: top;
						margin-top: 6px;
						font-size: 10px;
					}
				}
			}
		}
		.bulletin-wrapper{
			position: relative;
			padding: 0 12px;
			line-height: 28px;
			font-size: 10px;
			@extend .ellipsis;
			background-color: rgba(7,17,27,.2);
			.bulletin-title{
				display: inline-block;
				width: 22px;
				height: 12px;
				vertical-align: top;
				margin-top: 8px;
				@include bg-image('bulletin');
				background-size: 22px 12px;
				background-repeat: no-repeat;
			}
			.icon-keyboard_arrow_right{
				position: absolute;
				top: 9px;
				right: 0;
			}
		}
		.background{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			filter: blur(10px);
			z-index: -1;
			> img{
				width: 100%;
				height: 100%;
			}
		}
		.detail{
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 99;
			overflow: auto;
			transition: all .5s;
			backdrop-filter: blur(10px);
			&.fade-transition{
				opacity: 1;
				background-color: rgba(7,17,27,.8);

			}
			&.fade-leave,&.fade-enter{
				opacity: 0;
				background-color: rgba(7,17,27,0);
			}
			.detail-wrapper{

				min-height: 100%;
				padding: 64px 36px;
				color: white;
				// font-size: 50px;
				.name{
					font-size: 16px;
					font-weight: 700;
					text-align: center;
				}
				.star-wrapper{
					margin-top: 16px;
					height: 24px;
					text-align: center
				}
				.title-wrapper{
					margin-top: 28px;
				}
				.supports-wrapper{
					margin-top: 24px;
					padding: 0 12px;
					.support{
						margin-bottom: 12px;
					}
				}
				.bulletin-detail{
					margin-top: 24px;
					padding: 0 12px;
					line-height: 24px;
				}
			}
			.detail-close{
				text-align: center;
				margin-top: -64px;
				> i{
					font-size: 32px;
					color: rgba(255,255,255,.5);
				}
				// background: red;
			}
		}

	}
</style>