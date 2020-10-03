'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Sign = app.model.define('sign', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键递增' },
    activity_id: { type: INTEGER, comment: '活动id' },
    user_id: { type: INTEGER, comment: '用户ID' },
    updated_at: { type: DATE, comment: '更新时间' },
    created_at: { type: DATE, comment: '创建时间' },
  });

  return Sign;
};
