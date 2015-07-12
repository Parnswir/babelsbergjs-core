var lang = require('lively.lang')

global.URL = {};

global.Properties = lang.properties
global.Config = {};
global.cop = {};
global.Global = global;
var Module = function() { return null; };
global.lively = new Module();
lively.Class = lang.classHelper;
lively.Module = Module;
global.dbgOn = (function(b) { if (b) { debugger } });

Object.extend(Function.prototype, {
    subclass: function(/*... */) {
        var args = $A(arguments),
        className = args.shift(),
        targetScope = Global,
        shortName = null;

        if (className) {
            targetScope = lively.Class.namespaceFor(className);
            shortName = lively.Class.unqualifiedNameFor(className);
        } else {
            shortName = 'anonymous_' + (lively.Class.anonymousCounter++);
            className = shortName;
        }

        var klass;
        if (className &&
            targetScope[shortName] &&
            (targetScope[shortName].superclass === this)) {
            // preserve the class to allow using the subclass
            // construct in interactive development
            klass = targetScope[shortName];
        } else {
            klass = function() {
                if (this.initialize) this.initialize.apply(this, arguments);
                return this;
            };
            klass.name = shortName;
            klass.superclass = this;
            var protoclass = function() { };
            protoclass.prototype = this.prototype;
            klass.prototype = new protoclass();
            klass.prototype.constructor = klass;
            klass.prototype.constructor.type = className;
            klass.prototype.constructor.displayName = className;
            if (className) targetScope[shortName] = klass;

            // remember the module that contains the class def
            if (Global.lively && lively.Module && lively.Module.current)
                klass.sourceModule = lively.Module.current();
        }

        // the remaining args should be category strings or source objects
        this.addMethods.apply(klass, args);

        if (!klass.prototype.initialize)
            klass.prototype.initialize = function() {};

        return klass;
    },

    addMethods: function(/*...*/) {
        var args = arguments;
        for (var i = 0; i < args.length; i++) {
            if (!Object.isString(args[i])) { // ignore categories
                this.addCategorizedMethods(
                    args[i] instanceof Function ? (args[i])() : args[i]
                );
            }
        }
    },

    addCategorizedMethods: function(source) {
        var ancestor = this.superclass && this.superclass.prototype;

        var className = this.type || 'Anonymous';

        for (var property in source) {

            if (property == 'constructor') continue;

            var getter = source.__lookupGetter__(property);
            if (getter) this.prototype.__defineGetter__(property, getter);
            var setter = source.__lookupSetter__(property);
            if (setter) this.prototype.__defineSetter__(property, setter);
            if (getter || setter) continue;

            var value = source[property];
            // weirdly, RegExps are functions in Safari, so testing for
            // Object.isFunction on regexp field values will return true.
            // But they're not full-blown functions and don't
            // inherit argumentNames from Function.prototype

            var hasSuperCall = (ancestor &&
                                Object.isFunction(value) &&
                                value.argumentNames &&
                                value.argumentNames().first() == '$super');
            if (hasSuperCall) {
                // wrapped in a function to save the value of 'method' for advice
                (function() {
                    var method = value;
                    var advice = (function(m) {
                        return function callSuper() {
                            var method = ancestor[m];
                            if (!method)
                                throw new Error(
                                    Strings.format(
                                        'Trying to call super of %s>>%s ' +
                                            'but no super method in %s',
                                        className,
                                        m,
                                        ancestor.constructor.type
                                    )
                                );
                            return method.apply(this, arguments);
                        };
                    })(property);

                    advice.methodName = ('$super:' +
                                         (this.superclass ?
                                          this.superclass.type + '>>' :
                                          '') +
                                         property);

                    value = Object.extend(advice.wrap(method), {
                        valueOf: function() { return method },
                        toString: function() { return method.toString() },
                        originalFunction: method
                    });
                    // for lively.Closures
                    method.varMapping = {$super: advice};
                })();
            }

            this.prototype[property] = value;

            if (Object.isFunction(value)) {
                // remember name for profiling in WebKit
                value.displayName = className + '$' + property;
                for (; value; value = value.originalFunction) {
                    value.declaredClass = this.prototype.constructor.type;
                    value.methodName = property;
                }
            }
        } // end of for (var property in source)

        return this;
    },

    binds: function() { return this; },

    getVarMapping: function() { return this.varMapping; }
});

global.Strings = lang.string
