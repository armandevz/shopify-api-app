import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const moment = require('moment');

class DatePickerUi extends Component {

      state = {
        selectedDate: 0
      };

      setSelectedDate(date) {
            console.log(date);
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

    render() {

        return (
            <div>
                {this.renderDatePicker()}
            </div>              
        );    
    }
    
}

export default DatePickerUi;
