'use strict';
// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  // 根据ID查询用户信息
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  }
  // 注册用户
  async create() {
    const ctx = this.ctx;
    const { username, password, groupid } = ctx.request.body;
    const user = await ctx.model.User.create({ username, password, groupid });
    ctx.status = 201;
    ctx.body = user;
  }

}

module.exports = UserController;
