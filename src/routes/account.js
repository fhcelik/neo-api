'use strict';

const R = require('ramda');
const router = require('express').Router();
const {  getAccounts } = require('../facade/accounts');


router.get('/:value', async (req, res, next) => {
    try {
        const custId = R.path(['params', 'value'], req);
        console.log(req.params)
        const accounts = await getAccounts(custId)
        
        res.json(accounts)
        
    }
    catch(error){
        return next(error)
    }
});

module.exports = router;