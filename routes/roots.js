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
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async(req,res)=>{
    try{
        const {testMessage} = req.body;
        res.json({message:testMessage});
        
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({ error: error.message });

    }
})

export default router;