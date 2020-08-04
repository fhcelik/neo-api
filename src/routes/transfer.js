'use strict';

const R = require('ramda');
const router = require('express').Router();
const {  transferMoney } = require('../facade/accounts');


router.put('/', async (req, res, next) => {
    try {
        const { account, targetAccount, amount, custId } = req.body;
        if(!(accId && amount && currency && custId)) {
            return next();
        }
        await transferMoney(account, targetAccount, Number(amount), custId);
        
        res.sendStatus(204);
    }
    catch(error){
        return next(error)
    }
});

module.exports = router;