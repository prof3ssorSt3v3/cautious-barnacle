import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
const dir = process.cwd(); //our current project folder
const file = path.resolve(dir, '.env.local');
dotenv.config({ path: file, debug: true, encoding: 'utf-8' });

import session from 'express-session';
import menuRouter from './routers/menu.js';

// const API_KEY = 'kasjdfhkajsfhksajehkfjeshksjefhksehkjhfkj';
//We don't want to hard code things like API keys or passwords in our code

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    genid: function (req) {
      return crypto.randomUUID();
    },
    name: 'menu-session-id', //name of the session cookie
    secret: process.env.MY_SECRET,
    resave: false,
    cookie: { httpOnly: true, maxAge: 20 * 60 * 1000 }, //20 mins
  }),
);

app.use('/api/menu', menuRouter);

app.get('/', (req, res) => {
  res.status(200).send('Yes. The API is online');
});

app.get('/env', (req, res) => {
  //NEVER DO THIS
  //HUGE SECURITY ISSUE
  //BAD THINGS WILL HAPPEN...
  // res.send(process.env.MY_SECRET);
  // res.send(process.env.API_URL);
  res.send(process.env.API_KEY);
});

app.get('/api', (req, res) => {
  res.status(200).json({
    endpoints: {
      'GET /': { description: 'Server is live check', required: { headers: [], body: null, params: null } },
      'GET /api': { description: 'Endpoint list (this URL)', required: { headers: [], body: null, params: null } },
    },
  });
});

app.use((req, res) => {
  res.status(404).send('Invalid URL');
});
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server error, ${err}`);
    return;
  }
  console.log(`Listening on PORT ${PORT}`);
});
