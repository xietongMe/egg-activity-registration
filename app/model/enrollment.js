'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Enrollment = app.model.define('enrollment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键递增' },
    activity_id: { type: INTEGER, comment: '活动id' },
    user_id: { type: INTEGER, comment: '用户ID' },
    sign: { type: INTEGER, defaultValue: 0, comment: '是否签到,0为未签到，1为已签到' },
    updated_at: { type: DATE, comment: '更新时间' },
    created_at: { type: DATE, comment: '创建时间' },
  });

  return Enrollment;
};
