import mysql from 'mysql2/promise';
import DBConnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        res.json({message:"Hey there! You've connected."});
    }
    catch(error){
        console.error(error.message);
    }
});

router.post('/', async(req,res)=>{
    try{
        const {data} = req.body;
        res.json({message:`POST - Successful\nData: ${data}`});
    }
    catch (error){
        console.log(error.message);
    }
})

export default router;