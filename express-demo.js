const express = require('express');
const app = express();

const path = require('path');

//Use the below mentioned middleware to retrieve data from forms
app.use(express.urlencoded({ extended: true })) //Parse URL-encoded bodies

app.get('/',(req,res)=>{
    res.send('Home Page Launched')
})


app.get('/table',(req,res)=>{
    //for including a file we have to include the absolute path
    res.sendFile(path.join(__dirname,'samplePage.html'))
})


app.get('/register',(req,res)=>{
    //for including a file we have to include the absolute path
    res.sendFile(path.join(__dirname,'signUp.html'))
})

app.post('/register',(req,res)=>{
    res.send(req.body)
    console.log(req.body)
})

app.listen(3000,()=>console.log('Express Server Started'))