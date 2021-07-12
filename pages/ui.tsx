import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker';
import { axios } from '../config/utils/axios';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/Navbar';
const moment = require('moment');

interface IState {
  selectedDate: Date | number;
  variants: Object;
  quantity: number;
}

class Ui extends Component<IState> {
  constructor(props) {
    super(props);
    this.getVariants();
  }
  state = {
    selectedDate: 0,
    variants: [],
    quantity: '',
  };

  getVariants = async () => {
    const data = await axios
      .get('/api/stockRulesExceptions/')
      .then(({ data }) => data);
    this.setState({ variants: data });
  };

  postVariant = async (e) => {
    e.preventDefault();
    const postData = {
      date: moment(this.state.selectedDate).format('YYYY-MM-DD'),
      inventory_quantity: this.state.quantity,
    };

    console.log(postData);

    await axios.post('/api/stockRulesExceptions/', postData).catch((err) => {
      console.log('Post error is: ', err);
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.getVariants();
  }

  setSelectedDate(date) {
    this.setState({ selectedDate: date });
  }

  renderDatePicker() {
    const date = new Date();
    const limitedDays = date.setDate(date.getDate() + 1);

    return (
      <div>
        <DatePicker
          selected={this.state.selectedDate}
          onChange={(date) => this.setSelectedDate(date)}
          minDate={limitedDays}
          inline
        />
      </div>
    );
  }

  renderInventoryQuantity() {
    const pickedDate = moment(this.state.selectedDate).format('YYYY-MM-DD');
    const selectedVariant =
      this.state.variants.find((variants) => variants.date === pickedDate) ||
      null;

    let variantQuantity;
    if (selectedVariant) {
      variantQuantity = selectedVariant.inventory_quantity;
    }

    const { quantity } = this.state;

    return (
      <>
        <form onSubmit={this.postVariant}>
          <p>
            Quantity on {moment(this.state.selectedDate).format('YYYY-MM-DD')}{' '}
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
          <p key={variants.id}>
            {' '}
            {'date'} {variants.date} || {'weight'} {variants.weight} ||{' '}
            {'Stock'} {variants.inventory_quantity}{' '}
          </p>
        ))}
      </>
    );
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderDatePicker()}
        {this.renderInventoryQuantity()}
      </div>
    );
  }
}

export default Ui;
