const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
    const {dbSetup, Achievement, Game, add, updateCompleted} = require('./private_modules/db.js');
const bodyParser = require('body-parser');
const path = require('path');
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

    })

    app.post('/', (req, res)=>{
        res.status(200);
        res.render('./main/index.ejs');
        
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
    })

    app.post('/admin', (req, res)=>{
        res.status(200);
        res.render('./admin/index.ejs');

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

        const q = Achievement.find({game: req.body.game}).exec();

        q.then((doc)=>{
            if(doc.length == 0){
                res.status(404);
                res.render('./error/index.ejs');
            }
            else{
                res.status(200);
                doc.sort((a, b) => b.completed - a.completed);
                res.render('./achPanel/index.ejs', {doc : doc});
            }
        })

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
        console.log(`Connected to panel...`);
        socket.on('updateComp', (reqId) => {
            console.log(`Registered updateComp`);
            updateCompleted(reqId);
        });
    });
}