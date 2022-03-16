const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const http = require('http')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv/config')

app.use(express.urlencoded({extended:false}))
const postRoutes = require('./router/posts')
app.use('/',postRoutes)




mongoose.connect("mongodb://localhost:27017",(err)=>{
    if(!err)
    {
        console.log('batabase connected successfully')
    }
    else{
        console.log('database is not connect')
    }
})

app.listen(8080,()=>{
    console.log("on port connection is made");
})