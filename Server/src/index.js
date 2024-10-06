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

app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// route
import userRoute from './routes/user.routes.js';
import morgan from 'morgan';

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

// error handling middleware
app.use((err, req, res, next) => {
  // Log the error stack for debugging purposes
  // console.error(err.stack);
  const statusCode = err.statusCode || 500;
  // Send JSON response with error message and status
  res.status(statusCode).json({
    result: 'error',
    message: err.message,
  });
});
