import mongoose from 'mongoose';
export const connectdb = async () => {
  try {
    const ConnectionInsance = await mongoose.connect(`${process.env.MOGO_URI}`);
    // console.log(ConnectionInsance.connections.host);
  } catch (error) {
    console.error('MONODB connection Error', error);
  }
};
