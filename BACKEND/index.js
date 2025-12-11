const express = require('express');
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
const PORT = process.env.PORT || 3000;
const uri =process.env.uri;

mongoose.connect(uri)
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((err)=>{
        console.log("Connected Error", err);
    })
//schema
const hospital= new mongoose.Schema({
    pid:{type:Number, required:true},
    pname:{type:String, required:true},
    age:{type:Number, required:true},
    address:{type:String,required:true},
    d_id:{type:Number, required:true},
    d_name:{type:String, required:true}
})

//model
const User = new mongoose.model('User',hospital);

//eg data
const user= new User({
    pid:1,
    pname:'Ravi',
    age:18,
    address:'Nambi',
    d_id:101,
    d_name:'Bharathi'

})

user.save().then(()=>{
    console.log("saved");
}).catch((e)=>{
    console.log("Error",err);
})

app.listen(PORT,()=>{
    console.log(`Server-runs-on: ${PORT}`);
})