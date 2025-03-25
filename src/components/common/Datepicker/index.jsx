import React from 'react';
import { DatePicker, Space } from 'antd';
const Datepicker = ({onChange}) => (
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