import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const PublishWinners = ({ winners, isOpen, onClose, onDelete }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/ranking/winners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ winners }), // Send the winners array in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add winners');
      }

      // Reset form fields or handle success as needed
      toast.success('Winners added successfully!');
    } catch (error) {
      toast.error('Error adding winners:', error.message);
    }
  };

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel=""
      style={modalStyles}
    >
      <div className="flex justify-end py-2">
        <button className="text-gray-400 hover:text-gray-200" onClick={onClose}>
          <FaTimes size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="space-y-4 w-full mt-4 bg-form-bg p-4 rounded-lg">
          <div className="text-white text-2xl font-bold mb-4 ml-2  lg:mb-0">Publish Prize Winners</div>
          {winners.map((item, index) => (
            <div key={index} className="px-4 py-2 bg-main-dark-bg rounded-lg shadow-md">
              <div className="text-lg font-semibold text-white">{item.name}</div>
              <div className="text-gray-400">{item.gamename}</div>
              <button
                onClick={() => onDelete(item.name)}
                className="relative left-[415px] bg-red-600 w-fit rounded-lg shadow-md my-2 px-2 py-1 text-sm font-medium text-white transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-main-bg hover:bg-slate-800 w-fit rounded-lg shadow-md mt-4 px-8 py-1 text-lg font-medium text-white transition-all"
        >
          Post the winners
        </button>
      </div>
    </Modal>
  );
};

export default PublishWinners;
