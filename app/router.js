'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.resources('users', '/users', controller.users);
  router.post('users', '/users', controller.users.create); // 注册用户
  router.get('users', '/users/:id', controller.users.show);
};
