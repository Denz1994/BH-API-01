// Script to start up docker container. Pulls config form env so I didn't do in package.json scripts.

import dotenv from 'dotenv';
import {spawn} from 'child_process';

dotenv.config({
  path:'./env'
});

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

const command = [
  'docker', 'run', '-d',
  '-e', `MYSQL_ROOT_PASSWORD=${DB_PASSWORD}`,
  '-e', `MYSQL_DATABASE=${DB_NAME}`,
  '-p', `${DB_PORT}:${DB_PORT}`,
  'mysql:8.0'
];
const dockerProcess = spawn(command[0], command.slice(1));

dockerProcess.stdout.on('data', (data) => {
    console.log(`docker output: ${data.toString()}`);
  });
  
  dockerProcess.stderr.on('data', (data) => {
    console.error(`docker error: ${data.toString()}`);
  });
  
  dockerProcess.on('close', (code) => {
    console.log(`docker process exited with code: ${code}`);
  });