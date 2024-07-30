import React, { useEffect } from 'react';
import { newsbar } from '../data/SidebarData';
import { NavLink } from 'react-router-dom';

const Menu = ({ active, setActive, setCategory }) => {
  useEffect(() => {
    // Set the first item as default when the component mounts
    setActive(newsbar[0].id);
    setCategory(newsbar[0].value);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  function onClick(id, value) {
    setActive(id);
    setCategory(value);
  }

  return (
    <div className="p-4">
      <div className="mt-20 flex justify-center">
        <div className="min-h-48 flex items-center justify-center bg-main-bg/50 p-1 rounded-md">
          {newsbar.map((item) => (
            <NavLink
              key={item.id}
              className="rounded-full px-6 py-2  font-bold text-white text-16"
            >
              <div
                onClick={() => onClick(item.id, item.value)}
                className={`px-4 py-2 mx-2 cursor-pointer hover:bg-main-bg hover:text-white rounded-full ${active === item.id
                    ? 'active bg-main-bg text-white'
                    : 'unactive text-gray-500'
                  }`}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
