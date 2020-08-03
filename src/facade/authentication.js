'use strict';

const fs = require('fs');

const customers = fs.readFileSync('src/data/customers.json', 'utf8');

exports.verifyCustomer = (custId) => {

    const customerIds = JSON.parse(customers)
    
    const customerId = customerIds.filter(customer =>{ 
        const { custId:customerId } = customer;
    
        return customerId == custId; 
    })
  
    if (customerId.length === 0)
        {
            return false;
        }
 
    return true;
}


