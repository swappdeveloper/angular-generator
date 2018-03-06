var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

pipeTs = function(string) {
    var content = `import { Pipe } from '@angular/core';

@Pipe({ 
  name: string
  pure?: boolean
})
    `;

    return content;
}

module.exports = {
    createPipe: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }

        var filePath = arrayFolder.toString().replace(/,/g , "/").toLowerCase();        
        
        mkdirp.sync(filePath);
        if (
            !fs.existsSync(filePath+'/'+fileName +'.pipe.ts')
        ) {
            fs.writeFileSync(filePath+'/'+fileName +'.pipe.ts', pipeTs(fileName));
        } else {
            console.log(fileName+'.pipe already exists');
        }
    }
}


