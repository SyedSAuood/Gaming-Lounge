import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import SellOrder from './SellOrder';
import ButOrder from './ButOrder';

Modal.setAppElement('#root');

const Shoppopup = ({ isOpen, onClose }) => {
  const [selectedForm, setSelectedForm] = useState('SellOrder');

  const handleFormChange = (formType) => {
    setSelectedForm(formType);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black overlay
    },
    content: {
      backgroundColor: '#20232A', // Opaque white background for the content
      padding: '20px',
      paddingTop: '3px',
      paddingBottom: '5px',
      borderRadius: '8px',
      maxWidth: '600px',
      height: 'auto', // Set the desired height
      margin: 'auto',
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
      border: 'none', // Remove border color
      // overflow: 'hidden',
      },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Tournament Registration"
      style={modalStyles}
    >
      <div className="flex justify-end py-4">
        <button className="text-gray-600" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleFormChange('SellOrder')}
          className={`${selectedForm === 'SellOrder' ? 'bg-black/70 text-white' : 'bg-black/30 text-gray-500'
            } px-4 py-2  rounded-md rounded-r-none hover:bg-black hover:text-white  transition duration-300`}
        >
          Sell an account
        </button>
        <button
          onClick={() => handleFormChange('BuyOrder')}
          className={` ${selectedForm === 'BuyOrder' ? 'bg-black/70 text-white' : 'bg-black/30 text-gray-500'
            } px-4 py-2  rounded-md rounded-l-none hover:bg-black transition duration-300 hover:text-white`}
        >
          Request an account
        </button>

      </div>
      {selectedForm === 'SellOrder' ? <SellOrder /> : <ButOrder />}
    </Modal>
  );
};

export default Shoppopup;
