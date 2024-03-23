import mysql from 'mysql2/promise';
import {connection as DBConnection} from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

router.get('/users', async(req,res)=>{
    try{
        res.json({message:"GET from users"});
    }
    catch(error){
        console.error(error.message);
    }
});

router.post('/users/id', async(req,res)=>{
    try{
        const {id} = req.body;
        res.json({ message: 'User created successfully!', userId: id });
    }
    catch (error){
        console.log(error.message);
    }
})

export default router;