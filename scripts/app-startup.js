var bower = require('bower'),
    path = require('path');
exports.startup = function() {
bower.commands
.install([path.resolve(".")])
.on('end', function (installed) {
    console.log(installed);
});
};
