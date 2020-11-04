// 引入http模块
const http = require('http')
// 引入path模块
const path = require('path')
// 导入数据库连接模块
require('./model/connect')
// 引入模板引擎模块
const template = require('art-template')
// 引入静态资源处理 serve-static模块
const serveStatic = require('serve-static')
// 进行时间的格式化处理，导入dateformat模块
const dateFormat = require('dateformat')
// 导入路由模块
const router = require('./route/index')

// 实现静态资源访问服务
const serve = serveStatic(path.join(__dirname,'public'))

// 配置模板根目录
template.defaults.root = path.join(__dirname,'views')
// 设置模板默认后缀
template.defaults.extname = '.art'
// 处理时间日期的格式
template.defaults.imports.dateFormat = dateFormat 

// 创建网站服务器
const app = http.createServer()

// 客户端发送请求处理
app.on('request',(req,res) =>{
  // res.end('ok')
  // 调用路由
  router(req,res,() => { })
  // 调用静态资源访问
  serve(req,res,() => {

  })

})

// 监听一个端口
app.listen(3000)
console.log('服务器启动成功！');