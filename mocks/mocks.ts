import { Order, OrderTotals } from '../src/orders/models/interfaces';
import { DrinkPriceMap, DrinkPrice } from '../src/prices/models/interfaces';
import { UserAccount, UserAccountSummary } from '../src/users/models/interfaces';

export const mockOrders = [
  { user: 'coach', drink: 'long black', size: 'medium' },
  { user: 'ellis', drink: 'long black', size: 'small' },
  { user: 'rochelle', drink: 'flat white', size: 'large' },
  { user: 'coach', drink: 'flat white', size: 'large' },
  { user: 'zoey', drink: 'long black', size: 'medium' },
  { user: 'zoey', drink: 'short espresso', size: 'small' },
] as Order[];

export const mockDrinkPriceMap: DrinkPriceMap = {
  'flat white': {
    large: 4.5,
    medium: 4,
    small: 3.5,
  },
  latte: {
    large: 4.5,
    medium: 4,
    small: 3.5,
  },
  'long black': {
    medium: 3.5,
    small: 3.25,
  },
  mocha: {
    large: 5,
    medium: 4.5,
    small: 4,
  },
  'short espresso': {
    small: 3.03,
  },
  supermochacrapucaramelcream: {
    huge: 5.5,
    large: 5,
    mega: 6,
    ultra: 7,
  },
};

export const mockDrinkPrices: DrinkPrice[] = [
  { drink_name: 'short espresso', prices: { small: 3.03 } },
  { drink_name: 'latte', prices: { small: 3.5, medium: 4.0, large: 4.5 } },
  { drink_name: 'flat white', prices: { small: 3.5, medium: 4.0, large: 4.5 } },
  { drink_name: 'long black', prices: { small: 3.25, medium: 3.5 } },
  { drink_name: 'mocha', prices: { small: 4.0, medium: 4.5, large: 5.0 } },
  { drink_name: 'supermochacrapucaramelcream', prices: { large: 5.0, huge: 5.5, mega: 6.0, ultra: 7.0 } },
];

export const mockTotalCost: OrderTotals = {
  coach: 8,
  ellis: 3.25,
  rochelle: 4.5,
  zoey: 6.529999999999999,
};

export const mockUsersWithoutBalance: UserAccountSummary = {
  coach: { order_total: 8.0, payment_total: 2.5 },
  ellis: { order_total: 3.25, payment_total: 3.25 },
  rochelle: { order_total: 4.5, payment_total: 4.5 },
  zoey: { order_total: 6.53, payment_total: 0.0 },
};

export const mockUsers: UserAccountSummary = {
  coach: { order_total: 8.0, payment_total: 2.5, balance: 5.5 },
  ellis: { order_total: 3.25, payment_total: 3.25, balance: 0.0 },
  rochelle: { order_total: 4.5, payment_total: 4.5, balance: 0.0 },
  zoey: { order_total: 6.53, payment_total: 0.0, balance: 6.53 },
};

export const mockResults: UserAccount[] = [
  { user: 'coach', order_total: 8.0, payment_total: 2.5, balance: 5.5 },
  { user: 'ellis', order_total: 3.25, payment_total: 3.25, balance: 0.0 },
  { user: 'rochelle', order_total: 4.5, payment_total: 4.5, balance: 0.0 },
  { user: 'zoey', order_total: 6.53, payment_total: 0.0, balance: 6.53 },
];
