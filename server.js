const express = require('express');
const mongoose = require('mongoose');
    const {dbSetup, Achievement, addAch, safeString} = require('./db.js');
const bodyParser = require('body-parser');

const path = require('path');
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

        console.log();

    })
    
    app.post('/', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/index.html'));
        console.log(`${req.ip} connected to '/' using POST`);
        
        addAch(req.body);
        //console.log(JSON.stringify(req.body));

    })
    
    app.get('/admin', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/form.html'));
        console.log(`${req.ip} connected to '/admin' using GET`);
    })

    app.post('/admin', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/form.html'));
        console.log(`${req.ip} connected to '/admin' using POST`);

       addAch(req.body);
    })
    
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}..`);
    })
}