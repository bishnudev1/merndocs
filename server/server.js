const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')


const Model = require('./Models/Model');

const port = 4500 || process.env.PORT;

const server = express();

server.use(express.json());

server.use(cors());

server.use(require('./Routes/Routes'));

server.use(cookieParser());

dotenv.config({path:'./config.env'});

require('./Models/Conn');



server.listen(port, () => {
    console.log(`Server has started at ${port}`);
});