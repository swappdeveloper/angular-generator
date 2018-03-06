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

        var filePath = arrayFolder.toString().replace(/,/g , "/").toLowerCase();        
        
        mkdirp.sync(filePath);
        if (
            !fs.existsSync(filePath+'/'+fileName +'.model.ts')
        ) {
            fs.writeFileSync(filePath+'/'+fileName +'.model.ts', modelTs(fileName));
        } else {
            console.log(fileName+'.model already exists');
        }
    }
}


