'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/users', controller.home.userInfo);
  router.post('/login', controller.home.loginCheck);
  router.post('/users',controller.home.addUserInfo);
  router.get('/users/:id',controller.home.editUserInfo);
  router.post('/editusers',controller.home.editUser);
  router.delete('/users/:id',controller.home.deleteUserInfo);
  router.get('/auths/list',controller.home.authInfo);
  router.get('/auths',controller.home.rolesInfo);

  
};
