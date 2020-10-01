'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('enrollment', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键递增' },
      activity_id: { type: INTEGER, comment: '活动id' },
      user_id: { type: INTEGER, comment: '用户ID' },
      sign: { type: INTEGER, defaultValue: 0, comment: '是否签到,0为未签到，1为已签到' },
      created_at: { type: DATE, comment: '创建时间' },
    });
  },
};
