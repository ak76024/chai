"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connect";
import User from "@/models/User";

export const initiate = async (amount, to_user, paymentform) => {
    await connectDB();
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RZP_KEY, key_secret: process.env.RZP_TEST_SECRET });

    let options = {
        amount: Number(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options);
    await Payment.create({oid: x.id,amount: Number(amount)/100, to_user, name: paymentform.name, msg: paymentform.msg});
    return x;
}

export const fetchuser = async (username) => {
    await connectDB();
     
    let u = await User.findOne({username});
    if (!u) {
        return { error: "User not found" };
    }
    let user = u.toObject({flattenObjectIds: true});
    delete user._id;
    return user;
}

export const fetchpayments = async (username) => {
    await connectDB();

    let payments = await Payment.find({
        to_user: username,
        done: true
    }).sort({ createdAt: -1 }).lean().limit(10);

    return payments.map(p => ({
        ...p,
        _id: p._id.toString()
    }));
}

export const updateProfile = async (form, username) => {
    await connectDB();

    let nData = Object.fromEntries(form);
    let user = await User.findOne({ username: username });
    if (!user) {
        return { error: "User not found" };
    }
    if(username !== nData.username){
        let existingUser = await User.findOne({ username: nData.username });
        if (existingUser) {
            return { error: "Username already taken" };
        }
    }
    await User.updateOne({email:nData.email}, nData);
    return { success: true };
}