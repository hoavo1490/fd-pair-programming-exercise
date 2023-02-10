const { Worker, isMainThread, parentPort } = require('worker_threads');
const kafka = require('kafka-node');
const express = require('express')
const bodyParser = require('body-parser');
const route = require('./routes/email');
const port = 3001; // Định nghĩa cổng để chạy ứng dụng NodeJS của bạn trên server

// const Subscriber = require('./models/Subscriber');
// const EmailService = require('./EmailService');

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.use('/email', route);   

app.listen(port, function(){
    console.log('Your app running on port '+ port);
})


