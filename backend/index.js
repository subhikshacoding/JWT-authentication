const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyparser.json());

const secret_Key ="abcdef";

const users =[];

const verifytoken =(req,res,next) =>{
    const token =req.headers.authorization;
    if(!token) return res.status(401).send("Request denied")

        try{
            const verified = jwt.verify(token,secret_Key)

            req.user = verified
            next()
        }
        catch(error){
            res.status(400).send("Invalid token")
        }
}

app.post('/signup',async (req,res)=>{
        try{
            const {username,password} =req.body;
            const hashpassword = await bcrypt.hash(password,10);
            users.push({username,password :hashpassword})
            console.log(users);

            res.status(201).send("user created successful")
        }
        catch(error){
            res.status(501),send("error creating user")
        }
})


app.post('/login',async (req,res)=>{
    try{
        const{username,password} = req.body;
        const user = users.find(u => u.username === username);
        if(!user) return res.status(400).send("user not find")

            const validatepassword = await bcrypt.compare(password,user.password);
            if(!validatepassword) return res.status(400),send("Invalid password");

            const token = jwt.sign({username :user.username},secret_Key);

            res.send({token})

    }
    catch(error){
        res.status(500).send("Error logging in")
    }
})

app.get('/profile',verifytoken,(req,res)=>{

    res.send(`Welcome ${req.user.username}`)

})

app.get('/',(req,res)=>{
    res.send("hello world")
})


app.listen(3001, ()=>{
    console.log('backend running in port 3001');
})