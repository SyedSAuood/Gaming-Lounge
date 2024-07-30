import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Menu from '../components/Admin/Menu';

Modal.setAppElement('#root');

const Reward = ({ isOpen, onClose }) => {
  const [data, setdata] = useState([]);
  const [active, setActive] = useState([]);
  const [category, setCategory] = useState('Valorant');

  useEffect(() => {
    axios.get('/api/ranking/getwinners').then(res => setdata(res.data));
  }, []);

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black overlay
      zIndex: 1000, // Ensure the overlay is on top
    },
    content: {
      backgroundColor: '#20232A', // Dark background for the content
      padding: '30px',
      borderRadius: '8px',
      maxWidth: '600px',
      height: 'auto', // Set the desired height
      margin: 'auto',
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
      border: 'none', // Remove border color
      zIndex: 1001, // Ensure the modal content is on top of the overlay
      color: '#fff', // White text color for better contrast
    },
  };

  console.log(category);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Tournament Registration"
      style={modalStyles}
    >
      <div className="flex justify-end py-2">
        <button className="text-gray-400 hover:text-gray-200" onClick={onClose}>
          <FaTimes size={20} />
        </button>
      </div>
      <div>
        <Menu active={active} setActive={setActive} setCategory={setCategory} />
      </div>

      <div className="flex justify-center mb-4">
        <div className="space-y-4 w-full">
          {data
            .filter(item => item.gamename === category)
            .map((item, index) => (
              <div key={index} className="p-4 bg-form-bg rounded-lg shadow-md">
                <div className="text-lg font-semibold text-white">
                  {item.name}
                </div>
                {/* <div className="text-blue-400">
                  {item.Rank}
                </div> */}
                <div className="text-blue-400">
                  {item.gamename}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default Reward;
