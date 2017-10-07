var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

interfaceTs = function(string) {
    var content = `export interface I${functions.capitalize(string)} {
}

    `;

    return content;
}

module.exports = {
    createInterface: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }
        
        mkdirp.sync(arrayFolder.toString().toLowerCase());
        if (
            !fs.existsSync(arrayFolder.toString()+'/'+fileName +'.interface.ts')
        ) {
            fs.writeFileSync(arrayFolder.toString()+'/'+fileName +'.interface.ts', interfaceTs(fileName));
        } else {
            console.log(fileName+'.interface already exists');
        }
    }
}


