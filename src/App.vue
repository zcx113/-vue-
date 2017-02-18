<template>
  <div>
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <a href="" v-link="{path: '/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a href="" v-link="{path: '/ratings'}">评价</a>
      </div>
      <div class="tab-item">
        <a href="" v-link="{path: '/seller'}">商家</a>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from './components/header/header'
  const ERR_OK = 0
  export default {
    components: {
      'v-header': header
    },
    created () {
      // 这里的this其实是一个vue实例
      this.$http.get('/api/seller').then(res => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.seller = res.data
        }
      })
    },
    data () {
      return {
        seller: {}
      }
    }
  }
  
</script>

<style lang="scss" rel="stylesheet/scss">
  @import 'common/scss/mixin.scss';
  .tab{
    display: flex;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7,17,27,.1));
    .tab-item{
      flex: 1;
      text-align: center;
      > a{
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
        &.active{
          color: rgb(240, 20, 20);
        }
      }
    }
  }

</style>
