import express from 'express';
import router from './routes/routes.js';

const app = express();

app.use('/', router);

// TODO use env.
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Nice! Your server is running on port:\n${port}`); 
})