const momentService = require('../service/moment.service.js')
const fileService = require('../service/file.service')
const {
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file-path')
const fs = require('fs')
class MomentController {
  async create(ctx, next) {
    // 1. 获取数据
    const userId = ctx.user.id
    const content = ctx.request.body.content

    // 将数据插入到数据中
    const result = await momentService.create(userId, content)
    ctx.body = result

  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId
    // 根据id去查询数据
    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }
  async list(ctx, next) {
    // 获取数据
    const {offset, size} = ctx.query
    // 查询列表
    const result = await momentService.getMomentList(offset, size)
    ctx.body = result 
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    
    const result = await momentService.update(content, momentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    // 获取momentId
    const { momentId } = ctx.params
    
    // 删除内容
    const result = await momentService.remove(momentId)
    ctx.body = result
  }


  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params
    
    for(let label of labels) {
      // 判断标签是否和动态有关系
      const isExist = await momentService.hasLabel(momentId, label.id)
      
      if(!isExist) {
        
        await momentService.addLabel(momentId, label.id)
      }
    }
    ctx.body = "给动态添加标签成功~"
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    const types = ["small", "middle", "large"];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController()