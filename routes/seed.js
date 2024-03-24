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
                id INT UNIQUE PRIMARY KEY AUTO_INCREMENT,
                name TEXT,
                email TEXT,
                age INT
            )
        `
        await DBConnection.query(dropTableQuery);
        await DBConnection.query(createTableQuery);
    }
    catch(error){
        console.log(error.message);
    }
}

router.get('/seed/users', async(req,res)=>{
    try{
        await seedUsersTable();
        res.json({message:"GET - seed/users - SUCCESS"})
    }
    catch (error){
        console.log(error.message);
        res.send(error.message);
    }
});
export default router;