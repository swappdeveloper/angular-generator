var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

directiveTs = function(string) {
    var content = `import { Directive } from '@angular/core';

@Directive({
  selector: '[app${functions.capitalize(string)}]',
})
export class ${functions.capitalize(string)}Directive {
    constructor() {}
}

    `;

    return content;
}

module.exports = {
    createDirective: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }

        var filePath = arrayFolder.toString().replace(/,/g , "/").toLowerCase();                
        
        mkdirp.sync(filePath);
        if (
            !fs.existsSync(filePath+'/'+fileName +'.directive.ts')
        ) {
            fs.writeFileSync(filePath+'/'+fileName +'.directive.ts', directiveTs(fileName));
        } else {
            console.log(fileName+'.directive already exists');
        }
    }
}


