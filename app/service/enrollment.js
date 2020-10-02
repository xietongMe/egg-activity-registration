'use strict';
// app/service/news.js
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
const Service = require('egg').Service;
// const { sequelize } = require('sequelize');
// const sequelize = new Sequelize('egg-activity-registration', 'root', 'root', { host: 'localhost', port: 8889 });
class EnrollmentService extends Service {
  /**
     * @function creatActivity
     * @param {title,created_user_name,registration_start_at,registration_end_at}活动名称,发布者,报名开始时间,报名结束时间
     * @params {start_at,end_at,sign_start_at,sign_end_at,sign_method,address,content,max_number}活动开始时间,活动结束时间,签到开始时间,签到结束时间,签到方式,活动地点,活动内容,最大人数
     * @return {isValid}  判断密码是否正确
     */
  async creatEnrollmentRecord(activity_id, user_id) {
    try {
      await this.ctx.model.transaction(async t => {
        await this.ctx.model.Enrollment.create({
          activity_id, user_id,
        }, { transaction: t });
        const activity = await this.ctx.model.Activity.findByPk(activity_id);
        const current_number = toInt(activity.current_number) + 1;
        await activity.update({
          current_number,
        }, { transaction: t });
      });
      // 如果执行到此行,则表示事务已成功提交,`result`是事务返回的结果
      // `result` 就是从事务回调中返回的结果(在这种情况下为 `user`)
    } catch (error) {
      console.log('\n' + 12345 + error);
      // 如果执行到此,则发生错误.
      // 该事务已由 Sequelize 自动回滚！
    }
  }

  async updateActivity(id, title, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number, weight) {
    const activity = await this.ctx.model.Activity.findByPk(id);
    await activity.update({
      title, registration_start_at, registration_end_at, start_at, end_at, sign_start_at, sign_end_at, sign_method, address, content, max_number, weight,
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
module.exports = EnrollmentService;
