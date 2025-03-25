import React from 'react';
import { DatePicker, Space } from 'antd';
const Datepicker = ({onChange}) => (
    <>
    <DatePicker
      format={{
          format: 'YYYY-MM-DD',
          type: 'mask',
        }}
        onChange={onChange}
        />
    </>

);
export default Datepicker;