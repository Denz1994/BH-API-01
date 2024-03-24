import mysql from 'mysql2/promise';
import DBConnection from '../database/connection-util.js';
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/users', async(req,res)=>{
    try{
        const [rows] = await DBConnection.execute(`
            SELECT *
            FROM users 
            ORDER BY id DESC
        `);
        
        res.json({rows:rows})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/users/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // TODO: Password formatting?
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const resutl = await DBConnection.execute(
        `INSERT INTO users (name, email, hashed_password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword]
      );
  
      res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// TODO: Use case for adding user without password?
router.post('/users', async(req,res)=>{
    try{
        const name = req.body.name || null;
        const email = req.body.email || null;
        const hashedPassword = req.body.hashed_password || null;
        
        const result = await DBConnection.execute(
            'INSERT INTO users (name, email, hashed_password) VALUES (?, ?, ?)', [name, email, hashedPassword]
            )
        res.json({ message: 'User created successfully!', result:result });
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;