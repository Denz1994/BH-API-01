import express from 'express';
import mysql from 'mysql2/promise';
import {connection as DBConnection} from './database/connection-util.js';

const app = express();

app.get('/', async(req,res)=>{
    try{
        res.send("Hey there! You've connected.");
    }
    catch(error){
        console.error(error.message);
    }
});

// TODO use env.
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Nice! Your server is running on port:\n${port}`); 
})