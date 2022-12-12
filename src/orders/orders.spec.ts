import { expect } from 'chai';
import { Order } from './models/interfaces';
import { getUsersTotalCost, initOrders } from './orders';
import { mockOrders, mockTotalCost, mockDrinkPriceMap } from '../../mocks/mocks';
import { DrinkPriceMap } from '../prices/models/interfaces';

describe('Orders', () => {
  describe('initOrders', () => {
    context('when json file is invalid', () => {
      it('throws Error', () => {
        try {
          initOrders('../../mocks/invalid-test-orders.json');
          throw new Error('Should error before this');
        } catch (err) {
          const expectedError = new Error('Unable to load orders');
          const { message } = err as Error;
          expect(message).to.equal(expectedError.message);
        }
      });
    });

    context('when json file is valid', () => {
      it('returns array of orders', () => {
        try {
          const orders: Order[] = initOrders('../../mocks/valid-test-orders.json');
          expect(orders).to.deep.equal(mockOrders);
        } catch (err) {
          throw new Error('Should not have error');
        }
      });
    });
  });

  describe('getUsersTotalCost', () => {
    context('when drinks price is invalid', () => {
      it('throws Error', () => {
        try {
          const invalidPriceMap = {} as DrinkPriceMap;
          getUsersTotalCost(mockOrders, invalidPriceMap);
          throw new Error('Should error before this');
        } catch (err) {
          const expectedError = new Error(
            'Price not recorded for long black drink, medium size. Please see reception!',
          );
          const { message } = err as Error;
          expect(message).to.equal(expectedError.message);
        }
      });
    });

    context('when drinks price is valid', () => {
      it('returns map of total costs for users', () => {
        expect(getUsersTotalCost(mockOrders, mockDrinkPriceMap)).to.deep.equal(mockTotalCost);
      });
    });
  });
});
