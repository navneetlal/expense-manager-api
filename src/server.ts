import './connections/mongo';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connection } from 'mongoose';

import Status from './utils/response';

import router from './routers';
import authMiddleware from './middlewares/auth';

const app = express()
const port = 3000

app.set('trust proxy', 'loopback')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(helmet())

app.use(authMiddleware)

app.use('/', router)

app.get('*', (_, res) => {
  return res.status(405).send(Status[405])
})

connection.on('connected', function () {
  console.log('MongoDb connection established...!');
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
});

connection.on('error', function (err) {
  console.error('Failed to connect to DB: ' + err);
});

process.on('SIGINT', function () {
  connection.close(function () {
    console.log('MongoDb connection disconnected through app termination');
    process.exit(0);
  });
});
