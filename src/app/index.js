const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./error-handle')
const useRoutes = require('../router/index')
const app = new Koa()
// 隐式this绑定
app.useRoutes = useRoutes
app.use(bodyParser())
app.useRoutes()
app.on('error', errorHandler)
module.exports = app