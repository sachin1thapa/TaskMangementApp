import express from 'express';
import dotenv from 'dotenv/config';
import { connectdb } from './dbconfig/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.SERVER_PORT;

// middleware
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(
  express.json({
    limit: '16kb',
  })
);

app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// route
import userRoute from './routes/user.routes.js';
import { User } from './models/user.models.js';
app.use('/api/v1/users', userRoute);

// connect to the database and start the server
connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MONGO db connection Error !!!', err);
  });

app.get('/', async (req, res) => {
  const userInformation = {
    name: 'John Doe1',
    email: 'thapasachin1231@gmail.com',
    password: 'password1',
  };
  const insert = await User.create(userInformation);
  res.send(insert);
  // res.send('Hello World');
});
