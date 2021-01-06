const express = require('express');
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;
app.get('/', (req, res) => {
 res.status(200).send(`Hello World! Our server is running at port ${port}`);
});
server.listen(port, () => {
 console.log(`Server running at port ${port}`);
});