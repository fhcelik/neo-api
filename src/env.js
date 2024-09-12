'use strict';

const env = require('dotenv').config()

const { APP_HOST, APP_PORT, APP_WEB_HOST_URL } = env.parsed;

module.exports = 
  {
    APP_PORT,
    APP_HOST,
    APP_WEB_HOST_URL
  }
;