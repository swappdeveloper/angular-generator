var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

guardTs = function(string) {
    var content = `import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ${functions.capitalize(string)}Guard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
    `;

    return content;
}

module.exports = {
    createGuard: function(string) {
        var arrayFolder = string.split('/');

        //get the last item from an array
        var fileName = arrayFolder[arrayFolder.length-1].toLowerCase();

        if (arrayFolder.length > 1) {
            arrayFolder.pop();
        }
        
        mkdirp.sync(arrayFolder.toString().toLowerCase());
        if (
            !fs.existsSync(arrayFolder.toString()+'/'+fileName +'.guard.ts')
        ) {
            fs.writeFileSync(arrayFolder.toString()+'/'+fileName +'.guard.ts', guardTs(fileName));
        } else {
            console.log(fileName+'.guard already exists');
        }
    }
}


