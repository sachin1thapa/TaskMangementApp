import mongoose from 'mongoose';
export const connectdb = async () => {
  try {
    const ConnectionInsance = await mongoose.connect(
      `${process.env.MOGO_URI}/${process.env.MOGO_DB_NAME}`
    );

    console.log('MongoDB connection Success !! DatabaseName:', ConnectionInsance.connection.name);
  } catch (error) {
    console.error('MONODB connection Error', error);
  }
};
