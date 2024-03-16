import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const CONNECTDB = async () => {
   try {
    const connectionInstance =await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    console.log(`\n MONGO_DB connected !!! DB HOST ${connectionInstance.connection.host}`);
   //  console.log(connectionInstance);
    
   } catch (error) {
    console.log("mongodb connection fails", error);
    process.exit(1)    
   }
}

export default CONNECTDB;