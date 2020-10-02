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
     * @function creatEnrollmentRecord
     * @param {activity_id,user_id}活动id，user_id
     */
  async creatEnrollmentRecord(activity_id, user_id) {
    try {
      await this.ctx.model.transaction(async t => {
        await this.ctx.model.Enrollment.create({
          activity_id, user_id,
        }, { transaction: t });
        const activity = await this.ctx.model.Activity.findByPk(activity_id);
        const current_number = toInt(activity.current_number) + 1;
        const result = await activity.update({
          current_number,
        }, { transaction: t });
        return result;
      });
    } catch (error) {
      console.log('\n' + 12345 + error);
      // 如果执行到此,则发生错误.
      // 该事务已由 Sequelize 自动回滚！
    }
  }
  async getEnrollmentRecordList(user_id) {
    const enrollment_record = await this.ctx.model.Enrollment.findAll({
      where: {
        user_id,
      },
      raw: true,
    });
    for (let i = 0; i < enrollment_record.length; i++) {
      enrollment_record[i].activity = await this.ctx.model.Activity.findByPk(enrollment_record[i].activity_id);
    }
    console.log(enrollment_record.length);
    return enrollment_record;
  }
}
module.exports = EnrollmentService;
