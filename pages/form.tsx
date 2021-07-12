import React, { ChangeEvent, Component, useState } from 'react';
import { axios } from '../config/utils/axios';
import { numberToDays } from '../config/utils/days';
import { DayNumbers, IStockRule } from '../interfaces/stockRules';

const defaultDay: IStockRule = {
  day_of_week: 1,
  weight: 0,
  price: 0,
  inventory_quantity: 0,
};

class Form extends Component {
  state: { days: IStockRule[] } = {
    days: Array(7)
      .fill(defaultDay)
      .map(
        (day, index) =>
          ({
            ...day,
            day_of_week: index + 1,
          } as IStockRule)
      ),
  };

  postStockRules = async () => {
    await axios.post('/api/stockRules/', this.state).catch((err) => {
      console.log('Post error is: ', err);
      console.log(this.state, 'postStockRules func');
    });
  };

  //To do: do not except negative value
  changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    dayNumber: DayNumbers
  ) => {
    const dayInd = this.state.days.findIndex(
      (day) => day.day_of_week === dayNumber
    );

    const currentDays = this.state.days;
    currentDays[dayInd] = {
      ...currentDays[dayInd],
      [e.target.name]: e.target.value,
    };

    this.setState({ days: currentDays });
  };

  renderStockRulesForm() {
    // const { day, weight1, price1, inventory_quantity1 } = this.state;
    console.log(this.state.days);

    return (
      <>
        {this.state.days.map((day, index) => (
          <form key={index}>
            <input
              name='day_of_week'
              type='text'
              value={numberToDays[day.day_of_week]}
              onChange={(e) => this.changeHandler(e, day.day_of_week)}
              required
              disabled
            />

            <input
              name='weight'
              placeholder='weight'
              type='number'
              value={!!day.weight ? day.weight : ''}
              onChange={(e) => this.changeHandler(e, day.day_of_week)}
              required
            />
            <input
              name='price'
              placeholder='price'
              type='number'
              value={!!day.price ? day.price : ''}
              onChange={(e) => this.changeHandler(e, day.day_of_week)}
              required
            />
            <input
              name='inventory_quantity'
              placeholder='quantity'
              type='number'
              value={!!day.inventory_quantity ? day.inventory_quantity : ''}
              onChange={(e) => this.changeHandler(e, day.day_of_week)}
              required
            />
          </form>

          // To do: create a button submitOnClick only if all are filled
        ))}
        <input type='submit' onClick={this.postStockRules} />
      </>
    );
  }
  render() {
    return <>{this.renderStockRulesForm()}</>;
  }
}

export default Form;
