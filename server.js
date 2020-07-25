require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const editor = require('./routes/editor')
const users = require('./routes/users')
const port = process.env.PORT || 3005
mongoose.connect('mongodb://localhost/texpen')
mongoose.connection.on('connected', () => {
    console.log('connected')
})
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/',editor)
app.use('/api',users)
app.get('*',(req,res) =>
{
    res.sendFile(path.join(__dirname, 'frontend', 'build','index.html'));
})

app.listen(port,()=>
{
    console.log('listening on port' + port)
})
