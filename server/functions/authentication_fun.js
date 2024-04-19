import userDetails from "../model/schema.js";
import crypto from "crypto"
import dotenv from 'dotenv'
import nodemailer from "nodemailer"
dotenv.config();

const ENCRYPTION_METHOD = process.env.ENCRYPTION_METHOD;
const HOST_NAME = process.env.HOST_NAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;
const ADMIN_NAME = process.env.ADMIN_NAME;
const SECRET_ENCRYPTION_TICKET = process.env.SECRET_ENCRYPTION_TICKET;
const SECRET_ENCRYPTION_FORGOT_PASSWORD = process.env.SECRET_ENCRYPTION_FORGOT_PASSWORD;
const REDIRECT_BASE_URL = process.env.REDIRECT_BASE_URL

const transporter = nodemailer.createTransport({
    host: HOST_NAME,
    port: 587,
    secure: false,
    auth: {
        user: ADMIN_EMAIL,
        pass: EMAIL_PASS,
    },
});

export const signup = async (req, res) => {
    const hash1 = crypto.createHash(ENCRYPTION_METHOD);
    const hash2 = crypto.createHash(ENCRYPTION_METHOD);
    const hash3 = crypto.createHash(ENCRYPTION_METHOD);
    const user = req.body;
    const data = hash1.update(user.password, 'utf-8');
    //Creating the hash in the required format
    const gen_hash= data.digest('hex');
    user.password = gen_hash;
    const ticket = hash2.update(`${user.email_id}+${user.name}_${SECRET_ENCRYPTION_TICKET}`, "utf-8");
    const ticket_gen_hash = ticket.digest('hex');
    const forgotPass = hash3.update(`${user.email_id}+${user.name}_${SECRET_ENCRYPTION_FORGOT_PASSWORD}`, "utf-8");
    const forgotPass_gen_hash = forgotPass.digest('hex');
    user.ticket = ticket_gen_hash;
    user.forgotPass = forgotPass_gen_hash;
    user.verified = true;
    user.resetPassReq = false;
    const newUser = new userDetails(user);

    // res.status(200).json(user);

    try {
        await newUser.save();
        // verification email 

        console.log("sending email ......")
        const mailOptions = {
            from: `"${ADMIN_NAME}" <${ADMIN_EMAIL}>`,
            to: `${user.email_id}`,
            subject: 'Please Verify you account',
            text: `please click on this link in order to verify you account  ${REDIRECT_BASE_URL}/verification?ticket=${ticket_gen_hash} `,
        };
        
          // Send mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
                res.status(500).send('Error sending email');
                return;
            }
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
            res.send('Email sent successfully!');
        });
        
        res.status(200).json({user_id : newUser.user_id, email_id: newUser.email_id});
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

export const signin = async (req, res) => {
    const hash = crypto.createHash(ENCRYPTION_METHOD);
    const user = req.body;
    if(user.password === undefined){
        res.status(401).json({message:"password required"});
    }
    const data = hash.update(user.password, 'utf-8');
    //Creating the hash in the required format
    const gen_hash= data.digest('hex');

    try{
        if(user.email_id){
            try{
                const find_user = await userDetails.find({email_id : user.email_id, password:gen_hash});
                if(find_user && !find_user[0].verified){
                    console.log(find_user);
                    res.status(403).json({message : "please verify your email to login"});
                }
    
                else if(find_user !== undefined && find_user !== null){
                    // console.log()
                        res.status(200).json(find_user);
                    
                }
                else res.status(401).json({message:"incorrect email id or password"});
            }catch(err){
                res.status(401).json({message:"incorrect email id or password"});
            }
        }
        else{
            const msg = "email id or username needed";
            res.status(401).json({message: msg});
        }
    }catch(err){
        res.status(401).json({message:err});
        // console.log(err);
    }
}

export const getUser = async (req, res) => {
    const {email} = req.query;
    const find_user = await userDetails.find({email_id : email});
    try{
        res.status(200).json({name : find_user[0].name, email: find_user[0].email_id, contact: find_user[0].contact});
    } catch(err){
        console.log(err);
        res.status(401).json({message : err.message});
    }
}

export const sendEmail = async (req, res) => {
    console.log("sending email ......")
    const data = req.body;
    const mailOptions = {
        from: `"${ADMIN_NAME}" <${ADMIN_EMAIL}>`,
        to: 'thissugarbaby@gmail.com',
        subject: 'Test Email 2',
        html: data.html,
    };
      // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            res.status(500).send('Error sending email');
            return;
        }
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        res.status(200).json({message:'Email sent successfully!'});
    });
}

function filterObjectsByProperties(array, properties) {
    return array.find(obj => {
        if (!obj) return false; // Check if obj is undefined or null
        for (let key in properties) {
            if (obj[key] !== properties[key]) {
                return false;
            }
        }
        return true;
    });
}

export const resetPass = async (req, res) => {
    const data = req.query;
    const pass = req.body;
    const hash1 = crypto.createHash(ENCRYPTION_METHOD);
    const data_pass = hash1.update(pass.password, 'utf-8');
    console.log(pass);
    //Creating the hash in the required format
    const gen_hash= data_pass.digest('hex');
    try{
        await userDetails.updateOne(
            { email_id:data.email_id },
            { $set: { password: gen_hash } }
        )
        
        console.log("password change successful");
        res.status(200).json({message: "password change successful"});
    } catch(e) {
        console.log(e);
        res.status(401).json({message:e});
    }
}

export const update = async (req, res) => {
    const data = req.query;
    console.log(data);
    //Creating the hash in the required format
    try{
        await userDetails.updateOne(
            { email_id:data.email },
            { $set: { name:data.name,contact:data.contact } }
        )
        
        console.log(" change successful");
        res.status(200).json({message: " change successful"});
    } catch(e) {
        console.log(e);
        res.status(401).json({message:e});
    }
}

export const allTasks = async (req, res) => {
    const data = req.query;
    try{
        const find_user = await userDetails.find({email_id : data.email_id});
        res.status(200).json({tasks : find_user[0].tasks})
    }catch(err){
        res.status(401).json({message:err});
    }
}

export const addTask = async (req, res) => {
    const data = req.query;
    const task = req.body;
    console.log(task);
    try{
        await userDetails.updateOne(
            { email_id:data.email_id },
            { $push: { tasks: {
                task : task.task,
                finished : false,
                date : task.date,
            } } }
        )
        res.status(200).json({message: 'task added'});
    }catch(err){
        res.status(401).json({message:err});
    }
    
}

export const finishTask = async (req, res) => {
    const data = req.query;
    const task = req.body;
    // console.log(task);
    // console.log(data);
    try{
        const find_task = await userDetails.find({email_id : data.email_id});
        const find_task_to_change = filterObjectsByProperties(find_task[0].tasks, { task: task.task })
        console.log(find_task[0].tasks);
        console.log(find_task_to_change);
        await userDetails.updateOne(
            { email_id:data.email_id },
            { $pull: { tasks : find_task_to_change } }
        )
            
        find_task_to_change.finished = !find_task_to_change.finished;

        await userDetails.updateOne(
            { email_id:data.email_id },
            { $push: { tasks : find_task_to_change } }
        )
        res.status(200).json({message: 'task finished'});
    }catch(err){
        res.status(401).json({message:err});
    }
}