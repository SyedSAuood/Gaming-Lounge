import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video: { id, snippet } }) => {
  console.log(id.videoId, snippet);

  return (
    <Link to={`/video/${id.videoId}`} state={{ title: snippet.title, channelTitle: snippet.channelTitle }}>
      <div className=''>
        <div className="video-card rounded-md bg-form-bg  transition-transform transform hover:scale-105">
          <div className="thumbnail">
            <img
              className="w-full h-48 object-cover rounded-md"
              src={snippet?.thumbnails?.high?.url}
              alt="videoimage"
            />
          </div>
          <div className="video-details mt-4">
            <p className="video-title text-lg font-semibold text-blue-500">{snippet?.title}</p>
            <p className="channel-name text-sm text-gray-500">{snippet?.channelTitle}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
