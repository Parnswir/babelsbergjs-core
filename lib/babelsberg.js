var prototype = require('prototype')
Object.extend(global, prototype)

var livelyLang = require('lively.lang')

require('./minilively.js')
require('./Layers.js')

require('./core_ext.js')
var babelsberg = require('./constraintinterpreter.js')

module.exports = babelsberg