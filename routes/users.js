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

router.post('/users/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }
  
      // Gets user by email from database using prepared statements
      const [rowsWithUserEmail] = await DBConnection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
  
      // We don't have any hits for the user's email
      if (!rowsWithUserEmail.length) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const user = rowsWithUserEmail[0];
      
      // Compare hashed password with user's password hash (from database).
      // We have to use bcrypt compare here to unpack salts. Also there are 
      // some vulerability issues based on the cycle time of checks.
      const passwordMatch = await bcrypt.compare(password, user.hashed_password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      res.json({ message: 'Login successful!' }); // Consider sending a token or user data if needed
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' }); // Generic error for security
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