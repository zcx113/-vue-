var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()
var router = express.Router()

//简单路由
router.get('/', function(req, res, next) {
	req.url = '/index.html'
	next()
})

app.use(router)


var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

// 创建一个路由模块
var apiRouter = express.Router()



// 定义路由
apiRouter.get('/seller',function(req,res){
  res.json({
    errno: 0,
    data: seller
  })
})

apiRouter.get('/goods',function(req,res){
  res.json({
    errno: 0,
    data: goods
  })
})

apiRouter.get('/ratings',function(req,res){
  res.json({
    errno: 0,
    data: ratings
  })
})
// 在应用中加载路由模块
app.use('/api',apiRouter)

//static目录
app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
