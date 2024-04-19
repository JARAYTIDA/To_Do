import mongoose from "mongoose";

const user = mongoose.Schema({
    name: { type : String , required : true },
    password: { type : String , required : true },
    email_id: { type : String , unique : true, required : true },
    ticket: String,
    forgotPass: String,
    verified: Boolean,
    resetPassReq: Boolean,
    contact : String,
    tasks: [Object],
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const userDetails = mongoose.model('user_details', user);

export default userDetails;