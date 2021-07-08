export interface IStockRule {
    // [x: string]: any;
    day_of_week: number;
    value: number;
    weight: number;
    price: number;
    inventory_quantity: number
}

export interface IStockRuleExceptions {
    date: Date;
    inventory_quantity: number
}