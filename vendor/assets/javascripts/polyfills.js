//= require polyfills/canvas-to-blob
//= require polyfills/es6-promise

// Patch global namespace to support ES6 promises
require('polyfills/es6-promise').polyfill();
