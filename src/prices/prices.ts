import { DrinkPrice, DrinkPriceMap } from './models/interfaces';

/**
 * Loads array of drink prices json file provided
 * @param file - path to json file
 * @returns DrinkPrice[]
 */
export const initDrinkPrices = (file = '../../data/prices.json'): DrinkPrice[] => {
  try {
    const drinkPrices: DrinkPrice[] = require(file);
    return drinkPrices;
  } catch (err) {
    throw new Error('Unable to load drink prices');
  }
};

/**
 * Consolidates DrinkPrice array into object by tallying drinks with same names
 * @param drinkPrices array of drink prices to process
 * @returns DrinkPriceMap
 */
export const getDrinkPriceMap = (drinkPrices: DrinkPrice[]): DrinkPriceMap => {
  return drinkPrices.reduce((priceMap, { drink_name: drinkName, prices }) => {
    priceMap[drinkName] = prices;
    return priceMap;
  }, {} as DrinkPriceMap);
};
