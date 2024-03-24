
// TODO: USE ENV FILE
import mysql from 'mysql2/promise';

const DBconnection = mysql.createPool(
    {
       host: '127.0.0.1',
       port: '3306',
       user:'root',
       password:'waffle',
       database:'BH-DB-01' 
    }
);

export default DBconnection;