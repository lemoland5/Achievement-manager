const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/html/index.html'))
})

app.post('/', (req, res)=>{
    console.log(JSON.stringify(req.body));
    res.sendFile(path.join(__dirname, 'public/html/index.html'))
})

app.get('/form', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/html/form.html'))
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}..`);
})