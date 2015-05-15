'use strict';
var config = require('config');
var logger = require('hoist-logger');
module.exports = function (server) {
  server.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
      logger.error(err);
      logger.alert(err);
      return;
    }
    server.auth.strategy('session', 'cookie', {
      password: config.get('Hoist.cookies.overlord.password'),
      cookie: config.get('Hoist.cookies.overlord.name'),
      redirectTo: '/session/create',
      isSecure: config.get('Hoist.cookies.overlord.secure')
    });
  });
};