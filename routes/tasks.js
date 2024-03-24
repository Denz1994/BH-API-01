import mysql from 'mysql2/promise';
import DBConnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();

router.get('/tasks', async(req,res)=>{
    try{
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM tasks 
            ORDER BY title
        `);
        
        res.json({rows:rows})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/tasks', async(req,res)=>{
    try{
        const userId = req.body.userId || null
        const title = req.body.title || null
        const description = req.body.description || null
        const completed = req.body.completed || null

        const result = await DBConnection.execute(
            'INSERT INTO tasks (userId, title, description, completed) VALUES (?, ?, ?, ?)',
            [userId, title, description, completed]
            )
        res.json({ message: 'Task created successfully!', result:result });
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
})

export default router;