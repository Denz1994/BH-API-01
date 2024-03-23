import mysql from 'mysql2/promise';
import {connection as DBConnection} from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        res.send("Hey there! You've connected.");
    }
    catch(error){
        console.error(error.message);
    }
});

router.post('/', async(req,res)=>{
    try{
        const {data} = req.body;
        res.send(`POST - Successful\n Data: ${data}`);
    }
    catch (error){
        console.log(error.message);
    }
})

export default router;