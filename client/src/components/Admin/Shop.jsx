import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Shop = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [buydata, setBuyData] = useState([]);
  const [selldata, setSellData] = useState([]);
  const [objectid,SetObjectid] = useState('');
  const [objectid2,SetObjectid2] = useState('');
  const [searchselldata,Setsearchselldata] = useState('');
  const [searchbuydata,Setsearchbuydata] = useState('');



  useEffect(() => {
    try {
      axios.get("api/shop/buyaccount").then(res => setBuyData(res.data));
      axios.get("api/shop/sellaccount").then(res => setSellData(res.data));
    } catch (error) {
      console.log(error);
    }

  }, []);

  const approveSellData = async (id) => {
    try {
      const response = await axios.put(`/api/shop/sell/approve/${id}`);
      console.log(response.data); // Assuming the response indicates success
      window.location.reload();
      return response.data; // You can handle the response data as needed
    } catch (error) {
      console.error('Error approving sell data:', error);
      throw error; // You can handle errors as needed
    }
  };
  const approvebuyData = async (id) => {
    try {
      const response = await axios.put(`/api/shop/buy/approve/${id}`);
      console.log(response.data); // Assuming the response indicates success
      window.location.reload();
      return response.data; // You can handle the response data as needed
    } catch (error) {
      console.error('Error approving sell data:', error);
      throw error; // You can handle errors as needed
    }
  };

  async function HandleBuyDelete(id) {
    console.log(id)
    try {
      const response = await axios.delete(`api/shop/delete/${id}`);
      console.log(response);
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  }

  async function HandleSellDelete(id) {
    console.log(id)
    try {
      const response = await axios.delete(`api/shop/sellaccount/delete/${id}`);
      // console.log(response);
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  }

 function handleClickSellSearch(id){
      try {
          axios.get(`api/shop/getsellorder/${id}`).then(res=>Setsearchselldata(res.data))
        } catch (error) {
          console.error(error);
        }
    }

  function handleClickBuySearch(id){
      try {
          axios.get(`api/shop/getbuyorder/${id}`).then(res=>Setsearchbuydata(res.data))
        } catch (error) {
          console.error(error);
        }
  }



  return (
    <div className="mt-12 mx-auto py-8">
      <div className="max-w-screen-lg mx-auto bg-[#2f323a] rounded-lg shadow-lg p-8">

        <div className="mb-8 p-4 rounded-lg bg-main-dark-bg">
          <h1 className="font-bold text-white text-2xl mb-4">Requested Accounts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchbuydata || buydata.map((item) => (

              <div key={item.id} className="flex flex-col h-fit bg-form-bg text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-pointer">
                <div className="font-semibold text-white text-lg">{item.gameTitle}</div>
                <div className="text-blue-700">Username: {item.username}</div>
                <div>ID:{item._id} </div>
                <div>Account Level: {item.accountLevel}</div>
                <div>InGame Currency: {item.inGameCurrency}</div>
                <div>Platform: {item.platform}</div>
                {/* <div>Quantity: {item.quantity}</div> */}
                <div>despcription: {item.description}</div>
                {/* <div>Approved: {item.approved.toString()}</div> */}
                {
                  item.approved.toString() === "true" ? (
                    <div>
                      <span role="img" aria-label="Safe Sign">✅</span> Approved
                    </div>

                  ) : (
                    <div>
                      <span role="img" aria-label="Warning Sign">⚠️</span> Not Approved
                    </div>
                  )
                }
                <div>Rare Items:</div>
                <ul>
                  {item.rareItems.map((rareItem, index) => (
                    <li key={index}>{rareItem}</li>
                  ))}
                </ul>
                <div className="font-semibold text-blue-700">{item.price}rs</div>
                <div className='mt-2 flex flex-row-2'>
                  <button onClick={() => approvebuyData(item._id)}
                    className={`bg-dark-bg w-full border border-gray-300 rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white hover:bg-slate-800 hover:border-slate-800 transition-all ${item.approved ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={item.approved}
                  >Approve</button>
                  <button
                    className='bg-red-600 w-full  rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white transition-all'
                    onClick={() => HandleBuyDelete(item._id)} >
                    Delete
                  </button>
                </div>
              </div>
            )
            )}
          </div>
        </div>


        <div className="p-4 rounded-lg bg-main-dark-bg">
          <h1 className="font-bold text-white text-2xl mb-4">Accounts For Sale</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchselldata || selldata.map((item) => (

              <div key={item.id} className="flex flex-col h-full bg-form-bg text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-pointer">
                <div className="font-semibold text-white text-lg">{item.gameTitle}</div>
                <div className="text-blue-700">Username: {item.username}</div>
                <div>ID:{item._id} </div>
                <div>Account Level: {item.accountLevel}</div>
                <div>In-Game Currency: {item.inGameCurrency}</div>
                <div>Platform: {item.platform}</div>
                {/* <div>Quantity: {item.quantity}</div> */}
                <div>despcription: {item.description}</div>
                {/* <div>Approved: {item.approved.toString()}</div> */}
                {
                  item.approved.toString() === "true" ? (
                    <div>
                      <span role="img" aria-label="Safe Sign">✅</span> Approved
                    </div>

                  ) : (
                    <div>
                      <span role="img" aria-label="Warning Sign">⚠️</span> Not Approved
                    </div>
                  )
                }
                <ul>
                  {item.rareItems && item.rareItems.length > 0 ? (
                    item.rareItems.map((rareItem, index) => (
                      <>
                        <div>Rare Items:</div>
                        <li key={index}>{rareItem}</li>
                      </>
                    ))
                  ) : (
                    <div className='mt-10'></div>
                  )}
                </ul>
                <div className="font-semibold text-blue-700">{item.price}rs</div>
                <div className='mt-2 flex flex-row-2'>
                  <button onClick={() => approveSellData(item._id)}
                    className={`bg-dark-bg w-full border border-gray-300 rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white hover:bg-slate-800 transition-all ${item.approved ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={item.approved}
                  >Approve</button>
                  <button
                    className='bg-red-600 w-full rounded-lg shadow-md m-1 px-2 py-1 text-sm font-medium text-white transition-all'
                    onClick={() => HandleSellDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            )
            )}
          </div>
        </div>



        <div className='mt-2 mr-2 ml-2'>
          <label>
            Search For Accounts For Sale 
              <input
                  placeholder="ID" className=" pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                  type="text"
                  value={objectid}
                  onChange={(e) => SetObjectid(e.target.value)}
              />
              <button onClick={()=>handleClickSellSearch(objectid)}>
                  Check
              </button>

          </label>
          </div>
          
        <div>
          <label>
            Search For Requested Accounts
              <input
                  placeholder="ID" className=" pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                  type="text"
                  value={objectid2}
                  onChange={(e) => SetObjectid2(e.target.value)}
              />
              <button onClick={()=>handleClickBuySearch(objectid)}>
                  Check
              </button>
          </label>
          </div>


          {/* <div className="mt-8 p-4 rounded-lg bg-main-dark-bg">
          {searchselldata && (
            <div className="mb-8 p-4 rounded-lg bg-form-bg">
              <h2 className="font-bold text-white text-xl mb-4">Search Result for Sale Account</h2>
              <div className="flex flex-col h-fit text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500">
                <div className="font-semibold text-white text-lg">{searchselldata.gameTitle}</div>
                <div className="text-blue-700">Username: {searchselldata.username}</div>
                <div>ID:{searchselldata._id} </div>
                <div>Account Level: {searchselldata.accountLevel}</div>
                <div>In-Game Currency: {searchselldata.inGameCurrency}</div>
                <div>Platform: {searchselldata.platform}</div>
                <div>description: {searchselldata.description}</div>
                {searchselldata.approved.toString() === "true" ? (
                  <div>
                    <span role="img" aria-label="Safe Sign">✅</span> Approved
                  </div>
                ) : (
                  <div>
                    <span role="img" aria-label="Warning Sign">⚠️</span> Not Approved
                  </div>
                )}
                <div>Rare Items:</div>
                <ul>
                  {searchselldata.rareItems.map((rareItem, index) => (
                    <li key={index}>{rareItem}</li>
                  ))}
                </ul>
                <div className="font-semibold text-blue-700">{searchselldata.price}rs</div>
              </div>
            </div>
          )}
          
          {searchbuydata && (
            <div className="mb-8 p-4 rounded-lg bg-form-bg">
              <h2 className="font-bold text-white text-xl mb-4">Search Result for Requested Account</h2>
              <div className="flex flex-col h-fit text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500">
                <div className="font-semibold text-white text-lg">{searchbuydata.gameTitle}</div>
                <div className="text-blue-700">Username: {searchbuydata.username}</div>
                <div>ID:{searchbuydata._id} </div>
                <div>Account Level: {searchbuydata.accountLevel}</div>
                <div>InGame Currency: {searchbuydata.inGameCurrency}</div>
                <div>Platform: {searchbuydata.platform}</div>
                <div>description: {searchbuydata.description}</div>
                {searchbuydata.approved.toString() === "true" ? (
                  <div>
                    <span role="img" aria-label="Safe Sign">✅</span> Approved
                  </div>
                ) : (
                  <div>
                    <span role="img" aria-label="Warning Sign">⚠️</span> Not Approveds
                  </div>
                )}
                <div>Rare Items:</div>
                <ul>
                  {searchbuydata.rareItems.map((rareItem, index) => (
                    <li key={index}>{rareItem}</li>
                  ))}
                </ul>
                <div className="font-semibold text-blue-700">{searchbuydata.price}rs</div>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Shop;
