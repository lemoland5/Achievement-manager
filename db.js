const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');

const dbSetup = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/ach');
}

const achSchema = new mongoose.Schema({
    name: String,
    description: String,
    rare: Boolean
});
const Achievement = mongoose.model('Achievement', achSchema);

const addAch = async (obj) => {
    const oldName = obj.name;
    const newName = oldName.replaceAll(" ","_");
    const rare = (obj.rare == "1");

    console.log(`rare is ${rare}`);

    const define = `const ${newName} = new Achievement({name: "${oldName}", description: "${obj.description}", rare: ${rare}}).save()`;

    eval(define); //this is so utterly fucking stupid
    
}

module.exports = {
    Achievement,
    dbSetup,
    addAch
}
