export interface Account {
  balance?: number;
  order_total?: number;
  payment_total?: number;
}

export type UserAccount =
  | Account
  | {
      user: string;
    };

export interface UserAccountSummary {
  [user: string]: Account;
}
