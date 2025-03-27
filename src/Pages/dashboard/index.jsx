import React, { useState } from 'react';
import './dashboard.scss'
import { useSelector } from 'react-redux';
import CommonClock from '../../components/common/commonclock/commonclock';
import CustomButton from '../../components/common/button';
import Location from '../../components/location';
import { MdPadding } from 'react-icons/md';
const Dashboard = () => {

  return (
    <>
      <CommonClock />
      <CustomButton 
      buttonTxt={"Check in"}
      width={"100px"}/>
      <CustomButton
      buttonTxt={"Check Out"}
      width={"100px"} />
      <Location />
    </>
  );
};
export default Dashboard;