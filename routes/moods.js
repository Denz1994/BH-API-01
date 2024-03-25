import mysql from 'mysql2/promise';
import DBConnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

router.get('/moods', async(req,res)=>{
    try{
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM moods 
            ORDER BY id
        `);
        
        res.json({rows:rows})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/moods', async(req,res)=>{
    try{
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM moods 
            ORDER BY id
        `);
        
        res.json({rows:rows})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/moods', async(req,res)=>{
    try{
        const userId = req.body.userId || null
        const mood = req.body.mood || null
        const description = req.body.description || null

        const result = await DBConnection.execute(
            'INSERT INTO moods (userId, mood, description) VALUES (?, ?, ?)',
            [userId, mood, description]
            );
        res.json({ message: 'Mood created successfully!', result:result });
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})

export default router;