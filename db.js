const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');

const achSchema = new mongoose.Schema({
    name: String,
    description: String,
    rare: Boolean
});
const Achievement = mongoose.model('Achievement', achSchema);

const dbSetup = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/ach');
}

Object.defineProperty( String.prototype, 'decodeString', {
	value: function (objname = 0, lowercase=0, snakecase = 0)
	{
        let str = this.replaceAll('ownquot;','"').replaceAll("ownapo;","'").replaceAll("ownback;","`");

		return str;
	}
} );

Object.defineProperty( String.prototype, 'safeString', {
	value: function (objname = 0, lowercase=0, snakecase = 0)
	{
        
        let str = this.replaceAll('"','ownquot;').replaceAll("'","ownapo;").replaceAll("`","ownback;");

        str = `"${str}"`

        if(objname == 1){
            lowercase = 1;
            snakecase = 1;
            str = str.replaceAll(`ownquot;`,"");
                str = str.replaceAll('"',"");
            str = str.replaceAll("ownapo;","");
            str = str.replaceAll("ownback;","");
        }

        str = (lowercase == 1) ? str.toLowerCase() : str;
        str = (snakecase == 1) ? str.replaceAll(" ","_") : str;

		return str;
	}
} );

const addAch = async (obj) => {
    const oldName = obj.name.safeString();
    const newName = obj.name.safeString(1);
    const description = obj.description.safeString();
    const rare = (obj.rare == "1");

    const define = `const ${newName} = new Achievement({name: ${oldName}, description: ${description}, rare: ${rare}}).save()`;
    eval(define); //this is so utterly fucking stupid
}

module.exports = {
    Achievement,
    dbSetup,
    addAch,
    
}
