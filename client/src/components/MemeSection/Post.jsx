import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../../contexts/ContextsProvider';
import { toast } from 'react-toastify';

const Post = () => {
    const [post, setPost] = useState("");
    const [image, setImage] = useState([]);

    const {user} = useStateContext()
    console.log(user)
    const handleUploadImage = async (e) => {
        const picture = e.target.files[0];
        const image = await imagebase64(picture);
        setPost(image);
    };

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

    const imagebase64 = async (picture) => {
        const reader = new FileReader();
        await reader.readAsDataURL(picture);
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (post) {
            try {
                const res = await fetch('/api/pic/upload', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ post: post, name: user.username , react: '0' }),
                });
                const data = await res.json();
                toast.success('Image uploaded!')
                fetchImages(); // Refresh images after upload
                // window.location.reload();

            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Error uploading image:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`api/pic/delete/${id}`);
            console.log(response);
            toast.success('Image deleted!');
            fetchImages(); // Refresh images after delete

        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Error deleting image:", error);
        }
    };

    return (
        
        <div className="container mt-12 mx-auto py-8 text-white">
            <div className="max-w-screen-lg mx-auto bg-form-bg rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold mb-4">Feed</h1>
                <div>
                    <label className="block mb-4">
                        <span className="text-gray-400">Upload Image:</span>
                        <input type="file" onChange={handleUploadImage} className="hidden" />
                        <div className="bg-main-dark-bg hover:bg-main-bg cursor-pointer p-4 rounded-lg mt-2">
                            {post ? (
                                <img src={post} alt="Uploaded" className="max-w-full h-auto mb-4 rounded-lg" />
                            ) : (
                                <div className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 1a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 1a8 8 0 1 0 0 16A8 8 0 0 0 10 2zM8 8a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H9a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H9a1 1 0 0 1-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">Click to Upload</span>
                                </div>
                            )}
                        </div>
                    </label>
                    <button onClick={handleSubmit} className="bg-dark-bg border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-white hover:bg-black hover:border-[#2f323a]  transition-all focus:outline-none ">
                        Upload
                    </button>
                </div>
                <div className="mt-8">
                    {image.map(el => (
                        <div key={el._id} >
                            {
                                el.name == user.username ?(
                                    <div div className="bg-main-dark-bg p-4 rounded-lg mb-4">
                                    <img src={el.image} alt="Uploaded" className="max-w-full h-auto mb-4 rounded-lg mx-auto" />
                                    <button onClick={() => handleDelete(el._id)} className="bg-red-600 text-white py-1 px-2  rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                    </div>
                                ):(
                                    <>
                                    </>
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Post;
