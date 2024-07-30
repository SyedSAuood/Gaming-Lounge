import React from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const VideoDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title, channelTitle } = location.state;

  return (
    <div className='place-content-center flex flex-col items-center p-5 bg-form-bg/50 shadow-lg w-full max-w-screen-lg mx-auto mt-20 rounded-[10px]'>
      <div className="video-details place-content-start items-start  mb-4">
        <div className='bg-main-dark-bg rounded-md p-4 mb-4'>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls />
        </div>
        <div className='bg-main-dark-bg shadow-md rounded-md p-4'>
          <h2 className="video-title text-xl font-semibold text-white-800">{title}</h2>
          <p className="channel-name text-sm text-gray-500">{channelTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
