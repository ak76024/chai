import mongoose from "mongoose";
import { Schema } from "mongoose";

const PaymentSchema = new Schema({
    name: {type:String, required:true},
    to_user: {type:String, required:true},
    oid: {type:String, required:true},
    msg: {type:String},
    amount: {type:Number, required:true},
    createdAt: {type:Date, default:Date.now},
    done: {type:Boolean, default:false},
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);