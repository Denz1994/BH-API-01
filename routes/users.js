import mysql from 'mysql2/promise';
import DBConnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

router.get('/users', async(req,res)=>{
    try{
        const query = await DBConnection.execute(`
            SELECT *
            FROM users 
            ORDER BY name
        `);
        res.json(query);
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/users', async(req,res)=>{
    try{
        const {name} = req.body;
        console.log(name)
        const result = await DBConnection.execute(
            'INSERT INTO users (name) VALUES (?)', [name]
            )
        res.json({ message: 'User created successfully!', result:result });
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})

export default router;