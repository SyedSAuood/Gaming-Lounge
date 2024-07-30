import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { HiArrowsRightLeft } from "react-icons/hi2";

const Teamsetup = ({ isOpen, onClose, data }) => {
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

  const createTeamPairs = (teams) => {
    const teamPairs = [];

    if (teams.length % 2 === 0) {
      // Even number of teams
      for (let i = 0; i < teams.length; i += 2) {
        const team1 = teams[i];
        const team2 = teams[i + 1];
        teamPairs.push({ team1, team2 });
      }
    } else {
      // Odd number of teams, handle the last team separately
      for (let i = 0; i < teams.length - 1; i += 2) {
        const team1 = teams[i];
        const team2 = teams[i + 1];
        teamPairs.push({ team1, team2 });
      }

      // Add the last team as a single team without pairing
      teamPairs.push({
        team1: teams[teams.length - 1],
        team2: null,
      });
    }

    return teamPairs;
  };

  const teamPairs = createTeamPairs(data);

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
      <h1 className="text-3xl font-bold mb-4 text-white mx-auto">Team vs Team</h1>
      <div className="container my-auto h-full mx-auto mb-8 py-10 text-white bg-form-bg rounded-lg text-center shadow-md">
        <h2 className="text-2xl font-bold mb-4 ">Current Matches</h2>
        {teamPairs.map((pair, index) => (
          <div key={index} className="mb-2">
            <p className='flex justify-center gap-3 bg-main-dark-bg mx-20 rounded-lg shadow-md py-6 text-lg'>
              {pair.team1 ? pair.team1.name : 'Computer'} <HiArrowsRightLeft className='mt-1' />  {' '}
              {pair.team2 ? pair.team2.name : 'Computer'}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default Teamsetup;
