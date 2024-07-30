import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { HiArrowsRightLeft } from "react-icons/hi2";

const Playersetup = ({ isOpen, onClose, data }) => {
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

  console.log(data);

  const createPlayerPairs = (players) => {
    const playerPairs = [];

    if (players.length % 2 === 0) {
      // Even number of players
      for (let i = 0; i < players.length; i += 2) {
        const player1 = players[i];
        const player2 = players[i + 1];
        playerPairs.push({ player1, player2 });
      }
    } else {
      // Odd number of players, handle the last player separately
      for (let i = 0; i < players.length - 1; i += 2) {
        const player1 = players[i];
        const player2 = players[i + 1];
        playerPairs.push({ player1, player2 });
      }

      // Add the last player as a single player without pairing
      playerPairs.push({
        player1: players[players.length - 1],
        player2: null,
      });
    }

    return playerPairs;
  };

  const playerPairs = createPlayerPairs(data);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Player Setup"
      style={modalStyles}
    >
      <div className="flex justify-end py-4">
        <button className="text-gray-600" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-white mx-auto">Player vs Player</h2>
      <div className="container my-auto h-full mx-auto mb-8 py-10 text-white bg-form-bg rounded-lg text-center shadow-md">
        <h2 className="text-2xl font-bold mb-4">Current Matches</h2>
        {playerPairs.map((pair, index) => (
          <div key={index} className="mb-2">
            <p className='flex justify-center gap-3 bg-main-dark-bg mx-20 rounded-lg shadow-md py-6 text-lg'>
              {pair.player1 ? pair.player1.player : 'No player'} <HiArrowsRightLeft className='mt-1' />  {' '}
              {pair.player2 ? pair.player2.player : 'Computer'}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default Playersetup;
