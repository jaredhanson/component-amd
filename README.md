# component-amd

[Component](https://github.com/component) [builder](https://github.com/component/builder.js)
plugin that transpiles [AMD](https://github.com/amdjs/amdjs-api) modules into
[CommonJS](http://www.commonjs.org/) modules which can be included in component
builds.

With this plugin in use, CommonJS and AMD modules can be freely intermixed
within the component toolchain.

## Install

    $ npm install component-amd

## Usage

#### Command Line

Build the component, including AMD modules, by invoking `component build`
with `component-amd` in use.

    component build -u component-amd

#### API

```javascript
var fs      = require('fs')
  , Builder = require('component-builder')
  , amd     = require('component-amd');

var builder = new Builder(__dirname);

builder.use(amd);

builder.build(function(err, obj) {
  if (err) throw err;
  fs.writeFileSync('build/build.js', obj.require + obj.js);
  if (obj.css) fs.writeFileSync('build/build.css', obj.css);
});
```

## Tests

    $ npm install
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/component-amd.png)](http://travis-ci.org/jaredhanson/component-amd)  [![David DM](https://david-dm.org/jaredhanson/component-amd.png)](http://david-dm.org/jaredhanson/component-amd)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
