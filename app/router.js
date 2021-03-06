'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.resources('users', '/users', controller.users);
  router.post('register', '/users/register', controller.users.register); // 注册用户
  router.get('login', '/users/login', controller.users.login); // 登录获取token
  router.get('users', '/users/:id', controller.users.show);

  router.post('activity', '/activity', app.jwt, controller.activity.createActivity); // 创建活动
  router.put('activity', '/activity', app.jwt, controller.activity.updateActivity); // 更新活动
  router.get('activity', '/activity', app.jwt, controller.activity.getActivityList); // 获取活动列表
  router.put('activity', '/activity/top', app.jwt, controller.activity.topActivity); // 置顶活动
  router.post('activity', '/activity/sign', app.jwt, controller.activity.signActivity); // 活动签到

  router.post('enrollment', '/enrollment', app.jwt, controller.enrollment.createEnrollmentRecord); // 活动报名
  router.get('enrollment', '/enrollment', app.jwt, controller.enrollment.getEnrollmentRecord); // 获取用户活动报名信息


};
