'use strict';

const Controller = require('egg').Controller;

class ActivityController extends Controller {
  // 新建活动
  async createActivity() {
    const ctx = this.ctx;
    if (ctx.state.user.groupid === 1) {
      const created_user_name = ctx.state.user.username;
      const created_user_id = ctx.state.user.id;
      const { title, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number } = ctx.request.body;
      const activity = await ctx.service.activity.creatActivity(title, created_user_name, created_user_id, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number);
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

  // 更新活动
  async updateActivity() {
    const ctx = this.ctx;
    if (ctx.state.user.groupid === 1) {
      const { id, title, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number, weight } = ctx.request.body;
      const activity = await ctx.service.activity.updateActivity(id, title, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number, weight);
      ctx.body = {
        code: 0,
        message: '活动更新成功',
        data: { activity },
      };
    } else {
      ctx.body = {
        code: -1,
        message: '更新失败，权限不足',
        data: {},
      };
    }
  }

  // 获取活动列表或者详细信息，自动判断用户组来返回活动列表信息
  async getActivityList() {
    const ctx = this.ctx;
    if (ctx.state.user.groupid === 1) {
      const created_user_id = ctx.state.user.id;
      const activity = await ctx.service.activity.getActivityListById(created_user_id);
      ctx.body = {
        code: 0,
        message: '活动获取成功',
        data: { activity },
      };
    } else {
      const activity = await ctx.service.activity.getAllActivityList();
      ctx.body = {
        code: 0,
        message: '活动获取成功',
        data: { activity },
      };
    }
  }

  // 置顶活动
  async topActivity() {
    const ctx = this.ctx;
    if (ctx.state.user.groupid === 2) {
      const { id } = ctx.request.body;
      const activity = await ctx.service.activity.topActivity(id);
      ctx.body = {
        code: 0,
        message: '活动置顶成功',
        data: { activity },
      };
    } else {
      ctx.body = {
        code: -1,
        message: '置顶失败，权限不足',
        data: {},
      };
    }
  }
}

module.exports = ActivityController;
