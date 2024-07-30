
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayPlayers from './DisplayPlayers'
import { useStateContext } from '../../contexts/ContextsProvider'
import { toast } from 'react-toastify'

const SingleRegisration = ({T_iD}) => {
    const [email,setEmail]=useState('')
    const [error,setError] = useState()
    const [isComponentVisible, setComponentVisibility] = useState(false);
    const [message,setMessage] = useState('')
    const {user} = useStateContext();

    
    const handleClick = () => {
        setComponentVisibility(!isComponentVisible);
      };
    
    const handlesubmit = async () =>{
        const isConfirmed = window.confirm('These from is not editable !! Are you sure you want to submit the form ?');

        if (!isConfirmed) {
            // User canceled the submission
            return;
        }
        try {

            if(email.trim() === '' ){
                toast.warning('Please fill in all fields with valid data')
                return;
            }

            const response = await axios.post('/api/singleregistration',{
                T_id:T_iD,
                player:user.username,
                email:email
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
        <>
        <div className="mx-auto max-w-screen-lg place-content-center relative  rounded-[10px] p-4 bg-main-bg/20 ">
            <div className="max-w-md mx-auto p-8 bg-form-bg text-white shadow-lg rounded-md" >
                <h1 className="text-3xl font-bold mb-6 " >Single Registration</h1> 
            
                    <label className="block text-sm" >
                        <b>Player Name: </b> 
                        <div className='inline-block font-semibold'>{user.username}</div>
                        {/* <input type="text" value={player} placeholder={login.username} onChange={(e)=> setPlayer(e.target.value)} /> */}
                    </label>
                        
                    <label className='text-gray-800 text-sm ' >
                        {/* <b>Email:</b> */}
                        <input type="email" value={email} placeholder='Enter email' 
                         onChange={(e)=> setEmail(e.target.value)}
                         className="pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400" />
                    </label>
                    <button
                        onClick={handlesubmit}
                        className="bg-white m-2 text-blue-700 px-4 py-1 rounded-full font-semibold hover:bg-slate-800 hover:text-white transition duration-300">
                        Submit
                    </button>
                    <button
                        onClick={handleClick}
                        className="bg-white text-blue-700 px-4 py-1 border-solid  rounded-full font-semibold hover:bg-slate-800 hover:text-white transition duration-300">
                        View Players
                    </button>
                    
            </div>
            {isComponentVisible && <DisplayPlayers tournament_id={T_iD} setmessage={setMessage}  />}
            </div>
            </>

  )
}

export default SingleRegisration