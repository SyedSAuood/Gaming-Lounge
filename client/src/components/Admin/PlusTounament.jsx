import axios from 'axios'
import React,{useState} from 'react'
import { toast } from 'react-toastify'

const PlusTounament = () => {

const [tournamentName,settournamentName]= useState('')
const [gameName,setGameName]= useState('')
const [startDate,setstartDate]= useState('')
const [endDate,setEndDate]= useState('')
const [organizer,setOrganizer]= useState('')
const [registrationDeadline,setregistrationDeadline]= useState('')

const [format,setFormat] = useState('');

// const handleRegistration = async ()=>{
//     try {
//         const response = await axios.post('/api/tournament/addtournament',{
//             tournament_name: tournamentName,
//             game_name : gameName ,
//             start_date : startDate,
//             end_date : endDate,
//             organizer_name : organizer,
//             registration_deadline : registrationDeadline,
//             format : format
//         })
// }
const handleRegistration = async () => {
  try {
    // Check if any field is empty
    if (
      !tournamentName ||
      !gameName ||
      !startDate ||
      !endDate ||
      !organizer ||
      !registrationDeadline ||
      !format
    ) {
      toast.warning('Please fill in all fields');
      return;
    }

    // If all fields are filled, make the axios request
    const response = await axios.post('/api/tournament/addtournament', {
      tournament_name: tournamentName,
      game_name: gameName,
      start_date: startDate,
      end_date: endDate,
      organizer_name: organizer,
      registration_deadline: registrationDeadline,
      format: format
    });
    if (response.data.success) {
      toast.success(response.data.message);
      window.location.reload();
      // setError('');
  } else {
      toast.error(response.data.message);
      // setError(response.data.message);
  }
} catch (error) {   
    console.log(error)
}
};
  return (
    <div className="mx-auto max-w-screen-lg place-content-center relative rounded-md p-4 bg-form-bg">
      <div className="max-w-md mx-auto p-8 bg-main-dark-bg shadow-lg rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-white">Add Tournament</h1>
        {/* <label className="block text-sm text-gray-800 mb-2"> */}
          <input
            type="text"
            name="name"
            className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
            placeholder="Tournament Name"
            value={tournamentName}
            onChange={(e) => settournamentName(e.target.value)}
          />
        {/* </label> */}

        {/* <label className="block text-sm text-gray-800 mb-2"> */}
          <input
            type="text"
            name="gameName"
            className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
            placeholder="Game Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
        {/* </label> */}

        {/* <label className="block text-sm text-gray-800 mb-2"> */}
          <input
            type="text"
            name="StartDate"
            className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
            placeholder="Start Date: yyyy-mm-dd"
            value={startDate}
            onChange={(e) => setstartDate(e.target.value)}
          />
        {/* </label> */}

        {/* <label className="block text-sm text-gray-800 mb-2"> */}
          <input
            type="text"
            name="EndDate"
            className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
            placeholder="End Date: yyyy-mm-dd"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        {/* </label> */}

        {/* <label className="block text-sm text-gray-800 mb-2"> */}
          <input
            type="text"
            name="Organizer"
            className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
            placeholder="Organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />
        {/* </label> */}

        {/* <label className="block text-sm text-gray-800 mb-2"> */}
          <input
            type="text"
            name="Registrationdeadline"
            className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
            placeholder="Registration Deadline: yyyy-mm-dd"
            value={registrationDeadline}
            onChange={(e) => setregistrationDeadline(e.target.value)}
          />
        {/* </label> */}

        {/* <label className="block text-sm text-gray-800 mb-2"> */}
          <input
            type="text"
            name="Format"
            className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
            placeholder="Format: Team / Single player"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          />
        {/* </label> */}

        <div className="flex mt-6">
          <button
            className="bg-white text-blue-700 w-full max-w-52 px-4 py-3 rounded-full font-semibold hover:bg-slate-800 hover:text-white transition duration-300"
            onClick={handleRegistration}
          >
            Add Tournament
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlusTounament