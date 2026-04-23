"use client";
import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { fetchusersuggestions } from '@/actions/useraction';

const page = () => {
    const router = useRouter();

    const [username, setusername] = useState("");
    const [suggestions, setsuggestions] = useState([]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest("#suggestions-container") &&
                !e.target.closest("input[name='search']")
            ) {
                setsuggestions([]);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const searchUser = () => {
        if (!username.trim()) {
            toast.error("Please enter a username to search.");
            return;
        }
        router.push(`/user/${username}`);
    }

    const searchsuggestions = async (uname) => {
        if (!uname.trim()) {
            setsuggestions([]);
            return;
        }
        let data = await fetchusersuggestions(uname.trim());
        setsuggestions(data);
    }
    return (
        <div className='flex flex-col gap-5 items-center w-full min-h-[83vh]'>
            <h1 className='text-3xl font-bold'>Search User</h1>
            <div className='w-full lg:w-[40%] flex flex-col relative items-center'>
                <input className='border border-white p-5 py-2 lg:w-[100%] w-[80%]' type="text" name='search' placeholder='Search for a user...' value={username} onChange={(e) => { setusername(e.target.value); searchsuggestions(e.target.value); }} />
                <div id="suggestions-container" className='flex flex-col gap-2 absolute top-10 items-center mt-2 w-full'>
                    {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                        <div key={index} onClick={() => router.push(`/user/${suggestion.username}`)} className='flex cursor-pointer bg-black items-center gap-2 lg:w-[80%] w-[80%] border border-white p-2'>
                            <img src={suggestion.img} alt={suggestion.username} className='w-8 h-8 rounded-full' />
                            <span>{suggestion.username}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={searchUser}>Search</button>
        </div>
    );
}

export default page;