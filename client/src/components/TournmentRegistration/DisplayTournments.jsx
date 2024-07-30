import React, { useState, useEffect } from 'react';
import TournamentRegistrationPopup from './popup';
import { useStateContext } from '../../contexts/ContextsProvider';
import axios from 'axios';

const DisplayTournements = ({ gamename }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tournament, setTournament] = useState([]);
  const { user } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/tournament');
        setTournament(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleOpenPopup = () => {
    if (user.data === 'Unauthorized') {
      alert('Please login');
    } else {
      setPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  const filteredTournaments = tournament.filter(tournament => tournament.gameName === gamename);
  return (
    <>
       {filteredTournaments.map((item) => (
          <div key={item.id} className="mx-auto max-w-screen-lg place-content-center relative rounded-[10px] mb-5 p-5 bg-form-bg/90">
            <div className="pl-0 pr-[580px] py-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="ms-4 mt-4 mb-4 [font-family:'Barlow-Bold',Helvetica] text-3xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
                Tournaments
              </div>
            </div>

            <div className='bg-main-dark-bg rounded-lg p-2'>
              <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <div className="flex flex-col bg-form-bg rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-default">
                  <div className="relative w-full">
                    <img className="w-full rounded-t-lg" alt="Jpg" src={"https://i.pinimg.com/originals/7a/6e/98/7a6e98832430cee6b9fca00a89dbe032.png"} />
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
                        {gamename}
                      </p>
                    </div>
                  </div>
                  <div className='max-w-4xl p-4 mx-auto'>
                    <button
                      className='bg-white text-blue-700 px-4 py-3 rounded-full font-semibold hover:bg-slate-800 hover:text-white transition duration-300'
                      onClick={handleOpenPopup}>Register Now
                    </button>
                    {isPopupOpen && <TournamentRegistrationPopup T_id={item.id} format={item.format} gameName={gamename} isOpen={isPopupOpen} onClose={handleClosePopup} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )
    }
    </>
  );
};

export default DisplayTournements;
