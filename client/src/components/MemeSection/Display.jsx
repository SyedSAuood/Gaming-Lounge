import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FaHeart } from "react-icons/fa";

const Display = () => {
  const [image, setImage] = useState([]);
  const [react, setReact] = useState('');
  const [heartColor, setHeartColor] = useState({});


  const fetchImages = async () => {
    try {
      const res = await fetch("/api/pic/allpost");
      const data = await res.json();
      setImage(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  async function HandleReact(id, react) {
    let newdata;
    // Toggle the react value
    if (react === 0) {
      newdata = 1;
    } else {
      newdata = 0;
    }
    setReact(newdata);

    const delay = 5000;

    setTimeout(() => {
      const postdata = {
        Id: id,
        React: newdata,
      };

      axios
        .post('/api/pic/react', postdata)
        .then((res) => {
          console.log(res);

        })
        .catch((error) => {
          console.log(error);
        });
      //window.location.reload();

    }, delay);
  }

  const toggleHeartColor = (id) => {
    if (heartColor[id] === 'red') {
      setHeartColor({ ...heartColor, [id]: 'white' });
    } else {
      setHeartColor({ ...heartColor, [id]: 'red' });
    }
  };

  return (
    <div className=" mt-12 mx-auto py-8">
    <div className="max-w-screen-md mx-auto bg-form-bg rounded-lg shadow-lg p-8">
    <div className="ms-4  [font-family:'Barlow-Bold',Helvetica] text-3xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
          Feed
        </div>
      <div className="mt-4 flex flex-col items-center">
        {image.map(el => (
          <div className=" flex flex-col items-center">
            <div key={el._id} className="w-full bg-main-dark-bg flex flex-col items-start bordershadow-lg p-4 rounded-lg mb-4">
              <img src={el.image} alt="Uploaded" className="max-w-full h-full mb-4 rounded-lg" />
              <button
                style={{ color: heartColor[el._id] || 'white' }}
                onClick={() => {
                  HandleReact(el._id, el.react);
                  toggleHeartColor(el._id);
                }}
                className="ml-6 relative transition duration-300 transform hover:scale-110">
                <FaHeart className="w-6 h-6" />

              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Display