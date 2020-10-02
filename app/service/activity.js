'use strict';
// app/service/news.js

const Service = require('egg').Service;

class ActivityService extends Service {
  /**
     * @function creatActivity
     * @param {title,created_user_name,registration_start_at,registration_end_at}活动名称,发布者,报名开始时间,报名结束时间
     * @params {start_at,end_at,sign_start_at,sign_end_at,sign_method,address,content,max_number}活动开始时间,活动结束时间,签到开始时间,签到结束时间,签到方式,活动地点,活动内容,最大人数
     * @return {isValid}  判断密码是否正确
     */
  async creatActivity(title, created_user_name, created_user_id, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number) {
    const activity = await this.ctx.model.Activity.create({
      title, created_user_name, created_user_id, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number,
    });
    return activity;
  }

  async updateActivity(id, title, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number, weight) {
    const activity = await this.ctx.model.Activity.findByPk(id);
    await activity.update({
      title, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number, weight,
    });
    return activity;
  }
  // 置顶活动
  async topActivity(id) {
    const activity = await this.ctx.model.Activity.findByPk(id);
    await activity.update({
      weight: 1,
    });
    return activity;
  }

  async getAllActivityList() {
    const activity = await this.ctx.model.Activity.findAll({
      order: [
        [ 'weight', 'DESC' ],
        [ 'updated_at', 'DESC' ],
      ],
    }
    );
    return activity;
  }
  async getActivityListById(created_user_id) {
    const activity = await this.ctx.model.Activity.findAll({
      where: {
        created_user_id,
      },
    });
    return activity;
  }
}
module.exports = ActivityService;
