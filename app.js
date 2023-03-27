import express from 'express'
import mongoose from 'mongoose'
import blogRouter from './routes/blogroutes.js';
import router from './routes/userroutes.js'
const app = express()
app.use(express.json()); //will allow json data

app.use("/api/user",router) 
app.use("/api/blog",blogRouter)

mongoose
  .connect(
    `mongodb+srv://annesha1234:annesha1234@cluster0.n8yuenr.mongodb.net/BlogApp?retryWrites=true&w=majority`
    
  )
  .then(()=>app.listen(5000))
  .then(() => console.log('DATABASE CONNECTED!'))
  .catch(err => console.log(err))

  //E1KbtCNu3mr2nzk