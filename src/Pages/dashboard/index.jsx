import React, { useState } from 'react';
import { Avatar, Button, Modal } from 'antd';
import Profilecard from '../../components/Profilecard';
import Profile from '../../assets/profile.png'
import '../dashboard/dashboard.scss'
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <span className='dashboardcontent' typeof='button' onClick={showModal}>
        <img className='downloadimg' src={Profile} style={{width: "50px"}} alt="" />
        <h4>User Name </h4>
      </span>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <Profilecard />
      </Modal>
    </>
  );
};
export default App;