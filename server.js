const express= require("express");
const cluster= require("cluster");
const https= require("https");
const path=require("path");
const fs= require("fs");
const helmet=require("helmet")
const app= express();


app.use(helmet());
require('dotenv').config()
// function delay(duration){
//     let start_time= Date.now();
//     while(Date.now()-start_time<duration){

//     }
// }

const config={
   CLIENT_ID:process.env.clientId,
   CLIENT_SECRET:process.env.clientSecret
}
function checkLoggedIn(req, res, next){
    const isLoggedIn=true;
    if(!isLoggedIn){
        return res.status(401).send({
            error:"You must login first!!!"
        })
    }
}

app.get("/auth/google", (req,res)=>{});
app.get("/auth/google/callback",(req,res)=>{});
app.get("/auth/logout", (req, res)=>{});


app.get('/secret',checkLoggedIn,(req,res)=>{
    res.send("Your secret key is 42");
})
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})


app.get("/timer", (req,res)=>{
    // delay(8000);
    res.send(`timerr......${process.pid}`);
})


https.createServer({
    key:fs.readFileSync("key.pem"),
    cert:fs.readFileSync("cert.pem"),
},app).listen(3000,()=>{
    console.log("Server running at 3000....")
});



