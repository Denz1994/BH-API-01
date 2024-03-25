import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import roots from './routes/roots.js';
import users from './routes/users.js';
import seed from './routes/seed.js';
import tasks from './routes/tasks.js';
import moods from './routes/moods.js';
import questions from './routes/questions.js'


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(roots);
app.use(users);
app.use(seed);
app.use(tasks);
app.use(moods);
app.use(questions);


const allowedOrigins = ['http://localhost:3001'];

// Enable CORS for specific origins
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// TODO use env.
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Nice! Your server is running on port:\n${port}`);
})