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

//jwt
const authtoken = (req,res,next)=>{
const head = req.headers['authorization'];
const token = head && head.split(' ')[1];

if(!token) return res.status(401).json({error:'Invalid-Tocken'});
jwt.verify(token,process.env.jwt-key, (err,data)=>{
    if(err) return res.status(403).json({error:'Invalid-Tocken'})
        req.data=data;
    next();
})
}

//reg
app.post('/auth/reg', async(req,res)=>{
    try{
    const {name,pass}=req.body;
    const hashpass=await bcrypt.hash(pass, 10);
    const user = new log({name, Password : hashpass});
    await user.save();
    res.status(201).json({mess:'Successfully'})
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

//login
app.post('/auth/login',async(req,res)=>{
    try{
        const {name,pass}=req.body;
        const user = await log.findOne({name});
        if(!user || !await bcrypt.compare(pass,user.Password)){
            return res.status(400).json({error:'Invalid person'});
        }

        const tocken= jwt.sign(
            {name:user.name , id:user._id},
            process.env.jwt-key,
            {expiresIn: '1h'}
        );

        res.json(
            {
                mess:'Logged-in',
                tocken,
                user:{name:user.name,id:user._id}
            }
        )

    }
    catch(e){
        res.status(500).json({error:e.message});
    }
});

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