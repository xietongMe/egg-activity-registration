'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('activities', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键递增' },
      title: { type: STRING(30), comment: '活动名称' },
      created_user_name: { type: STRING(30), comment: '发布者' },
      registration_start_at: { type: DATE, comment: '报名开始时间' },
      registration_end_at: { type: DATE, comment: '报名结束时间' },
      start_at: { type: DATE, comment: '活动开始时间' },
      end_at: { type: DATE, comment: '活动结束时间' },
      sign_start_at: { type: DATE, comment: '签到开始时间' },
      sign_end_at: { type: DATE, comment: '签到结束时间' },
      sign_method: { type: STRING(30), comment: '签到方式' },
      address: { type: STRING(30), comment: '活动地点' },
      content: { type: STRING(255), comment: '活动内容' },
      max_number: { type: INTEGER, comment: '最大人数' },
      current_number: { type: INTEGER, defaultValue: 0, comment: '当前报名人数' },
      created_at: DATE,
      updated_at: DATE,
    });
  },
};
