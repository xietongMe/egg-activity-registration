'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.resources('users', '/users', controller.users);
  router.post('register', '/users/register', controller.users.register); // 注册用户
  router.get('login', '/users/login', controller.users.login); // 登录
  router.get('users', '/users/:id', controller.users.show);
};
