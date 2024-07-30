import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VideoCard from './VideoCard';
import './Tournamentgrid.css';

const Tournamentgrid = ({ videos }) => {
  console.log(videos);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 videos at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className='p-5 bg-form-bg w-full max-w-screen-lg mx-auto rounded-[10px]'>
        <div className="ms-4  [font-family:'Barlow-Bold',Helvetica] text-3xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
          Live Tournaments
        </div>
        <div className='bg-main-dark-bg rounded-lg px-4 m-6'>
          <Slider {...settings}>
            {videos.map((item) => (
              <div className='p-5 ' key={item.id.videoId}>
                {item.id.videoId && <VideoCard video={item} />}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Tournamentgrid;
