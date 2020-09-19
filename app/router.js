'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.resources('users', '/users', controller.users);
  router.post('users', '/users', controller.users.create);
  router.get('users', '/users/:id', controller.users.show);
};
