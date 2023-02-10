const express = require('express')
const campaignRoute = require('./routes/campaign');
const port = 3001;

// const Subscriber = require('./models/Subscriber');
// const EmailService = require('./EmailService');

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.use('/campaigns', campaignRoute);   

app.listen(port, function(){
    console.log('Campaign service is running on port '+ port);
})


