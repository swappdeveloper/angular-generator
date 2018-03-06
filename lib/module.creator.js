var fs = require('fs');
var functions = require('./functions');
var path = require('path');
var mkdirp = require('mkdirp');

moduleTs =  function(text) {
var content = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  declarations: [
  ]
})

export class ${functions.capitalize(text)}Module { }
`
return content;
}

module.exports = {
    createModule: function(string) {
        var arrayFolder = string.split('/');
        
        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }
        var filePath = arrayFolder.toString().replace(/,/g , "/").toLowerCase();        
        
        mkdirp.sync(filePath);

        if (!fs.existsSync(filePath+'/'+fileName +'.module.ts')) {
            fs.writeFileSync(filePath+'/'+fileName+'.module.ts', moduleTs(fileName), 'utf-8');
        } else {
            console.log(fileName+ '.module.ts already exists');
        }
    }
}