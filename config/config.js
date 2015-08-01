'use strict';

var config = {
  host: process.env.OPENSHIFT_NODEJS_IP || '',
  port: process.env.OPENSHIFT_NODEJS_PORT || 80
};

module.exports = function () {
  return config;
};
