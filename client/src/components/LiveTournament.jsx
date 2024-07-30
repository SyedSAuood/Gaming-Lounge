import React , {useState,useEffect} from 'react'
import Menu from '../pages/Menu'
import Tournamentgrid from '../pages/Tournamentgrid'
import axios from 'axios'

const LiveTournament = () => {


const [active,setActive] =useState([])
const [videos, setVideos] = useState([]);
const [category, setCategory] = useState("Gaming")

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
          q: `${category}`,
          part: 'snippet,id',
          regionCode: 'US',
          maxResults: '50',
          order: 'date'
        },
        headers: {
          'X-RapidAPI-Key': '63fa2cbdf3mshf3c1412fd37b686p1e0755jsnd3e0f997b0b5',
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setVideos(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div>
        <Menu active={active} setActive={setActive} setCategory={setCategory} />
        <Tournamentgrid  videos={videos} />
    </div>
  )
}

export default LiveTournament