'use strict';
// app/service/news.js

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * @method passwordIsValid
   * @param {username,password}
   * @return {isValid}  判断密码是否正确
   */
  async passwordIsValid(username, password) {
    const user = await this.ctx.model.User.findAll({
      where: {
        username,
      },
      raw: true,
    });
    const isValid = (user[0].password === password);
    return isValid;
  }
  /**
   * @method getUserInfo
   * @param {username}
   * @return {user}  返回用户信息
   */
  async getUserInfo(username) {
    const user = await this.ctx.model.User.findAll({
      where: {
        username,
      },
      raw: true,
    });
    return user[0];
  }
}
module.exports = UserService;
