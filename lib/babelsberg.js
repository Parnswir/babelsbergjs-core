var prototype = require('prototype')
Object.extend(global, prototype)

require('lively.lang')

require('./minilively.js')
require('./Layers.js')
require('./core_ext.js')
require('./constraintinterpreter.js')

module.exports = bbb
