var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

modelTs = function(string) {
    var content = `export class ${functions.capitalize(string)} {
        
}
    `;

    return content;
}

module.exports = {
    createModel: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }
        
        mkdirp.sync(arrayFolder.toString().toLowerCase());
        if (
            !fs.existsSync(arrayFolder.toString()+'/'+fileName +'.model.ts')
        ) {
            fs.writeFileSync(arrayFolder.toString()+'/'+fileName +'.model.ts', modelTs(fileName));
        } else {
            console.log(fileName+'.model already exists');
        }
    }
}


