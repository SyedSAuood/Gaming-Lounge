import React ,{useEffect,useState} from 'react';
import Menu from './Menu';
import Newsgrid from './Newsgrid';
import {samplegamedata} from '../data/SidebarData'

const News = () => {
  const [active,setActive] =useState([])
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("Gaming")

  // useEffect(()=>{
  //   fetch(`https://newsapi.org/v2/everything?q=${category}&apiKey=cdee6a2bfe394cdfa31c90fcc79d1798`)
  //   .then(res => res.json())
  //   .then(data => setNewsData(data.articles))
  // },[category])

  return (
      <div>
        <Menu active={active} setActive={setActive} setCategory={setCategory} />
        <Newsgrid newsData={newsData} />
      </div>
      );
};

export default News;
