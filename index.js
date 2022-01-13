const express=require('express');
const app= express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cors = require('cors');

let PORT=3000;

//middleware
app.use(bodyParser.json());
app.use(cors());
const postRoute= require('./routes/post');
app.use('/books',postRoute);



app.get('/',(req,res)=>{
    res.send('welcome to Library');
})



//database connection
mongoose.connect('mongodb://localhost:27017/libraryData')
        .then(() =>
            console.log('database connected')
        ).catch((err) => console.log(err));




app.listen(PORT,()=>{
    console.log('server connected');
})