import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddTournament from './AddTournament';
import Teamsetup from './Teamsetup';
import Playersetup from './Playersetup';
import MemeSection from './MemeSection';
import { toast } from 'react-toastify';

const Tournament = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpen2, setPopupOpen2] = useState(false);
  const [isPopupOpen3, setPopupOpen3] = useState(false);
  const [tounamentData, setTournamentData] = useState([])
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  
  useEffect(() => {
    try {
      axios.get('api/tournament').then(res => setTournamentData(res.data))

    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  function handlesubmit(id) {
    setPopupOpen2(true);
    console.log(id)
    try {
      axios.get(`api/tournament/getteams/${id}`).then(res => setData(res.data))
    } catch (error) {
      console.log(error)
    }
  }
  const handleClosePopup2 = () => {
    setPopupOpen2(false);
  };


  function handlePlayer(id) {
    setPopupOpen3(true)
    console.log(id)
    try {
      axios.get(`api/tournament/getplayer/${id}`).then(res => setData2(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleClosePopup3 = () => {
    setPopupOpen3(false);
  };

  async function HandleDelete(id) {
    console.log(id)
    try {
      const response = await axios.delete(`api/tournament/delete/${id}`);
      toast.success(response.data.message)
      window.location.reload();
      // console.log(response);

    } catch (error) {
      console.error(error);
    }
  }

  console.log(data2)

  return (
    <>
      <div className='p-4 text-cyan-50  bg-form-bg rounded-lg' >
        <h1 className="text-3xl font-semibold mb-4">Tournaments</h1>
        <div className='flex ' >
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <div className="group bg-main-dark-bg py-12 px-4 h-full flex flex-col items-center cursor-pointer rounded-md hover:bg-gradient-to-b hover:from-transparent hover:to-[rgba(11,12,23,0.6)] hover:smooth-hover" onClick={handleOpenPopup}>
              <a className="group bg-gray-900/70 mt-20 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-16 h-16 rounded-full items-center justify-center" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </a>
              <a className=" text-white/50 group-hover:text-white group-hover:smooth-hover mt-2 text-center" >Create tournament</a>

            </div>
            {isPopupOpen && <AddTournament isOpen={isPopupOpen} onClose={handleClosePopup} />}
          </div>
          {
            tounamentData.map((item) => (
              <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <div className="bg-main-dark-bg rounded-lg hover:bg-gradient-to-b hover:from-transparent hover:to-[rgba(11,12,23,0.6)] hover:cursor-pointer">
                  <div className="relative w-full">
                    <img className="w-full rounded-t-lg" alt="Jpg" src={"https://th.bing.com/th/id/R.83de4af8e16c6ad7b61e4f3b1c77d0d0?rik=ukfMFJEsS9egHg&pid=ImgRaw&r=0"} />
                  </div>
                  <div className="p-4">
                    <div className="text-gray-500 text-sm">
                      {''}
                    </div>
                    <div className="p-4">
                      <div className="text-blue-600 text-sm">
                        {item.name}
                      </div>
                      <div className="pt-2">
                        <p className="text-blue-600 text-sm">

                          <div className='text-gray-500 mb-2 '>
                            {item.organizer}
                            <p>Deadline: {item.registrationDeadline && item.registrationDeadline.slice(0, 10)}</p>

                            <p>Start date: {item.startDate && item.startDate.slice(0, 10)}</p>
                          </div>

                          {/* Format:
                      {item.format} */}
                        </p>
                      </div>
                    </div>
                    <div className='flex justify-center'>
                      {
                        item.format === "Team" ? (
                          <>

                            <button onClick={() => handlesubmit(item.id)} className='bg-white text-blue-700 w-full max-w-52 m-2 px-2 py-1 rounded-full font-semibold hover:bg-slate-800 hover:text-white transition duration-300' >
                              Matchup
                            </button>

                            <button onClick={() => HandleDelete(item._id)} className='bg-red-700 text-white w-full max-w-52 m-2 px-2 py-1 rounded-full font-semibold transition duration-300' >
                              Delete
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handlePlayer(item.id)} className='bg-white text-blue-700 w-full max-w-52 m-2 px-2 py-1 rounded-full font-semibold hover:bg-slate-800 hover:text-white transition duration-300'>
                              Matchup
                            </button>
                            <button onClick={() => HandleDelete(item._id)} className='bg-red-700 text-white w-full max-w-52 m-2 px-2 py-1 rounded-full font-semibold  transition duration-300' >
                              Delete
                            </button>
                          </>

                        )
                      }
                    </div>
                    {
                      <Teamsetup isOpen={isPopupOpen2} onClose={handleClosePopup2} data={data} />
                    }
                    {
                      <Playersetup isOpen={isPopupOpen3} onClose={handleClosePopup3} data={data2} />
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Tournament