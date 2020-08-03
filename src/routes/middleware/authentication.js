'use strict';

const R = require('ramda');
const router = require('express').Router();
const {  verifyCustomer } = require('../../facade/authentication');
const {  getAccounts } = require('../../facade/accounts');

/**
 * @swagger
 *
 * /User:
 *   put:
 *     description: Save user log 
 *     summary: Save email
 *     tags: ['User']
 *     responses:
 *       204:
 *         description: a map of user 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         $ref: '#/components/responses/Undefined'
 */
router.put('/', async (req, res, next) => {
    try {
        const custId = R.path(['headers', 'x-user'], req);
        
        if(await verifyCustomer(custId))    
            res.sendStatus(204);
        res.sendStatus(401);
    }
    catch(error){
        return next(error)
    }
});

module.exports = router;