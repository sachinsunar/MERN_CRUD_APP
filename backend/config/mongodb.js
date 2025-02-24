import mongoose from 'mongoose';

const connectDB = async () => {

   mongoose.connection.on('connected', () => {
      console.log("Database Connection Succesfully.")
   })

   await mongoose.connect(`${process.env.MONGODB_URL}/crud`)

};


export default connectDB;