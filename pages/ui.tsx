import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker';
import { axios } from "./axios";
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/Navbar'
const moment = require('moment');

class Ui extends Component {

    constructor() {
        super(0);
    this.getVariants();
    }
      state = {
        selectedDate: 0,
        variants:[]        
      };

      getVariants = async () => {
        const data = await axios.get('/api/stockRulesExceptions/').then(({ data }) => data);
            this.setState({ variants: data})
        }

        componentDidMount() {
            this.getVariants(); 
        }

      setSelectedDate(date) {
            this.setState({selectedDate: date})
      }
    

    renderDatePicker() {
        const date = new Date();
        const limitedDays = date.setDate( date.getDate() - 90 );
        
        return (
            <div>
            <DatePicker
                selected={this.state.selectedDate} 
                onChange={date => this.setSelectedDate(date)}
                minDate={limitedDays}
                inline
            />    
            <div>{moment(this.state.selectedDate).format('YYYY-MM-DD')}</div>
            </div> 
        ); 
    }

    renderInventoryQuantity(){
        const pickedDate = moment(this.state.selectedDate).format('YYYY-MM-DD');
        const selectedVariant = this.state.variants.find((variants) => variants.date === pickedDate) || null;

        let variantQuantity;
        if(selectedVariant){
            variantQuantity = selectedVariant.inventory_quantity
        }
        
        return (
            <>
            <form>
                <p>Quantity on {moment(this.state.selectedDate).format('YYYY-MM-DD')} is: <b>{variantQuantity}</b></p>

                <label htmlFor="name">Quantity: </label>
                <input id="name" name="name" type="text" placeholder={variantQuantity} autoComplete="name" required />
                <button type="submit">Submit</button>
            </form>
            {this.state.variants.map(variants => <p key={variants.id}> {"date"} {variants.date} || {"weight"} {variants.weight} || {"Stock"} {variants.inventory_quantity} </p>)}
            </>
        )
    }

    render() {
        return (  
            <div>
                <Navbar/>
                {this.renderDatePicker()}
                {this.renderInventoryQuantity()}
            </div>              
        );    
    }
    
}

export default Ui;
