"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchpayments } from '@/actions/useraction';

const page = () => {
    const { data: session } = useSession();
    const [payment, setpayment] = useState([]);
    const fetch = async () => {
        let payments = await fetchpayments(session?.user?.username);
        setpayment(payments);
    }
    useEffect(() => {
        if (session?.user?.username) {
            fetch();
        }
    }, [session?.user?.username]);
    return (
        <div>
            <table className="min-w-full border-collapse border text-center border-gray-900">
                <thead className="bg-gray-800">
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Message</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payment.map((p) => (
                        <tr key={p._id} className="border border-gray-900 hover:bg-gray-800">
                            <td>{p.name}</td>
                            <td>₹{p.amount}</td>
                            <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                            <td>{p.msg}</td>
                            <td>
                                <span className={`px-2 py-1 rounded text-sm ${p.done ? "!text-green-500" : "!text-yellow-500"}`}>
                                    {p.done ? "Completed" : "Pending"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default page;