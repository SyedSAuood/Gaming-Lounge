import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import SingleRegistration from './SingleRegistration';
import TeamRegistration from './TeamRegisration';

Modal.setAppElement('#root'); // Set the root element for accessibility

const TournamentRegistrationPopup = ({ T_id, gameName, isOpen, onClose, format }) => {
  const [selectedForm, setSelectedForm] = useState('single');
  

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
      borderRadius: '8px',
      maxWidth: '600px',
      height: 'auto', // Set the desired height
      margin: 'auto',
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
      border: 'none', // Remove border color
    },
  };

  console.log(T_id)
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
      {/* <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleFormChange('single')}
          className={`text-white ${
            selectedForm === 'single' ? 'bg-main-bg' : 'bg-blue-500'
          } px-4 py-2 rounded-md hover:bg-main-bg/30 transition duration-300`}
        >
          Single Registration
        </button>
        <button
          onClick={() => handleFormChange('team')}
          className={`text-white ${
            selectedForm === 'team' ? 'bg-main-bg' : 'bg-blue-500'
          } px-4 py-2 rounded-md hover:bg-main-bg/30 transition duration-300`}
        >
          Team Registration
        </button>
      </div> */}
      {/* {
       form.includes(gameName)  ? (
         <TeamRegistration T_iD={T_id} />
         ) : (
          <SingleRegistration T_iD={T_id} />
        )
      } */}
      {
        format === "Team" ?(
          <TeamRegistration T_iD={T_id} />
        ):(
          <SingleRegistration  T_iD={T_id} />
        )
      }
    </Modal>
  );
};

export default TournamentRegistrationPopup;
