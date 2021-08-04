export type DayNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface IStockRule {
  id: number;
  day_of_week: DayNumbers;
  weight: number;
  price: number;
  inventory_quantity: number;
}

export interface IStockRuleExceptions {
  date: Date;
  inventory_quantity: number;
}