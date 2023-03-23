const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');

const achSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    rare: {type: Boolean, required: true},
    completed: {type: Boolean, required: true},
    custom: {type: Boolean, required: true},
    game: {type: String, required: true},
    icon: {type: String, required: true}
});

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    icon: {type: String, required: true},
    ach_count: {type: Number, required: true},
})

const Achievement = mongoose.model('Achievement', achSchema);
const Game = mongoose.model('Game', gameSchema);

const dbSetup = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/ach');
}

const addAch = async (obj) => {
    new Achievement({
        name: obj.name, 
        description: obj.description, 
        rare: (obj.rare == 1), 
        completed: (obj.completed == 1), 
        custom: (obj.custom == 1), 
        game: obj.game, 
        icon: obj.icon }
        ).save();
}

const addGam = async (obj) => {
    new Game({
        name: obj.name, 
        icon: obj.icon,}
        ).save();
}

const add = async (type, obj) => {
    switch(type){
        case 'game': addGam(obj);
        case 'achievement' : addAch(obj);
    }
}

const updateCompleted = async (reqId) => {

    //Achievement.updateOne({ name: obj.name }, { $set: { completed: obj.completed } });
    
    const qu = Achievement.findOne({_id:reqId});
    
    qu.then((doc)=>{
        console.log(doc);

        doc.save(doc.completed = true);
    })
    
}
module.exports = {
    Achievement,
    Game,
    dbSetup,
    add,
    updateCompleted
}