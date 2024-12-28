const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./Routes/userRoutes')
const noteRoutes = require('./Routes/noteRoutes')
const cors = require('cors')
const app = express()
const mongodbUrl = 'mongodb://localhost:27017/Backend'


const port = 3000
 
app.use(express.json())
app.use(cors())

app.use('/user' ,userRoutes )
app.use('/note' , noteRoutes )


mongoose.connect(mongodbUrl).then(() => {
  console.log("Database is connected")
}).catch((err) => {
  console.log(err)
})
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
