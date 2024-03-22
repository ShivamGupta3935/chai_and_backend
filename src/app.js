import express from "express"
import cors from "cors"
import CookieParser from "cookieparser"

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    limit: "16KB",
    extended: true
}))
app.use(express.static("public"))
app.use(CookieParser())


//route import 
import userRouter from './routes/user.routes.js'


// all file are separate so we include middleware
//route declaration
app.use("/api/v1/users", userRouter)

//http://localhost:6000/users/register
export { app }