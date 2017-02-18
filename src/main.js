import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import 'common/scss/index.scss'

// VueRouter、VueResource都是第三方插件，故需要显式注册到Vue
Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
	linkActiveClass: 'active'
})
let app = Vue.extend(App)
// 使用导入的App作为应用的模版
router.map({
	'/goods': {
		component: goods
	},
	'/ratings': {
		component: ratings
	},
	'/seller': {
		component: seller
	}
})
// 路由创建一个app实例并挂载到选择符#app匹配的元素上
router.start(app, '#app')
router.go('/goods')
