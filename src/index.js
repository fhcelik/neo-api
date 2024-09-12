'use strict';

const app = require('./app');
const env = require('./env');

app.listen(env.APP_PORT, () => {
    console.log(`Server is running on http://${env.APP_HOST}:${env.APP_PORT}`)});
