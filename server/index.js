import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express('/posts', postRoutes);

// app.use(bodyParser.json({limit: "30mb", extended:true}));
// app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const CONNECTION_URL = "mongodb+srv://admin:admin@webappproject.p2q1m.mongodb.net/WebAppDB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology : true})
.then(()=>{ app.listen(PORT, ()=>{
  console.log(`Connected to database and running on ${PORT}`);
}) })
.catch((error)=>{
  console.log(error.message);
})