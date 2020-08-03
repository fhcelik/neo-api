'use strict';

const R = require('ramda');
const router = require('express').Router();
const {  transferMoney } = require('../facade/accounts');

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
        const { account, targetAccount, amount } = req.body;
        
        await transferMoney(account, targetAccount, Number(amount));
        
        res.sendStatus(204);
    }
    catch(error){
        return next(error)
    }
});

module.exports = router;