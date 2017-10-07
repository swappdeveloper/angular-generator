var fs = require('fs');

module.exports = {
    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).trim();
    },
    mkdir: function(dirName) {
        if (!fs.existsSync(dirName)){
            fs.mkdirSync(dirName);
        }
    }
}