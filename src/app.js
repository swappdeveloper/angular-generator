const readline = require('readline');
var fs = require('fs');
var componentCreator = require('../lib/component.creator');
var moduleCreator = require('../lib/module.creator');
var directiveCreator = require('../lib/directive.creator');
var pipeCreator = require('../lib/pipe.creator');
var serviceCreator = require('../lib/service.creator');
var classCreator = require('../lib/class.creator');
var guardCreator = require('../lib/guard.creator');
var interfaceCreator = require('../lib/interface.creator');
var enumCreator = require('../lib/enum.creator');
var modelCreator = require('../lib/model.creator');
var functions = require('../lib/functions');

var rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

var waitForUserInput = function(run, cType, cName) {
    if (run === 'g' || run === 'generate') {
        if(cType === 'component') {
            componentCreator.createComponent(cName);
        } else if(cType === 'module') {
            moduleCreator.createModule(cName);
        } else if(cType === 'directive') {
            directiveCreator.createDirective(cName);
        } else if(cType === 'pipe') {
            pipeCreator.createPipe(cName);
        } else if(cType === 'service') {
            serviceCreator.createService(cName);
        } else if(cType === 'class') {
            classCreator.createClass(cName);
        } else if(cType === 'guard') {
            guardCreator.createGuard(cName);
        } else if(cType === 'interface') {
            interfaceCreator.createInterface(cName);
        } else if(cType === 'enum') {
            enumCreator.createEnum(cName);
        } else if(cType === 'model') {
            modelCreator.createModel(cName);
        }

        console.log(cType + ' ' + cName + ' is created!');
        process.exit();
    } 

    if (run === '--help') {
        var installedPath = process.env.APPDATA+ '\\npm\\node_modules\\angular-simple-generator';
        if(fs.existsSync(installedPath)) {
            console.log(fs.readFileSync(installedPath+'\\lib\\help.txt', 'utf8'));
        } else {
            console.info('Please install globaly - npm install -g angular-simple-generator');
        }
    } else {
        console.log('I did not recognize your command, try ang --help');
    }
    process.exit();
}

exports.waitForUserInput = waitForUserInput;