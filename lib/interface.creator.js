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

        var filePath = arrayFolder.toString().replace(/,/g , "/").toLowerCase();        
        
        mkdirp.sync(filePath);
        if (
            !fs.existsSync(filePath+'/'+fileName +'.interface.ts')
        ) {
            fs.writeFileSync(filePath+'/'+fileName +'.interface.ts', interfaceTs(fileName));
        } else {
            console.log(fileName+'.interface already exists');
        }
    }
}


