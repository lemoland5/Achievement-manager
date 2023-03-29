const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');

    //SCHEMA DECLARATION
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
    platform: {type: String, required: true},
    ach_count: {type: Number, required: true},
})

    //MODEL COMPILATION
const Achievement = mongoose.model('Achievement', achSchema);
const Game = mongoose.model('Game', gameSchema);

    //INCREDIBLY NECESSARY OUTSIDE FUNCTION
const dbSetup = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/ach');
}

    //ADD ACH
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

    //ADD GAME
const addGam = async (obj) => {
    console.log("REP" + obj.name);
    
    new Game({
        name: obj.name, 
        icon: obj.icon,
        ach_count: obj.ach_count,
        platform: obj.platform }
        ).save(); 
}

    //ADD CONTROLLER
const add = async (type, obj) => {
    switch(type){
        case 'game': 
            addGam(obj);
            break;
        case 'achievement': 
            addAch(obj);
            break;
    }
}

    //UPDATE ACH
const updateCompleted = async (reqId) => {
    const qu = Achievement.findOne({_id:reqId});
    qu.then((doc)=>{
        doc.save(doc.completed = true);
    })
}

    //EXP
module.exports = {
    Achievement,
    Game,
    dbSetup,
    add,
    updateCompleted
}