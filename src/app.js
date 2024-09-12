'use strict';

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const env = require('./env');
const Routes = require('./routes');
const app = express();

app
  .use(
    cors({
      origin: env.APP_WEB_HOST_URL,
      credentials: true,
    })
  )
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(compression())

  .use(Routes)


module.exports = app;