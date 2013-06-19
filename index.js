/**
 * Module dependencies.
 */
var path = require('path')
  , Batch = require('batch')
  , amd2cjs = require('./lib/amd2cjs');


module.exports = function(builder) {
  
  builder.hook('before scripts', function (builder, cb) {
    if (!builder.config.scripts) return cb();
    
    var files = builder.config.scripts.filter(jsFilter)
      , batch = new Batch();

    batch.concurrency(8);

    files.forEach(function (file) {
      batch.push(function (done) {
        
        amd2cjs.transpileFile(builder.path(file), function(err, js) {
          if (err) { return done(err); }
          
          // If the file was transpiled from AMD to CommonJS, remove the
          // original file and substitute it with the fabricated code.
          if (js) {
            builder.removeFile('scripts', file);
            builder.addFile('scripts', file, js);
          }
          done();
        });
      });
    });

    batch.end(cb);
  });
}


function jsFilter(filename) {
  var ext = path.extname(filename);
  if (ext === '.js') return true;
}
