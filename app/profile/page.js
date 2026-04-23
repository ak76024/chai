"use client";
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { updateProfile, fetchuser } from '@/actions/useraction';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setform] = useState({ name: "", bio: "", email: "", image: "", username: "", razorpayId: "", razorpaySecret: "" });
  const [loader, setloader] = useState(false);

  const input = "w-[80%] px-4 py-2 border rounded";
  const inputDiv = "md:w-[40%] w-[90%] flex-col flex justify-center gap-3";

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    if (session?.user) {
      fetchuser(session.user.username).then((data) => {
        setform({
          name: data?.name || "",
          bio: data?.bio || "",
          email: data?.email || "",
          image: data?.image || "",
          username: data?.username || "",
          razorpayId: data?.razorpayId || "",
          razorpaySecret: data?.razorpaySecret || "",
        });
      });
    }
  }, [session, router]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  const updateUser = async (e) => {
    e.preventDefault();
    setloader(true);
    const formData = new FormData(e.target);
    let res = await updateProfile(formData, session?.user?.username);
    if (res.error) {
      toast.error(res.error);
    } else if (res.success) {
      toast.success("Profile updated successfully ✅");
      router.refresh();
    }
    setloader(false);
  }

  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }
  return (
    <form onSubmit={updateUser}>
      <div className='flex flex-col w-full items-center p-10 gap-3'>
        <img src={form?.image || "/user2.gif"} alt="Profile Picture" className='rounded-full' width={100} />
        <h1 className='font-bold text-2xl'>Welcome, {session.user.username}!</h1>
        <div className='flex flex-col items-center justify-center gap-2 w-[80%]'>
          <div className={inputDiv}>
            <p className='font-bold'>Name: </p>
            <input value={form.name} onChange={handleChange} name='name' type="text" placeholder='Edit your name' className={input} />
          </div>
          <div className={inputDiv}>
            <p className='font-bold'>Image: </p>
            <input value={form.image} onChange={handleChange} name='image' type="text" placeholder='Edit your image URL' className={input} />
          </div>
          <div className={inputDiv}>
            <p className='font-bold'>UserName: </p>
            <input value={form.username} onChange={handleChange} name='username' type="text" placeholder='Edit your username' className={input} />
          </div>
          <div className={inputDiv}>
            <p className='font-bold'>Bio: </p>
            <input value={form.bio} onChange={handleChange} name='bio' type="text" placeholder='Edit your bio' className={input} />
          </div>
          <div className={inputDiv}>
            <p className='font-bold'>Email: </p>
            <input value={form.email} readOnly name='email' type="email" placeholder='Edit your email' className={input} />
          </div>
          <div className={inputDiv}>
            <p className='font-bold'>Razorpay ID: </p>
            <input value={form.razorpayId} onChange={handleChange} name='razorpayId' type="text" placeholder='Edit your Razorpay ID' className={input} />
          </div>
          <div className={inputDiv}>
            <p className='font-bold'>Razorpay Secret: </p>
            <input value={form.razorpaySecret} onChange={handleChange} name='razorpaySecret' type="password" placeholder='Edit your Razorpay Secret' className={input} />
          </div>
          <div className='flex gap-5 items-center justify-center'><button type="submit" disabled={loader} className='px-4 py-2 rounded'>{!loader ? "Save Changes" : "Saving..."}</button><span id='loader' className={loader ? `p-2 rounded-full border-t-2 border-l-2 border-white` : `hidden`}></span></div>
        </div>
      </div >
    </form >
  );
}

export default Profile;