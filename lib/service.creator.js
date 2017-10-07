var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

serviceTs = function(string) {
    var content = `import { Injectable } from '@angular/core';

@Injectable()
export class ${functions.capitalize(string)}Service {
    constructor() {}
}
    `;

    return content;
}

module.exports = {
    createService: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }
        
        mkdirp.sync(arrayFolder.toString().toLowerCase());
        if (
            !fs.existsSync(arrayFolder.toString()+'/'+fileName +'.service.ts')
        ) {
            fs.writeFileSync(arrayFolder.toString()+'/'+fileName +'.service.ts', serviceTs(fileName));
        } else {
            console.log(fileName+'.service already exists');
        }
    }
}


