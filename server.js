require('dotenv').config();
const express = require('express');
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const editor = require('./editor')
const port = process.env.PORT || 3005;
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/',editor)
app.get('/',(req,res) =>
{
    res.sendFile(path.join(__dirname, 'frontend', 'build','index.html'));
})



app.listen(port,()=>
{
    console.log('listening on port' + port)
})