/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587106578065_1517';

  // add your middleware config here
  config.middleware = [];

  // cors的配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*'] //配置白名单
  };

  config.cors = {
    origin: '*', //允许所有跨域访问，若注释掉，则允许上面白名单访问
    credentials: true, //允许cookie跨域
    allowMethods: 'GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS'
  };

  // mysql config
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'vue-manage'
    },
    app: true,
    agent: false
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  return {
    ...config,
    ...userConfig,
  };
};
