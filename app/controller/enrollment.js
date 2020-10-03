'use strict';

const Controller = require('egg').Controller;

class EnrollmentController extends Controller {
  // 活动报名
  async createEnrollmentRecord() {
    const ctx = this.ctx;
    if (ctx.state.user.groupid === 0) {
      const { activity_id } = ctx.request.body;
      const user_id = ctx.state.user.id;
      const result = await ctx.service.enrollment.creatEnrollmentRecord(activity_id, user_id);
      ctx.body = {
        code: 0,
        message: '活动报名成功',
        data: { result },
      };
    } else {
      ctx.body = {
        code: -1,
        message: '报名失败，权限不足',
        data: {},
      };
    }
  }

  // 获取活动报名信息
  async getEnrollmentRecord() {
    const ctx = this.ctx;
    if (ctx.state.user.groupid === 0) {
      const user_id = ctx.state.user.id;
      const result = await ctx.service.enrollment.getEnrollmentRecordList(user_id, user_id);
      ctx.body = {
        code: 0,
        message: '获取信息成功',
        data: { result },
      };
    } else {
      ctx.body = {
        code: -1,
        message: '获取信息失败，权限不足',
        data: {},
      };
    }
  }


}

module.exports = EnrollmentController;
