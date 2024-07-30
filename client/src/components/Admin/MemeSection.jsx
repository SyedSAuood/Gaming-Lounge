import React, { useState, useEffect } from 'react'
import axios from 'axios'


const MemeSection = () => {
    const [image, setImage] = useState([]);

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

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`api/pic/delete/${id}`);
            console.log(response);
            fetchImages(); // Refresh images after delete
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="container mt-12 mx-auto py-8 text-white">
            <div className="max-w-screen-lg mx-auto bg-[#2f323a] rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-semibold mb-4">Feed</h1>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {image.map(el => (
                        <div key={el._id} className="bg-main-dark-bg p-4 rounded-lg mb-4">
                            <img src={el.image} alt="Uploaded" className="max-w-full h-auto mb-4 rounded-lg" />
                            <button onClick={() => handleDelete(el._id)} className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MemeSection