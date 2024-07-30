import { useEffect, useState } from "react";
import React from 'react'
import axios from "axios";
import DisplayTeam from "./DisplayTeam";
import { useStateContext } from "../../contexts/ContextsProvider";
import { toast } from "react-toastify";


const TeamRegistration = ({ T_iD }) => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState(['', '', '', '']);
  const [teamEmails, setTeamEmails] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isComponentVisible, setComponentVisibility] = useState(false);
  const [message, setMessage] = useState('')
  const { user } = useStateContext();

  const [createdBy, setCreatedBy] = useState('admin');

  const handleClick = () => {
    setComponentVisibility(!isComponentVisible)
  }

  const handleRegister = async () => {
    const isConfirmed = window.confirm('These from is not editable !! Are you sure you want to submit the form ?');

    if (!isConfirmed) {
      // User canceled the submission
      return;
    }

    try {
      // Validate inputs
      if (teamName.trim() === '' || teamMembers.some(member => member.trim() === '') || teamEmails.some(email => !isValidEmail(email.trim()))) {
          toast.warning('Please fill in all fields with valid data.');
        return;
      }

      const response = await axios.post('/api/team', {
        T_id: T_iD,
        name: teamName,
        members: teamMembers,
        emails: teamEmails,
        createdBy: user.username,
      });

      if (response.data.success) {
        toast.success(response.data.message);
    } else {
        toast.error(response.data.message);
    }
      //setResponse()
    } catch (error) {
      console.error('Error registering team:', error.message);
    }
  };

  // const Handleteams = async () =>{
  //   const AllTeams = (await (axios.get('/api/team/Allteams'))).data
  //   console.log(AllTeams)
  //   setTeams(AllTeams)
  // }




  const handleMemberChange = (index, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = value;
    setTeamMembers(updatedMembers);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...teamEmails];
    updatedEmails[index] = value;
    setTeamEmails(updatedEmails);
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="mx-auto max-w-screen-lg place-content-center relative  rounded-[10px] p-4 bg-main-bg/20 ">
      <div className='max-w-md mx-auto p-8 bg-form-bg text-white shadow-lg rounded-md' >
        <h1 className='text-3xl font-bold mb-6' >Team Registration</h1>

        <label className='block text-sm ' >
          <b>Team Name:</b>
          <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)}
            className='pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400' />
        </label>
        <br />
        <label className='block text-sm mb-2' >
          <b>Team Members:</b>
          {teamMembers.map((member, index) => (
            <input
              key={index}
              type="text"
              value={member}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              placeholder={`Team Member ${index + 1}`}
              className='pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400'
            />
          ))}
        </label>
        <br />
        <label className='block text-sm mb-2' >
          <b>Team Emails:</b>
          {teamEmails.map((email, index) => (
            <input
              key={index}
              type="text"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder={`Email ${index + 1}`}
              className='pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400'
            />
          ))}
        </label>
        <button className='bg-white text-blue-700 ml-2 px-2 py-2  rounded-full font-semibold hover:bg-slate-800 hover:text-white transition duration-300'
          onClick={handleRegister} >Register Team</button>

        <button className='bg-white text-blue-700 m-2 px-2 py-2  rounded-full font-semibold hover:bg-slate-800 hover:text-white transition duration-300'
          onClick={handleClick} >Display Teams</button>

      </div>
      {isComponentVisible && <DisplayTeam Tounament_id={T_iD} setmessage={setMessage} />}
    </div>
  );


}

export default TeamRegistration