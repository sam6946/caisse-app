require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
const xss = require('xss-clean')
const path = require('path')
const helmet = require('helmet')

const authRout = require('./router/auth')
const notification = require('./router/message')
const authTransaction = require('./controller/verifyToken')
const transaction = require('./router/transaction')

const connectDB = require('./db/connect')


// configuration of middleware
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, //15minutes
        max: 100, //limite each IP to 100 requests per windowMs
    })
)

app.use(helmet())
app.use(xss())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.get("/", (req, res) =>{
//     res.send("bienvenue sur mon site")
// })
//login && register router
app.use(authRout)
//Transaction router
app.use( authTransaction, transaction)
//Notification router   
app.use( authTransaction, notification)

//Static index.html

  if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, './client/dist')))
  
    app.get('*', (req, res) =>{
      res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
    })
  }


const port = process.env.PORT 
const start = async () =>{
    try {
        await connectDB(process.env.DB_URL)
        app.listen(port, () => console.log(`http://localhost:${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
