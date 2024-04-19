import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

//local imports
import { auth_routes, } from './routes/index.js';

dotenv.config();
const app = express();

const CONNECTION_URL = process.env.CONNECTION_URL;
console.log(CONNECTION_URL);

const port = 5000;

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/auth', auth_routes);
// app.use('/reset', resetPass);
// app.use('/verify', emailVerification)
app.get("/get", (req, res)=>{
    // console.log(req.params)
    res.json(req.query);
})

mongoose.connect(CONNECTION_URL)
    .then(()=>app.listen(port, () => {console.log('app is listining on port 5000')}))
    .catch((e) => {
        console.log(e);
    })