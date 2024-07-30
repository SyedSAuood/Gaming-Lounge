import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdPostAdd , MdOutlineChat, MdOutlineLogout } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useStateContext } from '../contexts/ContextsProvider';
import axios from 'axios';
import useConversation from '../zustand/useConversation';

const Navbutton = ({ customFunc, icon, color, dotColor }) =>
(
  <TooltipComponent position='BottomCenter' >
    <button type='button' onClick={customFunc} style={{ color }}
      className='relative text-xl rounded-lg p-3 hover:bg-black transition-all' >
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2
       right-2 top-2'/>
      {icon}

    </button>
  </TooltipComponent>
)

function Header() {
  const { setActiveMenu, login, setLogin, user, setUser } = useStateContext();
  const {notifications,setNotifications} = useConversation()
  useEffect(() => {
    fetch('api/auth/api/user')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  // useEffect(()=>{
  //   axios.get('api/auth/api/user')
  //   .then(res => res.json())
  //   .then(data => console.log(data.data))
  // },[])

  function logineithdiscord() {
    // axios.get("api/auth/redirect").then(res=>console.log(res.data))

    window.location.assign('api/auth/redirect')
  }

  function logout() {
    window.location.assign('api/logout')
    //axios.get('api/auth/logout').then((response)=>{console.log(response)}).then(res => res.json()).then(data => setLogin(data))
  }

  console.log(user.username)


  const handleChatButtonClick = () => {
      // Clear notifications when chat button is clicked
      setNotifications([]);
  };

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>

      <Navbutton customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color='white' icon={<AiOutlineMenu />} />



      {user.data === "Unauthorized" ? (
        <div
          className="flex items-center gap-2 cursor-pointer p-1 transition-all rounded-lg fixed md:right-8 ">

          <button class="flex items-center bg-dark-bg rounded-lg shadow-lg px-6 py-2 text-sm font-medium text-white hover:bg-black transition-all focus:outline-none "
            onClick={logineithdiscord}>
            <svg class="h-6 w-6 mr-2"
              width="800px" height="800px" viewBox="0 -28.5 256 256" version="1.1" preserveAspectRatio="xMidYMid">
              <g>
                <path
                  d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                  fill="#5865F2" fill-rule="nonzero">
                </path>
              </g>
            </svg>
            Login with discord
          </button>
        </div>
      ) : (
        <TooltipComponent content="" position='BottomCenter' >
          <div className='flex items-center p-1 transition-all rounded-lg fixed md:right-8 '>
            <div className="flex relative top-[-20px] gap-2 ">
              <p>
                <span className='text-gray-400 font-bold ml-1 text-14 relative top-2 cursor-default' > {user.username}</span>
              </p>
              {/* <button onClick={logout} className='flex items-center bg-dark-bg border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-black hover:border-black transition-all focus:outline-none '>
                Logout
              </button> */}
              <button onClick={logout} title='Logout' 
              className='text-2xl p-2 hover:shadow-lg rounded-full hover:scale-125 hover:-translate-y-1 transition ease-in-out duration-500'><MdOutlineLogout /></button>
              <NavLink to={'/admin'}>
                {
                  user.username === "._sms_." ? (
                    // <button className='flex items-center bg-dark-bg border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-black hover:border-black transition-all focus:outline-none '>
                    //   Admin
                    // </button>
                    <button title='Admin' 
                    className='text-2xl p-2 hover:shadow-lg rounded-full hover:scale-125 hover:-translate-y-1 transition ease-in-out duration-500'><RiAdminLine /></button>
                  ) : (
                    <>
                    </>
                  )


                }
              </NavLink>

              <NavLink to={'/PostMemes'}>
                {/* <button className='flex items-center bg-dark-bg border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-black hover:border-black transition-all focus:outline-none '>
                  Post
                </button> */}
                <button title='Post'
                className='text-3xl p-1 hover:shadow-lg rounded-full hover:scale-125 hover:-translate-y-1 transition ease-in-out duration-500'><MdPostAdd />
                </button>
              </NavLink>

              <NavLink to={'/Addtoshop'}>
                {/* <button className='flex items-center bg-dark-bg border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-black hover:border-black transition-all focus:outline-none '>
                  Shop
                </button> */}
                <button title='Shop'
                className='text-2xl p-2 hover:shadow-lg rounded-full hover:scale-125 hover:-translate-y-1 transition ease-in-out duration-500'><HiOutlineShoppingBag />
                </button>
                
              </NavLink>

              <NavLink to={'/Chat'} >
                {/* <button className='flex items-center bg-dark-bg border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-black hover:border-black transition-all focus:outline-none '>
                  Chat
                </button> */}
                <button onClick={handleChatButtonClick} title='Chat'
                className='text-2xl p-2 hover:shadow-lg rounded-full hover:scale-125 hover:-translate-y-1 transition ease-in-out duration-500'><MdOutlineChat />
                {notifications.length > 0 && <div className="h-2 w-2 bg-red-500 rounded-full absolute top-0 right-0"></div>}
                </button>

              </NavLink>
            </div>
          </div>
        </TooltipComponent>
      )}
    </div>

  )
}

export default Header

