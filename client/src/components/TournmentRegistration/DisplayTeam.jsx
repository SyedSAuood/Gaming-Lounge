import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useStateContext } from '../../contexts/ContextsProvider'
import { toast } from 'react-toastify'

const DisplayTeam = ({ Tounament_id, setmessage }) => {

  const [data, setData] = useState([])
  const { user } = useStateContext();
  const scrollRef = useRef();

  useEffect(() => {
    try {
      axios.get("api/team/Allteams").then(res => setData(res.data))
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


  const handleDelete = async (itemId) => {
    console.log(itemId)
    try {
      // Make a DELETE request to the server
      const response = await axios.delete(`/api/team/deleteteam/${itemId}`);

      console.log(response.data);
      toast.success('Deleted Successfully!');
      
    } catch (error) {
      console.error('Error deleting team:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  }
  console.log(data)
  return (
    <>
{
  data.filter((i) => i.id === Tounament_id)
        .map((item, index) => (
          <div
            className='mt-6 max-w-md w-full mx-auto p-8 bg-form-bg text-white shadow-lg rounded-md overflow-x-auto'
            ref={scrollRef}
            key={index}
          >
            <h1 className="text-xl font-bold mb-4 ">Registered Teams</h1>
            <div className='rounded-lg p-4 bg-main-dark-bg'>
              <div className='mb-4'>
                <p><b>Event: </b>{item.name}</p>
                <p><b>Organizer: </b>{item.organizer}</p>
              </div>
              <table className=" min-w-full overflow-auto bg-white 0 divide-y divide-gray-200 rounded-lg">
                <thead className="bg-gray-50 text-black rounded-lg">
                  <tr>
                    <th className="py-2 px-3 text-center font-bold text-sm rounded-lg">Team Name</th>
                    <th className="py-2 px-3 text-center font-bold text-sm">Members</th>
                    <th className="py-2 px-3 text-center font-bold text-sm rounded-lg">Emails</th>
                    {/* <th className="py-2 px-4 text-left font-semibold text-sm">Action</th> */}
                  </tr>
                </thead>
                <tbody className='text-black'>
                  {item.Team.map((team, teamIndex) => (
                    <React.Fragment key={teamIndex}>
                      <tr className={teamIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                        <td className="py-3 px-4">{team.name}</td>
                        <td className="py-3 px-4">
                          <ul>
                            {team.members.map((member, memberIndex) => (
                              <li key={memberIndex}>{member}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 px-4">
                          <ul>
                          {team.emails.map((email, emailIndex) => (
  <li key={emailIndex} className="truncate hover:overflow-visible">
    <span title={email}>{email.length > 10 ? email.substring(0, 10) + '...' : email}</span>
  </li>
))}

                          </ul>
                        </td>
                        
                      </tr>
                      <tr>
                        <td colSpan="3" className="py-2 px-4">
                          {/* This is an empty row to separate the delete button */}
                          {team.createdBy === user.username && (
                            <button className="bg-red-500 text-white py-1 px-2 rounded" onClick={() => handleDelete(team._id)}>
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        
    </>
  )
}

export default DisplayTeam

