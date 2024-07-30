import React, { useState, useEffect } from 'react';
import './backgroundimg.css';
import valoicon from '../data/icons8-valorant-50-2.png';
import fifaIcon from '../data/icons8-fifa-21-48.png'
import codIcon from '../data/icons8-call-of-duty-modern-warfare-50.png'
import csIcon from '../data/icons8-counter-strike-logo-50.png'
import dotaIcon from '../data/icons8-dota-2-30.png'
import Ranking from './Ranking';
import { gamedata } from '../data/SidebarData';
import { NavLink, useParams } from 'react-router-dom';

import Shop from './Shop';
import Newsgrid from './Newsgrid';
import DisplayTournements from '../components/TournmentRegistration/DisplayTournments';

const gameIcons = {
  Valorant: valoicon,
  'CALL OF DUTY': codIcon,
  FiFa: fifaIcon,
  'CS GO': csIcon,
  'Dota 2': dotaIcon,
};

const Valo = ({ games }) => {

  const { gameName } = useParams()
  const [selectedSection, setSelectedSection] = useState('All');
  const [bgClass, setBgClass] = useState('Valorant'); // Default background class


  useEffect(() => {
    // Update background class when the gameName changes
    setBgClass(gameName);
  }, [gameName]);

  // const [newsData, setNewsData] = useState([]);

  // useEffect(()=>{
  //   fetch(`https://newsapi.org/v2/everything?q=${gameName}&apiKey=cdee6a2bfe394cdfa31c90fcc79d1798`)
  //   .then(res => res.json())
  //   .then(data => setNewsData(data.articles))
  // },[gameName])

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'Ranking':
        return <Ranking gamename={gameName} />;
      case 'Shop':
        return <Shop gamename={gameName} />;
      case 'Latest News':
      // return <Newsgrid newsData={newsData} />;
      case 'Tournaments':
        return <DisplayTournements gamename={gameName} />;
      default:
        return (
          <div>
            <Ranking gamename={gameName} />

            < DisplayTournements gamename={gameName} />

            <div className='relative top-[-50px]'>
              <Shop gamename={gameName} />
            </div>
            <div className='relative top-[-50px]'>
              {/* <Newsgrid newsData={newsData} /> */}
            </div>
            {/* Add other components as needed */}
          </div>
        );
    }
  };

  return (
    <div className={bgClass}>
      <div className="p-4 ">
        <div className="mt-20 flex justify-center">
          {gameIcons[gameName] && (
            <img className="pr-5 " alt="Img2" src={gameIcons[gameName]} />
          )}

          {/* Menu bar */}
          <div className="min-h-48 flex items-center justify-center bg-main-dark-bg/90 p-2 rounded-md">
            <div
              onClick={() => handleSectionChange('All')}
              className={`px-4 py-2 mx-2 cursor-pointer hover:bg-main-bg hover:text-white rounded-full ${selectedSection === 'All' ? 'bg-main-bg text-white' : 'text-gray-500'
                }`}
            >
              All
            </div>

            {gamedata.map((item) => (
              <div
                key={item.name}
                onClick={() => handleSectionChange(item.name)}
                className={`px-4 py-2 mx-2 cursor-pointer hover:bg-main-bg hover:text-white rounded-full ${selectedSection === item.name ? 'bg-main-bg text-white' : 'text-gray-500'
                  }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render the selected section based on user's click */}
      <div className="w-full">
        <div className="pt-8 px-2">{renderSection()}</div>
      </div>

      {/* <RegistrationBanner /> */}
    </div>
  );
};

export default Valo;
