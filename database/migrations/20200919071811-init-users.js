'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '主键递增' },
      username: { type: STRING(30), unique: true, comment: '用户名' },
      password: { type: STRING(128), comment: '密码' },
      groupid: { type: INTEGER(2), comment: '不同权限，0为C端用户，1为B端用户，2为P端用户' },
      created_at: DATE,
      updated_at: DATE,
    });
  },
};
