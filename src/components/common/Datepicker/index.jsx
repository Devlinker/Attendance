import React from 'react';
import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const Datepicker = () => (
    <>
    <DatePicker
      format={{
          format: 'DD-MM-YYYY',
          type: 'mask',
        }}
        onChange={onChange}
        />
    </>

);
export default Datepicker;