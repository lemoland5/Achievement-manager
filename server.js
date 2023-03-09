const express = require('express');
const mongoose = require('mongoose')
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

    await mongoose.connect('mongodb://127.0.0.1:27017/ach');

    const achSchema = new mongoose.Schema({
        name: String,
        description: String,
        rare: Boolean
    });

    const Achievement = mongoose.model('Achievement', achSchema);

    const seamoth = new Achievement({name: `Personal Propulsion`, description:`Build a Seamoth`, rare: false})

    await seamoth.save();

    //SERVER

    app.get('/', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/index.html'));
        console.log(`${req.ip} connected to '/' using GET`);
    })
    
    app.post('/', (req, res)=>{
        res.status(200);

        //res.sendFile(path.join(__dirname, 'public/html/index.html'));

        res.send(seamoth.name);


        console.log(`${req.ip} connected to '/' using POST`);
    })
    
    app.get('/admin', (req, res)=>{
        res.status(200);
        res.sendFile(path.join(__dirname, 'public/html/form.html'));
        console.log(`${req.ip} connected to '/form' using GET`);
    })
    
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}..`);
    })

}