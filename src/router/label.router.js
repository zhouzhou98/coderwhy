const Router = require('koa-router')

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')


const labelRouter = new Router({prefix: '/label'})

const {
  create,
  list
} = require('../controller/label.controller.js')
labelRouter.post('/', verifyAuth, create)
labelRouter.get('/', list)
module.exports = labelRouter