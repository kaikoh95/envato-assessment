import { UserAccount, UserAccountSummary } from './models/interfaces';

/**
 * Mutates UserAccountSummary by updating balance in each user account based on payments and order totals
 * @param users - User account summary to calculate payments and order totals
 */
export const updateUserBalance = (users: UserAccountSummary) => {
  for (const [user, { payment_total: paymentTotal = 0, order_total: orderTotal = 0 }] of Object.entries(users)) {
    users[user].balance = orderTotal - paymentTotal;
  }
};

/**
 * Get final format of user accounts showing user name, total payment, total order and balance
 * @param users - User account summary
 * @returns UserAccount[]
 */
export const formatUserAccounts = (users: UserAccountSummary): UserAccount[] => {
  const userAccounts: UserAccount[] = [];

  for (const [user, account] of Object.entries(users)) {
    const userAccount: UserAccount = {
      ...account,
      user,
    };
    userAccounts.push(userAccount);
  }

  return userAccounts;
};
