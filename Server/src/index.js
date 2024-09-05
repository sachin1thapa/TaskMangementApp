import express from 'express';
import dotenv from 'dotenv/config';
import { connectdb } from './dbconfig/db.js';

const app = express();
const PORT = process.env.PORT || 8000;

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.log('MONGO db connection Error !!!', err);
  });

app.get('/', (req, res) => {
  res.send('HEllow the is the home page ');
});
