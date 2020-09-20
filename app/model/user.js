'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING(30), unique: true, comment: '用户名' },
    password: { type: STRING(128), comment: '密码' },
    groupid: { type: INTEGER, comment: '不同权限，0为C端用户，1为B端用户，2为P端用户' },
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
