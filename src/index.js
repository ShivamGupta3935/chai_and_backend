// require('dotenv').config({path: './.env'})
import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express"
import CONNECTDB from "./db/index.js";
const app = express();
dotenv.config({
    path: './.env'
})

CONNECTDB()
.then( () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`app is listening on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Mongo db connection failed !!!", error);
})













/*
( async() => {
   //imp point mongodb is always is other continent
   //db connection fails
   //so wrap always try catch
   try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    app.on("error", (err) => {
        console.log("Err", err);
        throw err;
    })

    app.listen(process.env.PORT, ()=>{
        console.log(`App is listening on PORT:${process.env.PORT}`);
    })
   } catch (error) {
    console.error("Error", error);
    throw error;
   }
})()
*/