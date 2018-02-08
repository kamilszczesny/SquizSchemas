let Transform = require('stream').Transform;
let PluginError = require('plugin-error');
let refParser = require('json-schema-ref-parser');
let jsonfile = require('jsonfile');


// GULP plugin
module.exports = function () {

    var transformStream = new Transform({
        objectMode: true
    });

    transformStream._transform = function (file, encoding, callback) {
        console.info('Compiling:', file.path);
        var error = null;
        var contents = JSON.parse(file.contents.toString('utf8'));

        refParser.bundle(file.path).then(function (schema) {
            let output = JSON.stringify(schema);
            file.contents = new Buffer(output, "utf8");
            callback(error, file);
        }).catch((e) => {
            console.error("Bundling dereferencing error", e);
            this.emit('compileSchema', new PluginError('CompileSchema', e));
        });
    };

    return transformStream;
};