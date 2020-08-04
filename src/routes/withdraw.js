'use strict';

const R = require('ramda');
const router = require('express').Router();
const {  withdrawMoney } = require('../facade/accounts');


router.put('/', async (req, res, next) => {
    try {
        const { accId, amount, currency, custId } = req.body;
        if(!(accId && amount && currency && custId)) {
            return next();
        }
        await withdrawMoney(accId, Number(amount), currency, custId);
        
        res.sendStatus(204);
    }
    catch(error){
        return next(error)
    }
});

module.exports = router;