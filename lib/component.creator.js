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
        
        mkdirp.sync(arrayFolder.toString().toLowerCase());
        if (
            !fs.existsSync(arrayFolder.toString()+'/'+fileName +'.component.html') ||
            !fs.existsSync(arrayFolder.toString()+'/'+fileName +'.component.css') ||
            !fs.existsSync(arrayFolder.toString()+'/'+fileName +'.component.ts')
        ) {
            fs.writeFileSync(arrayFolder.toString()+'/'+fileName +'.component.html', '<p>'+fileName+' works!</p>');
            fs.writeFileSync(arrayFolder.toString()+'/'+fileName +'.component.css', '');
            fs.writeFileSync(arrayFolder.toString()+'/'+fileName +'.component.ts', componentTs(fileName));
        } else {
            console.log(fileName+'.component already exists');

        }
    }
}