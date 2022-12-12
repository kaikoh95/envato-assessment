export enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Huge = 'huge',
  Mega = 'mega',
  Ultra = 'ultra',
}

export type Price = {
  [key in Size]?: number;
};

export interface DrinkPrice {
  ['drink_name']: string;
  prices: Price;
}

export interface DrinkPriceMap {
  [drinkName: string]: Price;
}
