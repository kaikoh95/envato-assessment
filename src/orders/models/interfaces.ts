import { Size } from '../../prices/models/interfaces';

export interface Order {
  user: string;
  drink: string;
  size: Size;
}

export interface OrderTotals {
  [user: string]: number;
}
