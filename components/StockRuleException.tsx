import React, { Component, useCallback, useState } from 'react';
import {
  Button, DatePicker, Form, FormLayout, TextField,
} from '@shopify/polaris';
import moment from 'moment';
import { axios } from '../config/utils/axios';
import { IStockRuleExceptions } from '../interfaces/stockRules';

interface IState {
  selectedDate: { start: Date, end: Date };
  variants: IStockRuleExceptions[];
  quantity: string;
  month: number;
  year: number;
}

const date = new Date();

class StockRuleException extends Component<{}, IState> {
  state: IState = {
    ...this.state,
    selectedDate: { start: new Date(), end: new Date() },
    variants: [],
    quantity: null,
    month: date.getMonth(),
    year: date.getFullYear(),
  };

  protected getVariants = async (): Promise<void> => {
    const data = await axios
      .get('/api/stockRulesExceptions')
      .then(({ data }) => data);

    this.setState({ variants: data });
  };

  protected postVariant = async (e: any): Promise<void> => {
    e.preventDefault();

    const postData = {
      date: moment(this.state.selectedDate.start).format('YYYY-MM-DD'),
      inventory_quantity: this.state.quantity,
    };

    await axios.post('/api/stockRulesExceptions', postData).catch((err) => {
      console.log('Quantity error: ', err);
    });
  };

  protected changeHandler = (name: string, value: string): void => {
    this.setState({ [name]: value } as any);
  };

  componentDidMount(): void {
    this.getVariants();
  }

  protected setSelectedDate(selectedDate): void {
    this.setState({ selectedDate });
  }

  handleMonthChange = (month, year): void => {
    this.setState({ month, year });
  };

  protected renderDatePicker(): React.ReactNode {
    const { month, year } = this.state;

    return (
      <div>
        <DatePicker
          month={month}
          year={year}
          weekStartsOn={1}
          onChange={(selectedDate) => this.setSelectedDate(selectedDate)}
          onMonthChange={this.handleMonthChange}
          selected={this.state.selectedDate}
        />
      </div>
    );
  }

  protected renderInventoryQuantity(): React.ReactNode {
    const { selectedDate, variants, quantity } = this.state;
    const pickedDate = moment(selectedDate.start).format('YYYY-MM-DD');
    // eslint-disable-next-line max-len
    const selectedVariant = variants.find((variant) => moment(variant.date).format('YYYY-MM-DD') === pickedDate) || null;

    let variantQuantity;

    if (selectedVariant) {
      variantQuantity = selectedVariant.inventory_quantity;
    }

    return (
      <>
        <Form onSubmit={this.postVariant}>
          <FormLayout>
            <TextField
              requiredIndicator
              id='quantity'
              label='Quantity:'
              placeholder='200'
              name='quantity'
              type='number'
              value={quantity || variantQuantity?.toString()}
              onChange={(value, name) => this.changeHandler(name, value)}
              helpText={
                <span>
                  Enter quantity
                </span>
              }
            />
            <Button primary submit>Submit</Button>
          </FormLayout>
        </Form>
      </>
    );
  }

  public render(): React.ReactNode {
    return (
      <div>
        {this.renderDatePicker()}
        {this.renderInventoryQuantity()}
      </div>
    );
  }
}

export default StockRuleException;
