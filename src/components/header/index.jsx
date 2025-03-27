import React from 'react';
import Profile from '../../assets/profile.png'
import { useSelector } from 'react-redux';
import "./header.scss"

const MainHeader = () => {
  const { userProfile } = useSelector((state) => state.profile);

  return (
    <div style={{ padding: 0, background: 'white' }}  >
      <span className='dashboardcontent' typeof='button'>
        <img className='downloadimg' src={Profile} style={{width: "40px"}} alt="" />
        <h4>{userProfile?.data?.name || 'User Name'}</h4>
      </span>
    </div>
  );
};
export default MainHeader;