'use strict';
// app/controller/users.js
// const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
module.exports = app => {
  class UserController extends app.Controller {
    // 用户登录
    async login() {
      const ctx = this.ctx;
      // const username = ctx.get('username');
      // const password = ctx.get('password');
      const { username, password } = ctx.request.body;
      const isValid = await ctx.service.user.passwordIsValid(username, password);
      if (isValid) {
        const userInfo = await ctx.service.user.getUserInfo(username);
        const token = app.jwt.sign({
          id: userInfo.id,
          username: userInfo.username,
          groupid: userInfo.groupid,
        }, app.config.jwt.secret);
        ctx.status = 201;
        ctx.body = {
          code: 0,
          message: '登录成功',
          data: {
            token,
          },
        };
      } else {
        ctx.body = {
          code: -1,
          message: '密码错误',
          data: {},
        };
      }
    }
    // 根据ID查询用户信息
    async show() {
      const ctx = this.ctx;
      ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
    }

    // 注册用户
    async register() {
      const ctx = this.ctx;
      const { username, password, groupid } = ctx.request.body;
      const user = await ctx.model.User.create({ username, password, groupid });
      ctx.status = 201;
      ctx.body = {
        code: 0,
        message: '注册成功',
        data: {
          user,
        },
      };
    }

  }
  return UserController;
};
// module.exports = UserController;
