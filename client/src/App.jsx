import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useStateContext } from './contexts/ContextsProvider'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home'
import Valo from './pages/Valo'
import News from './pages/News';
import { samplegamedata } from './data/SidebarData'
import LiveTournament from './components/LiveTournament';
import VideoDetail from './pages/VideoDetail';
import SingleRegisration from './components/TournmentRegistration/SingleRegistration';
import TeamRegistration from './components/TournmentRegistration/TeamRegisration';
import DisplayTeam from './components/TournmentRegistration/DisplayTeam';
import Admin from './components/Admin';
import Post from './components/MemeSection/Post';
import Display from './components/MemeSection/Display';
import AddItem from './components/Shop/AddItem';
import Shop from './pages/Shop';
import Chat from './components/Chatbox/Chat';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const { activeMenu, login, user } = useStateContext()
  //const [games, setGames] = useState([]);
  //const [count, setCount] = useState(0)

  //const isuser = "SMS"
  return (


    <BrowserRouter>
      <div className=' flex relative dark:bg-main-dark-bg'>
        <ToastContainer position="bottom-right"
          autoClose={5000} // Adjust the autoClose duration as needed
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ color: '#000000' }} />
        {activeMenu ? (
          <div className='w-72 fixed sidebar
          
            bg-main-bg' >
            <Sidebar className='transition duration-700 ease-in-out' />

          </div>
        ) : (
          <div className='w-0
            ' >
            <Sidebar className='transition duration-700 ease-in-out' />
          </div>
        )}
        <div className={
          `dark:bg-main-dark-bg bg-main-bg min-h-screen 
           w-full 
           
           ${activeMenu
            ? 'md:ml-72'
            : 'flex-2'}`

        }>
          <div className='fixed 
          bg-main-dark-bg
         
          navbar w-full '>
            <Header />
          </div>


          <div>
            <Routes>
              {/*Home Route */}
              <Route path='/' element={<Home games={samplegamedata} />} />
              <Route path='/Home' element={<Home games={samplegamedata} />} />
              {/* game route */}
              <Route path='/:gameName' element={<Valo games={samplegamedata} />} />
              {/* app route */}
              {
                user.username === "._sms_." ? (
                  <Route path='/admin' element={<Admin />} />
                ) : (
                  <>
                  </>
                )
              }
              {
                user.data === "Unauthorized" ? (
                  <Route path='/Memes' element={<Display />} />
                ) : (
                  <Route path='/PostMemes' element={<Post />} />
                )
              }
              <Route path='/Memes' element={<Display />} />

              {/* News api is working donot open this plzzz */}
              {/* <Route path='/Latest news' element={<News games={samplegamedata} />}/> */}

              {/* <Route path='/Shop' element={<Shop games={games} />}/> */}

              {/* Live Tournment Working plz donot open */}
              {/* <Route path='/live Steaming' element={<LiveTournament/>}/>
            <Route path="/video/:id" element={<VideoDetail/>} /> */}

              <Route path='/Shop' element={<Shop gamename={"All"} />} />

              <Route path='/Addtoshop' element={<AddItem />} />

              <Route path='/Chat' element={<Chat />} />
            </Routes >
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App
