"use server";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connect";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB();

    let body = await req.formData();
    body = Object.fromEntries(body);

    // check order id in db
    let payment = await Payment.findOne({ oid: body.razorpay_order_id });

    if (!payment) {
        return NextResponse.json(
            { error: "Payment not found" },
            { status: 404 }
        );
    }

    //  fetch user secret 
    let user = await User.findOne({ username: payment.to_user });
    let secret = user.razorpaySecret || process.env.RZP_TEST_SECRET;

    // verify payment
    let isValid = validatePaymentVerification(
        {
            order_id: body.razorpay_order_id,
            payment_id: body.razorpay_payment_id
        },
        body.razorpay_signature,
        secret
    );

    if (isValid) {
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        );

        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_URL}/user/${updatedPayment.to_user}?payment=true`
        );
    } else {
        return NextResponse.json(
            { error: "Payment verification failed" },
            { status: 400 }
        );
    }
};