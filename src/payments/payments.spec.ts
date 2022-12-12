import { expect } from 'chai';
import { Payment, UsersTotalPayments } from './models/interfaces';
import { getUsersTotalPayment, initPayments } from './payments';

const mockPayments: Payment[] = [
  { user: 'coach', amount: 2.5 },
  { user: 'ellis', amount: 2.6 },
  { user: 'rochelle', amount: 4.5 },
  { user: 'ellis', amount: 0.65 },
];

const mockPaymentsMap: UsersTotalPayments = { coach: 2.5, ellis: 3.25, rochelle: 4.5 };

describe('Payments', () => {
  describe('initPayments', () => {
    context('when json file is invalid', () => {
      it('throws Error', () => {
        try {
          initPayments('../../mocks/invalid-test-payments.json');
          throw new Error('Should error before this');
        } catch (err) {
          const expectedError = new Error('Unable to load payments');
          const { message } = err as Error;
          expect(message).to.equal(expectedError.message);
        }
      });
    });

    context('when json file is valid', () => {
      it('returns array of payments', () => {
        try {
          const payments: Payment[] = initPayments('../../mocks/valid-test-payments.json');
          expect(payments).to.deep.equal(mockPayments);
        } catch (err) {
          throw new Error('Should not have error');
        }
      });
    });
  });

  describe('getUsersTotalPayment', () => {
    it('returns map of payment total for each user', () => {
      expect(getUsersTotalPayment(mockPayments)).to.deep.equal(mockPaymentsMap);
    });
  });
});
