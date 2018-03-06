var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

componentTs =  function(text) {
var content = `import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-${text.toString().trim()}',
  templateUrl: './${text.toString().trim()}.component.html',
  styleUrls: ['./${text.toString().trim()}.component.css']
})

export class ${functions.capitalize(text)}Component implements OnInit {
    constructor() {}
    ngOnInit() {}
}
`
return content;
}

module.exports = {
    createComponent: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }
        var filePath = arrayFolder.toString().replace(/,/g , "/").toLowerCase();        
        
        mkdirp.sync(filePath);
        if (
            !fs.existsSync(filePath+'/'+fileName +'.component.html') ||
            !fs.existsSync(filePath+'/'+fileName +'.component.css') ||
            !fs.existsSync(filePath+'/'+fileName +'.component.ts')
        ) {
            fs.writeFileSync(filePath+'/'+fileName +'.component.html', '<p>'+fileName+' works!</p>');
            fs.writeFileSync(filePath+'/'+fileName +'.component.css', '');
            fs.writeFileSync(filePath+'/'+fileName +'.component.ts', componentTs(fileName));
        } else {
            console.log(fileName+'.component already exists');

        }
    }
}