var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

enumTs = function(string) {
    var content = `export enum ${functions.capitalize(string)} {
}
    `;

    return content;
}

module.exports = {
    createEnum: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }

        var filePath = arrayFolder.toString().replace(/,/g , "/").toLowerCase();                
        
        mkdirp.sync(filePath);
        if (
            !fs.existsSync(filePath+'/'+fileName +'.enum.ts')
        ) {
            fs.writeFileSync(filePath+'/'+fileName +'.enum.ts', enumTs(fileName));
        } else {
            console.log(fileName+'.enum already exists');
        }
    }
}


