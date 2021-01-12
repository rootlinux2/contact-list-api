const express = require('express');
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from './src/utils';
import routes from './src/routes/routes';

const app = express();
const PORT = 3002;
// const url = 'mongodb://localhost:27017/contacts';
const url = 'mongodb+srv://contactlist:LFkbGyzMbH6QXoo6@cluster0.tuv3i.mongodb.net/contacts?retryWrites=true&w=majority';


const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    poolSize: 10,
    useUnifiedTopology: true,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    keepAlive: true,
    keepAliveInitialDelay: 300000
  };
  mongoose.Promise = global.Promise;
  mongoose.connect(url, options);

  // mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${url}`);
  });
  
  // If the connection throws an error
  mongoose.connection.on('error', err => {
    console.log(`Mongoose default connection error: ${err}`);
  });
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });
  
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

routes(app);

app.use(errorHandler);

const server = require('http').createServer(app);

server.listen(process.env.PORT || PORT, () => {
  console.log(`you are server is running on ${PORT}`);
});