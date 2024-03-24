import mysql from 'mysql2/promise';
import DBconnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

router.get('/users', async(req,res)=>{
    try{
        const query = await DBconnection.query(`
            SELECT '*
            FROM users
            ORDER BY name;'
        `);
        res.json(query.rows);
        console.log('SUCCESS - GET - USERS');
    }
    catch(error){
        console.error(error.message);
    }
});

router.post('/users/id', async(req,res)=>{
    try{
        const {userId} = req.body;
        res.json({ message: 'User created successfully!', id: userId });
    }
    catch (error){
        console.log(error.message);
    }
})

export default router;