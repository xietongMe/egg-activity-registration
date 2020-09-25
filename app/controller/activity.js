'use strict';

const Controller = require('egg').Controller;

class ActivityController extends Controller {
  async createActivity() {
    const ctx = this.ctx;
    if (ctx.state.user.groupid === 1) {
      const { title, created_user_name, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number } = ctx.request.body;
      const activity = await ctx.service.activity.creatActivity(title, created_user_name, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number);
      ctx.body = {
        code: 0,
        message: '活动创建成功',
        data: { activity },
      };
    } else {
      ctx.body = {
        code: -1,
        message: '创建失败，权限不足',
        data: {},
      };
    }
  }
}

module.exports = ActivityController;
