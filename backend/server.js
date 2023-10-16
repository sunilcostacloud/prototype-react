require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require("path");
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT

connectDB()

app.use(cors(corsOptions))

app.use(express.json())

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/music', require('./routes/musicRoutes'))

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})