import { Payment, UsersTotalPayments } from './models/interfaces';

/**
 * Loads json file provided into Payment array
 * @param file - path to json file
 * @returns Payment
 */
export const initPayments = (file = '../../data/payments.json'): Payment[] => {
  try {
    const payments: Payment[] = require(file);
    return payments;
  } catch (err) {
    throw new Error('Unable to load payments');
  }
};

/**
 * Maps Payment array into object
 * @param payments array of Payment to process
 * @returns UsersTotalPayments
 */
export const getUsersTotalPayment = (payments: Payment[]): UsersTotalPayments => {
  return payments.reduce((totalPayments, { user, amount }) => {
    const userSubtotal = totalPayments[user] ?? 0;
    totalPayments[user] = userSubtotal + amount;

    return totalPayments;
  }, {} as UsersTotalPayments);
};
