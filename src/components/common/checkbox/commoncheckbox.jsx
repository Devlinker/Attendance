import React from 'react';
import { Checkbox } from 'antd';
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const Commoncheckbox = () => <Checkbox onChange={onChange}>Remember Me</Checkbox>;
export default Commoncheckbox;