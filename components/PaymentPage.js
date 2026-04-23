"use client"
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useParams } from "next/navigation";
import { initiate, fetchuser, fetchpayments } from '@/actions/useraction';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

const PaymentPage = () => {
    const searchParams = useSearchParams();
    const [form, setform] = useState({ name: "", amount: "", msg: "" });
    const [currentUser, setcurrentUser] = useState({ username: "" });
    const [payment, setpayment] = useState({});
    const params = useParams();

    const input = "px-4 py-2 border rounded w-1/2";
    const btn = "px-4 py-2 rounded";

    let u;

    useEffect(() => {
        getData(params.username);
        if(searchParams.get("payment") === "true") {
            toast.success("Payment successful!");
        }
    }, []);

    const quickSupport = (amount) => {
        setform({ ...form, amount });
    }

    const getData = async (username) => {
        let u = await fetchuser(username);
        if (u.error) {
            toast.error(u.error);
            setcurrentUser({ username: "User Not Found"});
            return;
        }
        setcurrentUser(u);
        let payments = await fetchpayments(username);
        setpayment(payments);
    }

    const pay = async (amount) => {
        amount = Number(amount) * 100;
        if (amount <= 0) {
            toast.error("Enter a Valid Amount...");
            return;
        } else if (form.name.length === 0) {
            toast.error("Enter a Valid Name...");
            return;
        }

        let a = await initiate(amount, params.username, form);
        let orderId = a.id;
        var options = {
            "key": currentUser.razorpayId,
            "amount": amount,
            "currency": "INR",
            "name": "Help the creator to buy a chai",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className="flex items-center flex-col gap-2">
                <img className="rounded-full border-2 shadow-lg shadow-blue-500" width={250} src={currentUser.image || "/user2.gif"} alt="User Avatar" />
                <h1 className="text-2xl font-bold">{currentUser?.username || "User"}</h1>
                <p>{currentUser?.bio || "No bio available."}</p>
                <p>500 Followers, 58 Posts</p>
                {currentUser?.username !== "User Not Found" && (
                    <div className="flex gap-3 w-[80%]">
                        <div className="w-1/2 flex gap-2 p-4 bg-[#2807743d] flex-col items-center">
                            <h1 className="font-bold text-2xl">Supporters</h1>
                            <ul className="flex flex-col items-center gap-1 h-[300px] w-full overflow-y-scroll px-4">
                                {
                                    payment.length > 0 ? payment.map((p, index) => (
                                        <li key={index} className="flex gap-2 items-start">
                                            <img src="/user.gif" width={30} alt="" />
                                            <span className="flex-1 break-all">
                                                <b>{p.name}</b> Gives <b>{p.amount}</b> Rs
                                                {p.msg && (
                                                    <>
                                                        {" "}with a message <strong>"{p.msg}"</strong>
                                                    </>
                                                )}
                                            </span>
                                        </li>
                                    )) : <p>No supporters yet. Be the first one to support!</p>
                                }
                            </ul>
                        </div>
                        <div className="w-1/2 bg-[#24046d3d] p-4 flex gap-2 flex-col items-center">
                            <h1 className="font-bold text-2xl">Support {currentUser?.username || "User"}</h1>
                            <form className="flex flex-col gap-2 w-full items-center">
                                <input value={form.name} onChange={(e) => setform({ ...form, name: e.target.value })} type="text" placeholder="Enter your name" className={input} />
                                <input value={form.amount} onChange={(e) => setform({ ...form, amount: e.target.value })} type="number" placeholder="Enter amount in Rs" className={input} />
                                <input value={form.msg} onChange={(e) => setform({ ...form, msg: e.target.value })} type="text" placeholder="Enter a message (optional)" className={input} />
                                <button onClick={() => { pay(form.amount) }} type='button' className={btn}>Pay</button>
                            </form>
                            <div className="flex gap-2">
                                <button onClick={() => { quickSupport(100); pay(100) }} className={btn}>Support with 100Rs</button>
                                <button onClick={() => { quickSupport(200); pay(200) }} className={btn}>Support with 200Rs</button>
                                <button onClick={() => { quickSupport(500); pay(500) }} className={btn}>Support with 500Rs</button>
                            </div>
                        </div>
                    </div>)}
            </div>
        </>
    );
}

export default PaymentPage;