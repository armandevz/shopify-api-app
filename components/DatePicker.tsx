import React, { Component, useState } from 'react';
import {DatePicker} from '@shopify/polaris';
import { axios } from '../config/utils/axios';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/Title';
import { IStockRuleExceptions } from '../interfaces/stockRules';

const moment = require('moment');

interface IState {
  selectedDate: {start: Date, end: Date};
  variants: IStockRuleExceptions[];
  quantity: number;
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

  protected changeHandler = (e: any): void => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  componentDidMount(): void {
    this.getVariants();
  }

  //
  protected setSelectedDate(selectedDate): void {
    this.setState({ selectedDate });
  }

  protected renderDatePicker(): React.ReactNode {
    const date = new Date();
    const limitedDays = date.setDate(date.getDate() + 1);

    return (
      <div>
        <DatePicker
          // selected={this.state.selectedDate}
          // onChange={(date) => this.setSelectedDate(date)}
          // minDate={limitedDays}
          // inline
          month={1}
          year={2021}
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

    return (
      <>
        <form onSubmit={this.postVariant}>
          <p>
            Quantity on {pickedDate}
            is: <b>{variantQuantity}</b>
          </p>

          <label htmlFor='name'>Quantity: </label>
          <input
            id='name'
            name='quantity'
            type='text'
            value={quantity}
            onChange={this.changeHandler}
            required
          />
          <input type='submit' value='Submit' />
        </form>
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
