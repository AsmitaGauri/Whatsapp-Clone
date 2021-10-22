import express from 'express';
// DORFnV8Ip7R32bqH database password
import mongoose from 'mongoose';
// TO MAKE MONGODB REALTIME we need pusher and change stream
import Messages from './dbMessages.js';
import pusher_credentials from './keys';
import url from './keys';
import Pusher from 'pusher';
const app=express();
const port=process.env.PORT || 9000;

const url=url;
const pusher = new Pusher(pusher_credentials);


mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.catch(err=>console.log(err.message))


app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})

const db=mongoose.connection;

db.once('open',()=>{
    console.log("DB Connected!!");

    const msgCollection=db.collection('messagecontents');
    const changeStream=msgCollection.watch();

    changeStream.on("change",(change)=>{
        console.log(change);

        if(change.operationType==='insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger("messages","inserted",{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            });
        }else{
            console.log("Error while trigerring!")
        }
    })
})


app.get('/',(req,res)=> res.status(200).send("HEllo World!"));

app.get("/messages/sync",(req,res)=>{
    console.log("Got in!!");
    
    Messages.find({},(err,data)=>{
        if(err){
            
            res.status(500).send(err);
        }else{
            res.status(200).send(data); 
        }
    })
   
})


app.post('/messages/new',(req,res)=>{


    const message=req.body;
    console.log(message);
    Messages.create(message)
   .then(resp=> res.status(201).send(resp))
   .catch(err=>res.status(500).send(err));
})

app.listen(port,()=> console.log(`Listening to localhost://${port}`));