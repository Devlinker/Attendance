import { Avatar, DatePicker } from 'antd';
import React from 'react'
import CommonInput from '../common/input/commonInput';
import '../Profilecard/profilecard.scss'

const Profilecard = () => {
  return (
    <>
    <section>
      <div className='profileoverylay'>
        <div className='profileimg'>
          <Avatar />
          <CommonInput
          label={"Name"}
          type="text"
          placeholder="Enter your Name"
          width="70%"
          height="40px"
          labelPosition='side'
          />
          <CommonInput
          label={"Email"}
          type="text"
          placeholder="Enter your Email"
          width="70%"
          height="40px"
          labelPosition="side"
          />
          <CommonInput
          label={"Password"}
          type="password"
          placeholder="Enter your Password"
          width="70%"
          height="40px"
          labelPosition="side"
          />
            {/* <span style={{ fontWeight: "bold" }}>Date of Birth</span> */}
            {/* <DatePicker onChange={(e) => setDob(dayjs(e).format("YYYY-MM-DD"))} /> */}
            <CommonInput
            label="Number"
            type="number"
            placeholder="Enter your Number"
            width="70%"
            height="40px"
            labelPosition='side'
          />
          
        </div>
      </div>
    </section>
    </>
  )
}

export default Profilecard;