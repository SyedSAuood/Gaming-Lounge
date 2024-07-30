import React, { useState } from 'react';
import Tournament from './Admin/Tournament';
import MemeSection from './Admin/MemeSection';
import Shop from "./Admin/Shop"
import Rankinghome from './Admin/Rankinghome';

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState('tournaments');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="bg-main-dark-bg mt-16 flex flex-col items-center justify-center">
      {/* Navbar */}
      <nav className="bg-blue-600 py-4 px-8 w-full mb-8">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="text-white text-2xl font-bold mb-4 lg:mb-0">Admin Dashboard</div>
          <div className="flex flex-col lg:flex-row text-xl">
            <button
              className={` ${selectedSection === 'tournaments' ? 'bg-form-bg/70 text-white' : 'bg-form-bg/30 text-gray-500'
                } px-4 py-2  rounded-md rounded-r-none hover:bg-black/50 hover:text-white  transition duration-300`}
              onClick={() => handleSectionChange('tournaments')}
            >
              Tournaments
            </button>
            <button
              className={`${selectedSection === 'feed' ? 'bg-form-bg/70 text-white' : 'bg-form-bg/30 text-gray-500'
                } px-4 py-2 hover:bg-black/50 hover:text-white  transition duration-300`}
              onClick={() => handleSectionChange('feed')}
            >
              Feed
            </button>
            <button
              className={` ${selectedSection === 'accounts' ? 'bg-form-bg/70 text-white' : 'bg-form-bg/30 text-gray-500'
                } px-4 py-2  rounded-md rounded-l-none hover:bg-black/50 hover:text-white  transition duration-300`}
              onClick={() => handleSectionChange('accounts')}
            >
              Account Listing
            </button>

            <button
              className={` ${selectedSection === 'ranking' ? 'bg-form-bg/70 text-white' : 'bg-form-bg/30 text-gray-500'
                } px-4 py-2  rounded-md rounded-l-none hover:bg-black/50 hover:text-white  transition duration-300`}
              onClick={() => handleSectionChange('ranking')}
            >
              Ranking
            </button>
          </div>


        </div>
      </nav>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:col-span-3">
            <div className="mt-4">
              <div className="mx-8 relative top-[-40px]">
                {selectedSection === 'tournaments' && <Tournament />}
              </div>
              <div className="relative top-[-120px]">
                {selectedSection === 'feed' && <MemeSection />}
              </div>
              <div className="relative top-[-120px]">
                {selectedSection === 'accounts' && <Shop />}
              </div>
              <div className="relative top-[-120px]">
                {selectedSection === 'ranking' && <Rankinghome />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
