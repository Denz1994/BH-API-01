import express from 'express';
import roots from './routes/roots.js';
import users from './routes/users.js';

const app = express();
app.use(express.json());
app.use(roots);
app.use(users);

// TODO use env.
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Nice! Your server is running on port:\n${port}`);
})