import React, { Component, useState } from 'react';
import {Button, DatePicker, Form, FormLayout, TextField} from '@shopify/polaris';
import { axios } from '../config/utils/axios';
import { IStockRuleExceptions } from '../interfaces/stockRules';

const moment = require('moment');

interface IState {
  selectedDate: {start: Date, end: Date};
  variants: IStockRuleExceptions[];
  quantity: string;
}

class Ui extends Component<{}, IState> {
  state: IState = {
    ...this.state,
    selectedDate: {start: new Date(), end: new Date()},
    variants: [],
    quantity: null,
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

    console.log(postData);

    await axios.post('/api/stockRulesExceptions', postData).catch((err) => {
      console.log('Post error is: ', err);
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

  protected renderDatePicker(): React.ReactNode {
    const date = new Date();
    const limitedDays = date.setDate(date.getDate() + 1);

    return (
      <div>
        <DatePicker
          month={1}
          year={2021}
          weekStartsOn={1}
          onChange={(date) => 
          this.setSelectedDate(date)}
          onMonthChange={() => {
          }}
          selected={this.state.selectedDate}
        />
      </div>
    );
  }

  protected renderInventoryQuantity(): React.ReactNode {
    const { selectedDate, variants, quantity } = this.state;

    const pickedDate = moment(selectedDate.start).format('YYYY-MM-DD');
    const selectedVariant = variants.find((variants) => variants.date === pickedDate) || null;

    let variantQuantity;
    if (selectedVariant) {
      variantQuantity = selectedVariant.inventory_quantity;
    }
    console.log(quantity, variantQuantity)

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
            onChange={(value, name)=>this.changeHandler(name, value)}
            
            helpText={
              <span>
                Enter quantity
              </span>
            }
          />
          <Button primary submit>Submit</Button>
          </FormLayout>
        </Form>
        {this.state.variants.map((variants) => (
          <div key={variants.id}>
            {/* <p>Date: {variants.date} || Stock: {variants.inventory_quantity}</p> */}
          </div>
        ))}
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

export default Ui;
