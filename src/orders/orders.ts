import { DrinkPriceMap } from '../prices/models/interfaces';
import { Order, OrderTotals } from './models/interfaces';

/**
 * Loads json file provided into Orders
 * @param file - path to json file
 * @returns Array of Order
 */
export const initOrders = (file = '../../data/orders.json'): Order[] => {
  try {
    const orders: Order[] = require(file);
    return orders;
  } catch (err) {
    throw new Error('Unable to load orders');
  }
};

/**
 * Calculates total cost of each user's orders
 * @param orders Array containing orders of all users
 * @param drinkPriceMap Map for drink prices
 * @returns OrderTotals
 */
export const getUsersTotalCost = (orders: Order[], drinkPriceMap: DrinkPriceMap): OrderTotals => {
  return orders.reduce((totals, { user, drink, size }) => {
    const cost = drinkPriceMap[drink] && drinkPriceMap[drink][size];

    if (!cost) {
      throw new Error(`Price not recorded for ${drink} drink, ${size} size. Please see reception!`);
    }

    const userSubtotal = totals[user] ?? 0;
    totals[user] = userSubtotal + cost;

    return totals;
  }, {} as OrderTotals);
};
