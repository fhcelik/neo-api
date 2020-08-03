'use strict';

const R = require('ramda');
const router = require('express').Router();
const {  withdrawMoney } = require('../facade/accounts');

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
        const { accId, amount, currency } = req.body;
        
        await withdrawMoney(accId, Number(amount), currency);
        
        res.sendStatus(204);
    }
    catch(error){
        return next(error)
    }
});

module.exports = router;