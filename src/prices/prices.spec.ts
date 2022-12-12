import { getDrinkPriceMap, initDrinkPrices } from './prices';
import { expect } from 'chai';
import { DrinkPrice } from './models/interfaces';
import { mockDrinkPrices, mockDrinkPriceMap } from '../../mocks/mocks';

describe('Prices', () => {
  describe('initDrinkPrices', () => {
    context('when json file is invalid', () => {
      it('throws Error', () => {
        try {
          initDrinkPrices('../../mocks/invalid-test-prices.json');
          throw new Error('Should error before this');
        } catch (err) {
          const expectedError = new Error('Unable to load drink prices');
          const { message } = err as Error;
          expect(message).to.equal(expectedError.message);
        }
      });
    });

    context('when json file is valid', () => {
      it('returns array of drink prices', () => {
        try {
          const drinkPrices: DrinkPrice[] = initDrinkPrices('../../mocks/valid-test-prices.json');
          expect(drinkPrices).to.deep.equal(mockDrinkPrices);
        } catch (err) {
          throw new Error('Should not have error');
        }
      });
    });
  });

  describe('getDrinkPriceMap', () => {
    it('returns map of drink price based on sizes', () => {
      expect(getDrinkPriceMap(mockDrinkPrices)).to.deep.equal(mockDrinkPriceMap);
    });
  });
});
