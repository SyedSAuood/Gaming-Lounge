import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useStateContext } from '../../contexts/ContextsProvider'
import { toast } from 'react-toastify'


const DisplayPlayers = ({ tournament_id, setmessage }) => {

    const [data, setData] = useState([])
    const { user } = useStateContext();
    const scrollRef = useRef();

    useEffect(() => {
        try {
            axios.get('api/singleregistration/allregistration')
                .then(res => setData(res.data))
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [data]);


    const handledelete = async (id) => {
        try {
            const response = await axios.delete(`api/singleregistration/Deregister/${id}`)
            console.log(response.data)
            toast.success('Deleted Successfully!');
        } catch (error) {
            console.log(error)
        }
    }


    console.log(data)
    return (
        <>
            {
                data.filter((i) => i.id == tournament_id).map((item, index) => (
                    <div className='mt-6 max-w-md w-full mx-auto p-8 bg-form-bg shadow-lg rounded-md text-white' ref={scrollRef}>
                        <h1 className="text-xl font-bold mb-4" >Registered Players</h1>
                        <div className='rounded-lg p-4 bg-main-dark-bg '>
                            <div className='mb-4'>
                                <p><b>Event:</b> {item.name}</p>
                                <p><b>Organizer:</b> {item.organizer}</p>

                            </div>
                            <table className=' min-w-full overflow-auto bg-white 0 divide-y divide-gray-200 rounded-lg'>
                                <thead className='bg-gray-50 text-black rounded-lg'>

                                    <th className="py-2 px-3 text-center font-bold text-sm rounded-lg">Players</th>

                                    <th className="py-2 px-3 text-center font-bold text-sm rounded-lg">Email</th>

                                </thead>
                                <tbody className='text-center text-black '>
                                    {
                                        item.Registerd.map((item) => (
                                            <tr>
                                                <td className='py-3 px-4'>{item.player}</td>
                                                <td className='py-3 px-4'>{item.email}</td>
                                            </tr>
                                        ))
                                    }

                                    <tr>
                                        <td colSpan="1" className="py-2 px-4">
                                            {
                                                item.Registerd.map((item) => (
                                                    item.player == user.username ? (
                                                        <button
                                                            className="bg-red-500 text-white py-1 px-2 rounded"
                                                            onClick={() => handledelete(item._id)} >Delete</button>
                                                    ) : (
                                                        <></>
                                                    )
                                                ))
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default DisplayPlayers