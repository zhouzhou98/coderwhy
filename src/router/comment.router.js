const Router = require('koa-router')

const commentRouter = new Router({prefix:'/comment'})

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller')
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply);

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
module.exports = commentRouter

// 获取评论列表
commentRouter.get('/', list)