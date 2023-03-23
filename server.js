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
        res.render('./main/index.ejs');
        console.log(`${req.ip} connected to '/' using GET`);
    })
    
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('event1', (reqId) => {
            console.log(`registered event1`);
            updateCompleted(reqId);
        });
    });



    app.post('/', (req, res)=>{
        res.status(200);
        res.render('./main/index.ejs');
        console.log(`${req.ip} connected to '/' using POST`);
        
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

        switch(req.body.type){
            case 'game': add('Game', req.body);
            case 'achievement' : add('Achievement', req.body);
        }
    })

        //SUBNAUTICA
    app.get('/subnautica', (req, res)=>{
        res.status(200);
        const q = Achievement.find({game: 'Subnautica'}).exec();

        q.then((doc)=>{
            doc.sort((a, b) => b.completed - a.completed);
            res.render('./achPanel/index.ejs', {doc : doc});
        })

        console.log(`${req.ip} connected to '/subnautica' using GET`);
    })

    app.post('/subnautica', (req, res)=>{

        res.status(200);

        const newcom = (req.body.completed == 1);

        //Achievement.updateOne({ name: obj.name }, { $set: { completed: obj.completed } });
        
        const qu = Achievement.findOne({_id:req.body.id});
        
        qu.then((doc)=>{
            console.log(doc);
    
            doc.save(doc.completed = newcom);
        })


        const q = Achievement.find({game: 'Subnautica'}).exec();

        q.then((doc)=>{
            doc.sort((a, b) => b.completed - a.completed);
            res.render('./achPanel/index.ejs', {doc : doc});
        })

        console.log(`${req.ip} connected to '/subnautica' using POST`);
    })

    app.all('*', (req, res) => {
        res.status(404);
        res.render('./404/index.ejs');
    })

        //LISTEN
    server.listen(port, ()=>{
        console.log(`Server listening on port ${port}..`);
    })
}