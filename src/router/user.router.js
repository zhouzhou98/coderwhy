const Router = require('koa-router')
const {
  create,
  avatarInfo 
} = require('../controller/user.controller')

const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')
// 路径- 中间件处理的映射
const userRouter = new Router({prefix: '/users'})
userRouter.post('/', verifyUser, handlePassword, create)
userRouter.get('/:userId/avatar', avatarInfo)
module.exports = userRouter