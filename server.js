const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
    const {dbSetup, Achievement, Game, add, updateCompleted} = require('./private_modules/db.js');
const bodyParser = require('body-parser');
const path = require('path');
const { EventEmitter } = require('stream');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server);

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
        const q = Game.find({}).exec();

        q.then((doc)=>{
            res.render('./main/index.ejs', {doc : doc});
        })

        console.log(`${req.ip} connected to '/' using GET`);
    })

    app.post('/', (req, res)=>{
        res.status(200);
        res.render('./main/index.ejs');
        console.log(`${req.ip} connected to '/' using POST`);
        
            //add
        switch(req.body.type){
            case 'game': add(JSON.stringify(req.body.type), req.body);
            case 'achievement' : add(JSON.stringify(req.body.type), req.body);
        }
    })
    
        //ADMIN
    app.get('/admin', (req, res)=>{
        res.status(200);
        res.render('./admin/index.ejs');
        console.log(`${req.ip} connected to '/admin' using GET`);
    })

    app.post('/admin', (req, res)=>{
        res.status(200);
        res.render('./admin/index.ejs');

        console.log(`${req.ip} connected to '/admin' using POST`);

            //add
        switch(req.body.type){
            case 'game': 
                add('game', req.body);
                break;
            case 'achievement' :
                add('achievement', req.body);
                break;
        }
    })

        //SUBNAUTICA
    app.post('/achPanel', (req, res)=>{

        console.log(req.body);

        const q = Achievement.find({game: req.body.game}).exec();

        q.then((doc)=>{
            if(doc.length == 0){
                res.status(404);
                res.render('./error/index.ejs');
            }
            else{
                doc.sort((a, b) => b.completed - a.completed);
                res.render('./achPanel/index.ejs', {doc : doc});
            }
        })

        console.log(`${req.ip} connected to '/subnautica' using GET`);
    })

        //ALL
    app.all('*', (req, res) => {
        res.status(404);
        res.render('./error/index.ejs');
    })

        //LISTEN
    server.listen(port, ()=>{
        console.log(`Server listening on port ${port}..`);
    })

        //EVENTLISTENER
    io.on('connection', (socket) => {
        socket.on('updateComp', (reqId) => {
            console.log(`Registered updateComp`);
            updateCompleted(reqId);
        });
    });
}