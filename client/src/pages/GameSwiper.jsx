/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

import './gameswiper.css'

import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules'

const GameSwiper = ({ games }) => {

    //console.log(games);
    const [active, setActive] = useState(false)

    const handelToggleVideo = () => {
        setActive(!active)
    }
    return (
        <div className='p-5 bg-form-bg/90 w-full max-w-screen-lg mx-auto rounded-[10px]  '>
            <div className="ms-4 mb-4 [font-family:'Barlow-Bold',Helvetica] text-3xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
            Top Games
          </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                navigation={true}
                loop={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 35,
                    stretch: 200,
                    depth: 250,
                    modifier: 1,
                    slideShadows: true,
                }}
                //autoplay={{
                //    delay:2500,
                //   disableOnInteraction:false
                //}}
                modules={[EffectCoverflow, Navigation, Autoplay]}
                className='gameSwiper'
            >


                {
                    games.map(item => (
                        <SwiperSlide key={item._id} >

                            <div className='gameSlider' >
                                <img src={item.img} alt='gameImage' />
                                <div className={`video ${active ? 'active' : undefined}`}>
                                    <iframe
                                        width='1200'
                                        height='720'
                                        src={item.trailer}
                                        title={item.title}
                                        allow="accelerometer; clipboard-write; encrypted-media; gyropscope; picture-inpicture"
                                        allowFullScreen>
                                    </iframe>
                                </div>


                                <div className='content'>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                    <div className="button">
                                        <a href="#" className="orderBtn">
                                            Order Now
                                        </a>

                                        <a href="#" className={`playBtn ${active ? 'active' : undefined}`}
                                            onClick={handelToggleVideo}>
                                            <span className="pause">
                                                <FaPause className="me-2" />
                                            </span>

                                            <span className="play">
                                                <FaPlay className="me-2" /> 
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>)
}

export default GameSwiper