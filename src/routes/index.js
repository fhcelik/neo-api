'use strict';

const router = require('express').Router();
const { version: apiVersion } = require('../../package');
const authentication = require('./middleware/authentication');
const errorHandler = require('./middleware/errorHandler');
const accounts = require('./account');
const deposit = require('./deposit');
const withdraw = require('./withdraw');
const transfer = require('./transfer');

router.get('/', (req, res, next) => {
  res.send(`API v${apiVersion}`);
});

router.use('/login',authentication);
router.use('/accounts', accounts);
router.use('/deposit', deposit);
router.use('/withdraw', withdraw);
router.use('/transfer', transfer);
router.use(errorHandler);

module.exports = router;