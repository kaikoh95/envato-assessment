import { Order, OrderTotals } from './orders/models/interfaces';
import { getUsersTotalCost, initOrders } from './orders/orders';
import { Payment, UsersTotalPayments } from './payments/models/interfaces';
import { getUsersTotalPayment, initPayments } from './payments/payments';
import { DrinkPrice, DrinkPriceMap } from './prices/models/interfaces';
import { getDrinkPriceMap, initDrinkPrices } from './prices/prices';
import { UserAccountSummary } from './users/models/interfaces';
import { formatUserAccounts, updateUserBalance } from './users/users';

// maintain user account summary (mock db)
const users: UserAccountSummary = {};

const main = () => {
  // - Load the list of prices
  const drinkPrices: DrinkPrice[] = initDrinkPrices();
  const drinkPriceMap: DrinkPriceMap = getDrinkPriceMap(drinkPrices);

  // - Load the orders
  const orders: Order[] = initOrders();

  // - Calculate the total cost of each user's orders
  const usersTotalCost: OrderTotals = getUsersTotalCost(orders, drinkPriceMap);

  // - because we don't have a record of all users,
  // I'm using this to tell how many users we have in total
  // while also maintaining a record of their order totals
  for (const [user, orderTotal] of Object.entries(usersTotalCost)) {
    users[user] = {
      ...users[user],
      order_total: orderTotal,
    };
  }

  // - Load the payments
  const payments: Payment[] = initPayments();

  // - Calculate the total payment for each user
  const usersTotalPayments: UsersTotalPayments = getUsersTotalPayment(payments);

  // - similarly for payments
  for (const [user, paymentTotal] of Object.entries(usersTotalPayments)) {
    users[user] = {
      ...users[user],
      payment_total: paymentTotal,
    };
  }

  // - Calculate what each user now owes
  updateUserBalance(users);

  // - Return a JSON string containing the results of this work.
  const results = formatUserAccounts(users);
  return JSON.stringify(results);
};

console.log(main());
