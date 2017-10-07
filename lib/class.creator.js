var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

classTs = function(string) {
    var content = ` export class ${functions.capitalize(string)} {
    private name:string;

    constructor() {
        this.name = '';
    }
}

    `;

    return content;
}

module.exports = {
    createClass: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }
        
        mkdirp.sync(arrayFolder.toString().toLowerCase());
        if (
            !fs.existsSync(arrayFolder.toString()+'/'+fileName +'.ts')
        ) {
            fs.writeFileSync(arrayFolder.toString()+'/'+fileName +'.ts', classTs(fileName));
        } else {
            console.log(fileName+'.class already exists');
        }
    }
}


