import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useStateContext } from '../../contexts/ContextsProvider';

const ButOrder = () => {
    const [gameTitle, setGameTitle] = useState('Valorant');
    const [accountLevel, setAccountLevel] = useState();
    const [platform, setPlatform] = useState('PC');
    const [inGameCurrency, setInGameCurrency] = useState();
    const [rareItem, setRareItem] = useState([])
    const [rareItems, setRareItems] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [itemsAdded, setItemsAdded] = useState(false);
    const { user } = useStateContext();



    const handlerareitems = () => {
        if (rareItems.trim() !== '') {
            setRareItem([...rareItem, rareItems])
            setRareItems('');
            setItemsAdded(true);
        }
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (!gameTitle || !accountLevel || !inGameCurrency || !description || !quantity || !price) {
            toast.warning('Please fill in all required fields.');
            return;
        }
        if (user.data === "Unauthorized") {
            toast.error("Login Please")
        } else {
            try {
                const response = await axios.post('/api/shop/buy', {
                    Username: user.username,
                    Userid:user._id,
                    GameTitle: gameTitle,
                    AccountLevel: accountLevel,
                    Platform: platform,
                    InGameCurrency: inGameCurrency,
                    RareItem: rareItem,
                    Description: description,
                    Quantity: quantity,
                    Price: price
                })
                console.log(response.data)
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className="max-w-screen-lg mx-auto bg-form-bg rounded-lg shadow-lg p-8 ">
            <h1 className="[font-family:'Barlow-Bold',Helvetica] font-bold text-white text-[22px] tracking-[0.15px] leading-[27px] whitespace-nowrap">Request an Account</h1>
            <div className="flex justify-between items-end ">
                <form className='flex flex-col '>
                    <div className='mr-2 ml-2 '>
                        {/* <label>Game Title:</label> */}
                        <select className="w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 text-black placeholder-gray-600 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                            value={gameTitle} onChange={(e) => setGameTitle(e.target.value)}>
                            <option>Valorant</option>
                            <option>CALL OF DUTY</option>
                            <option>FiFa</option>
                            <option>CS GO</option>
                        </select>
                    </div>
                    <div className='mt-2 mr-2 ml-2 flex'>
                        <input
                            placeholder="Account Level" className=" pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                            type="number"
                            value={accountLevel >= 0 ? accountLevel : ''}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setAccountLevel(value >= 0 ? value : 0);
                            }}
                        />
                        <select placeholder="Platform" className="ml-6 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                            <option>PC</option>
                            <option>Xbox</option>
                            <option>PlayStation</option>
                        </select>
                    </div>
                    <div className='mt-2 mr-2 ml-2'>
                        <textarea
                            placeholder="Description" className=" pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='mt-2 mr-2 ml-2'>
                        <input
                            placeholder="Rare Items" className=" pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                            type="text"
                            value={rareItems}
                            onChange={(e) => setRareItems(e.target.value)}
                        />
                        <button type="button"
                            className="bg-dark-bg border border-gray-300 rounded-lg shadow-md mt-2 ml-2 px-2 py-1 text-sm font-medium text-white hover:bg-black hover:border-black transition-all"
                            onClick={handlerareitems}
                        >Add Item</button>
                        {itemsAdded && ( // Render ul only if items are added
                            <ul className="">
                                {rareItem.map((item, index) => (
                                    <li className='pr-2 text-black w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200' key={index}>{index + 1}. {item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className='mt-2 mr-2 ml-2 flex'>
                        <input
                            placeholder="In-Game Currency" className=" pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                            type="number"
                            value={inGameCurrency >= 0 ? inGameCurrency : ''}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setInGameCurrency(value >= 0 ? value : 0);
                            }}
                        />
                        <input placeholder="Quantity" className="ml-6 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                            type="number"
                            value={quantity >= 0 ? quantity : ''}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setQuantity(value >= 0 ? value : 0);
                            }}
                        />
                    </div>
                    <div className='mt-2 mr-2 ml-2'>
                        <input
                            placeholder="Price" className=" pr-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400"
                            type="number"
                            value={price >= 0 ? price : ''}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setPrice(value >= 0 ? value : 0);
                            }}
                        />
                    </div>
                    <button type="submit"
                        className="mt-6 m-2 mb-0 bg-dark-bg border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 hover:border-slate-800 transition-all"
                        onClick={HandleSubmit}
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ButOrder