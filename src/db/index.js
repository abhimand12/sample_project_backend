import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB= async () => {

    try 
    {
      console.log(`${process.env.MONGODB_URI}`)
      const connectionInstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`mongo db connected : ${connectionInstance.connection.host}`)  
    }
    catch(error)
    {
        console.log(`Mongo Db connection error`,error);
        process.exit(1);
    }
}

export default connectDB;