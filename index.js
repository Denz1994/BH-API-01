import express from 'express';

import roots from './routes/roots.js';
import users from './routes/users.js';
import seed from './routes/seed.js';
import tasks from './routes/tasks.js';
import moods from './routes/moods.js';

const app = express();
app.use(express.json());
app.use(roots);
app.use(users);
app.use(seed);
app.use(tasks);
app.use(moods);

// TODO use env.
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Nice! Your server is running on port:\n${port}`);
})