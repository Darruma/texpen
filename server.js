const express = require('express');
const path = require('path')
const app = express()
const editor = require('./editor')
const port = process.env.PORT || 3005;
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.use('/api/',editor)
app.get('*',(req,res) =>
{
    res.sendFile(path.join(__dirname, 'frontend', 'build','index.html'));
})



app.listen(port,()=>
{
    console.log('listening on port' + port)
})