import React from 'react';
import { DatePicker, Space } from 'antd';
import "../input/input.scss"
const Datepicker = ({onChange,error}) => (
    <>
    <DatePicker
      format={{
          format: 'DD-MM-YYYY',
          type: 'mask',
        }}
        onChange={onChange}
        />
        {error&&(
          <p className='errorDate'>Date is Required</p>
        )}
    </>

);
export default Datepicker;