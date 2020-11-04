// 引入路由模块
const getRouter = require('router')
// 导入集合创建规则和创建的集合
const Student = require('../model/user')
// 引入模板引擎模块
const template = require('art-template')
// 引入querystring模块进行字符串的转换
const querystring = require('querystring')

// 获取路由对象
const router = getRouter()

// 创建路由
// 呈现学生档案信息页面
router.get('/add',(req,res) => {
  let html = template('index',{})
  res.end(html)
})
// 呈现学生档案信息列表页面
router.get('/list',async (req,res) => {
  // 查询学生信息
  let students = await Student.find()
  // console.log(students);
  let html = template('list',{
    students:students
  })
  res.end(html)
})
// 实现学生信息添加功能路由
router.post('/add',(req,res) => {
  // 接收post参数
  let formData = '';
  // 接收参数
  req.on('data',param => {
    formData += param
  })
  // 请求参数结束结束
  req.on('end',async () => {
    // 对接受到的参数格式进行解析,并将当前参数插入到创建的学生数据库中
    await Student.create(querystring.parse(formData))
    // 重定向
    res.writeHead(301,{
      Location:'/list'
    })
    res.end('ok')
  })
})

module.exports = router