var fs = require('fs');
var functions = require('./functions');
var mkdirp = require('mkdirp');

serviceTs = function(string) {
    var content = `import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './../http.service';

import { CustomObject } from './../../models/custom-object.model';
import { MultipleFilter } from './../../models/multiple-filter.model';

import { ${functions.capitalize(string)}Configuration } from './../../configurations/transactions/${functions.capitalize(string)}.configuration';


@Injectable()
export class ${functions.capitalize(string)}Service {
    private config = new ${functions.capitalize(string)}Configuration();
    constructor(
        private httpService: HttpService 
    ) { }

    query(body: Array<MultipleFilter>): Observable<any> {
        let request: CustomObject = {
            meta: {
                "PageIndex": 0,
                "PageSize": 3000,
                "OrderByCollection": []
            },
            body: []            
        }

        if (body[0] !== undefined && body[0].Property !== "") {
            request['body'] = body;
        }

        return this.httpService.post(this.config.url + 'Search', request)
            .map((response: any) => response)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

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

        var filePath = arrayFolder.toString().replace(/,/g , "/").toLowerCase();
        
        mkdirp.sync(filePath);
        if (
            !fs.existsSync(filePath+'/'+fileName +'.service.ts')
        ) {
            fs.writeFileSync(filePath+'/'+fileName +'.service.ts', serviceTs(fileName));
        } else {
            console.log(fileName+'.service already exists');
        }
    }
}