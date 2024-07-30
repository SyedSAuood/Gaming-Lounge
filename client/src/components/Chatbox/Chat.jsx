import React from 'react'
import Sidebar from '../Chatbox/sidebar/Sidebar'
import MessageContainer from './messages/MessageContainer'
import SearchInput from './sidebar/SearchInput'

const Chat = () => {
  return (
    <div className="container mt-12 mx-auto py-8 text-white">
        <div className="max-w-screen-lg mx-auto bg-[#2f323a] rounded-lg shadow-lg p-8">
            <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
               
                  {/* <SearchInput/> */}
                  <div className='divider px-3'></div>
                  <Sidebar />
                  <MessageContainer />
               
            </div>
        </div>
    </div>

  )
}

export default Chat