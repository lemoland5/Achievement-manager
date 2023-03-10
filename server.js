const express = require('express');
const mongoose = require('mongoose');
    const {dbSetup, Achievement, addAch} = require('./db.js');
const bodyParser = require('body-parser');

const path = require('path');
const { globalAgent } = require('http');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

main().catch(err => console.log(err));

async function main() {

    //DATABASE

    dbSetup();



    //SERVER

    app.get('/', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/index.html'));
        console.log(`${req.ip} connected to '/' using GET`);
    })
    
    app.post('/', (req, res)=>{
        res.status(200);

        res.sendFile(path.join(__dirname, 'public/html/index.html'));

        addAch(req.body);

        console.log(`${req.ip} connected to '/' using POST`);
    })
    
    app.get('/admin', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/form.html'));
        console.log(`${req.ip} connected to '/admin' using GET`);
    })
    
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}..`);
    })

}