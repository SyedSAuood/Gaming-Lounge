import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../../contexts/ContextsProvider';
import Shoppopup from './Shoppopup';

const AddItem = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [buydata, SetbuyData] = useState([]);
  const [selldata, SetsellData] = useState([]);

  useEffect(() => {
    try {
      axios.get("api/shop/buyaccount").then(res => SetbuyData(res.data));
      axios.get("api/shop/sellaccount").then(res => SetsellData(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { user } = useStateContext();

  const HandleOpenPopup = () => {
    if (user.data === "Unauthorized") {
      setPopupOpen(true);
    } else {
      setPopupOpen(true);
    }
  };

  const HandleClosePopup = () => {
    setPopupOpen(false);
  };

  async function HandleDelete(id){
    console.log(id)
    try {
      const response = await axios.delete(`api/shop/delete/${id}`);
      window.location.reload();
      console.log(response);
     
  } catch (error) {
      console.error(error);
  }
  
}

async function HandleSellDelete(id){
  console.log(id)
  try {
    const response = await axios.delete(`api/shop/sellaccount/delete/${id}`);
    window.location.reload();
    console.log(response);
   
} catch (error) {
    console.error(error);
}
}

  return (
    <div className="container mt-12 mx-auto py-8 text-white">
      <div className="max-w-screen-lg mx-auto bg-[#2f323a] rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-end mb-4">
          <div className="ms-4 [font-family:'Barlow-Bold',Helvetica] text-3xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
            Accounts Listed
          </div>
          <button className="bg-dark-bg border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-black hover:border-black transition-all" onClick={HandleOpenPopup}>
            Create Post
          </button>
        </div>
        {isPopupOpen && <Shoppopup isOpen={isPopupOpen} onClose={HandleClosePopup} />}
        <div className=''>
          <div className='mt-10 bg-main-dark-bg p-4 rounded-lg'>
            <div className="ms-4 mb-2 [font-family:'Barlow-Bold',Helvetica] text-2xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
              Requested accounts
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {buydata.map((item) => (
                item.username === user.username ? (
                  <div className="flex flex-col bg-form-bg text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-pointer" key={item.id}>
                    <div className="text-lg text-white font-semibold">{item.gameTitle}</div>
                    <div>Level: {item.accountLevel}</div>
                    <div>Currency: {item.inGameCurrency}</div>
                    <div>Platform: {item.platform}</div>
                    <div>Price: {item.price}</div>
                    <div>Quantity: {item.quantity}</div>

                    <div className='mt-2 flex flex-row-2'>
                      <button
                        className='bg-dark-bg w-full border border-gray-300 rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white hover:bg-red-600 hover:border-red-500 transition-all'
                        onClick={() => HandleDelete(item._id)} >
                        DELETE
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                  </>
                )
              ))}
            </div>
          </div>
          <div className='mt-10 bg-main-dark-bg p-4 rounded-lg'>
            <div className="ms-4 mb-2 [font-family:'Barlow-Bold',Helvetica] text-2xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
              Accounts up for sale
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {selldata.map((item) => (
                item.username === user.username ? (
                  <div className="flex flex-col bg-form-bg text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-pointer"
                    key={item.id}>
                    <div className="text-lg text-white font-semibold">{item.gameTitle}</div>
                    <div>Level: {item.accountLevel}</div>
                    <div>Currency: {item.inGameCurrency}</div>
                    <div>Platform: {item.platform}</div>
                    <div>Price: {item.price}</div>
                    <div>Quantity: {item.quantity}</div>

                    <div className='mt-2 flex flex-row-2'>
                     
                      <button
                        className='bg-dark-bg w-full border border-gray-300 rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white hover:bg-red-600 hover:border-red-500 transition-all'
                        onClick={() => HandleSellDelete(item._id)} >
                        DELETE
                      </button>
                    </div>
                  </div>

                ) : (
                  <>
                  </>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
