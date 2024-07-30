import React from 'react'
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import PlusTounament from './PlusTounament';
const AddTounament = ({isOpen,onClose}) => {

    const modalStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black overlay
        },
        content: {
          backgroundColor: '#20232A', // Opaque white background for the content
          padding: '20px',
          paddingTop: '5px',
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
      {
        <PlusTounament/>
      }
      
    </Modal>
  )
}

export default AddTounament