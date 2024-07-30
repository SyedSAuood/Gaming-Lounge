import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCartArrowDown } from 'react-icons/fa6';
import TermsAndCondition from '../components/Shop/TermsAndCondition';
import { useStateContext } from '../contexts/ContextsProvider';

const Shop = ({ gamename }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [buydata, setBuyData] = useState([]);
  const [selldata, setSellData] = useState([]);

  const { user } = useStateContext()

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const buyResponse = await axios.get('api/shop/buyaccount');
        const sellResponse = await axios.get('api/shop/sellaccount');
        setBuyData(buyResponse.data);
        setSellData(sellResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopData();
  }, []);

  const HandleOpenPopup = () => {
    setPopupOpen(true);
  };

  const HandleClosePopup = () => {
    setPopupOpen(false);
  };
  console.log(selldata)

  return (
    <div className="mt-12 mx-auto py-8">
      <div className="max-w-screen-lg mx-auto bg-form-bg/90 rounded-lg shadow-lg p-8">
        <div className="ms-4 mb-4 [font-family:'Barlow-Bold',Helvetica] text-3xl font-bold text-white tracking-[0.15px] leading-[27px] whitespace-nowrap">
          Shop
        </div>
        <div className="mb-4 bg-main-dark-bg p-4 rounded-lg">
          <h1 className="font-bold  text-white text-2xl mb-4">Requested Accounts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buydata.map((item) => (
              (gamename === 'All' || item.gameTitle === gamename) && (
                <div key={item.id} className="flex flex-col h-fit bg-form-bg text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-default">
                  <div className="font-semibold text-white text-lg">{item.gameTitle}</div>
                  <div className="text-blue-700">Username: {item.username}</div>
                  <div>ID:{item._id} </div>
                  <div>Account Level: {item.accountLevel}</div>
                  <div>InGame Currency: {item.inGameCurrency}</div>
                  <div>Platform: {item.platform}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>despcription: {item.description}</div>
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
                  <div>Rare Items:
                    <ul>
                      {item.rareItems.map((rareItem, index) => (
                        <li key={index}>{rareItem}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="font-semibold text-blue-700"></div>
                  <div className="mt-4">
                    {
                      item.approved.toString() === "true" && user.username != item.username ? (
                        <button onClick={HandleOpenPopup} className="flex items-center justify-center w-full bg-white text-blue-700 px-4 py-1 rounded-full font-bold hover:bg-slate-800 hover:text-white transition duration-300">
                          <FaCartArrowDown className="mr-2" /> {item.price}rs
                        </button>
                      ) : (
                        <button onClick={HandleOpenPopup} className="flex items-center justify-center w-full bg-white text-blue-700 px-4 py-1 rounded-full font-bold transition duration-300 opacity-50 cursor-not-allowed" disabled>
                          <FaCartArrowDown className="mr-2" /> {item.price}rs
                        </button>
                      )
                    }

                    {isPopupOpen && <TermsAndCondition isOpen={isPopupOpen} onClose={HandleClosePopup} userid={item.userid} objectId={item._id} />}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        <div className='bg-main-dark-bg p-4 rounded-lg'>
          <h1 className="font-bold text-white text-2xl mb-4">Accounts For Sale</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selldata.map((item) => (
              (gamename === 'All' || item.gameTitle === gamename) && (
                <div key={item.id} className="flex flex-col h-full bg-form-bg text-gray-500 text-sm p-4 rounded-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-default">
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
                  <div className="font-semibold text-blue-700"></div>
                  <div className="mt-4">
                    {
                      item.approved.toString() === "true" && user.username != item.username ? (
                        <button onClick={HandleOpenPopup} className="flex items-center justify-center w-full bg-white text-blue-700 px-4 py-1 rounded-full font-bold hover:bg-slate-800 hover:text-white transition duration-300">
                          <FaCartArrowDown className="mr-2" /> {item.price}rs
                        </button>
                      ) : (
                        <button onClick={HandleOpenPopup} className="flex items-center justify-center w-full bg-white text-blue-700 px-4 py-1 rounded-full font-bold transition duration-300 opacity-50 cursor-not-allowed" disabled>
                          <FaCartArrowDown className="mr-2" /> {item.price}rs
                        </button>
                      )
                    }

                    {isPopupOpen && <TermsAndCondition isOpen={isPopupOpen} onClose={HandleClosePopup} userid={item.userid} objectId={item._id} />}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        <p className='m-2'>*Notice: Accounts that have not been approved yet by the admin will not be accessible.</p>
      </div>
    </div>
  );
};

export default Shop;
