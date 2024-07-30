import React, { useState } from 'react';
import { FaArrowUp } from "react-icons/fa";


const Newsgrid = ({ newsData }) => {
  console.log(newsData);

  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);

  return (
    <div className="mb-6 place-content-center flex flex-col w-full items-center gap-4 pt-8 pb-24 px-10 rounded-md relative bg-form-bg/90 max-w-screen-lg mx-auto">
      <div className="pl-0 pr-[580px] py-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] ">
        <div className="ms-4  [font-family:'Barlow-Bold',Helvetica] text-3xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
          Latest News
        </div>
      </div>
      <div className='bg-main-dark-bg rounded-lg p-6'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item, index) => (
            <div
              key={index}
              className="bg-form-bg rounded-lg hover:bg-gradient-to-b hover:from-transparent hover:to-[rgba(11,12,23,0.6)] shadow-md overflow-hidden"
            >

              <a href={item.url}>
                <img
                  className="w-full h-32 object-cover"
                  src={item.urlToImage}
                  alt={item.title}
                />
              </a>
              <div className="p-4 flex flex-col h-full">
                <div className="mb-2">
                  <span className="text-gray-500 text-sm">{item.source.name}</span>
                </div>
                <div className="mb-2">
                  <a href={item.url} className="text-lg text-white font-semibold line-clamp-2 hover:line-clamp-none">{item.title}</a>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                <div className="mt-4 flex items-center text-white hover:border-b w-28">
                  <a href={item.url} className=" p-1">Read More</a>
                  <svg
                    className="ml-2 -mr-1 w-4 h-4 text-white hover:text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        {showScrollButton && (
          <button
            className="bg-main-bg text-xl text-white px-4 py-2 rounded-full hover:bg-blue-800 focus:outline-none hover:ring focus:border-blue-300"
            onClick={scrollToTop}
            title="Scroll to the Top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default Newsgrid;
