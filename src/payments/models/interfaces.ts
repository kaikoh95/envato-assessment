export interface Payment {
  user: string;
  amount: number;
}

export interface UsersTotalPayments {
  [user: string]: number;
}
