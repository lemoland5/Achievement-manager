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
const Achievement = mongoose.model('Achievement', achSchema);

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

module.exports = {
    Achievement,
    dbSetup,
    addAch
}