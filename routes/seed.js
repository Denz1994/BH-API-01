import DBConnection from '../database/connection-util.js';
import express from 'express';

const router = express.Router();


const dropTableQueryBuilder =(tableName)=>{
    return  `DROP TABLE IF EXISTS ${tableName}`;
}

const seedUsersTable = async()=>{
    try{
        const dropTableQuery = dropTableQueryBuilder('users');
        const createTableQuery =`
            CREATE TABLE users (
                id INT UNIQUE NOT NULL AUTO_INCREMENT,
                name TEXT,
                email TEXT,
                hashed_password TEXT,
                
                PRIMARY KEY (id)
                );
        `
        // await DBConnection.execute(dropTableQuery);
        await DBConnection.execute(createTableQuery);
    }
    catch(error){
        console.log(error.message);
    }
}

const seedTasksTable = async()=>{
    try{
        // TODO: Can't drop tables with foreign keys
        const dropTableQuery = dropTableQueryBuilder('tasks');
        const createTableQuery =`
            CREATE TABLE tasks (
                id INT UNIQUE NOT NULL AUTO_INCREMENT,
                userId INT,
                title TEXT NOT NULL,
                description TEXT,
                completed BOOLEAN NOT NULL,
                
                PRIMARY KEY (id),
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `
        // await DBConnection.execute(dropTableQuery);
        await DBConnection.execute(createTableQuery);
    }
    catch(error){
        console.log(error.message);
    }
}

// TODO: Only creates user table. Doesn't seed records.
router.get('/seed/users', async(req,res)=>{
    try{
        await seedUsersTable();
        res.send("Finished");

    }
    catch (error){
        console.log(error.message);
        res.json({ error: error.message });
    }
});
// TODO: Only creates tasks table. Doesn't seed records.
router.get('/seed/tasks', async(req,res)=>{
    try{
        await seedTasksTable();
        res.send("Finished");

    }
    catch (error){
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});
export default router;