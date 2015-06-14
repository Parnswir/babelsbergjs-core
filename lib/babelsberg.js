var prototype = require('prototype')
Object.extend(global, prototype)

var livelyLang = require('lively.lang')
var copLayers = require('layers.js')

    /* lively.Interpreter
    <script src="../../../jsinterpreter/generated/Nodes.js"></script>
    <script src="../../../jsinterpreter/generated/Translator.js"></script>
    <script src="../../../jsinterpreter/LivelyJSParser.js"></script>
    <script src="../../../jsinterpreter/Parser.js"></script>
    <script src="../../../jsinterpreter/Meta.js"></script>
    <script src="../../../jsinterpreter/Rewriting.js"></script>
    <script src="../../../jsinterpreter/Interpreter.js"></script>
    */

var core_ext = require('core_ext.js')
var babelsberg = require('constraintinterpreter.js')

module.exports = babelsberg