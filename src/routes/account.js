'use strict';

const R = require('ramda');
const router = require('express').Router();
const {  getAccounts } = require('../facade/accounts');

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