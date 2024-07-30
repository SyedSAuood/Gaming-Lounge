import React, { useState } from 'react';
import './homebg.css';
import GameSwiper from './GameSwiper';
import News from './News';
import Shop from './Shop';
import Ranking from './Ranking';
import Newsgrid from './Newsgrid';
import Admin from '../components/Admin';
import { useStateContext } from '../contexts/ContextsProvider';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Reward from './Reward';
import { BsFillTrophyFill } from "react-icons/bs";

const Home = ({ games }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const HandleOpenPopup = () => {
    setPopupOpen(true);
  };

  const HandleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className='homebg bg-scroll'>
      <div className='mt-12 justify-center'>
        <div className='pt-10 m-5 flex flex-wrap lg:flex-nowrap justify-center row'>
          <GameSwiper games={games} />
        </div>

        <div className="m-5">
          <Ranking gamename={"undefined"} />
        </div>

        <div className="m-5 relative mt-[-50px]">
          <Shop gamename={"All"} />
        </div>

        <div className="m-5">
          {/* <Newsgrid games={games} /> */}
        </div>

        <button
          title='Rewards'
          onClick={HandleOpenPopup}
          className="fixed bottom-10 right-10 bg-form-bg text-2xl text-white px-8 py-2 rounded-full shadow-lg hover:scale-125  transition duration-300"
        >
          <BsFillTrophyFill />
        </button>
        {isPopupOpen && <Reward isOpen={isPopupOpen} onClose={HandleClosePopup} />}
      </div>
    </div>
  );
};

export default Home;
