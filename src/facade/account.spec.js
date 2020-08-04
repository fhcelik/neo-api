const chai = require('chai');
var expect = chai.expect;
var should = chai.should;
const { calculateDeposit, 
        getAccounts, 
        depositMoney, 
        withdrawMoney, 
        transferMoney } = require('./accounts');
  
    describe('accounts', () => {
        
        describe('calculateDeposit()', () => {
            it('should return 0 for bad inputs', () => {
                expect(calculateDeposit(null, null)).to.equal(0);
                expect(calculateDeposit(undefined, undefined)).to.equal(0);
                expect(calculateDeposit(1000, 'TRL')).to.equal(0);
                expect(calculateDeposit(0,'')).to.equal(0);
                expect(calculateDeposit(-100,'CAD')).to.equal(0);
            });
            
            it('should return convert currency', () => {
                expect(calculateDeposit(1000,'MXN')).to.equal(100);
                expect(calculateDeposit(1000,'USD')).to.equal(2000);
                expect(calculateDeposit(1000, 'CAD')).to.equal(1000);
             });
        });

        describe('getAccounts()', () => {
            it('should return account summary for customer ID', () => {
                expect(getAccounts(777)).to.deep.include({"accountId":1234,"custId":777,"balance":0});
            });
        });

        describe('depositMoney()', () => {
            it('should add money to account for account ID', () => {
                depositMoney(2001, 1000, 'MXN');
                expect(getAccounts(504)).to.deep.include({"accountId":1234,"custId":777,"balance":0});
            });
        });
        describe('withdrawMoney()', () => {
            it('should reduce money to account for account ID', () => {
                withdrawMoney(2001, 1000, 'MXN');
                expect(getAccounts(504)).to.deep.include({"accountId":1234,"custId":777,"balance":0});
            });
        });
        describe('transferMoney()', () => {
            it('should reduce money to account for account ID', () => {
                transferMoney(2001, 1000, 'MXN');
                expect(getAccounts(504)).to.deep.include({"accountId":1234,"custId":777,"balance":0});
            });
        });
});