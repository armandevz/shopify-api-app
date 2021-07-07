import React, { useState } from 'react';
const moment = require('moment');

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const date = new Date();
const limitedDays = date.setDate( date.getDate() - 90 );


const DatePickerUi = () => {
    const [selectedDate, setSelecteddate] = useState(null);

    return (
        <div>
        <DatePicker
            selected={selectedDate} 
            dateFormat="YYYY-MM-DD"
            onChange={date => setSelecteddate(date)}
            minDate={limitedDays}
            inline
        />
        <div>{moment(selectedDate).format('YYYY-MM-DD')}</div>
        </div>
        
    );

};

export default DatePickerUi;
