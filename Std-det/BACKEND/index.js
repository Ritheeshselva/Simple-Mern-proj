const express = require('express');
const app = express();
require('dotenv').config();
const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
app.use(express.json())

const port = process.env.PORT || 4000;
const url = process.env.url 

mongoose.connect(url)
.then(()=>{
    console.log('Connected');
})
.catch((e)=>{
    console.log('Error',e);
})

const schema = new mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true}
})

const User = mongoose.model('User',schema);

const login = new mongoose.Schema({
    name:{type:String,required:true},
    Password:{type:String,required:true}
})

const log = mongoose.model('log',login);

//Rest-API's
//ADD
app.post('/std-det',async (req,res)=>{
    try{
    const std = new User(req.body);
    const saved = await std.save();
    res.status(201).json(saved);
    }
    catch(e){
        res.status(500).json({error:e.message})
    }

})
//Display-All
app.get('/std-det',async (req,res)=>{
    try{
        const stds = await User.find();
        res.json(stds)
    }
    catch (e){
        res.status(500).json({error:e.message})
    }
})

//Dispaly-By-id

app.get('/std-det/:id', async (req,res) =>{
    try{
        const det = await User.findOne({id:req.params.id});
        res.json(det);
    }
    catch (e){
        res.status(400).json({error:e.message})
    }
} )

//Modify

app.put('/std-det/:id', async (req,res)=>{
    try{
        const up = await User.findOneAndUpdate(
           {id: req.params.id}, req.body , {new:true, runValidators:true}
        );
        if(!up) return res.status(400).json({error:'Not-Found'});
            res.json(up);
    }
        catch(e){
            res.status(400).json({error:e.message});
        }
    }
)

//Del

app.delete('/std-det/:id', async (req,res) =>{
    try{
        const del = await User.findOneAndDelete({id:req.params.id});
        if (!del) return res.status(400).json({error:'Not-Found'})
           res.json({msg:'Deleted'}) 
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
})

app.listen(port,()=>{
console.log(`server is on ${port}`)
}
);