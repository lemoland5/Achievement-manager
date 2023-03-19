const express = require('express');
const mongoose = require('mongoose');
    const {dbSetup, Achievement, addAch} = require('./private_modules/db.js');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

main().catch(err => console.log(err));

async function main() {

    //DATABASE

    await dbSetup();

    //SERVER

        //MAIN
    app.get('/', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/main.html'));
        console.log(`${req.ip} connected to '/' using GET`);

        console.log();
    })
    
    app.post('/', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/main.html'));
        console.log(`${req.ip} connected to '/' using POST`);
        
        addAch(req.body);
    })
    
        //ADMIN
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

        //SUBNAUTICA
    app.get('/subnautica', (req, res)=>{
        res.status(200);
        const q = Achievement.find({game: 'Subnautica'}).exec();

        q.then((doc)=>{
            res.render('./achPanel/index.ejs', {doc : doc});
        })

        console.log(`${req.ip} connected to '/subnautica' using GET`);
    })

        //LISTEN
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}..`);
    })
}