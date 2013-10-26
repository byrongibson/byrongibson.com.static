/**
 * JSXTransformer v0.5.0
 */
!function(e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : "undefined" != typeof window ? window.JSXTransformer = e() : "undefined" != typeof global ? global.JSXTransformer = e() : "undefined" != typeof self && (self.JSXTransformer = e());
}(function() {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = "function" == typeof require && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'");
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, f, f.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
        return s;
    }({
        1: [ function(require, module, exports) {
            // Array.isArray is supported in IE9
            function isArray(xs) {
                return "[object Array]" === toString.call(xs);
            }
            // Object.create is supported in IE9
            function create(prototype, properties) {
                var object;
                if (null === prototype) object = {
                    __proto__: null
                }; else {
                    if ("object" != typeof prototype) throw new TypeError("typeof prototype[" + typeof prototype + "] != 'object'");
                    var Type = function() {};
                    Type.prototype = prototype, object = new Type(), object.__proto__ = prototype;
                }
                return "undefined" != typeof properties && Object.defineProperties && Object.defineProperties(object, properties), 
                object;
            }
            // Object.keys and Object.getOwnPropertyNames is supported in IE9 however
            // they do show a description and number property on Error objects
            function notObject(object) {
                return "object" != typeof object && "function" != typeof object || null === object;
            }
            function keysShim(object) {
                if (notObject(object)) throw new TypeError("Object.keys called on a non-object");
                var result = [];
                for (var name in object) hasOwnProperty.call(object, name) && result.push(name);
                return result;
            }
            // getOwnPropertyNames is almost the same as Object.keys one key feature
            //  is that it returns hidden properties, since that can't be implemented,
            //  this feature gets reduced so it just shows the length property on arrays
            function propertyShim(object) {
                if (notObject(object)) throw new TypeError("Object.getOwnPropertyNames called on a non-object");
                var result = keysShim(object);
                return exports.isArray(object) && -1 === exports.indexOf(object, "length") && result.push("length"), 
                result;
            }
            // Object.getOwnPropertyDescriptor - supported in IE8 but only on dom elements
            function valueObject(value, key) {
                return {
                    value: value[key]
                };
            }
            //
            // The shims in this file are not fully implemented shims for the ES5
            // features, but do work for the particular usecases there is in
            // the other modules.
            //
            var toString = Object.prototype.toString, hasOwnProperty = Object.prototype.hasOwnProperty;
            exports.isArray = "function" == typeof Array.isArray ? Array.isArray : isArray, 
            // Array.prototype.indexOf is supported in IE9
            exports.indexOf = function(xs, x) {
                if (xs.indexOf) return xs.indexOf(x);
                for (var i = 0; i < xs.length; i++) if (x === xs[i]) return i;
                return -1;
            }, // Array.prototype.filter is supported in IE9
            exports.filter = function(xs, fn) {
                if (xs.filter) return xs.filter(fn);
                for (var res = [], i = 0; i < xs.length; i++) fn(xs[i], i, xs) && res.push(xs[i]);
                return res;
            }, // Array.prototype.forEach is supported in IE9
            exports.forEach = function(xs, fn, self) {
                if (xs.forEach) return xs.forEach(fn, self);
                for (var i = 0; i < xs.length; i++) fn.call(self, xs[i], i, xs);
            }, // Array.prototype.map is supported in IE9
            exports.map = function(xs, fn) {
                if (xs.map) return xs.map(fn);
                for (var out = new Array(xs.length), i = 0; i < xs.length; i++) out[i] = fn(xs[i], i, xs);
                return out;
            }, // Array.prototype.reduce is supported in IE9
            exports.reduce = function(array, callback, opt_initialValue) {
                if (array.reduce) return array.reduce(callback, opt_initialValue);
                var value, isValueSet = !1;
                2 < arguments.length && (value = opt_initialValue, isValueSet = !0);
                for (var i = 0, l = array.length; l > i; ++i) array.hasOwnProperty(i) && (isValueSet ? value = callback(value, array[i], i, array) : (value = array[i], 
                isValueSet = !0));
                return value;
            }, // String.prototype.substr - negative index don't work in IE8
            exports.substr = "b" !== "ab".substr(-1) ? function(str, start, length) {
                // call the original function
                // did we get a negative start, calculate how much it is from the beginning of the string
                return 0 > start && (start = str.length + start), str.substr(start, length);
            } : function(str, start, length) {
                return str.substr(start, length);
            }, // String.prototype.trim is supported in IE9
            exports.trim = function(str) {
                return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
            }, // Function.prototype.bind is supported in IE9
            exports.bind = function() {
                var args = Array.prototype.slice.call(arguments), fn = args.shift();
                if (fn.bind) return fn.bind.apply(fn, args);
                var self = args.shift();
                return function() {
                    fn.apply(self, args.concat([ Array.prototype.slice.call(arguments) ]));
                };
            }, exports.create = "function" == typeof Object.create ? Object.create : create;
            var keys = "function" == typeof Object.keys ? Object.keys : keysShim, getOwnPropertyNames = "function" == typeof Object.getOwnPropertyNames ? Object.getOwnPropertyNames : propertyShim;
            if (new Error().hasOwnProperty("description")) {
                var ERROR_PROPERTY_FILTER = function(obj, array) {
                    return "[object Error]" === toString.call(obj) && (array = exports.filter(array, function(name) {
                        return "description" !== name && "number" !== name && "message" !== name;
                    })), array;
                };
                exports.keys = function(object) {
                    return ERROR_PROPERTY_FILTER(object, keys(object));
                }, exports.getOwnPropertyNames = function(object) {
                    return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
                };
            } else exports.keys = keys, exports.getOwnPropertyNames = getOwnPropertyNames;
            if ("function" == typeof Object.getOwnPropertyDescriptor) try {
                Object.getOwnPropertyDescriptor({
                    a: 1
                }, "a"), exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            } catch (e) {
                // IE8 dom element issue - use a try catch and default to valueObject
                exports.getOwnPropertyDescriptor = function(value, key) {
                    try {
                        return Object.getOwnPropertyDescriptor(value, key);
                    } catch (e) {
                        return valueObject(value, key);
                    }
                };
            } else exports.getOwnPropertyDescriptor = valueObject;
        }, {} ],
        2: [ function(require, module, exports) {
            // resolves . and .. elements in a path array with directory names there
            // must be no slashes, empty elements, or device names (c:\) in the array
            // (so also no leading and trailing slashes - it does not distinguish
            // relative and absolute paths)
            function normalizeArray(parts, allowAboveRoot) {
                for (var up = 0, i = parts.length - 1; i >= 0; i--) {
                    var last = parts[i];
                    "." === last ? parts.splice(i, 1) : ".." === last ? (parts.splice(i, 1), up++) : up && (parts.splice(i, 1), 
                    up--);
                }
                // if the path is allowed to go above the root, restore leading ..s
                if (allowAboveRoot) for (;up--; up) parts.unshift("..");
                return parts;
            }
            var process = require("__browserify_process"), util = require("util"), shims = require("_shims"), splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, splitPath = function(filename) {
                return splitPathRe.exec(filename).slice(1);
            };
            // path.resolve([from ...], to)
            // posix version
            exports.resolve = function() {
                for (var resolvedPath = "", resolvedAbsolute = !1, i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                    var path = i >= 0 ? arguments[i] : process.cwd();
                    // Skip empty and invalid entries
                    if (!util.isString(path)) throw new TypeError("Arguments to path.resolve must be strings");
                    path && (resolvedPath = path + "/" + resolvedPath, resolvedAbsolute = "/" === path.charAt(0));
                }
                // At this point the path should be resolved to a full absolute path, but
                // handle relative paths to be safe (might happen when process.cwd() fails)
                // Normalize the path
                return resolvedPath = normalizeArray(shims.filter(resolvedPath.split("/"), function(p) {
                    return !!p;
                }), !resolvedAbsolute).join("/"), (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
            }, // path.normalize(path)
            // posix version
            exports.normalize = function(path) {
                var isAbsolute = exports.isAbsolute(path), trailingSlash = "/" === shims.substr(path, -1);
                // Normalize the path
                return path = normalizeArray(shims.filter(path.split("/"), function(p) {
                    return !!p;
                }), !isAbsolute).join("/"), path || isAbsolute || (path = "."), path && trailingSlash && (path += "/"), 
                (isAbsolute ? "/" : "") + path;
            }, // posix version
            exports.isAbsolute = function(path) {
                return "/" === path.charAt(0);
            }, // posix version
            exports.join = function() {
                var paths = Array.prototype.slice.call(arguments, 0);
                return exports.normalize(shims.filter(paths, function(p) {
                    if (!util.isString(p)) throw new TypeError("Arguments to path.join must be strings");
                    return p;
                }).join("/"));
            }, // path.relative(from, to)
            // posix version
            exports.relative = function(from, to) {
                function trim(arr) {
                    for (var start = 0; start < arr.length && "" === arr[start]; start++) ;
                    for (var end = arr.length - 1; end >= 0 && "" === arr[end]; end--) ;
                    return start > end ? [] : arr.slice(start, end - start + 1);
                }
                from = exports.resolve(from).substr(1), to = exports.resolve(to).substr(1);
                for (var fromParts = trim(from.split("/")), toParts = trim(to.split("/")), length = Math.min(fromParts.length, toParts.length), samePartsLength = length, i = 0; length > i; i++) if (fromParts[i] !== toParts[i]) {
                    samePartsLength = i;
                    break;
                }
                for (var outputParts = [], i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
                return outputParts = outputParts.concat(toParts.slice(samePartsLength)), outputParts.join("/");
            }, exports.sep = "/", exports.delimiter = ":", exports.dirname = function(path) {
                var result = splitPath(path), root = result[0], dir = result[1];
                return root || dir ? (dir && (// It has a dirname, strip trailing slash
                dir = dir.substr(0, dir.length - 1)), root + dir) : ".";
            }, exports.basename = function(path, ext) {
                var f = splitPath(path)[2];
                // TODO: make this comparison case-insensitive on windows?
                return ext && f.substr(-1 * ext.length) === ext && (f = f.substr(0, f.length - ext.length)), 
                f;
            }, exports.extname = function(path) {
                return splitPath(path)[3];
            };
        }, {
            __browserify_process: 5,
            _shims: 1,
            util: 3
        } ],
        3: [ function(require, module, exports) {
            /**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
            /* legacy: obj, showHidden, depth, colors*/
            function inspect(obj, opts) {
                // default options
                var ctx = {
                    seen: [],
                    stylize: stylizeNoColor
                };
                // legacy...
                return arguments.length >= 3 && (ctx.depth = arguments[2]), arguments.length >= 4 && (ctx.colors = arguments[3]), 
                isBoolean(opts) ? // legacy...
                ctx.showHidden = opts : opts && // got an "options" object
                exports._extend(ctx, opts), // set default options
                isUndefined(ctx.showHidden) && (ctx.showHidden = !1), isUndefined(ctx.depth) && (ctx.depth = 2), 
                isUndefined(ctx.colors) && (ctx.colors = !1), isUndefined(ctx.customInspect) && (ctx.customInspect = !0), 
                ctx.colors && (ctx.stylize = stylizeWithColor), formatValue(ctx, obj, ctx.depth);
            }
            function stylizeWithColor(str, styleType) {
                var style = inspect.styles[styleType];
                return style ? "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m" : str;
            }
            function stylizeNoColor(str) {
                return str;
            }
            function arrayToHash(array) {
                var hash = {};
                return shims.forEach(array, function(val) {
                    hash[val] = !0;
                }), hash;
            }
            function formatValue(ctx, value, recurseTimes) {
                // Provide a hook for user-specified inspect functions.
                // Check that value is an object with an inspect function on it
                if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
                value.inspect !== exports.inspect && (!value.constructor || value.constructor.prototype !== value)) {
                    var ret = value.inspect(recurseTimes);
                    return isString(ret) || (ret = formatValue(ctx, ret, recurseTimes)), ret;
                }
                // Primitive types cannot have properties
                var primitive = formatPrimitive(ctx, value);
                if (primitive) return primitive;
                // Look up the keys of the object.
                var keys = shims.keys(value), visibleKeys = arrayToHash(keys);
                // Some type of object without properties can be shortcutted.
                if (ctx.showHidden && (keys = shims.getOwnPropertyNames(value)), 0 === keys.length) {
                    if (isFunction(value)) {
                        var name = value.name ? ": " + value.name : "";
                        return ctx.stylize("[Function" + name + "]", "special");
                    }
                    if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                    if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
                    if (isError(value)) return formatError(value);
                }
                var base = "", array = !1, braces = [ "{", "}" ];
                // Make functions say that they are functions
                if (// Make Array say that they are Array
                isArray(value) && (array = !0, braces = [ "[", "]" ]), isFunction(value)) {
                    var n = value.name ? ": " + value.name : "";
                    base = " [Function" + n + "]";
                }
                if (// Make RegExps say that they are RegExps
                isRegExp(value) && (base = " " + RegExp.prototype.toString.call(value)), // Make dates with properties first say the date
                isDate(value) && (base = " " + Date.prototype.toUTCString.call(value)), // Make error with message first say the error
                isError(value) && (base = " " + formatError(value)), 0 === keys.length && (!array || 0 == value.length)) return braces[0] + base + braces[1];
                if (0 > recurseTimes) return isRegExp(value) ? ctx.stylize(RegExp.prototype.toString.call(value), "regexp") : ctx.stylize("[Object]", "special");
                ctx.seen.push(value);
                var output;
                return output = array ? formatArray(ctx, value, recurseTimes, visibleKeys, keys) : keys.map(function(key) {
                    return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                }), ctx.seen.pop(), reduceToSingleString(output, base, braces);
            }
            function formatPrimitive(ctx, value) {
                if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
                if (isString(value)) {
                    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return ctx.stylize(simple, "string");
                }
                return isNumber(value) ? ctx.stylize("" + value, "number") : isBoolean(value) ? ctx.stylize("" + value, "boolean") : // For some reason typeof null is "object", so special case here.
                isNull(value) ? ctx.stylize("null", "null") : void 0;
            }
            function formatError(value) {
                return "[" + Error.prototype.toString.call(value) + "]";
            }
            function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                for (var output = [], i = 0, l = value.length; l > i; ++i) hasOwnProperty(value, String(i)) ? output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), !0)) : output.push("");
                return shims.forEach(keys, function(key) {
                    key.match(/^\d+$/) || output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, !0));
                }), output;
            }
            function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                var name, str, desc;
                if (desc = shims.getOwnPropertyDescriptor(value, key) || {
                    value: value[key]
                }, desc.get ? str = desc.set ? ctx.stylize("[Getter/Setter]", "special") : ctx.stylize("[Getter]", "special") : desc.set && (str = ctx.stylize("[Setter]", "special")), 
                hasOwnProperty(visibleKeys, key) || (name = "[" + key + "]"), str || (shims.indexOf(ctx.seen, desc.value) < 0 ? (str = isNull(recurseTimes) ? formatValue(ctx, desc.value, null) : formatValue(ctx, desc.value, recurseTimes - 1), 
                str.indexOf("\n") > -1 && (str = array ? str.split("\n").map(function(line) {
                    return "  " + line;
                }).join("\n").substr(2) : "\n" + str.split("\n").map(function(line) {
                    return "   " + line;
                }).join("\n"))) : str = ctx.stylize("[Circular]", "special")), isUndefined(name)) {
                    if (array && key.match(/^\d+$/)) return str;
                    name = JSON.stringify("" + key), name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (name = name.substr(1, name.length - 2), 
                    name = ctx.stylize(name, "name")) : (name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), 
                    name = ctx.stylize(name, "string"));
                }
                return name + ": " + str;
            }
            function reduceToSingleString(output, base, braces) {
                var numLinesEst = 0, length = shims.reduce(output, function(prev, cur) {
                    return numLinesEst++, cur.indexOf("\n") >= 0 && numLinesEst++, prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
                }, 0);
                return length > 60 ? braces[0] + ("" === base ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1] : braces[0] + base + " " + output.join(", ") + " " + braces[1];
            }
            // NOTE: These type checking functions intentionally don't use `instanceof`
            // because it is fragile and can be easily faked with `Object.create()`.
            function isArray(ar) {
                return shims.isArray(ar);
            }
            function isBoolean(arg) {
                return "boolean" == typeof arg;
            }
            function isNull(arg) {
                return null === arg;
            }
            function isNullOrUndefined(arg) {
                return null == arg;
            }
            function isNumber(arg) {
                return "number" == typeof arg;
            }
            function isString(arg) {
                return "string" == typeof arg;
            }
            function isSymbol(arg) {
                return "symbol" == typeof arg;
            }
            function isUndefined(arg) {
                return void 0 === arg;
            }
            function isRegExp(re) {
                return isObject(re) && "[object RegExp]" === objectToString(re);
            }
            function isObject(arg) {
                return "object" == typeof arg && arg;
            }
            function isDate(d) {
                return isObject(d) && "[object Date]" === objectToString(d);
            }
            function isError(e) {
                return isObject(e) && "[object Error]" === objectToString(e);
            }
            function isFunction(arg) {
                return "function" == typeof arg;
            }
            function isPrimitive(arg) {
                return null === arg || "boolean" == typeof arg || "number" == typeof arg || "string" == typeof arg || "symbol" == typeof arg || // ES6 symbol
                "undefined" == typeof arg;
            }
            function isBuffer(arg) {
                return arg instanceof Buffer;
            }
            function objectToString(o) {
                return Object.prototype.toString.call(o);
            }
            function pad(n) {
                return 10 > n ? "0" + n.toString(10) : n.toString(10);
            }
            // 26 Feb 16:19:34
            function timestamp() {
                var d = new Date(), time = [ pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()) ].join(":");
                return [ d.getDate(), months[d.getMonth()], time ].join(" ");
            }
            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            var Buffer = require("__browserify_Buffer").Buffer, shims = require("_shims"), formatRegExp = /%[sdj%]/g;
            exports.format = function(f) {
                if (!isString(f)) {
                    for (var objects = [], i = 0; i < arguments.length; i++) objects.push(inspect(arguments[i]));
                    return objects.join(" ");
                }
                for (var i = 1, args = arguments, len = args.length, str = String(f).replace(formatRegExp, function(x) {
                    if ("%%" === x) return "%";
                    if (i >= len) return x;
                    switch (x) {
                      case "%s":
                        return String(args[i++]);

                      case "%d":
                        return Number(args[i++]);

                      case "%j":
                        try {
                            return JSON.stringify(args[i++]);
                        } catch (_) {
                            return "[Circular]";
                        }

                      default:
                        return x;
                    }
                }), x = args[i]; len > i; x = args[++i]) str += isNull(x) || !isObject(x) ? " " + x : " " + inspect(x);
                return str;
            }, exports.inspect = inspect, // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
            inspect.colors = {
                bold: [ 1, 22 ],
                italic: [ 3, 23 ],
                underline: [ 4, 24 ],
                inverse: [ 7, 27 ],
                white: [ 37, 39 ],
                grey: [ 90, 39 ],
                black: [ 30, 39 ],
                blue: [ 34, 39 ],
                cyan: [ 36, 39 ],
                green: [ 32, 39 ],
                magenta: [ 35, 39 ],
                red: [ 31, 39 ],
                yellow: [ 33, 39 ]
            }, // Don't use 'blue' not visible on cmd.exe
            inspect.styles = {
                special: "cyan",
                number: "yellow",
                "boolean": "yellow",
                undefined: "grey",
                "null": "bold",
                string: "green",
                date: "magenta",
                // "name": intentionally not styling
                regexp: "red"
            }, exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, 
            exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, 
            exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, 
            exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, 
            exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = isBuffer;
            var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            // log is just a thin wrapper to console.log that prepends a timestamp
            exports.log = function() {
                console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
            }, /**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
            exports.inherits = function(ctor, superCtor) {
                ctor.super_ = superCtor, ctor.prototype = shims.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                });
            }, exports._extend = function(origin, add) {
                // Don't do anything if add isn't an object
                if (!add || !isObject(add)) return origin;
                for (var keys = shims.keys(add), i = keys.length; i--; ) origin[keys[i]] = add[keys[i]];
                return origin;
            };
        }, {
            __browserify_Buffer: 4,
            _shims: 1
        } ],
        4: [ function(require, module) {
            require = function e(t, n, r) {
                function s(o, u) {
                    if (!n[o]) {
                        if (!t[o]) {
                            var a = "function" == typeof require && require;
                            if (!u && a) return a(o, !0);
                            if (i) return i(o, !0);
                            throw new Error("Cannot find module '" + o + "'");
                        }
                        var f = n[o] = {
                            exports: {}
                        };
                        t[o][0].call(f.exports, function(e) {
                            var n = t[o][1][e];
                            return s(n ? n : e);
                        }, f, f.exports, e, t, n, r);
                    }
                    return n[o].exports;
                }
                for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
                return s;
            }({
                1: [ function(require, module, exports) {
                    exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
                        var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isBE ? 0 : nBytes - 1, d = isBE ? 1 : -1, s = buffer[offset + i];
                        for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = 256 * e + buffer[offset + i], 
                        i += d, nBits -= 8) ;
                        for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = 256 * m + buffer[offset + i], 
                        i += d, nBits -= 8) ;
                        if (0 === e) e = 1 - eBias; else {
                            if (e === eMax) return m ? 0/0 : 1/0 * (s ? -1 : 1);
                            m += Math.pow(2, mLen), e -= eBias;
                        }
                        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
                    }, exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
                        var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isBE ? nBytes - 1 : 0, d = isBE ? -1 : 1, s = 0 > value || 0 === value && 0 > 1 / value ? 1 : 0;
                        for (value = Math.abs(value), isNaN(value) || 1/0 === value ? (m = isNaN(value) ? 1 : 0, 
                        e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, 
                        c *= 2), value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias), value * c >= 2 && (e++, 
                        c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), 
                        e += eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = 255 & m, 
                        i += d, m /= 256, mLen -= 8) ;
                        for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = 255 & e, i += d, 
                        e /= 256, eLen -= 8) ;
                        buffer[offset + i - d] |= 128 * s;
                    };
                }, {} ],
                q9TxCC: [ function(require, module, exports) {
                    function stringtrim(str) {
                        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
                    }
                    function Buffer(subject, encoding, offset) {
                        if (assert || (assert = require("assert")), !(this instanceof Buffer)) return new Buffer(subject, encoding, offset);
                        // Work-around: node's base64 implementation
                        // allows for non-padded strings while base64-js
                        // does not..
                        if (this.parent = this, this.offset = 0, "base64" == encoding && "string" == typeof subject) for (subject = stringtrim(subject); 0 != subject.length % 4; ) subject += "=";
                        var type;
                        // Are we slicing?
                        if ("number" == typeof offset) {
                            this.length = coerce(encoding);
                            // slicing works, with limitations (no parent tracking/update)
                            // check https://github.com/toots/buffer-browserify/issues/19
                            for (var i = 0; i < this.length; i++) this[i] = subject.get(i + offset);
                        } else {
                            // Find the length
                            switch (type = typeof subject) {
                              case "number":
                                this.length = coerce(subject);
                                break;

                              case "string":
                                this.length = Buffer.byteLength(subject, encoding);
                                break;

                              case "object":
                                // Assume object is an array
                                this.length = coerce(subject.length);
                                break;

                              default:
                                throw new Error("First argument needs to be a number, array or string.");
                            }
                            // Treat array-ish objects as a byte array.
                            if (isArrayIsh(subject)) for (var i = 0; i < this.length; i++) this[i] = subject instanceof Buffer ? subject.readUInt8(i) : subject[i]; else if ("string" == type) // We are a string
                            this.length = this.write(subject, 0, encoding); else if ("number" === type) for (var i = 0; i < this.length; i++) this[i] = 0;
                        }
                    }
                    // slice(start, end)
                    function clamp(index, len, defaultValue) {
                        return "number" != typeof index ? defaultValue : (index = ~~index, // Coerce to integer.
                        index >= len ? len : index >= 0 ? index : (index += len, index >= 0 ? index : 0));
                    }
                    // helpers
                    function coerce(length) {
                        // Coerce length to a number (possibly NaN), round up
                        // in case it's fractional (e.g. 123.456) then do a
                        // double negate to coerce a NaN to 0. Easy, right?
                        return length = ~~Math.ceil(+length), 0 > length ? 0 : length;
                    }
                    function isArray(subject) {
                        return (Array.isArray || function(subject) {
                            return "[object Array]" == {}.toString.apply(subject);
                        })(subject);
                    }
                    function isArrayIsh(subject) {
                        return isArray(subject) || Buffer.isBuffer(subject) || subject && "object" == typeof subject && "number" == typeof subject.length;
                    }
                    function toHex(n) {
                        return 16 > n ? "0" + n.toString(16) : n.toString(16);
                    }
                    function utf8ToBytes(str) {
                        for (var byteArray = [], i = 0; i < str.length; i++) if (str.charCodeAt(i) <= 127) byteArray.push(str.charCodeAt(i)); else for (var h = encodeURIComponent(str.charAt(i)).substr(1).split("%"), j = 0; j < h.length; j++) byteArray.push(parseInt(h[j], 16));
                        return byteArray;
                    }
                    function asciiToBytes(str) {
                        for (var byteArray = [], i = 0; i < str.length; i++) // Node's code seems to be doing this and not & 0x7F..
                        byteArray.push(255 & str.charCodeAt(i));
                        return byteArray;
                    }
                    function base64ToBytes(str) {
                        return require("base64-js").toByteArray(str);
                    }
                    function blitBuffer(src, dst, offset, length) {
                        for (var i = 0; length > i && !(i + offset >= dst.length || i >= src.length); ) dst[i + offset] = src[i], 
                        i++;
                        return i;
                    }
                    function decodeUtf8Char(str) {
                        try {
                            return decodeURIComponent(str);
                        } catch (err) {
                            return String.fromCharCode(65533);
                        }
                    }
                    function readUInt16(buffer, offset, isBigEndian, noAssert) {
                        var val = 0;
                        return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 1 < buffer.length, "Trying to read beyond buffer length")), 
                        offset >= buffer.length ? 0 : (isBigEndian ? (val = buffer[offset] << 8, offset + 1 < buffer.length && (val |= buffer[offset + 1])) : (val = buffer[offset], 
                        offset + 1 < buffer.length && (val |= buffer[offset + 1] << 8)), val);
                    }
                    function readUInt32(buffer, offset, isBigEndian, noAssert) {
                        var val = 0;
                        return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")), 
                        offset >= buffer.length ? 0 : (isBigEndian ? (offset + 1 < buffer.length && (val = buffer[offset + 1] << 16), 
                        offset + 2 < buffer.length && (val |= buffer[offset + 2] << 8), offset + 3 < buffer.length && (val |= buffer[offset + 3]), 
                        val += buffer[offset] << 24 >>> 0) : (offset + 2 < buffer.length && (val = buffer[offset + 2] << 16), 
                        offset + 1 < buffer.length && (val |= buffer[offset + 1] << 8), val |= buffer[offset], 
                        offset + 3 < buffer.length && (val += buffer[offset + 3] << 24 >>> 0)), val);
                    }
                    function readInt16(buffer, offset, isBigEndian, noAssert) {
                        var neg, val;
                        return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 1 < buffer.length, "Trying to read beyond buffer length")), 
                        val = readUInt16(buffer, offset, isBigEndian, noAssert), neg = 32768 & val, neg ? -1 * (65535 - val + 1) : val;
                    }
                    function readInt32(buffer, offset, isBigEndian, noAssert) {
                        var neg, val;
                        return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")), 
                        val = readUInt32(buffer, offset, isBigEndian, noAssert), neg = 2147483648 & val, 
                        neg ? -1 * (4294967295 - val + 1) : val;
                    }
                    function readFloat(buffer, offset, isBigEndian, noAssert) {
                        return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(offset + 3 < buffer.length, "Trying to read beyond buffer length")), require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 23, 4);
                    }
                    function readDouble(buffer, offset, isBigEndian, noAssert) {
                        return noAssert || (assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(offset + 7 < buffer.length, "Trying to read beyond buffer length")), require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 52, 8);
                    }
                    /*
 * We have to make sure that the value is a valid integer. This means that it is
 * non-negative. It has no fractional component and that it does not exceed the
 * maximum allowed value.
 *
 *      value           The number to check for validity
 *
 *      max             The maximum value
 */
                    function verifuint(value, max) {
                        assert.ok("number" == typeof value, "cannot write a non-number as a number"), assert.ok(value >= 0, "specified a negative value for writing an unsigned value"), 
                        assert.ok(max >= value, "value is larger than maximum value for type"), assert.ok(Math.floor(value) === value, "value has a fractional component");
                    }
                    function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
                        noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 1 < buffer.length, "trying to write beyond buffer length"), 
                        verifuint(value, 65535));
                        for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) buffer[offset + i] = (value & 255 << 8 * (isBigEndian ? 1 - i : i)) >>> 8 * (isBigEndian ? 1 - i : i);
                    }
                    function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
                        noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 3 < buffer.length, "trying to write beyond buffer length"), 
                        verifuint(value, 4294967295));
                        for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) buffer[offset + i] = 255 & value >>> 8 * (isBigEndian ? 3 - i : i);
                    }
                    /*
 * We now move onto our friends in the signed number category. Unlike unsigned
 * numbers, we're going to have to worry a bit more about how we put values into
 * arrays. Since we are only worrying about signed 32-bit values, we're in
 * slightly better shape. Unfortunately, we really can't do our favorite binary
 * & in this system. It really seems to do the wrong thing. For example:
 *
 * > -32 & 0xff
 * 224
 *
 * What's happening above is really: 0xe0 & 0xff = 0xe0. However, the results of
 * this aren't treated as a signed number. Ultimately a bad thing.
 *
 * What we're going to want to do is basically create the unsigned equivalent of
 * our representation and pass that off to the wuint* functions. To do that
 * we're going to do the following:
 *
 *  - if the value is positive
 *      we can pass it directly off to the equivalent wuint
 *  - if the value is negative
 *      we do the following computation:
 *         mb + val + 1, where
 *         mb   is the maximum unsigned value in that byte size
 *         val  is the Javascript negative integer
 *
 *
 * As a concrete value, take -128. In signed 16 bits this would be 0xff80. If
 * you do out the computations:
 *
 * 0xffff - 128 + 1
 * 0xffff - 127
 * 0xff80
 *
 * You can then encode this value as the signed version. This is really rather
 * hacky, but it should work and get the job done which is our goal here.
 */
                    /*
 * A series of checks to make sure we actually have a signed 32-bit number
 */
                    function verifsint(value, max, min) {
                        assert.ok("number" == typeof value, "cannot write a non-number as a number"), assert.ok(max >= value, "value larger than maximum allowed value"), 
                        assert.ok(value >= min, "value smaller than minimum allowed value"), assert.ok(Math.floor(value) === value, "value has a fractional component");
                    }
                    function verifIEEE754(value, max, min) {
                        assert.ok("number" == typeof value, "cannot write a non-number as a number"), assert.ok(max >= value, "value larger than maximum allowed value"), 
                        assert.ok(value >= min, "value smaller than minimum allowed value");
                    }
                    function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
                        noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 1 < buffer.length, "Trying to write beyond buffer length"), 
                        verifsint(value, 32767, -32768)), value >= 0 ? writeUInt16(buffer, value, offset, isBigEndian, noAssert) : writeUInt16(buffer, 65535 + value + 1, offset, isBigEndian, noAssert);
                    }
                    function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
                        noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 3 < buffer.length, "Trying to write beyond buffer length"), 
                        verifsint(value, 2147483647, -2147483648)), value >= 0 ? writeUInt32(buffer, value, offset, isBigEndian, noAssert) : writeUInt32(buffer, 4294967295 + value + 1, offset, isBigEndian, noAssert);
                    }
                    function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
                        noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 3 < buffer.length, "Trying to write beyond buffer length"), 
                        verifIEEE754(value, 3.4028234663852886e38, -3.4028234663852886e38)), require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 23, 4);
                    }
                    function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
                        noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok("boolean" == typeof isBigEndian, "missing or invalid endian"), 
                        assert.ok(void 0 !== offset && null !== offset, "missing offset"), assert.ok(offset + 7 < buffer.length, "Trying to write beyond buffer length"), 
                        verifIEEE754(value, 1.7976931348623157e308, -1.7976931348623157e308)), require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 52, 8);
                    }
                    var assert;
                    exports.Buffer = Buffer, exports.SlowBuffer = Buffer, Buffer.poolSize = 8192, exports.INSPECT_MAX_BYTES = 50, 
                    Buffer.prototype.get = function(i) {
                        if (0 > i || i >= this.length) throw new Error("oob");
                        return this[i];
                    }, Buffer.prototype.set = function(i, v) {
                        if (0 > i || i >= this.length) throw new Error("oob");
                        return this[i] = v;
                    }, Buffer.byteLength = function(str, encoding) {
                        switch (encoding || "utf8") {
                          case "hex":
                            return str.length / 2;

                          case "utf8":
                          case "utf-8":
                            return utf8ToBytes(str).length;

                          case "ascii":
                          case "binary":
                            return str.length;

                          case "base64":
                            return base64ToBytes(str).length;

                          default:
                            throw new Error("Unknown encoding");
                        }
                    }, Buffer.prototype.utf8Write = function(string, offset, length) {
                        return Buffer._charsWritten = blitBuffer(utf8ToBytes(string), this, offset, length);
                    }, Buffer.prototype.asciiWrite = function(string, offset, length) {
                        return Buffer._charsWritten = blitBuffer(asciiToBytes(string), this, offset, length);
                    }, Buffer.prototype.binaryWrite = Buffer.prototype.asciiWrite, Buffer.prototype.base64Write = function(string, offset, length) {
                        return Buffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
                    }, Buffer.prototype.base64Slice = function() {
                        var bytes = Array.prototype.slice.apply(this, arguments);
                        return require("base64-js").fromByteArray(bytes);
                    }, Buffer.prototype.utf8Slice = function() {
                        for (var bytes = Array.prototype.slice.apply(this, arguments), res = "", tmp = "", i = 0; i < bytes.length; ) bytes[i] <= 127 ? (res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]), 
                        tmp = "") : tmp += "%" + bytes[i].toString(16), i++;
                        return res + decodeUtf8Char(tmp);
                    }, Buffer.prototype.asciiSlice = function() {
                        for (var bytes = Array.prototype.slice.apply(this, arguments), ret = "", i = 0; i < bytes.length; i++) ret += String.fromCharCode(bytes[i]);
                        return ret;
                    }, Buffer.prototype.binarySlice = Buffer.prototype.asciiSlice, Buffer.prototype.inspect = function() {
                        for (var out = [], len = this.length, i = 0; len > i; i++) if (out[i] = toHex(this[i]), 
                        i == exports.INSPECT_MAX_BYTES) {
                            out[i + 1] = "...";
                            break;
                        }
                        return "<Buffer " + out.join(" ") + ">";
                    }, Buffer.prototype.hexSlice = function(start, end) {
                        var len = this.length;
                        (!start || 0 > start) && (start = 0), (!end || 0 > end || end > len) && (end = len);
                        for (var out = "", i = start; end > i; i++) out += toHex(this[i]);
                        return out;
                    }, Buffer.prototype.toString = function(encoding, start, end) {
                        // Fastpath empty strings
                        if (encoding = String(encoding || "utf8").toLowerCase(), start = +start || 0, "undefined" == typeof end && (end = this.length), 
                        +end == start) return "";
                        switch (encoding) {
                          case "hex":
                            return this.hexSlice(start, end);

                          case "utf8":
                          case "utf-8":
                            return this.utf8Slice(start, end);

                          case "ascii":
                            return this.asciiSlice(start, end);

                          case "binary":
                            return this.binarySlice(start, end);

                          case "base64":
                            return this.base64Slice(start, end);

                          case "ucs2":
                          case "ucs-2":
                            return this.ucs2Slice(start, end);

                          default:
                            throw new Error("Unknown encoding");
                        }
                    }, Buffer.prototype.hexWrite = function(string, offset, length) {
                        offset = +offset || 0;
                        var remaining = this.length - offset;
                        length ? (length = +length, length > remaining && (length = remaining)) : length = remaining;
                        // must be an even number of digits
                        var strLen = string.length;
                        if (strLen % 2) throw new Error("Invalid hex string");
                        length > strLen / 2 && (length = strLen / 2);
                        for (var i = 0; length > i; i++) {
                            var byte = parseInt(string.substr(2 * i, 2), 16);
                            if (isNaN(byte)) throw new Error("Invalid hex string");
                            this[offset + i] = byte;
                        }
                        return Buffer._charsWritten = 2 * i, i;
                    }, Buffer.prototype.write = function(string, offset, length, encoding) {
                        // Support both (string, offset, length, encoding)
                        // and the legacy (string, encoding, offset, length)
                        if (isFinite(offset)) isFinite(length) || (encoding = length, length = void 0); else {
                            // legacy
                            var swap = encoding;
                            encoding = offset, offset = length, length = swap;
                        }
                        offset = +offset || 0;
                        var remaining = this.length - offset;
                        switch (length ? (length = +length, length > remaining && (length = remaining)) : length = remaining, 
                        encoding = String(encoding || "utf8").toLowerCase()) {
                          case "hex":
                            return this.hexWrite(string, offset, length);

                          case "utf8":
                          case "utf-8":
                            return this.utf8Write(string, offset, length);

                          case "ascii":
                            return this.asciiWrite(string, offset, length);

                          case "binary":
                            return this.binaryWrite(string, offset, length);

                          case "base64":
                            return this.base64Write(string, offset, length);

                          case "ucs2":
                          case "ucs-2":
                            return this.ucs2Write(string, offset, length);

                          default:
                            throw new Error("Unknown encoding");
                        }
                    }, Buffer.prototype.slice = function(start, end) {
                        var len = this.length;
                        return start = clamp(start, len, 0), end = clamp(end, len, len), new Buffer(this, end - start, +start);
                    }, // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
                    Buffer.prototype.copy = function(target, target_start, start, end) {
                        var source = this;
                        if (start || (start = 0), (void 0 === end || isNaN(end)) && (end = this.length), 
                        target_start || (target_start = 0), start > end) throw new Error("sourceEnd < sourceStart");
                        // Copy 0 bytes; we're done
                        if (end === start) return 0;
                        if (0 == target.length || 0 == source.length) return 0;
                        if (0 > target_start || target_start >= target.length) throw new Error("targetStart out of bounds");
                        if (0 > start || start >= source.length) throw new Error("sourceStart out of bounds");
                        if (0 > end || end > source.length) throw new Error("sourceEnd out of bounds");
                        // Are we oob?
                        end > this.length && (end = this.length), target.length - target_start < end - start && (end = target.length - target_start + start);
                        for (var temp = [], i = start; end > i; i++) assert.ok("undefined" != typeof this[i], "copying undefined buffer bytes!"), 
                        temp.push(this[i]);
                        for (var i = target_start; i < target_start + temp.length; i++) target[i] = temp[i - target_start];
                    }, // fill(value, start=0, end=buffer.length)
                    Buffer.prototype.fill = function(value, start, end) {
                        if (value || (value = 0), start || (start = 0), end || (end = this.length), "string" == typeof value && (value = value.charCodeAt(0)), 
                        "number" != typeof value || isNaN(value)) throw new Error("value is not a number");
                        if (start > end) throw new Error("end < start");
                        // Fill 0 bytes; we're done
                        if (end === start) return 0;
                        if (0 == this.length) return 0;
                        if (0 > start || start >= this.length) throw new Error("start out of bounds");
                        if (0 > end || end > this.length) throw new Error("end out of bounds");
                        for (var i = start; end > i; i++) this[i] = value;
                    }, // Static methods
                    Buffer.isBuffer = function(b) {
                        return b instanceof Buffer || b instanceof Buffer;
                    }, Buffer.concat = function(list, totalLength) {
                        if (!isArray(list)) throw new Error("Usage: Buffer.concat(list, [totalLength])\n       list should be an Array.");
                        if (0 === list.length) return new Buffer(0);
                        if (1 === list.length) return list[0];
                        if ("number" != typeof totalLength) {
                            totalLength = 0;
                            for (var i = 0; i < list.length; i++) {
                                var buf = list[i];
                                totalLength += buf.length;
                            }
                        }
                        for (var buffer = new Buffer(totalLength), pos = 0, i = 0; i < list.length; i++) {
                            var buf = list[i];
                            buf.copy(buffer, pos), pos += buf.length;
                        }
                        return buffer;
                    }, Buffer.isEncoding = function(encoding) {
                        switch ((encoding + "").toLowerCase()) {
                          case "hex":
                          case "utf8":
                          case "utf-8":
                          case "ascii":
                          case "binary":
                          case "base64":
                          case "ucs2":
                          case "ucs-2":
                          case "utf16le":
                          case "utf-16le":
                          case "raw":
                            return !0;

                          default:
                            return !1;
                        }
                    }, // read/write bit-twiddling
                    Buffer.prototype.readUInt8 = function(offset, noAssert) {
                        var buffer = this;
                        return noAssert || (assert.ok(void 0 !== offset && null !== offset, "missing offset"), 
                        assert.ok(offset < buffer.length, "Trying to read beyond buffer length")), offset >= buffer.length ? void 0 : buffer[offset];
                    }, Buffer.prototype.readUInt16LE = function(offset, noAssert) {
                        return readUInt16(this, offset, !1, noAssert);
                    }, Buffer.prototype.readUInt16BE = function(offset, noAssert) {
                        return readUInt16(this, offset, !0, noAssert);
                    }, Buffer.prototype.readUInt32LE = function(offset, noAssert) {
                        return readUInt32(this, offset, !1, noAssert);
                    }, Buffer.prototype.readUInt32BE = function(offset, noAssert) {
                        return readUInt32(this, offset, !0, noAssert);
                    }, /*
 * Signed integer types, yay team! A reminder on how two's complement actually
 * works. The first bit is the signed bit, i.e. tells us whether or not the
 * number should be positive or negative. If the two's complement value is
 * positive, then we're done, as it's equivalent to the unsigned representation.
 *
 * Now if the number is positive, you're pretty much done, you can just leverage
 * the unsigned translations and return those. Unfortunately, negative numbers
 * aren't quite that straightforward.
 *
 * At first glance, one might be inclined to use the traditional formula to
 * translate binary numbers between the positive and negative values in two's
 * complement. (Though it doesn't quite work for the most negative value)
 * Mainly:
 *  - invert all the bits
 *  - add one to the result
 *
 * Of course, this doesn't quite work in Javascript. Take for example the value
 * of -128. This could be represented in 16 bits (big-endian) as 0xff80. But of
 * course, Javascript will do the following:
 *
 * > ~0xff80
 * -65409
 *
 * Whoh there, Javascript, that's not quite right. But wait, according to
 * Javascript that's perfectly correct. When Javascript ends up seeing the
 * constant 0xff80, it has no notion that it is actually a signed number. It
 * assumes that we've input the unsigned value 0xff80. Thus, when it does the
 * binary negation, it casts it into a signed value, (positive 0xff80). Then
 * when you perform binary negation on that, it turns it into a negative number.
 *
 * Instead, we're going to have to use the following general formula, that works
 * in a rather Javascript friendly way. I'm glad we don't support this kind of
 * weird numbering scheme in the kernel.
 *
 * (BIT-MAX - (unsigned)val + 1) * -1
 *
 * The astute observer, may think that this doesn't make sense for 8-bit numbers
 * (really it isn't necessary for them). However, when you get 16-bit numbers,
 * you do. Let's go back to our prior example and see how this will look:
 *
 * (0xffff - 0xff80 + 1) * -1
 * (0x007f + 1) * -1
 * (0x0080) * -1
 */
                    Buffer.prototype.readInt8 = function(offset, noAssert) {
                        var neg, buffer = this;
                        return noAssert || (assert.ok(void 0 !== offset && null !== offset, "missing offset"), 
                        assert.ok(offset < buffer.length, "Trying to read beyond buffer length")), offset >= buffer.length ? void 0 : (neg = 128 & buffer[offset], 
                        neg ? -1 * (255 - buffer[offset] + 1) : buffer[offset]);
                    }, Buffer.prototype.readInt16LE = function(offset, noAssert) {
                        return readInt16(this, offset, !1, noAssert);
                    }, Buffer.prototype.readInt16BE = function(offset, noAssert) {
                        return readInt16(this, offset, !0, noAssert);
                    }, Buffer.prototype.readInt32LE = function(offset, noAssert) {
                        return readInt32(this, offset, !1, noAssert);
                    }, Buffer.prototype.readInt32BE = function(offset, noAssert) {
                        return readInt32(this, offset, !0, noAssert);
                    }, Buffer.prototype.readFloatLE = function(offset, noAssert) {
                        return readFloat(this, offset, !1, noAssert);
                    }, Buffer.prototype.readFloatBE = function(offset, noAssert) {
                        return readFloat(this, offset, !0, noAssert);
                    }, Buffer.prototype.readDoubleLE = function(offset, noAssert) {
                        return readDouble(this, offset, !1, noAssert);
                    }, Buffer.prototype.readDoubleBE = function(offset, noAssert) {
                        return readDouble(this, offset, !0, noAssert);
                    }, Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
                        var buffer = this;
                        noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok(void 0 !== offset && null !== offset, "missing offset"), 
                        assert.ok(offset < buffer.length, "trying to write beyond buffer length"), verifuint(value, 255)), 
                        offset < buffer.length && (buffer[offset] = value);
                    }, Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
                        writeUInt16(this, value, offset, !1, noAssert);
                    }, Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
                        writeUInt16(this, value, offset, !0, noAssert);
                    }, Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
                        writeUInt32(this, value, offset, !1, noAssert);
                    }, Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
                        writeUInt32(this, value, offset, !0, noAssert);
                    }, Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
                        var buffer = this;
                        noAssert || (assert.ok(void 0 !== value && null !== value, "missing value"), assert.ok(void 0 !== offset && null !== offset, "missing offset"), 
                        assert.ok(offset < buffer.length, "Trying to write beyond buffer length"), verifsint(value, 127, -128)), 
                        value >= 0 ? buffer.writeUInt8(value, offset, noAssert) : buffer.writeUInt8(255 + value + 1, offset, noAssert);
                    }, Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
                        writeInt16(this, value, offset, !1, noAssert);
                    }, Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
                        writeInt16(this, value, offset, !0, noAssert);
                    }, Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
                        writeInt32(this, value, offset, !1, noAssert);
                    }, Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
                        writeInt32(this, value, offset, !0, noAssert);
                    }, Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
                        writeFloat(this, value, offset, !1, noAssert);
                    }, Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
                        writeFloat(this, value, offset, !0, noAssert);
                    }, Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
                        writeDouble(this, value, offset, !1, noAssert);
                    }, Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
                        writeDouble(this, value, offset, !0, noAssert);
                    };
                }, {
                    "./buffer_ieee754": 1,
                    assert: 6,
                    "base64-js": 4
                } ],
                "buffer-browserify": [ function(require, module) {
                    module.exports = require("q9TxCC");
                }, {} ],
                4: [ function(require, module) {
                    !function() {
                        "use strict";
                        function b64ToByteArray(b64) {
                            var i, j, l, tmp, placeHolders, arr;
                            if (b64.length % 4 > 0) throw "Invalid string. Length must be a multiple of 4";
                            for (// the number of equal signs (place holders)
                            // if there are two placeholders, than the two characters before it
                            // represent one byte
                            // if there is only one, then the three characters before it represent 2 bytes
                            // this is just a cheap hack to not do indexOf twice
                            placeHolders = b64.indexOf("="), placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0, 
                            // base64 is 4/3 + up to two characters of the original data
                            arr = [], //new Uint8Array(b64.length * 3 / 4 - placeHolders);
                            // if there are placeholders, only get up to the last complete 4 chars
                            l = placeHolders > 0 ? b64.length - 4 : b64.length, i = 0, j = 0; l > i; i += 4, 
                            j += 3) tmp = lookup.indexOf(b64[i]) << 18 | lookup.indexOf(b64[i + 1]) << 12 | lookup.indexOf(b64[i + 2]) << 6 | lookup.indexOf(b64[i + 3]), 
                            arr.push((16711680 & tmp) >> 16), arr.push((65280 & tmp) >> 8), arr.push(255 & tmp);
                            return 2 === placeHolders ? (tmp = lookup.indexOf(b64[i]) << 2 | lookup.indexOf(b64[i + 1]) >> 4, 
                            arr.push(255 & tmp)) : 1 === placeHolders && (tmp = lookup.indexOf(b64[i]) << 10 | lookup.indexOf(b64[i + 1]) << 4 | lookup.indexOf(b64[i + 2]) >> 2, 
                            arr.push(255 & tmp >> 8), arr.push(255 & tmp)), arr;
                        }
                        function uint8ToBase64(uint8) {
                            function tripletToBase64(num) {
                                return lookup[63 & num >> 18] + lookup[63 & num >> 12] + lookup[63 & num >> 6] + lookup[63 & num];
                            }
                            var i, temp, length, extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
                            output = "";
                            // go through the array every three bytes, we'll deal with trailing stuff later
                            for (i = 0, length = uint8.length - extraBytes; length > i; i += 3) temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], 
                            output += tripletToBase64(temp);
                            // pad the end with zeros, but make sure to not forget the extra bytes
                            switch (extraBytes) {
                              case 1:
                                temp = uint8[uint8.length - 1], output += lookup[temp >> 2], output += lookup[63 & temp << 4], 
                                output += "==";
                                break;

                              case 2:
                                temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1], output += lookup[temp >> 10], 
                                output += lookup[63 & temp >> 4], output += lookup[63 & temp << 2], output += "=";
                            }
                            return output;
                        }
                        var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                        module.exports.toByteArray = b64ToByteArray, module.exports.fromByteArray = uint8ToBase64;
                    }();
                }, {} ],
                5: [ function(require, module, exports) {
                    // Array.isArray is supported in IE9
                    function isArray(xs) {
                        return "[object Array]" === toString.call(xs);
                    }
                    // Object.create is supported in IE9
                    function create(prototype, properties) {
                        var object;
                        if (null === prototype) object = {
                            __proto__: null
                        }; else {
                            if ("object" != typeof prototype) throw new TypeError("typeof prototype[" + typeof prototype + "] != 'object'");
                            var Type = function() {};
                            Type.prototype = prototype, object = new Type(), object.__proto__ = prototype;
                        }
                        return "undefined" != typeof properties && Object.defineProperties && Object.defineProperties(object, properties), 
                        object;
                    }
                    // Object.keys and Object.getOwnPropertyNames is supported in IE9 however
                    // they do show a description and number property on Error objects
                    function notObject(object) {
                        return "object" != typeof object && "function" != typeof object || null === object;
                    }
                    function keysShim(object) {
                        if (notObject(object)) throw new TypeError("Object.keys called on a non-object");
                        var result = [];
                        for (var name in object) hasOwnProperty.call(object, name) && result.push(name);
                        return result;
                    }
                    // getOwnPropertyNames is almost the same as Object.keys one key feature
                    //  is that it returns hidden properties, since that can't be implemented,
                    //  this feature gets reduced so it just shows the length property on arrays
                    function propertyShim(object) {
                        if (notObject(object)) throw new TypeError("Object.getOwnPropertyNames called on a non-object");
                        var result = keysShim(object);
                        return exports.isArray(object) && -1 === exports.indexOf(object, "length") && result.push("length"), 
                        result;
                    }
                    // Object.getOwnPropertyDescriptor - supported in IE8 but only on dom elements
                    function valueObject(value, key) {
                        return {
                            value: value[key]
                        };
                    }
                    //
                    // The shims in this file are not fully implemented shims for the ES5
                    // features, but do work for the particular usecases there is in
                    // the other modules.
                    //
                    var toString = Object.prototype.toString, hasOwnProperty = Object.prototype.hasOwnProperty;
                    exports.isArray = "function" == typeof Array.isArray ? Array.isArray : isArray, 
                    // Array.prototype.indexOf is supported in IE9
                    exports.indexOf = function(xs, x) {
                        if (xs.indexOf) return xs.indexOf(x);
                        for (var i = 0; i < xs.length; i++) if (x === xs[i]) return i;
                        return -1;
                    }, // Array.prototype.filter is supported in IE9
                    exports.filter = function(xs, fn) {
                        if (xs.filter) return xs.filter(fn);
                        for (var res = [], i = 0; i < xs.length; i++) fn(xs[i], i, xs) && res.push(xs[i]);
                        return res;
                    }, // Array.prototype.forEach is supported in IE9
                    exports.forEach = function(xs, fn, self) {
                        if (xs.forEach) return xs.forEach(fn, self);
                        for (var i = 0; i < xs.length; i++) fn.call(self, xs[i], i, xs);
                    }, // Array.prototype.map is supported in IE9
                    exports.map = function(xs, fn) {
                        if (xs.map) return xs.map(fn);
                        for (var out = new Array(xs.length), i = 0; i < xs.length; i++) out[i] = fn(xs[i], i, xs);
                        return out;
                    }, // Array.prototype.reduce is supported in IE9
                    exports.reduce = function(array, callback, opt_initialValue) {
                        if (array.reduce) return array.reduce(callback, opt_initialValue);
                        var value, isValueSet = !1;
                        2 < arguments.length && (value = opt_initialValue, isValueSet = !0);
                        for (var i = 0, l = array.length; l > i; ++i) array.hasOwnProperty(i) && (isValueSet ? value = callback(value, array[i], i, array) : (value = array[i], 
                        isValueSet = !0));
                        return value;
                    }, // String.prototype.substr - negative index don't work in IE8
                    exports.substr = "b" !== "ab".substr(-1) ? function(str, start, length) {
                        // call the original function
                        // did we get a negative start, calculate how much it is from the beginning of the string
                        return 0 > start && (start = str.length + start), str.substr(start, length);
                    } : function(str, start, length) {
                        return str.substr(start, length);
                    }, // String.prototype.trim is supported in IE9
                    exports.trim = function(str) {
                        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
                    }, // Function.prototype.bind is supported in IE9
                    exports.bind = function() {
                        var args = Array.prototype.slice.call(arguments), fn = args.shift();
                        if (fn.bind) return fn.bind.apply(fn, args);
                        var self = args.shift();
                        return function() {
                            fn.apply(self, args.concat([ Array.prototype.slice.call(arguments) ]));
                        };
                    }, exports.create = "function" == typeof Object.create ? Object.create : create;
                    var keys = "function" == typeof Object.keys ? Object.keys : keysShim, getOwnPropertyNames = "function" == typeof Object.getOwnPropertyNames ? Object.getOwnPropertyNames : propertyShim;
                    if (new Error().hasOwnProperty("description")) {
                        var ERROR_PROPERTY_FILTER = function(obj, array) {
                            return "[object Error]" === toString.call(obj) && (array = exports.filter(array, function(name) {
                                return "description" !== name && "number" !== name && "message" !== name;
                            })), array;
                        };
                        exports.keys = function(object) {
                            return ERROR_PROPERTY_FILTER(object, keys(object));
                        }, exports.getOwnPropertyNames = function(object) {
                            return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
                        };
                    } else exports.keys = keys, exports.getOwnPropertyNames = getOwnPropertyNames;
                    if ("function" == typeof Object.getOwnPropertyDescriptor) try {
                        Object.getOwnPropertyDescriptor({
                            a: 1
                        }, "a"), exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
                    } catch (e) {
                        // IE8 dom element issue - use a try catch and default to valueObject
                        exports.getOwnPropertyDescriptor = function(value, key) {
                            try {
                                return Object.getOwnPropertyDescriptor(value, key);
                            } catch (e) {
                                return valueObject(value, key);
                            }
                        };
                    } else exports.getOwnPropertyDescriptor = valueObject;
                }, {} ],
                6: [ function(require, module) {
                    function replacer(key, value) {
                        return util.isUndefined(value) ? "" + value : !util.isNumber(value) || !isNaN(value) && isFinite(value) ? util.isFunction(value) || util.isRegExp(value) ? value.toString() : value : value.toString();
                    }
                    function truncate(s, n) {
                        return util.isString(s) ? s.length < n ? s : s.slice(0, n) : s;
                    }
                    function getMessage(self) {
                        return truncate(JSON.stringify(self.actual, replacer), 128) + " " + self.operator + " " + truncate(JSON.stringify(self.expected, replacer), 128);
                    }
                    // At present only the three keys mentioned above are used and
                    // understood by the spec. Implementations or sub modules can pass
                    // other keys to the AssertionError's constructor - they will be
                    // ignored.
                    // 3. All of the following functions must throw an AssertionError
                    // when a corresponding condition is not met, with a message that
                    // may be undefined if not provided.  All assertion methods provide
                    // both the actual and expected values to the assertion error for
                    // display purposes.
                    function fail(actual, expected, message, operator, stackStartFunction) {
                        throw new assert.AssertionError({
                            message: message,
                            actual: actual,
                            expected: expected,
                            operator: operator,
                            stackStartFunction: stackStartFunction
                        });
                    }
                    // 4. Pure assertion tests whether a value is truthy, as determined
                    // by !!guard.
                    // assert.ok(guard, message_opt);
                    // This statement is equivalent to assert.equal(true, !!guard,
                    // message_opt);. To test strictly for the value true, use
                    // assert.strictEqual(true, guard, message_opt);.
                    function ok(value, message) {
                        value || fail(value, !0, message, "==", assert.ok);
                    }
                    function _deepEqual(actual, expected) {
                        // 7.1. All identical values are equivalent, as determined by ===.
                        if (actual === expected) return !0;
                        if (util.isBuffer(actual) && util.isBuffer(expected)) {
                            if (actual.length != expected.length) return !1;
                            for (var i = 0; i < actual.length; i++) if (actual[i] !== expected[i]) return !1;
                            return !0;
                        }
                        return util.isDate(actual) && util.isDate(expected) ? actual.getTime() === expected.getTime() : util.isRegExp(actual) && util.isRegExp(expected) ? actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase : util.isObject(actual) || util.isObject(expected) ? objEquiv(actual, expected) : actual == expected;
                    }
                    function isArguments(object) {
                        return "[object Arguments]" == Object.prototype.toString.call(object);
                    }
                    function objEquiv(a, b) {
                        if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b)) return !1;
                        // an identical 'prototype' property.
                        if (a.prototype !== b.prototype) return !1;
                        //~~~I've managed to break Object.keys through screwy arguments passing.
                        //   Converting to array solves the problem.
                        if (isArguments(a)) return isArguments(b) ? (a = pSlice.call(a), b = pSlice.call(b), 
                        _deepEqual(a, b)) : !1;
                        try {
                            var key, i, ka = shims.keys(a), kb = shims.keys(b);
                        } catch (e) {
                            //happens when one is a string literal and the other isn't
                            return !1;
                        }
                        // having the same number of owned properties (keys incorporates
                        // hasOwnProperty)
                        if (ka.length != kb.length) return !1;
                        //~~~cheap key test
                        for (//the same set of keys (although not necessarily the same order),
                        ka.sort(), kb.sort(), i = ka.length - 1; i >= 0; i--) if (ka[i] != kb[i]) return !1;
                        //equivalent values for every corresponding key, and
                        //~~~possibly expensive deep test
                        for (i = ka.length - 1; i >= 0; i--) if (key = ka[i], !_deepEqual(a[key], b[key])) return !1;
                        return !0;
                    }
                    function expectedException(actual, expected) {
                        return actual && expected ? "[object RegExp]" == Object.prototype.toString.call(expected) ? expected.test(actual) : actual instanceof expected ? !0 : expected.call({}, actual) === !0 ? !0 : !1 : !1;
                    }
                    function _throws(shouldThrow, block, expected, message) {
                        var actual;
                        util.isString(expected) && (message = expected, expected = null);
                        try {
                            block();
                        } catch (e) {
                            actual = e;
                        }
                        if (message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : "."), 
                        shouldThrow && !actual && fail(actual, expected, "Missing expected exception" + message), 
                        !shouldThrow && expectedException(actual, expected) && fail(actual, expected, "Got unwanted exception" + message), 
                        shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) throw actual;
                    }
                    // Copyright Joyent, Inc. and other Node contributors.
                    //
                    // Permission is hereby granted, free of charge, to any person obtaining a
                    // copy of this software and associated documentation files (the
                    // "Software"), to deal in the Software without restriction, including
                    // without limitation the rights to use, copy, modify, merge, publish,
                    // distribute, sublicense, and/or sell copies of the Software, and to permit
                    // persons to whom the Software is furnished to do so, subject to the
                    // following conditions:
                    //
                    // The above copyright notice and this permission notice shall be included
                    // in all copies or substantial portions of the Software.
                    //
                    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                    // USE OR OTHER DEALINGS IN THE SOFTWARE.
                    // UTILITY
                    var util = require("util"), shims = require("_shims"), pSlice = Array.prototype.slice, assert = module.exports = ok;
                    // 2. The AssertionError is defined in assert.
                    // new assert.AssertionError({ message: message,
                    //                             actual: actual,
                    //                             expected: expected })
                    assert.AssertionError = function(options) {
                        this.name = "AssertionError", this.actual = options.actual, this.expected = options.expected, 
                        this.operator = options.operator, this.message = options.message || getMessage(this);
                    }, // assert.AssertionError instanceof Error
                    util.inherits(assert.AssertionError, Error), // EXTENSION! allows for well behaved errors defined elsewhere.
                    assert.fail = fail, assert.ok = ok, // 5. The equality assertion tests shallow, coercive equality with
                    // ==.
                    // assert.equal(actual, expected, message_opt);
                    assert.equal = function(actual, expected, message) {
                        actual != expected && fail(actual, expected, message, "==", assert.equal);
                    }, // 6. The non-equality assertion tests for whether two objects are not equal
                    // with != assert.notEqual(actual, expected, message_opt);
                    assert.notEqual = function(actual, expected, message) {
                        actual == expected && fail(actual, expected, message, "!=", assert.notEqual);
                    }, // 7. The equivalence assertion tests a deep equality relation.
                    // assert.deepEqual(actual, expected, message_opt);
                    assert.deepEqual = function(actual, expected, message) {
                        _deepEqual(actual, expected) || fail(actual, expected, message, "deepEqual", assert.deepEqual);
                    }, // 8. The non-equivalence assertion tests for any deep inequality.
                    // assert.notDeepEqual(actual, expected, message_opt);
                    assert.notDeepEqual = function(actual, expected, message) {
                        _deepEqual(actual, expected) && fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
                    }, // 9. The strict equality assertion tests strict equality, as determined by ===.
                    // assert.strictEqual(actual, expected, message_opt);
                    assert.strictEqual = function(actual, expected, message) {
                        actual !== expected && fail(actual, expected, message, "===", assert.strictEqual);
                    }, // 10. The strict non-equality assertion tests for strict inequality, as
                    // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
                    assert.notStrictEqual = function(actual, expected, message) {
                        actual === expected && fail(actual, expected, message, "!==", assert.notStrictEqual);
                    }, // 11. Expected to throw an error:
                    // assert.throws(block, Error_opt, message_opt);
                    assert.throws = function() {
                        _throws.apply(this, [ !0 ].concat(pSlice.call(arguments)));
                    }, // EXTENSION! This is annoying to write outside this module.
                    assert.doesNotThrow = function() {
                        _throws.apply(this, [ !1 ].concat(pSlice.call(arguments)));
                    }, assert.ifError = function(err) {
                        if (err) throw err;
                    };
                }, {
                    _shims: 5,
                    util: 7
                } ],
                7: [ function(require, module, exports) {
                    /**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
                    /* legacy: obj, showHidden, depth, colors*/
                    function inspect(obj, opts) {
                        // default options
                        var ctx = {
                            seen: [],
                            stylize: stylizeNoColor
                        };
                        // legacy...
                        return arguments.length >= 3 && (ctx.depth = arguments[2]), arguments.length >= 4 && (ctx.colors = arguments[3]), 
                        isBoolean(opts) ? // legacy...
                        ctx.showHidden = opts : opts && // got an "options" object
                        exports._extend(ctx, opts), // set default options
                        isUndefined(ctx.showHidden) && (ctx.showHidden = !1), isUndefined(ctx.depth) && (ctx.depth = 2), 
                        isUndefined(ctx.colors) && (ctx.colors = !1), isUndefined(ctx.customInspect) && (ctx.customInspect = !0), 
                        ctx.colors && (ctx.stylize = stylizeWithColor), formatValue(ctx, obj, ctx.depth);
                    }
                    function stylizeWithColor(str, styleType) {
                        var style = inspect.styles[styleType];
                        return style ? "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m" : str;
                    }
                    function stylizeNoColor(str) {
                        return str;
                    }
                    function arrayToHash(array) {
                        var hash = {};
                        return shims.forEach(array, function(val) {
                            hash[val] = !0;
                        }), hash;
                    }
                    function formatValue(ctx, value, recurseTimes) {
                        // Provide a hook for user-specified inspect functions.
                        // Check that value is an object with an inspect function on it
                        if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
                        value.inspect !== exports.inspect && (!value.constructor || value.constructor.prototype !== value)) {
                            var ret = value.inspect(recurseTimes);
                            return isString(ret) || (ret = formatValue(ctx, ret, recurseTimes)), ret;
                        }
                        // Primitive types cannot have properties
                        var primitive = formatPrimitive(ctx, value);
                        if (primitive) return primitive;
                        // Look up the keys of the object.
                        var keys = shims.keys(value), visibleKeys = arrayToHash(keys);
                        // Some type of object without properties can be shortcutted.
                        if (ctx.showHidden && (keys = shims.getOwnPropertyNames(value)), 0 === keys.length) {
                            if (isFunction(value)) {
                                var name = value.name ? ": " + value.name : "";
                                return ctx.stylize("[Function" + name + "]", "special");
                            }
                            if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                            if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
                            if (isError(value)) return formatError(value);
                        }
                        var base = "", array = !1, braces = [ "{", "}" ];
                        // Make functions say that they are functions
                        if (// Make Array say that they are Array
                        isArray(value) && (array = !0, braces = [ "[", "]" ]), isFunction(value)) {
                            var n = value.name ? ": " + value.name : "";
                            base = " [Function" + n + "]";
                        }
                        if (// Make RegExps say that they are RegExps
                        isRegExp(value) && (base = " " + RegExp.prototype.toString.call(value)), // Make dates with properties first say the date
                        isDate(value) && (base = " " + Date.prototype.toUTCString.call(value)), // Make error with message first say the error
                        isError(value) && (base = " " + formatError(value)), 0 === keys.length && (!array || 0 == value.length)) return braces[0] + base + braces[1];
                        if (0 > recurseTimes) return isRegExp(value) ? ctx.stylize(RegExp.prototype.toString.call(value), "regexp") : ctx.stylize("[Object]", "special");
                        ctx.seen.push(value);
                        var output;
                        return output = array ? formatArray(ctx, value, recurseTimes, visibleKeys, keys) : keys.map(function(key) {
                            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                        }), ctx.seen.pop(), reduceToSingleString(output, base, braces);
                    }
                    function formatPrimitive(ctx, value) {
                        if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
                        if (isString(value)) {
                            var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                            return ctx.stylize(simple, "string");
                        }
                        return isNumber(value) ? ctx.stylize("" + value, "number") : isBoolean(value) ? ctx.stylize("" + value, "boolean") : // For some reason typeof null is "object", so special case here.
                        isNull(value) ? ctx.stylize("null", "null") : void 0;
                    }
                    function formatError(value) {
                        return "[" + Error.prototype.toString.call(value) + "]";
                    }
                    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                        for (var output = [], i = 0, l = value.length; l > i; ++i) hasOwnProperty(value, String(i)) ? output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), !0)) : output.push("");
                        return shims.forEach(keys, function(key) {
                            key.match(/^\d+$/) || output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, !0));
                        }), output;
                    }
                    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                        var name, str, desc;
                        if (desc = shims.getOwnPropertyDescriptor(value, key) || {
                            value: value[key]
                        }, desc.get ? str = desc.set ? ctx.stylize("[Getter/Setter]", "special") : ctx.stylize("[Getter]", "special") : desc.set && (str = ctx.stylize("[Setter]", "special")), 
                        hasOwnProperty(visibleKeys, key) || (name = "[" + key + "]"), str || (shims.indexOf(ctx.seen, desc.value) < 0 ? (str = isNull(recurseTimes) ? formatValue(ctx, desc.value, null) : formatValue(ctx, desc.value, recurseTimes - 1), 
                        str.indexOf("\n") > -1 && (str = array ? str.split("\n").map(function(line) {
                            return "  " + line;
                        }).join("\n").substr(2) : "\n" + str.split("\n").map(function(line) {
                            return "   " + line;
                        }).join("\n"))) : str = ctx.stylize("[Circular]", "special")), isUndefined(name)) {
                            if (array && key.match(/^\d+$/)) return str;
                            name = JSON.stringify("" + key), name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (name = name.substr(1, name.length - 2), 
                            name = ctx.stylize(name, "name")) : (name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), 
                            name = ctx.stylize(name, "string"));
                        }
                        return name + ": " + str;
                    }
                    function reduceToSingleString(output, base, braces) {
                        var numLinesEst = 0, length = shims.reduce(output, function(prev, cur) {
                            return numLinesEst++, cur.indexOf("\n") >= 0 && numLinesEst++, prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
                        }, 0);
                        return length > 60 ? braces[0] + ("" === base ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1] : braces[0] + base + " " + output.join(", ") + " " + braces[1];
                    }
                    // NOTE: These type checking functions intentionally don't use `instanceof`
                    // because it is fragile and can be easily faked with `Object.create()`.
                    function isArray(ar) {
                        return shims.isArray(ar);
                    }
                    function isBoolean(arg) {
                        return "boolean" == typeof arg;
                    }
                    function isNull(arg) {
                        return null === arg;
                    }
                    function isNullOrUndefined(arg) {
                        return null == arg;
                    }
                    function isNumber(arg) {
                        return "number" == typeof arg;
                    }
                    function isString(arg) {
                        return "string" == typeof arg;
                    }
                    function isSymbol(arg) {
                        return "symbol" == typeof arg;
                    }
                    function isUndefined(arg) {
                        return void 0 === arg;
                    }
                    function isRegExp(re) {
                        return isObject(re) && "[object RegExp]" === objectToString(re);
                    }
                    function isObject(arg) {
                        return "object" == typeof arg && arg;
                    }
                    function isDate(d) {
                        return isObject(d) && "[object Date]" === objectToString(d);
                    }
                    function isError(e) {
                        return isObject(e) && "[object Error]" === objectToString(e);
                    }
                    function isFunction(arg) {
                        return "function" == typeof arg;
                    }
                    function isPrimitive(arg) {
                        return null === arg || "boolean" == typeof arg || "number" == typeof arg || "string" == typeof arg || "symbol" == typeof arg || // ES6 symbol
                        "undefined" == typeof arg;
                    }
                    function isBuffer(arg) {
                        return arg instanceof Buffer;
                    }
                    function objectToString(o) {
                        return Object.prototype.toString.call(o);
                    }
                    function pad(n) {
                        return 10 > n ? "0" + n.toString(10) : n.toString(10);
                    }
                    // 26 Feb 16:19:34
                    function timestamp() {
                        var d = new Date(), time = [ pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()) ].join(":");
                        return [ d.getDate(), months[d.getMonth()], time ].join(" ");
                    }
                    function hasOwnProperty(obj, prop) {
                        return Object.prototype.hasOwnProperty.call(obj, prop);
                    }
                    // Copyright Joyent, Inc. and other Node contributors.
                    //
                    // Permission is hereby granted, free of charge, to any person obtaining a
                    // copy of this software and associated documentation files (the
                    // "Software"), to deal in the Software without restriction, including
                    // without limitation the rights to use, copy, modify, merge, publish,
                    // distribute, sublicense, and/or sell copies of the Software, and to permit
                    // persons to whom the Software is furnished to do so, subject to the
                    // following conditions:
                    //
                    // The above copyright notice and this permission notice shall be included
                    // in all copies or substantial portions of the Software.
                    //
                    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                    // USE OR OTHER DEALINGS IN THE SOFTWARE.
                    var shims = require("_shims"), formatRegExp = /%[sdj%]/g;
                    exports.format = function(f) {
                        if (!isString(f)) {
                            for (var objects = [], i = 0; i < arguments.length; i++) objects.push(inspect(arguments[i]));
                            return objects.join(" ");
                        }
                        for (var i = 1, args = arguments, len = args.length, str = String(f).replace(formatRegExp, function(x) {
                            if ("%%" === x) return "%";
                            if (i >= len) return x;
                            switch (x) {
                              case "%s":
                                return String(args[i++]);

                              case "%d":
                                return Number(args[i++]);

                              case "%j":
                                try {
                                    return JSON.stringify(args[i++]);
                                } catch (_) {
                                    return "[Circular]";
                                }

                              default:
                                return x;
                            }
                        }), x = args[i]; len > i; x = args[++i]) str += isNull(x) || !isObject(x) ? " " + x : " " + inspect(x);
                        return str;
                    }, exports.inspect = inspect, // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
                    inspect.colors = {
                        bold: [ 1, 22 ],
                        italic: [ 3, 23 ],
                        underline: [ 4, 24 ],
                        inverse: [ 7, 27 ],
                        white: [ 37, 39 ],
                        grey: [ 90, 39 ],
                        black: [ 30, 39 ],
                        blue: [ 34, 39 ],
                        cyan: [ 36, 39 ],
                        green: [ 32, 39 ],
                        magenta: [ 35, 39 ],
                        red: [ 31, 39 ],
                        yellow: [ 33, 39 ]
                    }, // Don't use 'blue' not visible on cmd.exe
                    inspect.styles = {
                        special: "cyan",
                        number: "yellow",
                        "boolean": "yellow",
                        undefined: "grey",
                        "null": "bold",
                        string: "green",
                        date: "magenta",
                        // "name": intentionally not styling
                        regexp: "red"
                    }, exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, 
                    exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, 
                    exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, 
                    exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, 
                    exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = isBuffer;
                    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
                    // log is just a thin wrapper to console.log that prepends a timestamp
                    exports.log = function() {
                        console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
                    }, /**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
                    exports.inherits = function(ctor, superCtor) {
                        ctor.super_ = superCtor, ctor.prototype = shims.create(superCtor.prototype, {
                            constructor: {
                                value: ctor,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        });
                    }, exports._extend = function(origin, add) {
                        // Don't do anything if add isn't an object
                        if (!add || !isObject(add)) return origin;
                        for (var keys = shims.keys(add), i = keys.length; i--; ) origin[keys[i]] = add[keys[i]];
                        return origin;
                    };
                }, {
                    _shims: 5
                } ]
            }, {}, []), module.exports = require("buffer-browserify");
        }, {} ],
        5: [ function(require, module) {
            // shim for using process in browser
            var process = module.exports = {};
            process.nextTick = function() {
                var canSetImmediate = "undefined" != typeof window && window.setImmediate, canPost = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (canSetImmediate) return function(f) {
                    return window.setImmediate(f);
                };
                if (canPost) {
                    var queue = [];
                    return window.addEventListener("message", function(ev) {
                        if (ev.source === window && "process-tick" === ev.data && (ev.stopPropagation(), 
                        queue.length > 0)) {
                            var fn = queue.shift();
                            fn();
                        }
                    }, !0), function(fn) {
                        queue.push(fn), window.postMessage("process-tick", "*");
                    };
                }
                return function(fn) {
                    setTimeout(fn, 0);
                };
            }(), process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
            process.binding = function() {
                throw new Error("process.binding is not supported");
            }, // TODO(shtylman)
            process.cwd = function() {
                return "/";
            }, process.chdir = function() {
                throw new Error("process.chdir is not supported");
            };
        }, {} ],
        6: [ function(require, module, exports) {
            /*
  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
            /*jslint bitwise:true plusplus:true */
            /*global esprima:true, define:true, exports:true, window: true,
throwError: true, generateStatement: true, peek: true,
parseAssignmentExpression: true, parseBlock: true,
parseClassExpression: true, parseClassDeclaration: true, parseExpression: true,
parseForStatement: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseFunctionSourceElements: true, parseVariableIdentifier: true,
parseImportSpecifier: true,
parseLeftHandSideExpression: true, parseParams: true, validateParam: true,
parseSpreadOrAssignmentExpression: true,
parseStatement: true, parseSourceElement: true, parseModuleBlock: true, parseConciseBody: true,
advanceXJSChild: true, isXJSIdentifierStart: true, isXJSIdentifierPart: true,
scanXJSStringLiteral: true, scanXJSIdentifier: true,
parseXJSAttributeValue: true, parseXJSChild: true, parseXJSElement: true, parseXJSExpressionContainer: true, parseXJSEmptyExpression: true,
parseYieldExpression: true
*/
            !function(root, factory) {
                "use strict";
                // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
                // Rhino, and plain browser loading.
                "function" == typeof define && define.amd ? define([ "exports" ], factory) : "undefined" != typeof exports ? factory(exports) : factory(root.esprima = {});
            }(this, function(exports) {
                "use strict";
                // Ensure the condition is true, otherwise throw an error.
                // This is only to have a better contract semantic, i.e. another safety net
                // to catch a logic error. The condition shall be fulfilled in normal case.
                // Do NOT use this to enforce a certain condition on any user input.
                function assert(condition, message) {
                    if (!condition) throw new Error("ASSERT: " + message);
                }
                function isDecimalDigit(ch) {
                    return ch >= 48 && 57 >= ch;
                }
                function isHexDigit(ch) {
                    return "0123456789abcdefABCDEF".indexOf(ch) >= 0;
                }
                function isOctalDigit(ch) {
                    return "01234567".indexOf(ch) >= 0;
                }
                // 7.2 White Space
                function isWhiteSpace(ch) {
                    return 32 === ch || // space
                    9 === ch || // tab
                    11 === ch || 12 === ch || 160 === ch || ch >= 5760 && " ᠎             　﻿".indexOf(String.fromCharCode(ch)) > 0;
                }
                // 7.3 Line Terminators
                function isLineTerminator(ch) {
                    return 10 === ch || 13 === ch || 8232 === ch || 8233 === ch;
                }
                // 7.6 Identifier Names and Identifiers
                function isIdentifierStart(ch) {
                    return 36 === ch || 95 === ch || // $ (dollar) and _ (underscore)
                    ch >= 65 && 90 >= ch || // A..Z
                    ch >= 97 && 122 >= ch || // a..z
                    92 === ch || // \ (backslash)
                    ch >= 128 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
                }
                function isIdentifierPart(ch) {
                    return 36 === ch || 95 === ch || // $ (dollar) and _ (underscore)
                    ch >= 65 && 90 >= ch || // A..Z
                    ch >= 97 && 122 >= ch || // a..z
                    ch >= 48 && 57 >= ch || // 0..9
                    92 === ch || // \ (backslash)
                    ch >= 128 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
                }
                // 7.6.1.2 Future Reserved Words
                function isFutureReservedWord(id) {
                    switch (id) {
                      case "class":
                      case "enum":
                      case "export":
                      case "extends":
                      case "import":
                      case "super":
                        return !0;

                      default:
                        return !1;
                    }
                }
                function isStrictModeReservedWord(id) {
                    switch (id) {
                      case "implements":
                      case "interface":
                      case "package":
                      case "private":
                      case "protected":
                      case "public":
                      case "static":
                      case "yield":
                      case "let":
                        return !0;

                      default:
                        return !1;
                    }
                }
                function isRestrictedWord(id) {
                    return "eval" === id || "arguments" === id;
                }
                // 7.6.1.1 Keywords
                function isKeyword(id) {
                    if (strict && isStrictModeReservedWord(id)) return !0;
                    // 'const' is specialized as Keyword in V8.
                    // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
                    // Some others are from future reserved words.
                    switch (id.length) {
                      case 2:
                        return "if" === id || "in" === id || "do" === id;

                      case 3:
                        return "var" === id || "for" === id || "new" === id || "try" === id || "let" === id;

                      case 4:
                        return "this" === id || "else" === id || "case" === id || "void" === id || "with" === id || "enum" === id;

                      case 5:
                        return "while" === id || "break" === id || "catch" === id || "throw" === id || "const" === id || "yield" === id || "class" === id || "super" === id;

                      case 6:
                        return "return" === id || "typeof" === id || "delete" === id || "switch" === id || "export" === id || "import" === id;

                      case 7:
                        return "default" === id || "finally" === id || "extends" === id;

                      case 8:
                        return "function" === id || "continue" === id || "debugger" === id;

                      case 10:
                        return "instanceof" === id;

                      default:
                        return !1;
                    }
                }
                // 7.4 Comments
                function skipComment() {
                    var ch, blockComment, lineComment;
                    for (blockComment = !1, lineComment = !1; length > index; ) if (ch = source.charCodeAt(index), 
                    lineComment) ++index, isLineTerminator(ch) && (lineComment = !1, 13 === ch && 10 === source.charCodeAt(index) && ++index, 
                    ++lineNumber, lineStart = index); else if (blockComment) isLineTerminator(ch) ? (13 === ch && 10 === source.charCodeAt(index + 1) && ++index, 
                    ++lineNumber, ++index, lineStart = index, index >= length && throwError({}, Messages.UnexpectedToken, "ILLEGAL")) : (ch = source.charCodeAt(index++), 
                    index >= length && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), // Block comment ends with '*/' (char #42, char #47).
                    42 === ch && (ch = source.charCodeAt(index), 47 === ch && (++index, blockComment = !1))); else if (47 === ch) // Line comment starts with '//' (char #47, char #47).
                    if (ch = source.charCodeAt(index + 1), 47 === ch) index += 2, lineComment = !0; else {
                        if (42 !== ch) break;
                        // Block comment starts with '/*' (char #47, char #42).
                        index += 2, blockComment = !0, index >= length && throwError({}, Messages.UnexpectedToken, "ILLEGAL");
                    } else if (isWhiteSpace(ch)) ++index; else {
                        if (!isLineTerminator(ch)) break;
                        ++index, 13 === ch && 10 === source.charCodeAt(index) && ++index, ++lineNumber, 
                        lineStart = index;
                    }
                }
                function scanHexEscape(prefix) {
                    var i, len, ch, code = 0;
                    for (len = "u" === prefix ? 4 : 2, i = 0; len > i; ++i) {
                        if (!(length > index && isHexDigit(source[index]))) return "";
                        ch = source[index++], code = 16 * code + "0123456789abcdef".indexOf(ch.toLowerCase());
                    }
                    return String.fromCharCode(code);
                }
                function scanUnicodeCodePointEscape() {
                    var ch, code, cu1, cu2;
                    for (ch = source[index], code = 0, // At least, one hex digit is required.
                    "}" === ch && throwError({}, Messages.UnexpectedToken, "ILLEGAL"); length > index && (ch = source[index++], 
                    isHexDigit(ch)); ) code = 16 * code + "0123456789abcdef".indexOf(ch.toLowerCase());
                    // UTF-16 Encoding
                    return (code > 1114111 || "}" !== ch) && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    65535 >= code ? String.fromCharCode(code) : (cu1 = (code - 65536 >> 10) + 55296, 
                    cu2 = (1023 & code - 65536) + 56320, String.fromCharCode(cu1, cu2));
                }
                function getEscapedIdentifier() {
                    var ch, id;
                    for (ch = source.charCodeAt(index++), id = String.fromCharCode(ch), // '\u' (char #92, char #117) denotes an escaped character.
                    92 === ch && (117 !== source.charCodeAt(index) && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    ++index, ch = scanHexEscape("u"), ch && "\\" !== ch && isIdentifierStart(ch.charCodeAt(0)) || throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    id = ch); length > index && (ch = source.charCodeAt(index), isIdentifierPart(ch)); ) ++index, 
                    id += String.fromCharCode(ch), // '\u' (char #92, char #117) denotes an escaped character.
                    92 === ch && (id = id.substr(0, id.length - 1), 117 !== source.charCodeAt(index) && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    ++index, ch = scanHexEscape("u"), ch && "\\" !== ch && isIdentifierPart(ch.charCodeAt(0)) || throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    id += ch);
                    return id;
                }
                function getIdentifier() {
                    var start, ch;
                    for (start = index++; length > index; ) {
                        if (ch = source.charCodeAt(index), 92 === ch) // Blackslash (char #92) marks Unicode escape sequence.
                        return index = start, getEscapedIdentifier();
                        if (!isIdentifierPart(ch)) break;
                        ++index;
                    }
                    return source.slice(start, index);
                }
                function scanIdentifier() {
                    var start, id, type;
                    return start = index, // Backslash (char #92) starts an escaped character.
                    id = 92 === source.charCodeAt(index) ? getEscapedIdentifier() : getIdentifier(), 
                    // There is no keyword or literal with only one character.
                    // Thus, it must be an identifier.
                    type = 1 === id.length ? Token.Identifier : isKeyword(id) ? Token.Keyword : "null" === id ? Token.NullLiteral : "true" === id || "false" === id ? Token.BooleanLiteral : Token.Identifier, 
                    {
                        type: type,
                        value: id,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    };
                }
                // 7.7 Punctuators
                function scanPunctuator() {
                    var code2, ch2, ch3, ch4, start = index, code = source.charCodeAt(index), ch1 = source[index];
                    switch (code) {
                      // Check for most common single-character punctuators.
                        case 40:
                      // ( open bracket
                        case 41:
                      // ) close bracket
                        case 59:
                      // ; semicolon
                        case 44:
                      // , comma
                        case 123:
                      // { open curly brace
                        case 125:
                      // } close curly brace
                        case 91:
                      // [
                        case 93:
                      // ]
                        case 58:
                      // :
                        case 63:
                      // ?
                        case 126:
                        // ~
                        return ++index, extra.tokenize && (40 === code ? extra.openParenToken = extra.tokens.length : 123 === code && (extra.openCurlyToken = extra.tokens.length)), 
                        {
                            type: Token.Punctuator,
                            value: String.fromCharCode(code),
                            lineNumber: lineNumber,
                            lineStart: lineStart,
                            range: [ start, index ]
                        };

                      default:
                        // '=' (char #61) marks an assignment or comparison operator.
                        if (code2 = source.charCodeAt(index + 1), 61 === code2) switch (code) {
                          case 37:
                          // %
                            case 38:
                          // &
                            case 42:
                          // *:
                            case 43:
                          // +
                            case 45:
                          // -
                            case 47:
                          // /
                            case 60:
                          // <
                            case 62:
                          // >
                            case 94:
                          // ^
                            case 124:
                            // |
                            return index += 2, {
                                type: Token.Punctuator,
                                value: String.fromCharCode(code) + String.fromCharCode(code2),
                                lineNumber: lineNumber,
                                lineStart: lineStart,
                                range: [ start, index ]
                            };

                          case 33:
                          // !
                            case 61:
                            // =
                            return index += 2, // !== and ===
                            61 === source.charCodeAt(index) && ++index, {
                                type: Token.Punctuator,
                                value: source.slice(start, index),
                                lineNumber: lineNumber,
                                lineStart: lineStart,
                                range: [ start, index ]
                            };
                        }
                    }
                    // 4-character punctuator: >>>=
                    // Peek more characters.
                    return ch2 = source[index + 1], ch3 = source[index + 2], ch4 = source[index + 3], 
                    ">" === ch1 && ">" === ch2 && ">" === ch3 && "=" === ch4 ? (index += 4, {
                        type: Token.Punctuator,
                        value: ">>>=",
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : // 3-character punctuators: === !== >>> <<= >>=
                    ">" === ch1 && ">" === ch2 && ">" === ch3 ? (index += 3, {
                        type: Token.Punctuator,
                        value: ">>>",
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : "<" === ch1 && "<" === ch2 && "=" === ch3 ? (index += 3, {
                        type: Token.Punctuator,
                        value: "<<=",
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : ">" === ch1 && ">" === ch2 && "=" === ch3 ? (index += 3, {
                        type: Token.Punctuator,
                        value: ">>=",
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : "." === ch1 && "." === ch2 && "." === ch3 ? (index += 3, {
                        type: Token.Punctuator,
                        value: "...",
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : // Other 2-character punctuators: ++ -- << >> && ||
                    ch1 === ch2 && "+-<>&|".indexOf(ch1) >= 0 ? (index += 2, {
                        type: Token.Punctuator,
                        value: ch1 + ch2,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : "=" === ch1 && ">" === ch2 ? (index += 2, {
                        type: Token.Punctuator,
                        value: "=>",
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : "<>=!+-*%&|^/".indexOf(ch1) >= 0 ? (++index, {
                        type: Token.Punctuator,
                        value: ch1,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : "." === ch1 ? (++index, {
                        type: Token.Punctuator,
                        value: ch1,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    }) : (throwError({}, Messages.UnexpectedToken, "ILLEGAL"), void 0);
                }
                // 7.8.3 Numeric Literals
                function scanHexLiteral(start) {
                    for (var number = ""; length > index && isHexDigit(source[index]); ) number += source[index++];
                    return 0 === number.length && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    isIdentifierStart(source.charCodeAt(index)) && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    {
                        type: Token.NumericLiteral,
                        value: parseInt("0x" + number, 16),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    };
                }
                function scanOctalLiteral(prefix, start) {
                    var number, octal;
                    for (isOctalDigit(prefix) ? (octal = !0, number = "0" + source[index++]) : (octal = !1, 
                    ++index, number = ""); length > index && isOctalDigit(source[index]); ) number += source[index++];
                    return octal || 0 !== number.length || // only 0o or 0O
                    throwError({}, Messages.UnexpectedToken, "ILLEGAL"), (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    {
                        type: Token.NumericLiteral,
                        value: parseInt(number, 8),
                        octal: octal,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    };
                }
                function scanNumericLiteral() {
                    var number, start, ch;
                    if (ch = source[index], assert(isDecimalDigit(ch.charCodeAt(0)) || "." === ch, "Numeric literal must start with a decimal digit or a decimal point"), 
                    start = index, number = "", "." !== ch) {
                        // Hex number starts with '0x'.
                        // Octal number starts with '0'.
                        // Octal number in ES6 starts with '0o'.
                        // Binary number in ES6 starts with '0b'.
                        if (number = source[index++], ch = source[index], "0" === number) {
                            if ("x" === ch || "X" === ch) return ++index, scanHexLiteral(start);
                            if ("b" === ch || "B" === ch) {
                                for (++index, number = ""; length > index && (ch = source[index], "0" === ch || "1" === ch); ) number += source[index++];
                                return 0 === number.length && // only 0b or 0B
                                throwError({}, Messages.UnexpectedToken, "ILLEGAL"), length > index && (ch = source.charCodeAt(index), 
                                (isIdentifierStart(ch) || isDecimalDigit(ch)) && throwError({}, Messages.UnexpectedToken, "ILLEGAL")), 
                                {
                                    type: Token.NumericLiteral,
                                    value: parseInt(number, 2),
                                    lineNumber: lineNumber,
                                    lineStart: lineStart,
                                    range: [ start, index ]
                                };
                            }
                            if ("o" === ch || "O" === ch || isOctalDigit(ch)) return scanOctalLiteral(ch, start);
                            // decimal number starts with '0' such as '09' is illegal.
                            ch && isDecimalDigit(ch.charCodeAt(0)) && throwError({}, Messages.UnexpectedToken, "ILLEGAL");
                        }
                        for (;isDecimalDigit(source.charCodeAt(index)); ) number += source[index++];
                        ch = source[index];
                    }
                    if ("." === ch) {
                        for (number += source[index++]; isDecimalDigit(source.charCodeAt(index)); ) number += source[index++];
                        ch = source[index];
                    }
                    if ("e" === ch || "E" === ch) if (number += source[index++], ch = source[index], 
                    ("+" === ch || "-" === ch) && (number += source[index++]), isDecimalDigit(source.charCodeAt(index))) for (;isDecimalDigit(source.charCodeAt(index)); ) number += source[index++]; else throwError({}, Messages.UnexpectedToken, "ILLEGAL");
                    return isIdentifierStart(source.charCodeAt(index)) && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    {
                        type: Token.NumericLiteral,
                        value: parseFloat(number),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    };
                }
                // 7.8.4 String Literals
                function scanStringLiteral() {
                    var quote, start, ch, code, unescaped, restore, str = "", octal = !1;
                    for (quote = source[index], assert("'" === quote || '"' === quote, "String literal must starts with a quote"), 
                    start = index, ++index; length > index; ) {
                        if (ch = source[index++], ch === quote) {
                            quote = "";
                            break;
                        }
                        if ("\\" === ch) if (ch = source[index++], ch && isLineTerminator(ch.charCodeAt(0))) ++lineNumber, 
                        "\r" === ch && "\n" === source[index] && ++index; else switch (ch) {
                          case "n":
                            str += "\n";
                            break;

                          case "r":
                            str += "\r";
                            break;

                          case "t":
                            str += "	";
                            break;

                          case "u":
                          case "x":
                            "{" === source[index] ? (++index, str += scanUnicodeCodePointEscape()) : (restore = index, 
                            unescaped = scanHexEscape(ch), unescaped ? str += unescaped : (index = restore, 
                            str += ch));
                            break;

                          case "b":
                            str += "\b";
                            break;

                          case "f":
                            str += "\f";
                            break;

                          case "v":
                            str += "";
                            break;

                          default:
                            isOctalDigit(ch) ? (code = "01234567".indexOf(ch), // \0 is not octal escape sequence
                            0 !== code && (octal = !0), length > index && isOctalDigit(source[index]) && (octal = !0, 
                            code = 8 * code + "01234567".indexOf(source[index++]), // 3 digits are only allowed when string starts
                            // with 0, 1, 2, 3
                            "0123".indexOf(ch) >= 0 && length > index && isOctalDigit(source[index]) && (code = 8 * code + "01234567".indexOf(source[index++]))), 
                            str += String.fromCharCode(code)) : str += ch;
                        } else {
                            if (isLineTerminator(ch.charCodeAt(0))) break;
                            str += ch;
                        }
                    }
                    return "" !== quote && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), {
                        type: Token.StringLiteral,
                        value: str,
                        octal: octal,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    };
                }
                function scanTemplate() {
                    var ch, start, terminated, tail, restore, unescaped, code, octal, cooked = "";
                    for (terminated = !1, tail = !1, start = index, ++index; length > index; ) {
                        if (ch = source[index++], "`" === ch) {
                            tail = !0, terminated = !0;
                            break;
                        }
                        if ("$" === ch) {
                            if ("{" === source[index]) {
                                ++index, terminated = !0;
                                break;
                            }
                            cooked += ch;
                        } else if ("\\" === ch) if (ch = source[index++], isLineTerminator(ch.charCodeAt(0))) ++lineNumber, 
                        "\r" === ch && "\n" === source[index] && ++index; else switch (ch) {
                          case "n":
                            cooked += "\n";
                            break;

                          case "r":
                            cooked += "\r";
                            break;

                          case "t":
                            cooked += "	";
                            break;

                          case "u":
                          case "x":
                            "{" === source[index] ? (++index, cooked += scanUnicodeCodePointEscape()) : (restore = index, 
                            unescaped = scanHexEscape(ch), unescaped ? cooked += unescaped : (index = restore, 
                            cooked += ch));
                            break;

                          case "b":
                            cooked += "\b";
                            break;

                          case "f":
                            cooked += "\f";
                            break;

                          case "v":
                            cooked += "";
                            break;

                          default:
                            isOctalDigit(ch) ? (code = "01234567".indexOf(ch), // \0 is not octal escape sequence
                            0 !== code && (octal = !0), length > index && isOctalDigit(source[index]) && (octal = !0, 
                            code = 8 * code + "01234567".indexOf(source[index++]), // 3 digits are only allowed when string starts
                            // with 0, 1, 2, 3
                            "0123".indexOf(ch) >= 0 && length > index && isOctalDigit(source[index]) && (code = 8 * code + "01234567".indexOf(source[index++]))), 
                            cooked += String.fromCharCode(code)) : cooked += ch;
                        } else isLineTerminator(ch.charCodeAt(0)) ? (++lineNumber, "\r" === ch && "\n" === source[index] && ++index, 
                        cooked += "\n") : cooked += ch;
                    }
                    return terminated || throwError({}, Messages.UnexpectedToken, "ILLEGAL"), {
                        type: Token.Template,
                        value: {
                            cooked: cooked,
                            raw: source.slice(start + 1, index - (tail ? 1 : 2))
                        },
                        tail: tail,
                        octal: octal,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    };
                }
                function scanTemplateElement(option) {
                    var startsWith, template;
                    return lookahead = null, skipComment(), startsWith = option.head ? "`" : "}", source[index] !== startsWith && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    template = scanTemplate(), peek(), template;
                }
                function scanRegExp() {
                    var str, ch, start, pattern, flags, value, restore, classMarker = !1, terminated = !1;
                    for (lookahead = null, skipComment(), start = index, ch = source[index], assert("/" === ch, "Regular expression literal must start with a slash"), 
                    str = source[index++]; length > index; ) if (ch = source[index++], str += ch, classMarker) "]" === ch && (classMarker = !1); else if ("\\" === ch) ch = source[index++], 
                    // ECMA-262 7.8.5
                    isLineTerminator(ch.charCodeAt(0)) && throwError({}, Messages.UnterminatedRegExp), 
                    str += ch; else {
                        if ("/" === ch) {
                            terminated = !0;
                            break;
                        }
                        "[" === ch ? classMarker = !0 : isLineTerminator(ch.charCodeAt(0)) && throwError({}, Messages.UnterminatedRegExp);
                    }
                    for (terminated || throwError({}, Messages.UnterminatedRegExp), // Exclude leading and trailing slash.
                    pattern = str.substr(1, str.length - 2), flags = ""; length > index && (ch = source[index], 
                    isIdentifierPart(ch.charCodeAt(0))); ) if (++index, "\\" === ch && length > index) if (ch = source[index], 
                    "u" === ch) if (++index, restore = index, ch = scanHexEscape("u")) for (flags += ch, 
                    str += "\\u"; index > restore; ++restore) str += source[restore]; else index = restore, 
                    flags += "u", str += "\\u"; else str += "\\"; else flags += ch, str += ch;
                    try {
                        value = new RegExp(pattern, flags);
                    } catch (e) {
                        throwError({}, Messages.InvalidRegExp);
                    }
                    return peek(), extra.tokenize ? {
                        type: Token.RegularExpression,
                        value: value,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    } : {
                        literal: str,
                        value: value,
                        range: [ start, index ]
                    };
                }
                function isIdentifierName(token) {
                    return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
                }
                function advanceSlash() {
                    var prevToken, checkToken;
                    if (// Using the following algorithm:
                    // https://github.com/mozilla/sweet.js/wiki/design
                    prevToken = extra.tokens[extra.tokens.length - 1], !prevToken) // Nothing before that: it cannot be a division.
                    return scanRegExp();
                    if ("Punctuator" === prevToken.type) {
                        if (")" === prevToken.value) return checkToken = extra.tokens[extra.openParenToken - 1], 
                        !checkToken || "Keyword" !== checkToken.type || "if" !== checkToken.value && "while" !== checkToken.value && "for" !== checkToken.value && "with" !== checkToken.value ? scanPunctuator() : scanRegExp();
                        if ("}" === prevToken.value) {
                            // Dividing a function by anything makes little sense,
                            // but we have to check for that.
                            if (extra.tokens[extra.openCurlyToken - 3] && "Keyword" === extra.tokens[extra.openCurlyToken - 3].type) {
                                if (// Anonymous function.
                                checkToken = extra.tokens[extra.openCurlyToken - 4], !checkToken) return scanPunctuator();
                            } else {
                                if (!extra.tokens[extra.openCurlyToken - 4] || "Keyword" !== extra.tokens[extra.openCurlyToken - 4].type) return scanPunctuator();
                                if (// Named function.
                                checkToken = extra.tokens[extra.openCurlyToken - 5], !checkToken) return scanRegExp();
                            }
                            // checkToken determines whether the function is
                            // a declaration or an expression.
                            // checkToken determines whether the function is
                            // a declaration or an expression.
                            return FnExprTokens.indexOf(checkToken.value) >= 0 ? scanPunctuator() : scanRegExp();
                        }
                        return scanRegExp();
                    }
                    return "Keyword" === prevToken.type ? scanRegExp() : scanPunctuator();
                }
                function advance() {
                    var ch;
                    return state.inXJSChild ? advanceXJSChild() : (skipComment(), index >= length ? {
                        type: Token.EOF,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ index, index ]
                    } : (ch = source.charCodeAt(index), // Very common: ( and ) and ;
                    40 === ch || 41 === ch || 58 === ch ? scanPunctuator() : // String literal starts with single quote (#39) or double quote (#34).
                    39 === ch || 34 === ch ? state.inXJSTag ? scanXJSStringLiteral() : scanStringLiteral() : state.inXJSTag && isXJSIdentifierStart(ch) ? scanXJSIdentifier() : 96 === ch ? scanTemplate() : isIdentifierStart(ch) ? scanIdentifier() : // Dot (.) char #46 can also start a floating-point number, hence the need
                    // to check the next character.
                    46 === ch ? isDecimalDigit(source.charCodeAt(index + 1)) ? scanNumericLiteral() : scanPunctuator() : isDecimalDigit(ch) ? scanNumericLiteral() : // Slash (/) char #47 can also start a regex.
                    extra.tokenize && 47 === ch ? advanceSlash() : scanPunctuator()));
                }
                function lex() {
                    var token;
                    return token = lookahead, index = token.range[1], lineNumber = token.lineNumber, 
                    lineStart = token.lineStart, lookahead = advance(), index = token.range[1], lineNumber = token.lineNumber, 
                    lineStart = token.lineStart, token;
                }
                function peek() {
                    var pos, line, start;
                    pos = index, line = lineNumber, start = lineStart, lookahead = advance(), index = pos, 
                    lineNumber = line, lineStart = start;
                }
                function lookahead2() {
                    var adv, pos, line, start, result;
                    // If we are collecting the tokens, don't grab the next one yet.
                    return adv = "function" == typeof extra.advance ? extra.advance : advance, pos = index, 
                    line = lineNumber, start = lineStart, // Scan for the next immediate token.
                    null === lookahead && (lookahead = adv()), index = lookahead.range[1], lineNumber = lookahead.lineNumber, 
                    lineStart = lookahead.lineStart, // Grab the token right after.
                    result = adv(), index = pos, lineNumber = line, lineStart = start, result;
                }
                // Return true if there is a line terminator before the next token.
                function peekLineTerminator() {
                    var pos, line, start, found;
                    return pos = index, line = lineNumber, start = lineStart, skipComment(), found = lineNumber !== line, 
                    index = pos, lineNumber = line, lineStart = start, found;
                }
                // Throw an exception
                function throwError(token, messageFormat) {
                    var error, args = Array.prototype.slice.call(arguments, 2), msg = messageFormat.replace(/%(\d)/g, function(whole, index) {
                        return assert(index < args.length, "Message reference must be in range"), args[index];
                    });
                    throw "number" == typeof token.lineNumber ? (error = new Error("Line " + token.lineNumber + ": " + msg), 
                    error.index = token.range[0], error.lineNumber = token.lineNumber, error.column = token.range[0] - lineStart + 1) : (error = new Error("Line " + lineNumber + ": " + msg), 
                    error.index = index, error.lineNumber = lineNumber, error.column = index - lineStart + 1), 
                    error.description = msg, error;
                }
                function throwErrorTolerant() {
                    try {
                        throwError.apply(null, arguments);
                    } catch (e) {
                        if (!extra.errors) throw e;
                        extra.errors.push(e);
                    }
                }
                // Throw an exception because of the token.
                function throwUnexpected(token) {
                    if (token.type === Token.EOF && throwError(token, Messages.UnexpectedEOS), token.type === Token.NumericLiteral && throwError(token, Messages.UnexpectedNumber), 
                    token.type === Token.StringLiteral && throwError(token, Messages.UnexpectedString), 
                    token.type === Token.Identifier && throwError(token, Messages.UnexpectedIdentifier), 
                    token.type === Token.Keyword) {
                        if (isFutureReservedWord(token.value)) throwError(token, Messages.UnexpectedReserved); else if (strict && isStrictModeReservedWord(token.value)) return throwErrorTolerant(token, Messages.StrictReservedWord), 
                        void 0;
                        throwError(token, Messages.UnexpectedToken, token.value);
                    }
                    token.type === Token.Template && throwError(token, Messages.UnexpectedTemplate, token.value.raw), 
                    // BooleanLiteral, NullLiteral, or Punctuator.
                    throwError(token, Messages.UnexpectedToken, token.value);
                }
                // Expect the next token to match the specified punctuator.
                // If not, an exception will be thrown.
                function expect(value) {
                    var token = lex();
                    (token.type !== Token.Punctuator || token.value !== value) && throwUnexpected(token);
                }
                // Expect the next token to match the specified keyword.
                // If not, an exception will be thrown.
                function expectKeyword(keyword) {
                    var token = lex();
                    (token.type !== Token.Keyword || token.value !== keyword) && throwUnexpected(token);
                }
                // Return true if the next token matches the specified punctuator.
                function match(value) {
                    return lookahead.type === Token.Punctuator && lookahead.value === value;
                }
                // Return true if the next token matches the specified keyword
                function matchKeyword(keyword) {
                    return lookahead.type === Token.Keyword && lookahead.value === keyword;
                }
                // Return true if the next token matches the specified contextual keyword
                function matchContextualKeyword(keyword) {
                    return lookahead.type === Token.Identifier && lookahead.value === keyword;
                }
                // Return true if the next token is an assignment operator
                function matchAssign() {
                    var op;
                    return lookahead.type !== Token.Punctuator ? !1 : (op = lookahead.value, "=" === op || "*=" === op || "/=" === op || "%=" === op || "+=" === op || "-=" === op || "<<=" === op || ">>=" === op || ">>>=" === op || "&=" === op || "^=" === op || "|=" === op);
                }
                function consumeSemicolon() {
                    var line;
                    // Catch the very common case first: immediately a semicolon (char #59).
                    // Catch the very common case first: immediately a semicolon (char #59).
                    return 59 === source.charCodeAt(index) ? (lex(), void 0) : (line = lineNumber, skipComment(), 
                    lineNumber === line ? match(";") ? (lex(), void 0) : (lookahead.type === Token.EOF || match("}") || throwUnexpected(lookahead), 
                    void 0) : void 0);
                }
                // Return true if provided expression is LeftHandSideExpression
                function isLeftHandSide(expr) {
                    return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
                }
                function isAssignableLeftHandSide(expr) {
                    return isLeftHandSide(expr) || expr.type === Syntax.ObjectPattern || expr.type === Syntax.ArrayPattern;
                }
                // 11.1.4 Array Initialiser
                function parseArrayInitialiser() {
                    var tmp, elements = [], blocks = [], filter = null, possiblecomprehension = !0;
                    for (expect("["); !match("]"); ) "for" === lookahead.value && lookahead.type === Token.Keyword ? (possiblecomprehension || throwError({}, Messages.ComprehensionError), 
                    matchKeyword("for"), tmp = parseForStatement({
                        ignore_body: !0
                    }), tmp.of = tmp.type === Syntax.ForOfStatement, tmp.type = Syntax.ComprehensionBlock, 
                    tmp.left.kind && // can't be let or const
                    throwError({}, Messages.ComprehensionError), blocks.push(tmp)) : "if" === lookahead.value && lookahead.type === Token.Keyword ? (possiblecomprehension || throwError({}, Messages.ComprehensionError), 
                    expectKeyword("if"), expect("("), filter = parseExpression(), expect(")")) : "," === lookahead.value && lookahead.type === Token.Punctuator ? (possiblecomprehension = !1, 
                    // no longer allowed.
                    lex(), elements.push(null)) : (tmp = parseSpreadOrAssignmentExpression(), elements.push(tmp), 
                    tmp && tmp.type === Syntax.SpreadElement ? match("]") || throwError({}, Messages.ElementAfterSpreadElement) : match("]") || matchKeyword("for") || matchKeyword("if") || (expect(","), 
                    // this lexes.
                    possiblecomprehension = !1));
                    return expect("]"), filter && !blocks.length && throwError({}, Messages.ComprehensionRequiresBlock), 
                    blocks.length ? (1 !== elements.length && throwError({}, Messages.ComprehensionError), 
                    {
                        type: Syntax.ComprehensionExpression,
                        filter: filter,
                        blocks: blocks,
                        body: elements[0]
                    }) : delegate.createArrayExpression(elements);
                }
                // 11.1.5 Object Initialiser
                function parsePropertyFunction(options) {
                    var previousStrict, previousYieldAllowed, params, defaults, body;
                    return previousStrict = strict, previousYieldAllowed = state.yieldAllowed, state.yieldAllowed = options.generator, 
                    params = options.params || [], defaults = options.defaults || [], body = parseConciseBody(), 
                    options.name && strict && isRestrictedWord(params[0].name) && throwErrorTolerant(options.name, Messages.StrictParamName), 
                    state.yieldAllowed && !state.yieldFound && throwErrorTolerant({}, Messages.NoYieldInGenerator), 
                    strict = previousStrict, state.yieldAllowed = previousYieldAllowed, delegate.createFunctionExpression(null, params, defaults, body, options.rest || null, options.generator, body.type !== Syntax.BlockStatement, options.returnTypeAnnotation);
                }
                function parsePropertyMethodFunction(options) {
                    var previousStrict, tmp, method;
                    return previousStrict = strict, strict = !0, tmp = parseParams(), tmp.stricted && throwErrorTolerant(tmp.stricted, tmp.message), 
                    method = parsePropertyFunction({
                        params: tmp.params,
                        defaults: tmp.defaults,
                        rest: tmp.rest,
                        generator: options.generator,
                        returnTypeAnnotation: tmp.returnTypeAnnotation
                    }), strict = previousStrict, method;
                }
                function parseObjectPropertyKey() {
                    var token = lex();
                    // Note: This function is called only from parseObjectProperty(), where
                    // EOF and Punctuator tokens are already filtered out.
                    // Note: This function is called only from parseObjectProperty(), where
                    // EOF and Punctuator tokens are already filtered out.
                    return token.type === Token.StringLiteral || token.type === Token.NumericLiteral ? (strict && token.octal && throwErrorTolerant(token, Messages.StrictOctalLiteral), 
                    delegate.createLiteral(token)) : delegate.createIdentifier(token.value);
                }
                function parseObjectProperty() {
                    var token, key, id, param;
                    return token = lookahead, token.type === Token.Identifier ? (id = parseObjectPropertyKey(), 
                    // Property Assignment: Getter and Setter.
                    "get" !== token.value || match(":") || match("(") ? "set" !== token.value || match(":") || match("(") ? match(":") ? (lex(), 
                    delegate.createProperty("init", id, parseAssignmentExpression(), !1, !1)) : match("(") ? delegate.createProperty("init", id, parsePropertyMethodFunction({
                        generator: !1
                    }), !0, !1) : delegate.createProperty("init", id, id, !1, !0) : (key = parseObjectPropertyKey(), 
                    expect("("), token = lookahead, param = [ parseVariableIdentifier() ], expect(")"), 
                    delegate.createProperty("set", key, parsePropertyFunction({
                        params: param,
                        generator: !1,
                        name: token
                    }), !1, !1)) : (key = parseObjectPropertyKey(), expect("("), expect(")"), delegate.createProperty("get", key, parsePropertyFunction({
                        generator: !1
                    }), !1, !1))) : token.type === Token.EOF || token.type === Token.Punctuator ? (match("*") || throwUnexpected(token), 
                    lex(), id = parseObjectPropertyKey(), match("(") || throwUnexpected(lex()), delegate.createProperty("init", id, parsePropertyMethodFunction({
                        generator: !0
                    }), !0, !1)) : (key = parseObjectPropertyKey(), match(":") ? (lex(), delegate.createProperty("init", key, parseAssignmentExpression(), !1, !1)) : match("(") ? delegate.createProperty("init", key, parsePropertyMethodFunction({
                        generator: !1
                    }), !0, !1) : (throwUnexpected(lex()), void 0));
                }
                function parseObjectInitialiser() {
                    var property, name, key, kind, properties = [], map = {}, toString = String;
                    for (expect("{"); !match("}"); ) property = parseObjectProperty(), name = property.key.type === Syntax.Identifier ? property.key.name : toString(property.key.value), 
                    kind = "init" === property.kind ? PropertyKind.Data : "get" === property.kind ? PropertyKind.Get : PropertyKind.Set, 
                    key = "$" + name, Object.prototype.hasOwnProperty.call(map, key) ? (map[key] === PropertyKind.Data ? strict && kind === PropertyKind.Data ? throwErrorTolerant({}, Messages.StrictDuplicateProperty) : kind !== PropertyKind.Data && throwErrorTolerant({}, Messages.AccessorDataProperty) : kind === PropertyKind.Data ? throwErrorTolerant({}, Messages.AccessorDataProperty) : map[key] & kind && throwErrorTolerant({}, Messages.AccessorGetSet), 
                    map[key] |= kind) : map[key] = kind, properties.push(property), match("}") || expect(",");
                    return expect("}"), delegate.createObjectExpression(properties);
                }
                function parseTemplateElement(option) {
                    var token = scanTemplateElement(option);
                    return strict && token.octal && throwError(token, Messages.StrictOctalLiteral), 
                    delegate.createTemplateElement({
                        raw: token.value.raw,
                        cooked: token.value.cooked
                    }, token.tail);
                }
                function parseTemplateLiteral() {
                    var quasi, quasis, expressions;
                    for (quasi = parseTemplateElement({
                        head: !0
                    }), quasis = [ quasi ], expressions = []; !quasi.tail; ) expressions.push(parseExpression()), 
                    quasi = parseTemplateElement({
                        head: !1
                    }), quasis.push(quasi);
                    return delegate.createTemplateLiteral(quasis, expressions);
                }
                // 11.1.6 The Grouping Operator
                function parseGroupExpression() {
                    var expr;
                    return expect("("), ++state.parenthesizedCount, state.allowArrowFunction = !state.allowArrowFunction, 
                    expr = parseExpression(), state.allowArrowFunction = !1, expr.type !== Syntax.ArrowFunctionExpression && expect(")"), 
                    expr;
                }
                // 11.1 Primary Expressions
                function parsePrimaryExpression() {
                    var type, token;
                    if (token = lookahead, type = lookahead.type, type === Token.Identifier) return lex(), 
                    delegate.createIdentifier(token.value);
                    if (type === Token.StringLiteral || type === Token.NumericLiteral) return strict && lookahead.octal && throwErrorTolerant(lookahead, Messages.StrictOctalLiteral), 
                    delegate.createLiteral(lex());
                    if (type === Token.Keyword) {
                        if (matchKeyword("this")) return lex(), delegate.createThisExpression();
                        if (matchKeyword("function")) return parseFunctionExpression();
                        if (matchKeyword("class")) return parseClassExpression();
                        if (matchKeyword("super")) return lex(), delegate.createIdentifier("super");
                    }
                    return type === Token.BooleanLiteral ? (token = lex(), token.value = "true" === token.value, 
                    delegate.createLiteral(token)) : type === Token.NullLiteral ? (token = lex(), token.value = null, 
                    delegate.createLiteral(token)) : match("[") ? parseArrayInitialiser() : match("{") ? parseObjectInitialiser() : match("(") ? parseGroupExpression() : match("/") || match("/=") ? delegate.createLiteral(scanRegExp()) : type === Token.Template ? parseTemplateLiteral() : match("<") ? parseXJSElement() : throwUnexpected(lex());
                }
                // 11.2 Left-Hand-Side Expressions
                function parseArguments() {
                    var arg, args = [];
                    if (expect("("), !match(")")) for (;length > index && (arg = parseSpreadOrAssignmentExpression(), 
                    args.push(arg), !match(")")); ) arg.type === Syntax.SpreadElement && throwError({}, Messages.ElementAfterSpreadElement), 
                    expect(",");
                    return expect(")"), args;
                }
                function parseSpreadOrAssignmentExpression() {
                    return match("...") ? (lex(), delegate.createSpreadElement(parseAssignmentExpression())) : parseAssignmentExpression();
                }
                function parseNonComputedProperty() {
                    var token = lex();
                    return isIdentifierName(token) || throwUnexpected(token), delegate.createIdentifier(token.value);
                }
                function parseNonComputedMember() {
                    return expect("."), parseNonComputedProperty();
                }
                function parseComputedMember() {
                    var expr;
                    return expect("["), expr = parseExpression(), expect("]"), expr;
                }
                function parseNewExpression() {
                    var callee, args;
                    return expectKeyword("new"), callee = parseLeftHandSideExpression(), args = match("(") ? parseArguments() : [], 
                    delegate.createNewExpression(callee, args);
                }
                function parseLeftHandSideExpressionAllowCall() {
                    var expr, args;
                    for (expr = matchKeyword("new") ? parseNewExpression() : parsePrimaryExpression(); match(".") || match("[") || match("(") || lookahead.type === Token.Template; ) match("(") ? (args = parseArguments(), 
                    expr = delegate.createCallExpression(expr, args)) : expr = match("[") ? delegate.createMemberExpression("[", expr, parseComputedMember()) : match(".") ? delegate.createMemberExpression(".", expr, parseNonComputedMember()) : delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral());
                    return expr;
                }
                function parseLeftHandSideExpression() {
                    var expr;
                    for (expr = matchKeyword("new") ? parseNewExpression() : parsePrimaryExpression(); match(".") || match("[") || lookahead.type === Token.Template; ) expr = match("[") ? delegate.createMemberExpression("[", expr, parseComputedMember()) : match(".") ? delegate.createMemberExpression(".", expr, parseNonComputedMember()) : delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral());
                    return expr;
                }
                // 11.3 Postfix Expressions
                function parsePostfixExpression() {
                    var expr = parseLeftHandSideExpressionAllowCall(), token = lookahead;
                    return lookahead.type !== Token.Punctuator ? expr : (!match("++") && !match("--") || peekLineTerminator() || (// 11.3.1, 11.3.2
                    strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name) && throwErrorTolerant({}, Messages.StrictLHSPostfix), 
                    isLeftHandSide(expr) || throwError({}, Messages.InvalidLHSInAssignment), token = lex(), 
                    expr = delegate.createPostfixExpression(token.value, expr)), expr);
                }
                // 11.4 Unary Operators
                function parseUnaryExpression() {
                    var token, expr;
                    return lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword ? parsePostfixExpression() : match("++") || match("--") ? (token = lex(), 
                    expr = parseUnaryExpression(), // 11.4.4, 11.4.5
                    strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name) && throwErrorTolerant({}, Messages.StrictLHSPrefix), 
                    isLeftHandSide(expr) || throwError({}, Messages.InvalidLHSInAssignment), delegate.createUnaryExpression(token.value, expr)) : match("+") || match("-") || match("~") || match("!") ? (token = lex(), 
                    expr = parseUnaryExpression(), delegate.createUnaryExpression(token.value, expr)) : matchKeyword("delete") || matchKeyword("void") || matchKeyword("typeof") ? (token = lex(), 
                    expr = parseUnaryExpression(), expr = delegate.createUnaryExpression(token.value, expr), 
                    strict && "delete" === expr.operator && expr.argument.type === Syntax.Identifier && throwErrorTolerant({}, Messages.StrictDelete), 
                    expr) : parsePostfixExpression();
                }
                function binaryPrecedence(token, allowIn) {
                    var prec = 0;
                    if (token.type !== Token.Punctuator && token.type !== Token.Keyword) return 0;
                    switch (token.value) {
                      case "||":
                        prec = 1;
                        break;

                      case "&&":
                        prec = 2;
                        break;

                      case "|":
                        prec = 3;
                        break;

                      case "^":
                        prec = 4;
                        break;

                      case "&":
                        prec = 5;
                        break;

                      case "==":
                      case "!=":
                      case "===":
                      case "!==":
                        prec = 6;
                        break;

                      case "<":
                      case ">":
                      case "<=":
                      case ">=":
                      case "instanceof":
                        prec = 7;
                        break;

                      case "in":
                        prec = allowIn ? 7 : 0;
                        break;

                      case "<<":
                      case ">>":
                      case ">>>":
                        prec = 8;
                        break;

                      case "+":
                      case "-":
                        prec = 9;
                        break;

                      case "*":
                      case "/":
                      case "%":
                        prec = 11;
                    }
                    return prec;
                }
                // 11.5 Multiplicative Operators
                // 11.6 Additive Operators
                // 11.7 Bitwise Shift Operators
                // 11.8 Relational Operators
                // 11.9 Equality Operators
                // 11.10 Binary Bitwise Operators
                // 11.11 Binary Logical Operators
                function parseBinaryExpression() {
                    var expr, token, prec, previousAllowIn, stack, right, operator, left, i;
                    if (previousAllowIn = state.allowIn, state.allowIn = !0, expr = parseUnaryExpression(), 
                    token = lookahead, prec = binaryPrecedence(token, previousAllowIn), 0 === prec) return expr;
                    for (token.prec = prec, lex(), stack = [ expr, token, parseUnaryExpression() ]; (prec = binaryPrecedence(lookahead, previousAllowIn)) > 0; ) {
                        // Reduce: make a binary expression from the three topmost entries.
                        for (;stack.length > 2 && prec <= stack[stack.length - 2].prec; ) right = stack.pop(), 
                        operator = stack.pop().value, left = stack.pop(), stack.push(delegate.createBinaryExpression(operator, left, right));
                        // Shift.
                        token = lex(), token.prec = prec, stack.push(token), stack.push(parseUnaryExpression());
                    }
                    for (state.allowIn = previousAllowIn, // Final reduce to clean-up the stack.
                    i = stack.length - 1, expr = stack[i]; i > 1; ) expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr), 
                    i -= 2;
                    return expr;
                }
                // 11.12 Conditional Operator
                function parseConditionalExpression() {
                    var expr, previousAllowIn, consequent, alternate;
                    return expr = parseBinaryExpression(), match("?") && (lex(), previousAllowIn = state.allowIn, 
                    state.allowIn = !0, consequent = parseAssignmentExpression(), state.allowIn = previousAllowIn, 
                    expect(":"), alternate = parseAssignmentExpression(), expr = delegate.createConditionalExpression(expr, consequent, alternate)), 
                    expr;
                }
                // 11.13 Assignment Operators
                function reinterpretAsAssignmentBindingPattern(expr) {
                    var i, len, property, element;
                    if (expr.type === Syntax.ObjectExpression) for (expr.type = Syntax.ObjectPattern, 
                    i = 0, len = expr.properties.length; len > i; i += 1) property = expr.properties[i], 
                    "init" !== property.kind && throwError({}, Messages.InvalidLHSInAssignment), reinterpretAsAssignmentBindingPattern(property.value); else if (expr.type === Syntax.ArrayExpression) for (expr.type = Syntax.ArrayPattern, 
                    i = 0, len = expr.elements.length; len > i; i += 1) element = expr.elements[i], 
                    element && reinterpretAsAssignmentBindingPattern(element); else expr.type === Syntax.Identifier ? isRestrictedWord(expr.name) && throwError({}, Messages.InvalidLHSInAssignment) : expr.type === Syntax.SpreadElement ? (reinterpretAsAssignmentBindingPattern(expr.argument), 
                    expr.argument.type === Syntax.ObjectPattern && throwError({}, Messages.ObjectPatternAsSpread)) : expr.type !== Syntax.MemberExpression && expr.type !== Syntax.CallExpression && expr.type !== Syntax.NewExpression && throwError({}, Messages.InvalidLHSInAssignment);
                }
                function reinterpretAsDestructuredParameter(options, expr) {
                    var i, len, property, element;
                    if (expr.type === Syntax.ObjectExpression) for (expr.type = Syntax.ObjectPattern, 
                    i = 0, len = expr.properties.length; len > i; i += 1) property = expr.properties[i], 
                    "init" !== property.kind && throwError({}, Messages.InvalidLHSInFormalsList), reinterpretAsDestructuredParameter(options, property.value); else if (expr.type === Syntax.ArrayExpression) for (expr.type = Syntax.ArrayPattern, 
                    i = 0, len = expr.elements.length; len > i; i += 1) element = expr.elements[i], 
                    element && reinterpretAsDestructuredParameter(options, element); else expr.type === Syntax.Identifier ? validateParam(options, expr, expr.name) : expr.type !== Syntax.MemberExpression && throwError({}, Messages.InvalidLHSInFormalsList);
                }
                function reinterpretAsCoverFormalsList(expressions) {
                    var i, len, param, params, defaults, defaultCount, options, rest;
                    for (params = [], defaults = [], defaultCount = 0, rest = null, options = {
                        paramSet: {}
                    }, i = 0, len = expressions.length; len > i; i += 1) if (param = expressions[i], 
                    param.type === Syntax.Identifier) params.push(param), defaults.push(null), validateParam(options, param, param.name); else if (param.type === Syntax.ObjectExpression || param.type === Syntax.ArrayExpression) reinterpretAsDestructuredParameter(options, param), 
                    params.push(param), defaults.push(null); else if (param.type === Syntax.SpreadElement) assert(i === len - 1, "It is guaranteed that SpreadElement is last element by parseExpression"), 
                    reinterpretAsDestructuredParameter(options, param.argument), rest = param.argument; else {
                        if (param.type !== Syntax.AssignmentExpression) return null;
                        params.push(param.left), defaults.push(param.right), ++defaultCount;
                    }
                    return options.firstRestricted && throwError(options.firstRestricted, options.message), 
                    options.stricted && throwErrorTolerant(options.stricted, options.message), 0 === defaultCount && (defaults = []), 
                    {
                        params: params,
                        defaults: defaults,
                        rest: rest
                    };
                }
                function parseArrowFunctionExpression(options) {
                    var previousStrict, previousYieldAllowed, body;
                    return expect("=>"), previousStrict = strict, previousYieldAllowed = state.yieldAllowed, 
                    strict = !0, state.yieldAllowed = !1, body = parseConciseBody(), strict = previousStrict, 
                    state.yieldAllowed = previousYieldAllowed, delegate.createArrowFunctionExpression(options.params, options.defaults, body, options.rest, body.type !== Syntax.BlockStatement);
                }
                function parseAssignmentExpression() {
                    var expr, token, params, oldParenthesizedCount;
                    return matchKeyword("yield") ? parseYieldExpression() : (oldParenthesizedCount = state.parenthesizedCount, 
                    match("(") && (token = lookahead2(), token.type === Token.Punctuator && ")" === token.value || "..." === token.value) ? (params = parseParams(), 
                    match("=>") || throwUnexpected(lex()), parseArrowFunctionExpression(params)) : (token = lookahead, 
                    expr = parseConditionalExpression(), !match("=>") || expr.type !== Syntax.Identifier || state.parenthesizedCount !== oldParenthesizedCount && state.parenthesizedCount !== oldParenthesizedCount + 1 ? (matchAssign() && (// 11.13.1
                    strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name) && throwErrorTolerant(token, Messages.StrictLHSAssignment), 
                    // ES.next draf 11.13 Runtime Semantics step 1
                    !match("=") || expr.type !== Syntax.ObjectExpression && expr.type !== Syntax.ArrayExpression ? isLeftHandSide(expr) || throwError({}, Messages.InvalidLHSInAssignment) : reinterpretAsAssignmentBindingPattern(expr), 
                    expr = delegate.createAssignmentExpression(lex().value, expr, parseAssignmentExpression())), 
                    expr) : (isRestrictedWord(expr.name) && throwError({}, Messages.StrictParamName), 
                    parseArrowFunctionExpression({
                        params: [ expr ],
                        defaults: [],
                        rest: null
                    }))));
                }
                // 11.14 Comma Operator
                function parseExpression() {
                    var expr, expressions, sequence, coverFormalsList, spreadFound, token;
                    if (expr = parseAssignmentExpression(), expressions = [ expr ], match(",")) {
                        for (;length > index && match(","); ) if (lex(), expr = parseSpreadOrAssignmentExpression(), 
                        expressions.push(expr), expr.type === Syntax.SpreadElement) {
                            spreadFound = !0, match(")") || throwError({}, Messages.ElementAfterSpreadElement);
                            break;
                        }
                        sequence = delegate.createSequenceExpression(expressions);
                    }
                    if (state.allowArrowFunction && match(")") && (token = lookahead2(), "=>" === token.value)) {
                        if (lex(), state.allowArrowFunction = !1, expr = expressions, coverFormalsList = reinterpretAsCoverFormalsList(expr)) return parseArrowFunctionExpression(coverFormalsList);
                        throwUnexpected(token);
                    }
                    return spreadFound && throwError({}, Messages.IllegalSpread), sequence || expr;
                }
                // 12.1 Block
                function parseStatementList() {
                    for (var statement, list = []; length > index && !match("}") && (statement = parseSourceElement(), 
                    "undefined" != typeof statement); ) list.push(statement);
                    return list;
                }
                function parseBlock() {
                    var block;
                    return expect("{"), block = parseStatementList(), expect("}"), delegate.createBlockStatement(block);
                }
                // 12.2 Variable Statement
                function parseVariableIdentifier() {
                    var token = lex();
                    return token.type !== Token.Identifier && throwUnexpected(token), delegate.createIdentifier(token.value);
                }
                function parseTypeAnnotation() {
                    var type, isNullable = !1, paramTypes = null, returnType = null, templateTypes = null, unionType = null;
                    if (match("?") && (lex(), isNullable = !0), type = parseVariableIdentifier(), match("<")) {
                        for (lex(), templateTypes = []; lookahead.type === Token.Identifier || match("?"); ) templateTypes.push(parseTypeAnnotation()), 
                        match(">") || expect(",");
                        expect(">");
                    }
                    if (match("(")) {
                        for (lex(), paramTypes = []; lookahead.type === Token.Identifier || match("?"); ) paramTypes.push(parseTypeAnnotation()), 
                        match(")") || expect(",");
                        expect(")"), match(":") && (lex(), returnType = parseTypeAnnotation());
                    }
                    return match("|") && (lex(), unionType = parseTypeAnnotation()), delegate.createTypeAnnotation(type, templateTypes, paramTypes, returnType, unionType, isNullable);
                }
                function parseAnnotatableIdentifier() {
                    var annotation, annotationLookahead, annotationPresent, identifier, matchesNullableToken;
                    return matchesNullableToken = match("?"), lookahead.type === Token.Identifier || matchesNullableToken || throwUnexpected(lookahead), 
                    matchesNullableToken || (annotationLookahead = lookahead2()), (annotationPresent = matchesNullableToken || annotationLookahead.type === Token.Identifier || annotationLookahead.type === Token.Punctuator && ("(" === annotationLookahead.value || "<" === annotationLookahead.value || "|" === annotationLookahead.value)) ? (annotation = parseTypeAnnotation(), 
                    identifier = parseVariableIdentifier(), delegate.createTypeAnnotatedIdentifier(annotation, identifier)) : parseVariableIdentifier();
                }
                function parseVariableDeclaration(kind) {
                    var id, init = null;
                    return match("{") ? (id = parseObjectInitialiser(), reinterpretAsAssignmentBindingPattern(id)) : match("[") ? (id = parseArrayInitialiser(), 
                    reinterpretAsAssignmentBindingPattern(id)) : (id = state.allowDefault ? matchKeyword("default") ? parseNonComputedProperty() : parseVariableIdentifier() : parseVariableIdentifier(), 
                    // 12.2.1
                    strict && isRestrictedWord(id.name) && throwErrorTolerant({}, Messages.StrictVarName)), 
                    "const" === kind ? (match("=") || throwError({}, Messages.NoUnintializedConst), 
                    expect("="), init = parseAssignmentExpression()) : match("=") && (lex(), init = parseAssignmentExpression()), 
                    delegate.createVariableDeclarator(id, init);
                }
                function parseVariableDeclarationList(kind) {
                    var list = [];
                    do {
                        if (list.push(parseVariableDeclaration(kind)), !match(",")) break;
                        lex();
                    } while (length > index);
                    return list;
                }
                function parseVariableStatement() {
                    var declarations;
                    return expectKeyword("var"), declarations = parseVariableDeclarationList(), consumeSemicolon(), 
                    delegate.createVariableDeclaration(declarations, "var");
                }
                // kind may be `const` or `let`
                // Both are experimental and not in the specification yet.
                // see http://wiki.ecmascript.org/doku.php?id=harmony:const
                // and http://wiki.ecmascript.org/doku.php?id=harmony:let
                function parseConstLetDeclaration(kind) {
                    var declarations;
                    return expectKeyword(kind), declarations = parseVariableDeclarationList(kind), consumeSemicolon(), 
                    delegate.createVariableDeclaration(declarations, kind);
                }
                // http://wiki.ecmascript.org/doku.php?id=harmony:modules
                function parseModuleDeclaration() {
                    var id, src, body;
                    switch (lex(), // 'module'
                    peekLineTerminator() && throwError({}, Messages.NewlineAfterModule), lookahead.type) {
                      case Token.StringLiteral:
                        id = parsePrimaryExpression(), body = parseModuleBlock(), src = null;
                        break;

                      case Token.Identifier:
                        id = parseVariableIdentifier(), body = null, matchContextualKeyword("from") || throwUnexpected(lex()), 
                        lex(), src = parsePrimaryExpression(), src.type !== Syntax.Literal && throwError({}, Messages.InvalidModuleSpecifier);
                    }
                    return consumeSemicolon(), delegate.createModuleDeclaration(id, src, body);
                }
                function parseExportBatchSpecifier() {
                    return expect("*"), delegate.createExportBatchSpecifier();
                }
                function parseExportSpecifier() {
                    var id, name = null;
                    return id = parseVariableIdentifier(), matchContextualKeyword("as") && (lex(), name = parseNonComputedProperty()), 
                    delegate.createExportSpecifier(id, name);
                }
                function parseExportDeclaration() {
                    var previousAllowDefault, decl, def, src, specifiers;
                    if (expectKeyword("export"), matchKeyword("default")) {
                        if (lex(), match("=")) lex(), def = parseAssignmentExpression(); else if (lookahead.type === Token.Keyword) switch (lookahead.value) {
                          case "let":
                          case "const":
                          case "var":
                          case "class":
                            def = parseSourceElement();
                            break;

                          case "function":
                            def = parseFunctionExpression();
                            break;

                          default:
                            throwUnexpected(lex());
                        } else def = parseAssignmentExpression();
                        return consumeSemicolon(), delegate.createExportDeclaration(!0, def, null, null);
                    }
                    if (lookahead.type === Token.Keyword) {
                        switch (lookahead.value) {
                          case "let":
                          case "const":
                          case "var":
                          case "class":
                          case "function":
                            return previousAllowDefault = state.allowDefault, state.allowDefault = !0, decl = delegate.createExportDeclaration(!1, parseSourceElement(), null, null), 
                            state.allowDefault = previousAllowDefault, decl;
                        }
                        throwUnexpected(lex());
                    }
                    if (specifiers = [], src = null, match("*")) specifiers.push(parseExportBatchSpecifier()); else {
                        expect("{");
                        do specifiers.push(parseExportSpecifier()); while (match(",") && lex());
                        expect("}");
                    }
                    return matchContextualKeyword("from") && (lex(), src = parsePrimaryExpression(), 
                    src.type !== Syntax.Literal && throwError({}, Messages.InvalidModuleSpecifier)), 
                    consumeSemicolon(), delegate.createExportDeclaration(!1, null, specifiers, src);
                }
                function parseImportDeclaration() {
                    var specifiers, kind, src;
                    if (expectKeyword("import"), specifiers = [], isIdentifierName(lookahead)) kind = "default", 
                    specifiers.push(parseImportSpecifier()), matchContextualKeyword("from") || throwError({}, Messages.NoFromAfterImport), 
                    lex(); else if (match("{")) {
                        kind = "named", lex();
                        do specifiers.push(parseImportSpecifier()); while (match(",") && lex());
                        expect("}"), matchContextualKeyword("from") || throwError({}, Messages.NoFromAfterImport), 
                        lex();
                    }
                    return src = parsePrimaryExpression(), src.type !== Syntax.Literal && throwError({}, Messages.InvalidModuleSpecifier), 
                    consumeSemicolon(), delegate.createImportDeclaration(specifiers, kind, src);
                }
                function parseImportSpecifier() {
                    var id, name = null;
                    return id = parseNonComputedProperty(), matchContextualKeyword("as") && (lex(), 
                    name = parseVariableIdentifier()), delegate.createImportSpecifier(id, name);
                }
                // 12.3 Empty Statement
                function parseEmptyStatement() {
                    return expect(";"), delegate.createEmptyStatement();
                }
                // 12.4 Expression Statement
                function parseExpressionStatement() {
                    var expr = parseExpression();
                    return consumeSemicolon(), delegate.createExpressionStatement(expr);
                }
                // 12.5 If statement
                function parseIfStatement() {
                    var test, consequent, alternate;
                    return expectKeyword("if"), expect("("), test = parseExpression(), expect(")"), 
                    consequent = parseStatement(), matchKeyword("else") ? (lex(), alternate = parseStatement()) : alternate = null, 
                    delegate.createIfStatement(test, consequent, alternate);
                }
                // 12.6 Iteration Statements
                function parseDoWhileStatement() {
                    var body, test, oldInIteration;
                    return expectKeyword("do"), oldInIteration = state.inIteration, state.inIteration = !0, 
                    body = parseStatement(), state.inIteration = oldInIteration, expectKeyword("while"), 
                    expect("("), test = parseExpression(), expect(")"), match(";") && lex(), delegate.createDoWhileStatement(body, test);
                }
                function parseWhileStatement() {
                    var test, body, oldInIteration;
                    return expectKeyword("while"), expect("("), test = parseExpression(), expect(")"), 
                    oldInIteration = state.inIteration, state.inIteration = !0, body = parseStatement(), 
                    state.inIteration = oldInIteration, delegate.createWhileStatement(test, body);
                }
                function parseForVariableDeclaration() {
                    var token = lex(), declarations = parseVariableDeclarationList();
                    return delegate.createVariableDeclaration(declarations, token.value);
                }
                function parseForStatement(opts) {
                    var init, test, update, left, right, body, operator, oldInIteration;
                    return init = test = update = null, expectKeyword("for"), // http://wiki.ecmascript.org/doku.php?id=proposals:iterators_and_generators&s=each
                    matchContextualKeyword("each") && throwError({}, Messages.EachNotAllowed), expect("("), 
                    match(";") ? lex() : (matchKeyword("var") || matchKeyword("let") || matchKeyword("const") ? (state.allowIn = !1, 
                    init = parseForVariableDeclaration(), state.allowIn = !0, 1 === init.declarations.length && (matchKeyword("in") || matchContextualKeyword("of")) && (operator = lookahead, 
                    ("in" !== operator.value && "var" === init.kind || !init.declarations[0].init) && (lex(), 
                    left = init, right = parseExpression(), init = null))) : (state.allowIn = !1, init = parseExpression(), 
                    state.allowIn = !0, matchContextualKeyword("of") ? (operator = lex(), left = init, 
                    right = parseExpression(), init = null) : matchKeyword("in") && (// LeftHandSideExpression
                    isAssignableLeftHandSide(init) || throwError({}, Messages.InvalidLHSInForIn), operator = lex(), 
                    left = init, right = parseExpression(), init = null)), "undefined" == typeof left && expect(";")), 
                    "undefined" == typeof left && (match(";") || (test = parseExpression()), expect(";"), 
                    match(")") || (update = parseExpression())), expect(")"), oldInIteration = state.inIteration, 
                    state.inIteration = !0, void 0 !== opts && opts.ignore_body || (body = parseStatement()), 
                    state.inIteration = oldInIteration, "undefined" == typeof left ? delegate.createForStatement(init, test, update, body) : "in" === operator.value ? delegate.createForInStatement(left, right, body) : delegate.createForOfStatement(left, right, body);
                }
                // 12.7 The continue statement
                function parseContinueStatement() {
                    var key, label = null;
                    // Optimize the most common form: 'continue;'.
                    return expectKeyword("continue"), 59 === source.charCodeAt(index) ? (lex(), state.inIteration || throwError({}, Messages.IllegalContinue), 
                    delegate.createContinueStatement(null)) : peekLineTerminator() ? (state.inIteration || throwError({}, Messages.IllegalContinue), 
                    delegate.createContinueStatement(null)) : (lookahead.type === Token.Identifier && (label = parseVariableIdentifier(), 
                    key = "$" + label.name, Object.prototype.hasOwnProperty.call(state.labelSet, key) || throwError({}, Messages.UnknownLabel, label.name)), 
                    consumeSemicolon(), null !== label || state.inIteration || throwError({}, Messages.IllegalContinue), 
                    delegate.createContinueStatement(label));
                }
                // 12.8 The break statement
                function parseBreakStatement() {
                    var key, label = null;
                    // Catch the very common case first: immediately a semicolon (char #59).
                    return expectKeyword("break"), 59 === source.charCodeAt(index) ? (lex(), state.inIteration || state.inSwitch || throwError({}, Messages.IllegalBreak), 
                    delegate.createBreakStatement(null)) : peekLineTerminator() ? (state.inIteration || state.inSwitch || throwError({}, Messages.IllegalBreak), 
                    delegate.createBreakStatement(null)) : (lookahead.type === Token.Identifier && (label = parseVariableIdentifier(), 
                    key = "$" + label.name, Object.prototype.hasOwnProperty.call(state.labelSet, key) || throwError({}, Messages.UnknownLabel, label.name)), 
                    consumeSemicolon(), null !== label || state.inIteration || state.inSwitch || throwError({}, Messages.IllegalBreak), 
                    delegate.createBreakStatement(label));
                }
                // 12.9 The return statement
                function parseReturnStatement() {
                    var argument = null;
                    // 'return' followed by a space and an identifier is very common.
                    return expectKeyword("return"), state.inFunctionBody || throwErrorTolerant({}, Messages.IllegalReturn), 
                    32 === source.charCodeAt(index) && isIdentifierStart(source.charCodeAt(index + 1)) ? (argument = parseExpression(), 
                    consumeSemicolon(), delegate.createReturnStatement(argument)) : peekLineTerminator() ? delegate.createReturnStatement(null) : (match(";") || match("}") || lookahead.type === Token.EOF || (argument = parseExpression()), 
                    consumeSemicolon(), delegate.createReturnStatement(argument));
                }
                // 12.10 The with statement
                function parseWithStatement() {
                    var object, body;
                    return strict && throwErrorTolerant({}, Messages.StrictModeWith), expectKeyword("with"), 
                    expect("("), object = parseExpression(), expect(")"), body = parseStatement(), delegate.createWithStatement(object, body);
                }
                // 12.10 The swith statement
                function parseSwitchCase() {
                    var test, sourceElement, consequent = [];
                    for (matchKeyword("default") ? (lex(), test = null) : (expectKeyword("case"), test = parseExpression()), 
                    expect(":"); length > index && !(match("}") || matchKeyword("default") || matchKeyword("case")) && (sourceElement = parseSourceElement(), 
                    "undefined" != typeof sourceElement); ) consequent.push(sourceElement);
                    return delegate.createSwitchCase(test, consequent);
                }
                function parseSwitchStatement() {
                    var discriminant, cases, clause, oldInSwitch, defaultFound;
                    if (expectKeyword("switch"), expect("("), discriminant = parseExpression(), expect(")"), 
                    expect("{"), cases = [], match("}")) return lex(), delegate.createSwitchStatement(discriminant, cases);
                    for (oldInSwitch = state.inSwitch, state.inSwitch = !0, defaultFound = !1; length > index && !match("}"); ) clause = parseSwitchCase(), 
                    null === clause.test && (defaultFound && throwError({}, Messages.MultipleDefaultsInSwitch), 
                    defaultFound = !0), cases.push(clause);
                    return state.inSwitch = oldInSwitch, expect("}"), delegate.createSwitchStatement(discriminant, cases);
                }
                // 12.13 The throw statement
                function parseThrowStatement() {
                    var argument;
                    return expectKeyword("throw"), peekLineTerminator() && throwError({}, Messages.NewlineAfterThrow), 
                    argument = parseExpression(), consumeSemicolon(), delegate.createThrowStatement(argument);
                }
                // 12.14 The try statement
                function parseCatchClause() {
                    var param, body;
                    return expectKeyword("catch"), expect("("), match(")") && throwUnexpected(lookahead), 
                    param = parseExpression(), // 12.14.1
                    strict && param.type === Syntax.Identifier && isRestrictedWord(param.name) && throwErrorTolerant({}, Messages.StrictCatchVariable), 
                    expect(")"), body = parseBlock(), delegate.createCatchClause(param, body);
                }
                function parseTryStatement() {
                    var block, handlers = [], finalizer = null;
                    return expectKeyword("try"), block = parseBlock(), matchKeyword("catch") && handlers.push(parseCatchClause()), 
                    matchKeyword("finally") && (lex(), finalizer = parseBlock()), 0 !== handlers.length || finalizer || throwError({}, Messages.NoCatchOrFinally), 
                    delegate.createTryStatement(block, [], handlers, finalizer);
                }
                // 12.15 The debugger statement
                function parseDebuggerStatement() {
                    return expectKeyword("debugger"), consumeSemicolon(), delegate.createDebuggerStatement();
                }
                // 12 Statements
                function parseStatement() {
                    var expr, labeledBody, key, type = lookahead.type;
                    if (type === Token.EOF && throwUnexpected(lookahead), type === Token.Punctuator) switch (lookahead.value) {
                      case ";":
                        return parseEmptyStatement();

                      case "{":
                        return parseBlock();

                      case "(":
                        return parseExpressionStatement();
                    }
                    if (type === Token.Keyword) switch (lookahead.value) {
                      case "break":
                        return parseBreakStatement();

                      case "continue":
                        return parseContinueStatement();

                      case "debugger":
                        return parseDebuggerStatement();

                      case "do":
                        return parseDoWhileStatement();

                      case "for":
                        return parseForStatement();

                      case "function":
                        return parseFunctionDeclaration();

                      case "class":
                        return parseClassDeclaration();

                      case "if":
                        return parseIfStatement();

                      case "return":
                        return parseReturnStatement();

                      case "switch":
                        return parseSwitchStatement();

                      case "throw":
                        return parseThrowStatement();

                      case "try":
                        return parseTryStatement();

                      case "var":
                        return parseVariableStatement();

                      case "while":
                        return parseWhileStatement();

                      case "with":
                        return parseWithStatement();
                    }
                    // 12.12 Labelled Statements
                    return expr = parseExpression(), expr.type === Syntax.Identifier && match(":") ? (lex(), 
                    key = "$" + expr.name, Object.prototype.hasOwnProperty.call(state.labelSet, key) && throwError({}, Messages.Redeclaration, "Label", expr.name), 
                    state.labelSet[key] = !0, labeledBody = parseStatement(), delete state.labelSet[key], 
                    delegate.createLabeledStatement(expr, labeledBody)) : (consumeSemicolon(), delegate.createExpressionStatement(expr));
                }
                // 13 Function Definition
                function parseConciseBody() {
                    return match("{") ? parseFunctionSourceElements() : parseAssignmentExpression();
                }
                function parseFunctionSourceElements() {
                    var sourceElement, token, directive, firstRestricted, oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, oldParenthesizedCount, sourceElements = [];
                    for (expect("{"); length > index && lookahead.type === Token.StringLiteral && (token = lookahead, 
                    sourceElement = parseSourceElement(), sourceElements.push(sourceElement), sourceElement.expression.type === Syntax.Literal); ) directive = source.slice(token.range[0] + 1, token.range[1] - 1), 
                    "use strict" === directive ? (strict = !0, firstRestricted && throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral)) : !firstRestricted && token.octal && (firstRestricted = token);
                    for (oldLabelSet = state.labelSet, oldInIteration = state.inIteration, oldInSwitch = state.inSwitch, 
                    oldInFunctionBody = state.inFunctionBody, oldParenthesizedCount = state.parenthesizedCount, 
                    state.labelSet = {}, state.inIteration = !1, state.inSwitch = !1, state.inFunctionBody = !0, 
                    state.parenthesizedCount = 0; length > index && !match("}") && (sourceElement = parseSourceElement(), 
                    "undefined" != typeof sourceElement); ) sourceElements.push(sourceElement);
                    return expect("}"), state.labelSet = oldLabelSet, state.inIteration = oldInIteration, 
                    state.inSwitch = oldInSwitch, state.inFunctionBody = oldInFunctionBody, state.parenthesizedCount = oldParenthesizedCount, 
                    delegate.createBlockStatement(sourceElements);
                }
                function validateParam(options, param, name) {
                    var key = "$" + name;
                    strict ? (isRestrictedWord(name) && (options.stricted = param, options.message = Messages.StrictParamName), 
                    Object.prototype.hasOwnProperty.call(options.paramSet, key) && (options.stricted = param, 
                    options.message = Messages.StrictParamDupe)) : options.firstRestricted || (isRestrictedWord(name) ? (options.firstRestricted = param, 
                    options.message = Messages.StrictParamName) : isStrictModeReservedWord(name) ? (options.firstRestricted = param, 
                    options.message = Messages.StrictReservedWord) : Object.prototype.hasOwnProperty.call(options.paramSet, key) && (options.firstRestricted = param, 
                    options.message = Messages.StrictParamDupe)), options.paramSet[key] = !0;
                }
                function parseParam(options) {
                    var token, rest, param, def;
                    return token = lookahead, "..." === token.value && (token = lex(), rest = !0), match("[") ? (param = parseArrayInitialiser(), 
                    reinterpretAsDestructuredParameter(options, param)) : match("{") ? (rest && throwError({}, Messages.ObjectPatternAsRestParameter), 
                    param = parseObjectInitialiser(), reinterpretAsDestructuredParameter(options, param)) : (// We don't currently support typed rest params because doing so is
                    // a bit awkward. We may come back to this, but for now we'll punt
                    // on it.
                    param = rest ? parseVariableIdentifier() : parseAnnotatableIdentifier(), validateParam(options, token, token.value), 
                    match("=") && (rest && throwErrorTolerant(lookahead, Messages.DefaultRestParameter), 
                    lex(), def = parseAssignmentExpression(), ++options.defaultCount)), rest ? (match(")") || throwError({}, Messages.ParameterAfterRestParameter), 
                    options.rest = param, !1) : (options.params.push(param), options.defaults.push(def), 
                    !match(")"));
                }
                function parseParams(firstRestricted) {
                    var options;
                    if (options = {
                        params: [],
                        defaultCount: 0,
                        defaults: [],
                        rest: null,
                        firstRestricted: firstRestricted
                    }, expect("("), !match(")")) for (options.paramSet = {}; length > index && parseParam(options); ) expect(",");
                    return expect(")"), 0 === options.defaultCount && (options.defaults = []), match(":") && (lex(), 
                    options.returnTypeAnnotation = parseTypeAnnotation()), options;
                }
                function parseFunctionDeclaration() {
                    var id, body, token, tmp, firstRestricted, message, previousStrict, previousYieldAllowed, generator, expression;
                    return expectKeyword("function"), generator = !1, match("*") && (lex(), generator = !0), 
                    token = lookahead, id = state.allowDefault ? matchKeyword("default") ? parseNonComputedProperty() : parseVariableIdentifier() : parseVariableIdentifier(), 
                    strict ? isRestrictedWord(token.value) && throwErrorTolerant(token, Messages.StrictFunctionName) : isRestrictedWord(token.value) ? (firstRestricted = token, 
                    message = Messages.StrictFunctionName) : isStrictModeReservedWord(token.value) && (firstRestricted = token, 
                    message = Messages.StrictReservedWord), tmp = parseParams(firstRestricted), firstRestricted = tmp.firstRestricted, 
                    tmp.message && (message = tmp.message), previousStrict = strict, previousYieldAllowed = state.yieldAllowed, 
                    state.yieldAllowed = generator, // here we redo some work in order to set 'expression'
                    expression = !match("{"), body = parseConciseBody(), strict && firstRestricted && throwError(firstRestricted, message), 
                    strict && tmp.stricted && throwErrorTolerant(tmp.stricted, message), state.yieldAllowed && !state.yieldFound && throwErrorTolerant({}, Messages.NoYieldInGenerator), 
                    strict = previousStrict, state.yieldAllowed = previousYieldAllowed, delegate.createFunctionDeclaration(id, tmp.params, tmp.defaults, body, tmp.rest, generator, expression, tmp.returnTypeAnnotation);
                }
                function parseFunctionExpression() {
                    var token, firstRestricted, message, tmp, body, previousStrict, previousYieldAllowed, generator, expression, id = null;
                    return expectKeyword("function"), generator = !1, match("*") && (lex(), generator = !0), 
                    match("(") || (token = lookahead, id = parseVariableIdentifier(), strict ? isRestrictedWord(token.value) && throwErrorTolerant(token, Messages.StrictFunctionName) : isRestrictedWord(token.value) ? (firstRestricted = token, 
                    message = Messages.StrictFunctionName) : isStrictModeReservedWord(token.value) && (firstRestricted = token, 
                    message = Messages.StrictReservedWord)), tmp = parseParams(firstRestricted), firstRestricted = tmp.firstRestricted, 
                    tmp.message && (message = tmp.message), previousStrict = strict, previousYieldAllowed = state.yieldAllowed, 
                    state.yieldAllowed = generator, // here we redo some work in order to set 'expression'
                    expression = !match("{"), body = parseConciseBody(), strict && firstRestricted && throwError(firstRestricted, message), 
                    strict && tmp.stricted && throwErrorTolerant(tmp.stricted, message), state.yieldAllowed && !state.yieldFound && throwErrorTolerant({}, Messages.NoYieldInGenerator), 
                    strict = previousStrict, state.yieldAllowed = previousYieldAllowed, delegate.createFunctionExpression(id, tmp.params, tmp.defaults, body, tmp.rest, generator, expression, tmp.returnTypeAnnotation);
                }
                function parseYieldExpression() {
                    var delegateFlag, expr, previousYieldAllowed;
                    return expectKeyword("yield"), state.yieldAllowed || throwErrorTolerant({}, Messages.IllegalYield), 
                    delegateFlag = !1, match("*") && (lex(), delegateFlag = !0), // It is a Syntax Error if any AssignmentExpression Contains YieldExpression.
                    previousYieldAllowed = state.yieldAllowed, state.yieldAllowed = !1, expr = parseAssignmentExpression(), 
                    state.yieldAllowed = previousYieldAllowed, state.yieldFound = !0, delegate.createYieldExpression(expr, delegateFlag);
                }
                // 14 Classes
                function parseMethodDefinition(existingPropNames) {
                    var token, key, param, propType, isValidDuplicateProp = !1;
                    return "static" === lookahead.value ? (propType = ClassPropertyType.static, lex()) : propType = ClassPropertyType.prototype, 
                    match("*") ? (lex(), delegate.createMethodDefinition(propType, "", parseObjectPropertyKey(), parsePropertyMethodFunction({
                        generator: !0
                    }))) : (token = lookahead, key = parseObjectPropertyKey(), "get" !== token.value || match("(") ? "set" !== token.value || match("(") ? (// It is a syntax error if any other properties have the same name as a
                    // non-getter, non-setter method
                    existingPropNames[propType].hasOwnProperty(key.name) ? throwError(key, Messages.IllegalDuplicateClassProperty) : existingPropNames[propType][key.name] = {}, 
                    existingPropNames[propType][key.name].data = !0, delegate.createMethodDefinition(propType, "", key, parsePropertyMethodFunction({
                        generator: !1
                    }))) : (key = parseObjectPropertyKey(), // It is a syntax error if any other properties have a name
                    // duplicating this one unless they are a getter
                    existingPropNames[propType].hasOwnProperty(key.name) ? (isValidDuplicateProp = // There isn't already a setter for this prop
                    void 0 === existingPropNames[propType][key.name].set && void 0 === existingPropNames[propType][key.name].data && void 0 !== existingPropNames[propType][key.name].get, 
                    isValidDuplicateProp || throwError(key, Messages.IllegalDuplicateClassProperty)) : existingPropNames[propType][key.name] = {}, 
                    existingPropNames[propType][key.name].set = !0, expect("("), token = lookahead, 
                    param = [ parseVariableIdentifier() ], expect(")"), delegate.createMethodDefinition(propType, "set", key, parsePropertyFunction({
                        params: param,
                        generator: !1,
                        name: token
                    }))) : (key = parseObjectPropertyKey(), // It is a syntax error if any other properties have a name
                    // duplicating this one unless they are a setter
                    existingPropNames[propType].hasOwnProperty(key.name) ? (isValidDuplicateProp = // There isn't already a getter for this prop
                    void 0 === existingPropNames[propType][key.name].get && void 0 === existingPropNames[propType][key.name].data && void 0 !== existingPropNames[propType][key.name].set, 
                    isValidDuplicateProp || throwError(key, Messages.IllegalDuplicateClassProperty)) : existingPropNames[propType][key.name] = {}, 
                    existingPropNames[propType][key.name].get = !0, expect("("), expect(")"), delegate.createMethodDefinition(propType, "get", key, parsePropertyFunction({
                        generator: !1
                    }))));
                }
                function parseClassElement(existingProps) {
                    return match(";") ? (lex(), void 0) : parseMethodDefinition(existingProps);
                }
                function parseClassBody() {
                    var classElement, classElements = [], existingProps = {};
                    for (existingProps[ClassPropertyType.static] = {}, existingProps[ClassPropertyType.prototype] = {}, 
                    expect("{"); length > index && !match("}"); ) classElement = parseClassElement(existingProps), 
                    "undefined" != typeof classElement && classElements.push(classElement);
                    return expect("}"), delegate.createClassBody(classElements);
                }
                function parseClassExpression() {
                    var id, previousYieldAllowed, superClass = null;
                    return expectKeyword("class"), matchKeyword("extends") || match("{") || (id = parseVariableIdentifier()), 
                    matchKeyword("extends") && (expectKeyword("extends"), previousYieldAllowed = state.yieldAllowed, 
                    state.yieldAllowed = !1, superClass = parseAssignmentExpression(), state.yieldAllowed = previousYieldAllowed), 
                    delegate.createClassExpression(id, superClass, parseClassBody());
                }
                function parseClassDeclaration() {
                    var id, previousYieldAllowed, superClass = null;
                    return expectKeyword("class"), id = state.allowDefault ? matchKeyword("default") ? parseNonComputedProperty() : parseVariableIdentifier() : parseVariableIdentifier(), 
                    matchKeyword("extends") && (expectKeyword("extends"), previousYieldAllowed = state.yieldAllowed, 
                    state.yieldAllowed = !1, superClass = parseAssignmentExpression(), state.yieldAllowed = previousYieldAllowed), 
                    delegate.createClassDeclaration(id, superClass, parseClassBody());
                }
                // 15 Program
                function matchModuleDeclaration() {
                    var id;
                    return matchContextualKeyword("module") ? (id = lookahead2(), id.type === Token.StringLiteral || id.type === Token.Identifier) : !1;
                }
                function parseSourceElement() {
                    if (lookahead.type === Token.Keyword) switch (lookahead.value) {
                      case "const":
                      case "let":
                        return parseConstLetDeclaration(lookahead.value);

                      case "function":
                        return parseFunctionDeclaration();

                      case "export":
                        return parseExportDeclaration();

                      case "import":
                        return parseImportDeclaration();

                      default:
                        return parseStatement();
                    }
                    return matchModuleDeclaration() && throwError({}, Messages.NestedModule), lookahead.type !== Token.EOF ? parseStatement() : void 0;
                }
                function parseProgramElement() {
                    if (lookahead.type === Token.Keyword) switch (lookahead.value) {
                      case "export":
                        return parseExportDeclaration();

                      case "import":
                        return parseImportDeclaration();
                    }
                    return matchModuleDeclaration() ? parseModuleDeclaration() : parseSourceElement();
                }
                function parseProgramElements() {
                    for (var sourceElement, token, directive, firstRestricted, sourceElements = []; length > index && (token = lookahead, 
                    token.type === Token.StringLiteral) && (sourceElement = parseProgramElement(), sourceElements.push(sourceElement), 
                    sourceElement.expression.type === Syntax.Literal); ) directive = source.slice(token.range[0] + 1, token.range[1] - 1), 
                    "use strict" === directive ? (strict = !0, firstRestricted && throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral)) : !firstRestricted && token.octal && (firstRestricted = token);
                    for (;length > index && (sourceElement = parseProgramElement(), "undefined" != typeof sourceElement); ) sourceElements.push(sourceElement);
                    return sourceElements;
                }
                function parseModuleElement() {
                    return parseSourceElement();
                }
                function parseModuleElements() {
                    for (var statement, list = []; length > index && !match("}") && (statement = parseModuleElement(), 
                    "undefined" != typeof statement); ) list.push(statement);
                    return list;
                }
                function parseModuleBlock() {
                    var block;
                    return expect("{"), block = parseModuleElements(), expect("}"), delegate.createBlockStatement(block);
                }
                function parseProgram() {
                    var body;
                    return strict = !1, peek(), body = parseProgramElements(), delegate.createProgram(body);
                }
                // The following functions are needed only when the option to preserve
                // the comments is active.
                function addComment(type, value, start, end, loc) {
                    assert("number" == typeof start, "Comment must have valid position"), // Because the way the actual token is scanned, often the comments
                    // (if any) are skipped twice during the lexical analysis.
                    // Thus, we need to skip adding a comment if the comment array already
                    // handled it.
                    extra.comments.length > 0 && extra.comments[extra.comments.length - 1].range[1] > start || extra.comments.push({
                        type: type,
                        value: value,
                        range: [ start, end ],
                        loc: loc
                    });
                }
                function scanComment() {
                    var comment, ch, loc, start, blockComment, lineComment;
                    for (comment = "", blockComment = !1, lineComment = !1; length > index; ) if (ch = source[index], 
                    lineComment) ch = source[index++], isLineTerminator(ch.charCodeAt(0)) ? (loc.end = {
                        line: lineNumber,
                        column: index - lineStart - 1
                    }, lineComment = !1, addComment("Line", comment, start, index - 1, loc), "\r" === ch && "\n" === source[index] && ++index, 
                    ++lineNumber, lineStart = index, comment = "") : index >= length ? (lineComment = !1, 
                    comment += ch, loc.end = {
                        line: lineNumber,
                        column: length - lineStart
                    }, addComment("Line", comment, start, length, loc)) : comment += ch; else if (blockComment) isLineTerminator(ch.charCodeAt(0)) ? ("\r" === ch && "\n" === source[index + 1] ? (++index, 
                    comment += "\r\n") : comment += ch, ++lineNumber, ++index, lineStart = index, index >= length && throwError({}, Messages.UnexpectedToken, "ILLEGAL")) : (ch = source[index++], 
                    index >= length && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), comment += ch, 
                    "*" === ch && (ch = source[index], "/" === ch && (comment = comment.substr(0, comment.length - 1), 
                    blockComment = !1, ++index, loc.end = {
                        line: lineNumber,
                        column: index - lineStart
                    }, addComment("Block", comment, start, index, loc), comment = ""))); else if ("/" === ch) if (ch = source[index + 1], 
                    "/" === ch) loc = {
                        start: {
                            line: lineNumber,
                            column: index - lineStart
                        }
                    }, start = index, index += 2, lineComment = !0, index >= length && (loc.end = {
                        line: lineNumber,
                        column: index - lineStart
                    }, lineComment = !1, addComment("Line", comment, start, index, loc)); else {
                        if ("*" !== ch) break;
                        start = index, index += 2, blockComment = !0, loc = {
                            start: {
                                line: lineNumber,
                                column: index - lineStart - 2
                            }
                        }, index >= length && throwError({}, Messages.UnexpectedToken, "ILLEGAL");
                    } else if (isWhiteSpace(ch.charCodeAt(0))) ++index; else {
                        if (!isLineTerminator(ch.charCodeAt(0))) break;
                        ++index, "\r" === ch && "\n" === source[index] && ++index, ++lineNumber, lineStart = index;
                    }
                }
                function filterCommentLocation() {
                    var i, entry, comment, comments = [];
                    for (i = 0; i < extra.comments.length; ++i) entry = extra.comments[i], comment = {
                        type: entry.type,
                        value: entry.value
                    }, extra.range && (comment.range = entry.range), extra.loc && (comment.loc = entry.loc), 
                    comments.push(comment);
                    extra.comments = comments;
                }
                function isXJSIdentifierStart(ch) {
                    // exclude backslash (\)
                    return 92 !== ch && isIdentifierStart(ch);
                }
                function isXJSIdentifierPart(ch) {
                    // exclude backslash (\) and add hyphen (-)
                    return 92 !== ch && (45 === ch || isIdentifierPart(ch));
                }
                function scanXJSIdentifier() {
                    var ch, start, namespace, id = "";
                    for (start = index; length > index && (ch = source.charCodeAt(index), isXJSIdentifierPart(ch)); ) id += source[index++];
                    if (58 === ch) for (// :
                    ++index, namespace = id, id = ""; length > index && (ch = source.charCodeAt(index), 
                    isXJSIdentifierPart(ch)); ) id += source[index++];
                    return id || throwError({}, Messages.InvalidXJSTagName), {
                        type: Token.XJSIdentifier,
                        value: id,
                        namespace: namespace,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    };
                }
                function scanXJSEntity() {
                    var ch, entity, str = "", count = 0;
                    for (ch = source[index], assert("&" === ch, "Entity must start with an ampersand"), 
                    index++; length > index && count++ < 10 && (ch = source[index++], ";" !== ch); ) str += ch;
                    return entity = "#" === str[0] && "x" === str[1] ? String.fromCharCode(parseInt(str.substr(2), 16)) : "#" === str[0] ? String.fromCharCode(parseInt(str.substr(1), 10)) : XHTMLEntities[str];
                }
                function scanXJSText(stopChars) {
                    var ch, start, str = "";
                    for (start = index; length > index && (ch = source[index], -1 === stopChars.indexOf(ch)); ) "&" === ch ? str += scanXJSEntity() : (ch = source[index++], 
                    isLineTerminator(ch.charCodeAt(0)) && (++lineNumber, lineStart = index), str += ch);
                    return {
                        type: Token.XJSText,
                        value: str,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [ start, index ]
                    };
                }
                function scanXJSStringLiteral() {
                    var innerToken, quote, start;
                    return quote = source[index], assert("'" === quote || '"' === quote, "String literal must starts with a quote"), 
                    start = index, ++index, innerToken = scanXJSText([ quote ]), quote !== source[index] && throwError({}, Messages.UnexpectedToken, "ILLEGAL"), 
                    ++index, innerToken.range = [ start, index ], innerToken;
                }
                /**
     * Between XJS opening and closing tags (e.g. <foo>HERE</foo>), anything that
     * is not another XJS tag and is not an expression wrapped by {} is text.
     */
                function advanceXJSChild() {
                    var ch = source.charCodeAt(index);
                    // { (123) and < (60)
                    // { (123) and < (60)
                    return 123 !== ch && 60 !== ch ? scanXJSText([ "<", "{" ]) : scanPunctuator();
                }
                function parseXJSIdentifier() {
                    var token;
                    return lookahead.type !== Token.XJSIdentifier && throwUnexpected(lookahead), token = lex(), 
                    delegate.createXJSIdentifier(token.value, token.namespace);
                }
                function parseXJSAttributeValue() {
                    var value;
                    return match("{") ? (value = parseXJSExpressionContainer(), value.expression.type === Syntax.XJSEmptyExpression && throwError(value, "XJS attributes must only be assigned a non-empty expression")) : lookahead.type === Token.XJSText ? value = delegate.createLiteral(lex()) : throwError({}, Messages.InvalidXJSAttributeValue), 
                    value;
                }
                function parseXJSEmptyExpression() {
                    for (;"}" !== source.charAt(index); ) index++;
                    return delegate.createXJSEmptyExpression();
                }
                function parseXJSExpressionContainer() {
                    var expression, origInXJSChild, origInXJSTag;
                    return origInXJSChild = state.inXJSChild, origInXJSTag = state.inXJSTag, state.inXJSChild = !1, 
                    state.inXJSTag = !1, expect("{"), expression = match("}") ? parseXJSEmptyExpression() : parseExpression(), 
                    state.inXJSChild = origInXJSChild, state.inXJSTag = origInXJSTag, expect("}"), delegate.createXJSExpressionContainer(expression);
                }
                function parseXJSAttribute() {
                    var name;
                    // HTML empty attribute
                    return name = parseXJSIdentifier(), match("=") ? (lex(), delegate.createXJSAttribute(name, parseXJSAttributeValue())) : delegate.createXJSAttribute(name);
                }
                function parseXJSChild() {
                    var token;
                    return match("{") ? token = parseXJSExpressionContainer() : lookahead.type === Token.XJSText ? token = delegate.createLiteral(lex()) : (state.inXJSChild = !1, 
                    token = parseXJSElement(), state.inXJSChild = !0), token;
                }
                function parseXJSClosingElement() {
                    var name, origInXJSTag;
                    return origInXJSTag = state.inXJSTag, state.inXJSTag = !0, state.inXJSChild = !1, 
                    expect("<"), expect("/"), name = parseXJSIdentifier(), state.inXJSTag = origInXJSTag, 
                    expect(">"), delegate.createXJSClosingElement(name);
                }
                function parseXJSOpeningElement() {
                    var name, origInXJSTag, attributes = [], selfClosing = !1;
                    for (origInXJSTag = state.inXJSTag, state.inXJSTag = !0, expect("<"), name = parseXJSIdentifier(); length > index && "/" !== lookahead.value && ">" !== lookahead.value; ) attributes.push(parseXJSAttribute());
                    return state.inXJSTag = origInXJSTag, "/" === lookahead.value ? (expect("/"), expect(">"), 
                    selfClosing = !0) : (state.inXJSChild = !0, expect(">")), delegate.createXJSOpeningElement(name, attributes, selfClosing);
                }
                function parseXJSElement() {
                    var openingElement, closingElement, origInXJSChild, children = [];
                    if (openingElement = parseXJSOpeningElement(), !openingElement.selfClosing) {
                        for (origInXJSChild = state.inXJSChild; length > index && (state.inXJSChild = !1, 
                        "<" !== lookahead.value || "/" !== lookahead2().value); ) state.inXJSChild = !0, 
                        peek(), // reset lookahead token
                        children.push(parseXJSChild());
                        state.inXJSChild = origInXJSChild, closingElement = parseXJSClosingElement(), (closingElement.name.namespace !== openingElement.name.namespace || closingElement.name.name !== openingElement.name.name) && throwError({}, Messages.ExpectedXJSClosingTag, openingElement.name.namespace ? openingElement.name.namespace + ":" + openingElement.name.name : openingElement.name.name);
                    }
                    return delegate.createXJSElement(openingElement, closingElement, children);
                }
                function collectToken() {
                    var start, loc, token, range, value;
                    return skipComment(), start = index, loc = {
                        start: {
                            line: lineNumber,
                            column: index - lineStart
                        }
                    }, token = extra.advance(), loc.end = {
                        line: lineNumber,
                        column: index - lineStart
                    }, token.type !== Token.EOF && (range = [ token.range[0], token.range[1] ], value = source.slice(token.range[0], token.range[1]), 
                    extra.tokens.push({
                        type: TokenName[token.type],
                        value: value,
                        range: range,
                        loc: loc
                    })), token;
                }
                function collectRegex() {
                    var pos, loc, regex, token;
                    return skipComment(), pos = index, loc = {
                        start: {
                            line: lineNumber,
                            column: index - lineStart
                        }
                    }, regex = extra.scanRegExp(), loc.end = {
                        line: lineNumber,
                        column: index - lineStart
                    }, extra.tokenize || (// Pop the previous token, which is likely '/' or '/='
                    extra.tokens.length > 0 && (token = extra.tokens[extra.tokens.length - 1], token.range[0] === pos && "Punctuator" === token.type && ("/" === token.value || "/=" === token.value) && extra.tokens.pop()), 
                    extra.tokens.push({
                        type: "RegularExpression",
                        value: regex.literal,
                        range: [ pos, index ],
                        loc: loc
                    })), regex;
                }
                function filterTokenLocation() {
                    var i, entry, token, tokens = [];
                    for (i = 0; i < extra.tokens.length; ++i) entry = extra.tokens[i], token = {
                        type: entry.type,
                        value: entry.value
                    }, extra.range && (token.range = entry.range), extra.loc && (token.loc = entry.loc), 
                    tokens.push(token);
                    extra.tokens = tokens;
                }
                function LocationMarker() {
                    this.range = [ index, index ], this.loc = {
                        start: {
                            line: lineNumber,
                            column: index - lineStart
                        },
                        end: {
                            line: lineNumber,
                            column: index - lineStart
                        }
                    };
                }
                function createLocationMarker() {
                    return new LocationMarker();
                }
                function trackGroupExpression() {
                    var marker, expr;
                    return skipComment(), marker = createLocationMarker(), expect("("), ++state.parenthesizedCount, 
                    state.allowArrowFunction = !state.allowArrowFunction, expr = parseExpression(), 
                    state.allowArrowFunction = !1, "ArrowFunctionExpression" === expr.type ? (marker.end(), 
                    marker.apply(expr)) : (expect(")"), marker.end(), marker.applyGroup(expr)), expr;
                }
                function trackLeftHandSideExpression() {
                    var marker, expr;
                    for (skipComment(), marker = createLocationMarker(), expr = matchKeyword("new") ? parseNewExpression() : parsePrimaryExpression(); match(".") || match("[") || lookahead.type === Token.Template; ) match("[") ? (expr = delegate.createMemberExpression("[", expr, parseComputedMember()), 
                    marker.end(), marker.apply(expr)) : match(".") ? (expr = delegate.createMemberExpression(".", expr, parseNonComputedMember()), 
                    marker.end(), marker.apply(expr)) : (expr = delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral()), 
                    marker.end(), marker.apply(expr));
                    return expr;
                }
                function trackLeftHandSideExpressionAllowCall() {
                    var marker, expr, args;
                    for (skipComment(), marker = createLocationMarker(), expr = matchKeyword("new") ? parseNewExpression() : parsePrimaryExpression(); match(".") || match("[") || match("(") || lookahead.type === Token.Template; ) match("(") ? (args = parseArguments(), 
                    expr = delegate.createCallExpression(expr, args), marker.end(), marker.apply(expr)) : match("[") ? (expr = delegate.createMemberExpression("[", expr, parseComputedMember()), 
                    marker.end(), marker.apply(expr)) : match(".") ? (expr = delegate.createMemberExpression(".", expr, parseNonComputedMember()), 
                    marker.end(), marker.apply(expr)) : (expr = delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral()), 
                    marker.end(), marker.apply(expr));
                    return expr;
                }
                function filterGroup(node) {
                    var n, i, entry;
                    n = "[object Array]" === Object.prototype.toString.apply(node) ? [] : {};
                    for (i in node) node.hasOwnProperty(i) && "groupRange" !== i && "groupLoc" !== i && (entry = node[i], 
                    n[i] = null === entry || "object" != typeof entry || entry instanceof RegExp ? entry : filterGroup(entry));
                    return n;
                }
                function wrapTrackingFunction(range, loc, preserveWhitespace) {
                    return function(parseFunction) {
                        function isBinary(node) {
                            return node.type === Syntax.LogicalExpression || node.type === Syntax.BinaryExpression;
                        }
                        function visit(node) {
                            var start, end;
                            isBinary(node.left) && visit(node.left), isBinary(node.right) && visit(node.right), 
                            range && (node.left.groupRange || node.right.groupRange ? (start = node.left.groupRange ? node.left.groupRange[0] : node.left.range[0], 
                            end = node.right.groupRange ? node.right.groupRange[1] : node.right.range[1], node.range = [ start, end ]) : "undefined" == typeof node.range && (start = node.left.range[0], 
                            end = node.right.range[1], node.range = [ start, end ])), loc && (node.left.groupLoc || node.right.groupLoc ? (start = node.left.groupLoc ? node.left.groupLoc.start : node.left.loc.start, 
                            end = node.right.groupLoc ? node.right.groupLoc.end : node.right.loc.end, node.loc = {
                                start: start,
                                end: end
                            }, node = delegate.postProcess(node)) : "undefined" == typeof node.loc && (node.loc = {
                                start: node.left.loc.start,
                                end: node.right.loc.end
                            }, node = delegate.postProcess(node)));
                        }
                        return function() {
                            var marker, node;
                            return preserveWhitespace || skipComment(), marker = createLocationMarker(), node = parseFunction.apply(null, arguments), 
                            marker.end(), range && "undefined" == typeof node.range && marker.apply(node), loc && "undefined" == typeof node.loc && marker.apply(node), 
                            isBinary(node) && visit(node), node;
                        };
                    };
                }
                function patch() {
                    var wrapTracking, wrapTrackingPreserveWhitespace;
                    extra.comments && (extra.skipComment = skipComment, skipComment = scanComment), 
                    (extra.range || extra.loc) && (extra.parseGroupExpression = parseGroupExpression, 
                    extra.parseLeftHandSideExpression = parseLeftHandSideExpression, extra.parseLeftHandSideExpressionAllowCall = parseLeftHandSideExpressionAllowCall, 
                    parseGroupExpression = trackGroupExpression, parseLeftHandSideExpression = trackLeftHandSideExpression, 
                    parseLeftHandSideExpressionAllowCall = trackLeftHandSideExpressionAllowCall, wrapTracking = wrapTrackingFunction(extra.range, extra.loc), 
                    wrapTrackingPreserveWhitespace = wrapTrackingFunction(extra.range, extra.loc, !0), 
                    extra.parseAssignmentExpression = parseAssignmentExpression, extra.parseBinaryExpression = parseBinaryExpression, 
                    extra.parseBlock = parseBlock, extra.parseFunctionSourceElements = parseFunctionSourceElements, 
                    extra.parseCatchClause = parseCatchClause, extra.parseComputedMember = parseComputedMember, 
                    extra.parseConditionalExpression = parseConditionalExpression, extra.parseConstLetDeclaration = parseConstLetDeclaration, 
                    extra.parseExportBatchSpecifier = parseExportBatchSpecifier, extra.parseExportDeclaration = parseExportDeclaration, 
                    extra.parseExportSpecifier = parseExportSpecifier, extra.parseExpression = parseExpression, 
                    extra.parseForVariableDeclaration = parseForVariableDeclaration, extra.parseFunctionDeclaration = parseFunctionDeclaration, 
                    extra.parseFunctionExpression = parseFunctionExpression, extra.parseParams = parseParams, 
                    extra.parseImportDeclaration = parseImportDeclaration, extra.parseImportSpecifier = parseImportSpecifier, 
                    extra.parseModuleDeclaration = parseModuleDeclaration, extra.parseModuleBlock = parseModuleBlock, 
                    extra.parseNewExpression = parseNewExpression, extra.parseNonComputedProperty = parseNonComputedProperty, 
                    extra.parseObjectProperty = parseObjectProperty, extra.parseObjectPropertyKey = parseObjectPropertyKey, 
                    extra.parsePostfixExpression = parsePostfixExpression, extra.parsePrimaryExpression = parsePrimaryExpression, 
                    extra.parseProgram = parseProgram, extra.parsePropertyFunction = parsePropertyFunction, 
                    extra.parseSpreadOrAssignmentExpression = parseSpreadOrAssignmentExpression, extra.parseTemplateElement = parseTemplateElement, 
                    extra.parseTemplateLiteral = parseTemplateLiteral, extra.parseStatement = parseStatement, 
                    extra.parseSwitchCase = parseSwitchCase, extra.parseUnaryExpression = parseUnaryExpression, 
                    extra.parseVariableDeclaration = parseVariableDeclaration, extra.parseVariableIdentifier = parseVariableIdentifier, 
                    extra.parseAnnotatableIdentifier = parseAnnotatableIdentifier, extra.parseTypeAnnotation = parseTypeAnnotation, 
                    extra.parseMethodDefinition = parseMethodDefinition, extra.parseClassDeclaration = parseClassDeclaration, 
                    extra.parseClassExpression = parseClassExpression, extra.parseClassBody = parseClassBody, 
                    extra.parseXJSIdentifier = parseXJSIdentifier, extra.parseXJSChild = parseXJSChild, 
                    extra.parseXJSAttribute = parseXJSAttribute, extra.parseXJSAttributeValue = parseXJSAttributeValue, 
                    extra.parseXJSExpressionContainer = parseXJSExpressionContainer, extra.parseXJSEmptyExpression = parseXJSEmptyExpression, 
                    extra.parseXJSElement = parseXJSElement, extra.parseXJSClosingElement = parseXJSClosingElement, 
                    extra.parseXJSOpeningElement = parseXJSOpeningElement, parseAssignmentExpression = wrapTracking(extra.parseAssignmentExpression), 
                    parseBinaryExpression = wrapTracking(extra.parseBinaryExpression), parseBlock = wrapTracking(extra.parseBlock), 
                    parseFunctionSourceElements = wrapTracking(extra.parseFunctionSourceElements), parseCatchClause = wrapTracking(extra.parseCatchClause), 
                    parseComputedMember = wrapTracking(extra.parseComputedMember), parseConditionalExpression = wrapTracking(extra.parseConditionalExpression), 
                    parseConstLetDeclaration = wrapTracking(extra.parseConstLetDeclaration), parseExportBatchSpecifier = wrapTracking(parseExportBatchSpecifier), 
                    parseExportDeclaration = wrapTracking(parseExportDeclaration), parseExportSpecifier = wrapTracking(parseExportSpecifier), 
                    parseExpression = wrapTracking(extra.parseExpression), parseForVariableDeclaration = wrapTracking(extra.parseForVariableDeclaration), 
                    parseFunctionDeclaration = wrapTracking(extra.parseFunctionDeclaration), parseFunctionExpression = wrapTracking(extra.parseFunctionExpression), 
                    parseParams = wrapTracking(extra.parseParams), parseImportDeclaration = wrapTracking(extra.parseImportDeclaration), 
                    parseImportSpecifier = wrapTracking(extra.parseImportSpecifier), parseModuleDeclaration = wrapTracking(extra.parseModuleDeclaration), 
                    parseModuleBlock = wrapTracking(extra.parseModuleBlock), parseLeftHandSideExpression = wrapTracking(parseLeftHandSideExpression), 
                    parseNewExpression = wrapTracking(extra.parseNewExpression), parseNonComputedProperty = wrapTracking(extra.parseNonComputedProperty), 
                    parseObjectProperty = wrapTracking(extra.parseObjectProperty), parseObjectPropertyKey = wrapTracking(extra.parseObjectPropertyKey), 
                    parsePostfixExpression = wrapTracking(extra.parsePostfixExpression), parsePrimaryExpression = wrapTracking(extra.parsePrimaryExpression), 
                    parseProgram = wrapTracking(extra.parseProgram), parsePropertyFunction = wrapTracking(extra.parsePropertyFunction), 
                    parseTemplateElement = wrapTracking(extra.parseTemplateElement), parseTemplateLiteral = wrapTracking(extra.parseTemplateLiteral), 
                    parseSpreadOrAssignmentExpression = wrapTracking(extra.parseSpreadOrAssignmentExpression), 
                    parseStatement = wrapTracking(extra.parseStatement), parseSwitchCase = wrapTracking(extra.parseSwitchCase), 
                    parseUnaryExpression = wrapTracking(extra.parseUnaryExpression), parseVariableDeclaration = wrapTracking(extra.parseVariableDeclaration), 
                    parseVariableIdentifier = wrapTracking(extra.parseVariableIdentifier), parseAnnotatableIdentifier = wrapTracking(extra.parseAnnotatableIdentifier), 
                    parseTypeAnnotation = wrapTracking(extra.parseTypeAnnotation), parseMethodDefinition = wrapTracking(extra.parseMethodDefinition), 
                    parseClassDeclaration = wrapTracking(extra.parseClassDeclaration), parseClassExpression = wrapTracking(extra.parseClassExpression), 
                    parseClassBody = wrapTracking(extra.parseClassBody), parseXJSIdentifier = wrapTracking(extra.parseXJSIdentifier), 
                    parseXJSChild = wrapTrackingPreserveWhitespace(extra.parseXJSChild), parseXJSAttribute = wrapTracking(extra.parseXJSAttribute), 
                    parseXJSAttributeValue = wrapTracking(extra.parseXJSAttributeValue), parseXJSExpressionContainer = wrapTracking(extra.parseXJSExpressionContainer), 
                    parseXJSEmptyExpression = wrapTrackingPreserveWhitespace(extra.parseXJSEmptyExpression), 
                    parseXJSElement = wrapTracking(extra.parseXJSElement), parseXJSClosingElement = wrapTracking(extra.parseXJSClosingElement), 
                    parseXJSOpeningElement = wrapTracking(extra.parseXJSOpeningElement)), "undefined" != typeof extra.tokens && (extra.advance = advance, 
                    extra.scanRegExp = scanRegExp, advance = collectToken, scanRegExp = collectRegex);
                }
                function unpatch() {
                    "function" == typeof extra.skipComment && (skipComment = extra.skipComment), (extra.range || extra.loc) && (parseAssignmentExpression = extra.parseAssignmentExpression, 
                    parseBinaryExpression = extra.parseBinaryExpression, parseBlock = extra.parseBlock, 
                    parseFunctionSourceElements = extra.parseFunctionSourceElements, parseCatchClause = extra.parseCatchClause, 
                    parseComputedMember = extra.parseComputedMember, parseConditionalExpression = extra.parseConditionalExpression, 
                    parseConstLetDeclaration = extra.parseConstLetDeclaration, parseExportBatchSpecifier = extra.parseExportBatchSpecifier, 
                    parseExportDeclaration = extra.parseExportDeclaration, parseExportSpecifier = extra.parseExportSpecifier, 
                    parseExpression = extra.parseExpression, parseForVariableDeclaration = extra.parseForVariableDeclaration, 
                    parseFunctionDeclaration = extra.parseFunctionDeclaration, parseFunctionExpression = extra.parseFunctionExpression, 
                    parseImportDeclaration = extra.parseImportDeclaration, parseImportSpecifier = extra.parseImportSpecifier, 
                    parseGroupExpression = extra.parseGroupExpression, parseLeftHandSideExpression = extra.parseLeftHandSideExpression, 
                    parseLeftHandSideExpressionAllowCall = extra.parseLeftHandSideExpressionAllowCall, 
                    parseModuleDeclaration = extra.parseModuleDeclaration, parseModuleBlock = extra.parseModuleBlock, 
                    parseNewExpression = extra.parseNewExpression, parseNonComputedProperty = extra.parseNonComputedProperty, 
                    parseObjectProperty = extra.parseObjectProperty, parseObjectPropertyKey = extra.parseObjectPropertyKey, 
                    parsePostfixExpression = extra.parsePostfixExpression, parsePrimaryExpression = extra.parsePrimaryExpression, 
                    parseProgram = extra.parseProgram, parsePropertyFunction = extra.parsePropertyFunction, 
                    parseTemplateElement = extra.parseTemplateElement, parseTemplateLiteral = extra.parseTemplateLiteral, 
                    parseSpreadOrAssignmentExpression = extra.parseSpreadOrAssignmentExpression, parseStatement = extra.parseStatement, 
                    parseSwitchCase = extra.parseSwitchCase, parseUnaryExpression = extra.parseUnaryExpression, 
                    parseVariableDeclaration = extra.parseVariableDeclaration, parseVariableIdentifier = extra.parseVariableIdentifier, 
                    parseAnnotatableIdentifier = extra.parseAnnotatableIdentifier, parseTypeAnnotation = extra.parseTypeAnnotation, 
                    parseMethodDefinition = extra.parseMethodDefinition, parseClassDeclaration = extra.parseClassDeclaration, 
                    parseClassExpression = extra.parseClassExpression, parseClassBody = extra.parseClassBody, 
                    parseXJSIdentifier = extra.parseXJSIdentifier, parseXJSChild = extra.parseXJSChild, 
                    parseXJSAttribute = extra.parseXJSAttribute, parseXJSAttributeValue = extra.parseXJSAttributeValue, 
                    parseXJSExpressionContainer = extra.parseXJSExpressionContainer, parseXJSEmptyExpression = extra.parseXJSEmptyExpression, 
                    parseXJSElement = extra.parseXJSElement, parseXJSClosingElement = extra.parseXJSClosingElement, 
                    parseXJSOpeningElement = extra.parseXJSOpeningElement), "function" == typeof extra.scanRegExp && (advance = extra.advance, 
                    scanRegExp = extra.scanRegExp);
                }
                // This is used to modify the delegate.
                function extend(object, properties) {
                    var entry, result = {};
                    for (entry in object) object.hasOwnProperty(entry) && (result[entry] = object[entry]);
                    for (entry in properties) properties.hasOwnProperty(entry) && (result[entry] = properties[entry]);
                    return result;
                }
                function tokenize(code, options) {
                    var toString, token, tokens;
                    toString = String, "string" == typeof code || code instanceof String || (code = toString(code)), 
                    delegate = SyntaxTreeDelegate, source = code, index = 0, lineNumber = source.length > 0 ? 1 : 0, 
                    lineStart = 0, length = source.length, lookahead = null, state = {
                        allowDefault: !0,
                        allowIn: !0,
                        labelSet: {},
                        inFunctionBody: !1,
                        inIteration: !1,
                        inSwitch: !1
                    }, extra = {}, // Options matching.
                    options = options || {}, // Of course we collect tokens here.
                    options.tokens = !0, extra.tokens = [], extra.tokenize = !0, // The following two fields are necessary to compute the Regex tokens.
                    extra.openParenToken = -1, extra.openCurlyToken = -1, extra.range = "boolean" == typeof options.range && options.range, 
                    extra.loc = "boolean" == typeof options.loc && options.loc, "boolean" == typeof options.comment && options.comment && (extra.comments = []), 
                    "boolean" == typeof options.tolerant && options.tolerant && (extra.errors = []), 
                    length > 0 && "undefined" == typeof source[0] && // Try first to convert to a string. This is good as fast path
                    // for old IE which understands string indexing for string
                    // literals only and not for string object.
                    code instanceof String && (source = code.valueOf()), patch();
                    try {
                        if (peek(), lookahead.type === Token.EOF) return extra.tokens;
                        for (token = lex(); lookahead.type !== Token.EOF; ) try {
                            token = lex();
                        } catch (lexError) {
                            if (token = lookahead, extra.errors) {
                                extra.errors.push(lexError);
                                // We have to break on the first error
                                // to avoid infinite loops.
                                break;
                            }
                            throw lexError;
                        }
                        filterTokenLocation(), tokens = extra.tokens, "undefined" != typeof extra.comments && (filterCommentLocation(), 
                        tokens.comments = extra.comments), "undefined" != typeof extra.errors && (tokens.errors = extra.errors);
                    } catch (e) {
                        throw e;
                    } finally {
                        unpatch(), extra = {};
                    }
                    return tokens;
                }
                function parse(code, options) {
                    var program, toString;
                    toString = String, "string" == typeof code || code instanceof String || (code = toString(code)), 
                    delegate = SyntaxTreeDelegate, source = code, index = 0, lineNumber = source.length > 0 ? 1 : 0, 
                    lineStart = 0, length = source.length, lookahead = null, state = {
                        allowDefault: !1,
                        allowIn: !0,
                        labelSet: {},
                        parenthesizedCount: 0,
                        inFunctionBody: !1,
                        inIteration: !1,
                        inSwitch: !1,
                        yieldAllowed: !1,
                        yieldFound: !1
                    }, extra = {}, "undefined" != typeof options && (extra.range = "boolean" == typeof options.range && options.range, 
                    extra.loc = "boolean" == typeof options.loc && options.loc, extra.loc && null !== options.source && void 0 !== options.source && (delegate = extend(delegate, {
                        postProcess: function(node) {
                            return node.loc.source = toString(options.source), node;
                        }
                    })), "boolean" == typeof options.tokens && options.tokens && (extra.tokens = []), 
                    "boolean" == typeof options.comment && options.comment && (extra.comments = []), 
                    "boolean" == typeof options.tolerant && options.tolerant && (extra.errors = [])), 
                    length > 0 && "undefined" == typeof source[0] && // Try first to convert to a string. This is good as fast path
                    // for old IE which understands string indexing for string
                    // literals only and not for string object.
                    code instanceof String && (source = code.valueOf()), patch();
                    try {
                        program = parseProgram(), "undefined" != typeof extra.comments && (filterCommentLocation(), 
                        program.comments = extra.comments), "undefined" != typeof extra.tokens && (filterTokenLocation(), 
                        program.tokens = extra.tokens), "undefined" != typeof extra.errors && (program.errors = extra.errors), 
                        (extra.range || extra.loc) && (program.body = filterGroup(program.body));
                    } catch (e) {
                        throw e;
                    } finally {
                        unpatch(), extra = {};
                    }
                    return program;
                }
                var Token, TokenName, FnExprTokens, Syntax, PropertyKind, Messages, Regex, SyntaxTreeDelegate, XHTMLEntities, ClassPropertyType, source, strict, index, lineNumber, lineStart, length, delegate, lookahead, state, extra;
                Token = {
                    BooleanLiteral: 1,
                    EOF: 2,
                    Identifier: 3,
                    Keyword: 4,
                    NullLiteral: 5,
                    NumericLiteral: 6,
                    Punctuator: 7,
                    StringLiteral: 8,
                    RegularExpression: 9,
                    Template: 10,
                    XJSIdentifier: 11,
                    XJSText: 12
                }, TokenName = {}, TokenName[Token.BooleanLiteral] = "Boolean", TokenName[Token.EOF] = "<end>", 
                TokenName[Token.Identifier] = "Identifier", TokenName[Token.Keyword] = "Keyword", 
                TokenName[Token.NullLiteral] = "Null", TokenName[Token.NumericLiteral] = "Numeric", 
                TokenName[Token.Punctuator] = "Punctuator", TokenName[Token.StringLiteral] = "String", 
                TokenName[Token.XJSIdentifier] = "XJSIdentifier", TokenName[Token.XJSText] = "XJSText", 
                TokenName[Token.RegularExpression] = "RegularExpression", // A function following one of those tokens is an expression.
                FnExprTokens = [ "(", "{", "[", "in", "typeof", "instanceof", "new", "return", "case", "delete", "throw", "void", // assignment operators
                "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", ",", // binary/unary operators
                "+", "-", "*", "/", "%", "++", "--", "<<", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=", "<=", "<", ">", "!=", "!==" ], 
                Syntax = {
                    ArrayExpression: "ArrayExpression",
                    ArrayPattern: "ArrayPattern",
                    ArrowFunctionExpression: "ArrowFunctionExpression",
                    AssignmentExpression: "AssignmentExpression",
                    BinaryExpression: "BinaryExpression",
                    BlockStatement: "BlockStatement",
                    BreakStatement: "BreakStatement",
                    CallExpression: "CallExpression",
                    CatchClause: "CatchClause",
                    ClassBody: "ClassBody",
                    ClassDeclaration: "ClassDeclaration",
                    ClassExpression: "ClassExpression",
                    ClassHeritage: "ClassHeritage",
                    ComprehensionBlock: "ComprehensionBlock",
                    ComprehensionExpression: "ComprehensionExpression",
                    ConditionalExpression: "ConditionalExpression",
                    ContinueStatement: "ContinueStatement",
                    DebuggerStatement: "DebuggerStatement",
                    DoWhileStatement: "DoWhileStatement",
                    EmptyStatement: "EmptyStatement",
                    ExportDeclaration: "ExportDeclaration",
                    ExportBatchSpecifier: "ExportBatchSpecifier",
                    ExportSpecifier: "ExportSpecifier",
                    ExpressionStatement: "ExpressionStatement",
                    ForInStatement: "ForInStatement",
                    ForOfStatement: "ForOfStatement",
                    ForStatement: "ForStatement",
                    FunctionDeclaration: "FunctionDeclaration",
                    FunctionExpression: "FunctionExpression",
                    Identifier: "Identifier",
                    IfStatement: "IfStatement",
                    ImportDeclaration: "ImportDeclaration",
                    ImportSpecifier: "ImportSpecifier",
                    LabeledStatement: "LabeledStatement",
                    Literal: "Literal",
                    LogicalExpression: "LogicalExpression",
                    MemberExpression: "MemberExpression",
                    MethodDefinition: "MethodDefinition",
                    ModuleDeclaration: "ModuleDeclaration",
                    NewExpression: "NewExpression",
                    ObjectExpression: "ObjectExpression",
                    ObjectPattern: "ObjectPattern",
                    Program: "Program",
                    Property: "Property",
                    ReturnStatement: "ReturnStatement",
                    SequenceExpression: "SequenceExpression",
                    SpreadElement: "SpreadElement",
                    SwitchCase: "SwitchCase",
                    SwitchStatement: "SwitchStatement",
                    TaggedTemplateExpression: "TaggedTemplateExpression",
                    TemplateElement: "TemplateElement",
                    TemplateLiteral: "TemplateLiteral",
                    ThisExpression: "ThisExpression",
                    ThrowStatement: "ThrowStatement",
                    TryStatement: "TryStatement",
                    TypeAnnotatedIdentifier: "TypeAnnotatedIdentifier",
                    TypeAnnotation: "TypeAnnotation",
                    UnaryExpression: "UnaryExpression",
                    UpdateExpression: "UpdateExpression",
                    VariableDeclaration: "VariableDeclaration",
                    VariableDeclarator: "VariableDeclarator",
                    WhileStatement: "WhileStatement",
                    WithStatement: "WithStatement",
                    XJSIdentifier: "XJSIdentifier",
                    XJSEmptyExpression: "XJSEmptyExpression",
                    XJSExpressionContainer: "XJSExpressionContainer",
                    XJSElement: "XJSElement",
                    XJSClosingElement: "XJSClosingElement",
                    XJSOpeningElement: "XJSOpeningElement",
                    XJSAttribute: "XJSAttribute",
                    XJSText: "XJSText",
                    YieldExpression: "YieldExpression"
                }, PropertyKind = {
                    Data: 1,
                    Get: 2,
                    Set: 4
                }, ClassPropertyType = {
                    "static": "static",
                    prototype: "prototype"
                }, // Error messages should be identical to V8.
                Messages = {
                    UnexpectedToken: "Unexpected token %0",
                    UnexpectedNumber: "Unexpected number",
                    UnexpectedString: "Unexpected string",
                    UnexpectedIdentifier: "Unexpected identifier",
                    UnexpectedReserved: "Unexpected reserved word",
                    UnexpectedTemplate: "Unexpected quasi %0",
                    UnexpectedEOS: "Unexpected end of input",
                    NewlineAfterThrow: "Illegal newline after throw",
                    InvalidRegExp: "Invalid regular expression",
                    UnterminatedRegExp: "Invalid regular expression: missing /",
                    InvalidLHSInAssignment: "Invalid left-hand side in assignment",
                    InvalidLHSInFormalsList: "Invalid left-hand side in formals list",
                    InvalidLHSInForIn: "Invalid left-hand side in for-in",
                    MultipleDefaultsInSwitch: "More than one default clause in switch statement",
                    NoCatchOrFinally: "Missing catch or finally after try",
                    UnknownLabel: "Undefined label '%0'",
                    Redeclaration: "%0 '%1' has already been declared",
                    IllegalContinue: "Illegal continue statement",
                    IllegalBreak: "Illegal break statement",
                    IllegalDuplicateClassProperty: "Illegal duplicate property in class definition",
                    IllegalReturn: "Illegal return statement",
                    IllegalYield: "Illegal yield expression",
                    IllegalSpread: "Illegal spread element",
                    StrictModeWith: "Strict mode code may not include a with statement",
                    StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
                    StrictVarName: "Variable name may not be eval or arguments in strict mode",
                    StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
                    StrictParamDupe: "Strict mode function may not have duplicate parameter names",
                    ParameterAfterRestParameter: "Rest parameter must be final parameter of an argument list",
                    DefaultRestParameter: "Rest parameter can not have a default value",
                    ElementAfterSpreadElement: "Spread must be the final element of an element list",
                    ObjectPatternAsRestParameter: "Invalid rest parameter",
                    ObjectPatternAsSpread: "Invalid spread argument",
                    StrictFunctionName: "Function name may not be eval or arguments in strict mode",
                    StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
                    StrictDelete: "Delete of an unqualified identifier in strict mode.",
                    StrictDuplicateProperty: "Duplicate data property in object literal not allowed in strict mode",
                    AccessorDataProperty: "Object literal may not have data and accessor property with the same name",
                    AccessorGetSet: "Object literal may not have multiple get/set accessors with the same name",
                    StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
                    StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
                    StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
                    StrictReservedWord: "Use of future reserved word in strict mode",
                    NewlineAfterModule: "Illegal newline after module",
                    NoFromAfterImport: "Missing from after import",
                    InvalidModuleSpecifier: "Invalid module specifier",
                    NestedModule: "Module declaration can not be nested",
                    NoYieldInGenerator: "Missing yield in generator",
                    NoUnintializedConst: "Const must be initialized",
                    ComprehensionRequiresBlock: "Comprehension must have at least one block",
                    ComprehensionError: "Comprehension Error",
                    EachNotAllowed: "Each is not supported",
                    InvalidXJSTagName: "XJS tag name can not be empty",
                    InvalidXJSAttributeValue: "XJS value should be either an expression or a quoted XJS text",
                    ExpectedXJSClosingTag: "Expected corresponding XJS closing tag for %0"
                }, // See also tools/generate-unicode-regex.py.
                Regex = {
                    NonAsciiIdentifierStart: new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),
                    NonAsciiIdentifierPart: new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")
                }, SyntaxTreeDelegate = {
                    name: "SyntaxTree",
                    postProcess: function(node) {
                        return node;
                    },
                    createArrayExpression: function(elements) {
                        return {
                            type: Syntax.ArrayExpression,
                            elements: elements
                        };
                    },
                    createAssignmentExpression: function(operator, left, right) {
                        return {
                            type: Syntax.AssignmentExpression,
                            operator: operator,
                            left: left,
                            right: right
                        };
                    },
                    createBinaryExpression: function(operator, left, right) {
                        var type = "||" === operator || "&&" === operator ? Syntax.LogicalExpression : Syntax.BinaryExpression;
                        return {
                            type: type,
                            operator: operator,
                            left: left,
                            right: right
                        };
                    },
                    createBlockStatement: function(body) {
                        return {
                            type: Syntax.BlockStatement,
                            body: body
                        };
                    },
                    createBreakStatement: function(label) {
                        return {
                            type: Syntax.BreakStatement,
                            label: label
                        };
                    },
                    createCallExpression: function(callee, args) {
                        return {
                            type: Syntax.CallExpression,
                            callee: callee,
                            arguments: args
                        };
                    },
                    createCatchClause: function(param, body) {
                        return {
                            type: Syntax.CatchClause,
                            param: param,
                            body: body
                        };
                    },
                    createConditionalExpression: function(test, consequent, alternate) {
                        return {
                            type: Syntax.ConditionalExpression,
                            test: test,
                            consequent: consequent,
                            alternate: alternate
                        };
                    },
                    createContinueStatement: function(label) {
                        return {
                            type: Syntax.ContinueStatement,
                            label: label
                        };
                    },
                    createDebuggerStatement: function() {
                        return {
                            type: Syntax.DebuggerStatement
                        };
                    },
                    createDoWhileStatement: function(body, test) {
                        return {
                            type: Syntax.DoWhileStatement,
                            body: body,
                            test: test
                        };
                    },
                    createEmptyStatement: function() {
                        return {
                            type: Syntax.EmptyStatement
                        };
                    },
                    createExpressionStatement: function(expression) {
                        return {
                            type: Syntax.ExpressionStatement,
                            expression: expression
                        };
                    },
                    createForStatement: function(init, test, update, body) {
                        return {
                            type: Syntax.ForStatement,
                            init: init,
                            test: test,
                            update: update,
                            body: body
                        };
                    },
                    createForInStatement: function(left, right, body) {
                        return {
                            type: Syntax.ForInStatement,
                            left: left,
                            right: right,
                            body: body,
                            each: !1
                        };
                    },
                    createForOfStatement: function(left, right, body) {
                        return {
                            type: Syntax.ForOfStatement,
                            left: left,
                            right: right,
                            body: body
                        };
                    },
                    createFunctionDeclaration: function(id, params, defaults, body, rest, generator, expression, returnTypeAnnotation) {
                        return {
                            type: Syntax.FunctionDeclaration,
                            id: id,
                            params: params,
                            defaults: defaults,
                            returnType: returnTypeAnnotation,
                            body: body,
                            rest: rest,
                            generator: generator,
                            expression: expression
                        };
                    },
                    createFunctionExpression: function(id, params, defaults, body, rest, generator, expression, returnTypeAnnotation) {
                        return {
                            type: Syntax.FunctionExpression,
                            id: id,
                            params: params,
                            defaults: defaults,
                            returnType: returnTypeAnnotation,
                            body: body,
                            rest: rest,
                            generator: generator,
                            expression: expression
                        };
                    },
                    createIdentifier: function(name) {
                        return {
                            type: Syntax.Identifier,
                            name: name
                        };
                    },
                    createTypeAnnotatedIdentifier: function(annotation, identifier) {
                        return {
                            type: Syntax.TypeAnnotatedIdentifier,
                            annotation: annotation,
                            identifier: identifier
                        };
                    },
                    createTypeAnnotation: function(annotatedType, templateTypes, paramTypes, returnType, unionType, nullable) {
                        return {
                            type: Syntax.TypeAnnotation,
                            annotatedType: annotatedType,
                            templateTypes: templateTypes,
                            paramTypes: paramTypes,
                            returnType: returnType,
                            unionType: unionType,
                            nullable: nullable
                        };
                    },
                    createXJSAttribute: function(name, value) {
                        return {
                            type: Syntax.XJSAttribute,
                            name: name,
                            value: value
                        };
                    },
                    createXJSIdentifier: function(name, namespace) {
                        return {
                            type: Syntax.XJSIdentifier,
                            name: name,
                            namespace: namespace
                        };
                    },
                    createXJSElement: function(openingElement, closingElement, children) {
                        return {
                            type: Syntax.XJSElement,
                            name: openingElement.name,
                            selfClosing: openingElement.selfClosing,
                            openingElement: openingElement,
                            closingElement: closingElement,
                            attributes: openingElement.attributes,
                            children: children
                        };
                    },
                    createXJSEmptyExpression: function() {
                        return {
                            type: Syntax.XJSEmptyExpression
                        };
                    },
                    createXJSExpressionContainer: function(expression) {
                        return {
                            type: Syntax.XJSExpressionContainer,
                            expression: expression
                        };
                    },
                    createXJSOpeningElement: function(name, attributes, selfClosing) {
                        return {
                            type: Syntax.XJSOpeningElement,
                            name: name,
                            selfClosing: selfClosing,
                            attributes: attributes
                        };
                    },
                    createXJSClosingElement: function(name) {
                        return {
                            type: Syntax.XJSClosingElement,
                            name: name
                        };
                    },
                    createIfStatement: function(test, consequent, alternate) {
                        return {
                            type: Syntax.IfStatement,
                            test: test,
                            consequent: consequent,
                            alternate: alternate
                        };
                    },
                    createLabeledStatement: function(label, body) {
                        return {
                            type: Syntax.LabeledStatement,
                            label: label,
                            body: body
                        };
                    },
                    createLiteral: function(token) {
                        return {
                            type: Syntax.Literal,
                            value: token.value,
                            raw: source.slice(token.range[0], token.range[1])
                        };
                    },
                    createMemberExpression: function(accessor, object, property) {
                        return {
                            type: Syntax.MemberExpression,
                            computed: "[" === accessor,
                            object: object,
                            property: property
                        };
                    },
                    createNewExpression: function(callee, args) {
                        return {
                            type: Syntax.NewExpression,
                            callee: callee,
                            arguments: args
                        };
                    },
                    createObjectExpression: function(properties) {
                        return {
                            type: Syntax.ObjectExpression,
                            properties: properties
                        };
                    },
                    createPostfixExpression: function(operator, argument) {
                        return {
                            type: Syntax.UpdateExpression,
                            operator: operator,
                            argument: argument,
                            prefix: !1
                        };
                    },
                    createProgram: function(body) {
                        return {
                            type: Syntax.Program,
                            body: body
                        };
                    },
                    createProperty: function(kind, key, value, method, shorthand) {
                        return {
                            type: Syntax.Property,
                            key: key,
                            value: value,
                            kind: kind,
                            method: method,
                            shorthand: shorthand
                        };
                    },
                    createReturnStatement: function(argument) {
                        return {
                            type: Syntax.ReturnStatement,
                            argument: argument
                        };
                    },
                    createSequenceExpression: function(expressions) {
                        return {
                            type: Syntax.SequenceExpression,
                            expressions: expressions
                        };
                    },
                    createSwitchCase: function(test, consequent) {
                        return {
                            type: Syntax.SwitchCase,
                            test: test,
                            consequent: consequent
                        };
                    },
                    createSwitchStatement: function(discriminant, cases) {
                        return {
                            type: Syntax.SwitchStatement,
                            discriminant: discriminant,
                            cases: cases
                        };
                    },
                    createThisExpression: function() {
                        return {
                            type: Syntax.ThisExpression
                        };
                    },
                    createThrowStatement: function(argument) {
                        return {
                            type: Syntax.ThrowStatement,
                            argument: argument
                        };
                    },
                    createTryStatement: function(block, guardedHandlers, handlers, finalizer) {
                        return {
                            type: Syntax.TryStatement,
                            block: block,
                            guardedHandlers: guardedHandlers,
                            handlers: handlers,
                            finalizer: finalizer
                        };
                    },
                    createUnaryExpression: function(operator, argument) {
                        return "++" === operator || "--" === operator ? {
                            type: Syntax.UpdateExpression,
                            operator: operator,
                            argument: argument,
                            prefix: !0
                        } : {
                            type: Syntax.UnaryExpression,
                            operator: operator,
                            argument: argument
                        };
                    },
                    createVariableDeclaration: function(declarations, kind) {
                        return {
                            type: Syntax.VariableDeclaration,
                            declarations: declarations,
                            kind: kind
                        };
                    },
                    createVariableDeclarator: function(id, init) {
                        return {
                            type: Syntax.VariableDeclarator,
                            id: id,
                            init: init
                        };
                    },
                    createWhileStatement: function(test, body) {
                        return {
                            type: Syntax.WhileStatement,
                            test: test,
                            body: body
                        };
                    },
                    createWithStatement: function(object, body) {
                        return {
                            type: Syntax.WithStatement,
                            object: object,
                            body: body
                        };
                    },
                    createTemplateElement: function(value, tail) {
                        return {
                            type: Syntax.TemplateElement,
                            value: value,
                            tail: tail
                        };
                    },
                    createTemplateLiteral: function(quasis, expressions) {
                        return {
                            type: Syntax.TemplateLiteral,
                            quasis: quasis,
                            expressions: expressions
                        };
                    },
                    createSpreadElement: function(argument) {
                        return {
                            type: Syntax.SpreadElement,
                            argument: argument
                        };
                    },
                    createTaggedTemplateExpression: function(tag, quasi) {
                        return {
                            type: Syntax.TaggedTemplateExpression,
                            tag: tag,
                            quasi: quasi
                        };
                    },
                    createArrowFunctionExpression: function(params, defaults, body, rest, expression) {
                        return {
                            type: Syntax.ArrowFunctionExpression,
                            id: null,
                            params: params,
                            defaults: defaults,
                            body: body,
                            rest: rest,
                            generator: !1,
                            expression: expression
                        };
                    },
                    createMethodDefinition: function(propertyType, kind, key, value) {
                        return {
                            type: Syntax.MethodDefinition,
                            key: key,
                            value: value,
                            kind: kind,
                            "static": propertyType === ClassPropertyType.static
                        };
                    },
                    createClassBody: function(body) {
                        return {
                            type: Syntax.ClassBody,
                            body: body
                        };
                    },
                    createClassExpression: function(id, superClass, body) {
                        return {
                            type: Syntax.ClassExpression,
                            id: id,
                            superClass: superClass,
                            body: body
                        };
                    },
                    createClassDeclaration: function(id, superClass, body) {
                        return {
                            type: Syntax.ClassDeclaration,
                            id: id,
                            superClass: superClass,
                            body: body
                        };
                    },
                    createExportSpecifier: function(id, name) {
                        return {
                            type: Syntax.ExportSpecifier,
                            id: id,
                            name: name
                        };
                    },
                    createExportBatchSpecifier: function() {
                        return {
                            type: Syntax.ExportBatchSpecifier
                        };
                    },
                    createExportDeclaration: function(def, declaration, specifiers, source) {
                        return {
                            type: Syntax.ExportDeclaration,
                            declaration: declaration,
                            "default": def,
                            specifiers: specifiers,
                            source: source
                        };
                    },
                    createImportSpecifier: function(id, name) {
                        return {
                            type: Syntax.ImportSpecifier,
                            id: id,
                            name: name
                        };
                    },
                    createImportDeclaration: function(specifiers, kind, source) {
                        return {
                            type: Syntax.ImportDeclaration,
                            specifiers: specifiers,
                            kind: kind,
                            source: source
                        };
                    },
                    createYieldExpression: function(argument, delegate) {
                        return {
                            type: Syntax.YieldExpression,
                            argument: argument,
                            delegate: delegate
                        };
                    },
                    createModuleDeclaration: function(id, source, body) {
                        return {
                            type: Syntax.ModuleDeclaration,
                            id: id,
                            source: source,
                            body: body
                        };
                    }
                }, // 16 XJS
                XHTMLEntities = {
                    quot: '"',
                    amp: "&",
                    apos: "'",
                    lt: "<",
                    gt: ">",
                    nbsp: " ",
                    iexcl: "¡",
                    cent: "¢",
                    pound: "£",
                    curren: "¤",
                    yen: "¥",
                    brvbar: "¦",
                    sect: "§",
                    uml: "¨",
                    copy: "©",
                    ordf: "ª",
                    laquo: "«",
                    not: "¬",
                    shy: "­",
                    reg: "®",
                    macr: "¯",
                    deg: "°",
                    plusmn: "±",
                    sup2: "²",
                    sup3: "³",
                    acute: "´",
                    micro: "µ",
                    para: "¶",
                    middot: "·",
                    cedil: "¸",
                    sup1: "¹",
                    ordm: "º",
                    raquo: "»",
                    frac14: "¼",
                    frac12: "½",
                    frac34: "¾",
                    iquest: "¿",
                    Agrave: "À",
                    Aacute: "Á",
                    Acirc: "Â",
                    Atilde: "Ã",
                    Auml: "Ä",
                    Aring: "Å",
                    AElig: "Æ",
                    Ccedil: "Ç",
                    Egrave: "È",
                    Eacute: "É",
                    Ecirc: "Ê",
                    Euml: "Ë",
                    Igrave: "Ì",
                    Iacute: "Í",
                    Icirc: "Î",
                    Iuml: "Ï",
                    ETH: "Ð",
                    Ntilde: "Ñ",
                    Ograve: "Ò",
                    Oacute: "Ó",
                    Ocirc: "Ô",
                    Otilde: "Õ",
                    Ouml: "Ö",
                    times: "×",
                    Oslash: "Ø",
                    Ugrave: "Ù",
                    Uacute: "Ú",
                    Ucirc: "Û",
                    Uuml: "Ü",
                    Yacute: "Ý",
                    THORN: "Þ",
                    szlig: "ß",
                    agrave: "à",
                    aacute: "á",
                    acirc: "â",
                    atilde: "ã",
                    auml: "ä",
                    aring: "å",
                    aelig: "æ",
                    ccedil: "ç",
                    egrave: "è",
                    eacute: "é",
                    ecirc: "ê",
                    euml: "ë",
                    igrave: "ì",
                    iacute: "í",
                    icirc: "î",
                    iuml: "ï",
                    eth: "ð",
                    ntilde: "ñ",
                    ograve: "ò",
                    oacute: "ó",
                    ocirc: "ô",
                    otilde: "õ",
                    ouml: "ö",
                    divide: "÷",
                    oslash: "ø",
                    ugrave: "ù",
                    uacute: "ú",
                    ucirc: "û",
                    uuml: "ü",
                    yacute: "ý",
                    thorn: "þ",
                    yuml: "ÿ",
                    OElig: "Œ",
                    oelig: "œ",
                    Scaron: "Š",
                    scaron: "š",
                    Yuml: "Ÿ",
                    fnof: "ƒ",
                    circ: "ˆ",
                    tilde: "˜",
                    Alpha: "Α",
                    Beta: "Β",
                    Gamma: "Γ",
                    Delta: "Δ",
                    Epsilon: "Ε",
                    Zeta: "Ζ",
                    Eta: "Η",
                    Theta: "Θ",
                    Iota: "Ι",
                    Kappa: "Κ",
                    Lambda: "Λ",
                    Mu: "Μ",
                    Nu: "Ν",
                    Xi: "Ξ",
                    Omicron: "Ο",
                    Pi: "Π",
                    Rho: "Ρ",
                    Sigma: "Σ",
                    Tau: "Τ",
                    Upsilon: "Υ",
                    Phi: "Φ",
                    Chi: "Χ",
                    Psi: "Ψ",
                    Omega: "Ω",
                    alpha: "α",
                    beta: "β",
                    gamma: "γ",
                    delta: "δ",
                    epsilon: "ε",
                    zeta: "ζ",
                    eta: "η",
                    theta: "θ",
                    iota: "ι",
                    kappa: "κ",
                    lambda: "λ",
                    mu: "μ",
                    nu: "ν",
                    xi: "ξ",
                    omicron: "ο",
                    pi: "π",
                    rho: "ρ",
                    sigmaf: "ς",
                    sigma: "σ",
                    tau: "τ",
                    upsilon: "υ",
                    phi: "φ",
                    chi: "χ",
                    psi: "ψ",
                    omega: "ω",
                    thetasym: "ϑ",
                    upsih: "ϒ",
                    piv: "ϖ",
                    ensp: " ",
                    emsp: " ",
                    thinsp: " ",
                    zwnj: "‌",
                    zwj: "‍",
                    lrm: "‎",
                    rlm: "‏",
                    ndash: "–",
                    mdash: "—",
                    lsquo: "‘",
                    rsquo: "’",
                    sbquo: "‚",
                    ldquo: "“",
                    rdquo: "”",
                    bdquo: "„",
                    dagger: "†",
                    Dagger: "‡",
                    bull: "•",
                    hellip: "…",
                    permil: "‰",
                    prime: "′",
                    Prime: "″",
                    lsaquo: "‹",
                    rsaquo: "›",
                    oline: "‾",
                    frasl: "⁄",
                    euro: "€",
                    image: "ℑ",
                    weierp: "℘",
                    real: "ℜ",
                    trade: "™",
                    alefsym: "ℵ",
                    larr: "←",
                    uarr: "↑",
                    rarr: "→",
                    darr: "↓",
                    harr: "↔",
                    crarr: "↵",
                    lArr: "⇐",
                    uArr: "⇑",
                    rArr: "⇒",
                    dArr: "⇓",
                    hArr: "⇔",
                    forall: "∀",
                    part: "∂",
                    exist: "∃",
                    empty: "∅",
                    nabla: "∇",
                    isin: "∈",
                    notin: "∉",
                    ni: "∋",
                    prod: "∏",
                    sum: "∑",
                    minus: "−",
                    lowast: "∗",
                    radic: "√",
                    prop: "∝",
                    infin: "∞",
                    ang: "∠",
                    and: "∧",
                    or: "∨",
                    cap: "∩",
                    cup: "∪",
                    "int": "∫",
                    there4: "∴",
                    sim: "∼",
                    cong: "≅",
                    asymp: "≈",
                    ne: "≠",
                    equiv: "≡",
                    le: "≤",
                    ge: "≥",
                    sub: "⊂",
                    sup: "⊃",
                    nsub: "⊄",
                    sube: "⊆",
                    supe: "⊇",
                    oplus: "⊕",
                    otimes: "⊗",
                    perp: "⊥",
                    sdot: "⋅",
                    lceil: "⌈",
                    rceil: "⌉",
                    lfloor: "⌊",
                    rfloor: "⌋",
                    lang: "〈",
                    rang: "〉",
                    loz: "◊",
                    spades: "♠",
                    clubs: "♣",
                    hearts: "♥",
                    diams: "♦"
                }, LocationMarker.prototype = {
                    constructor: LocationMarker,
                    end: function() {
                        this.range[1] = index, this.loc.end.line = lineNumber, this.loc.end.column = index - lineStart;
                    },
                    applyGroup: function(node) {
                        extra.range && (node.groupRange = [ this.range[0], this.range[1] ]), extra.loc && (node.groupLoc = {
                            start: {
                                line: this.loc.start.line,
                                column: this.loc.start.column
                            },
                            end: {
                                line: this.loc.end.line,
                                column: this.loc.end.column
                            }
                        }, node = delegate.postProcess(node));
                    },
                    apply: function(node) {
                        var nodeType = typeof node;
                        assert("object" === nodeType, "Applying location marker to an unexpected node type: " + nodeType), 
                        extra.range && (node.range = [ this.range[0], this.range[1] ]), extra.loc && (node.loc = {
                            start: {
                                line: this.loc.start.line,
                                column: this.loc.start.column
                            },
                            end: {
                                line: this.loc.end.line,
                                column: this.loc.end.column
                            }
                        }, node = delegate.postProcess(node));
                    }
                }, // Sync with package.json and component.json.
                exports.version = "1.1.0-dev-harmony", exports.tokenize = tokenize, exports.parse = parse, 
                // Deep copy.
                exports.Syntax = function() {
                    var name, types = {};
                    "function" == typeof Object.create && (types = Object.create(null));
                    for (name in Syntax) Syntax.hasOwnProperty(name) && (types[name] = Syntax[name]);
                    return "function" == typeof Object.freeze && Object.freeze(types), types;
                }();
            });
        }, {} ],
        7: [ function(require, module) {
            var Base62 = function(my) {
                return my.chars = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ], 
                my.encode = function(i) {
                    if (0 === i) return "0";
                    for (var s = ""; i > 0; ) s = this.chars[i % 62] + s, i = Math.floor(i / 62);
                    return s;
                }, my.decode = function(a, b, c, d) {
                    for (b = c = (a === (/\W|_|^$/.test(a += "") || a)) - 1; d = a.charCodeAt(c++); ) b = 62 * b + d - [ , 48, 29, 87 ][d >> 5];
                    return b;
                }, my;
            }({});
            module.exports = Base62;
        }, {} ],
        8: [ function(require, module, exports) {
            /*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
            exports.SourceMapGenerator = require("./source-map/source-map-generator").SourceMapGenerator, 
            exports.SourceMapConsumer = require("./source-map/source-map-consumer").SourceMapConsumer, 
            exports.SourceNode = require("./source-map/source-node").SourceNode;
        }, {
            "./source-map/source-map-consumer": 13,
            "./source-map/source-map-generator": 14,
            "./source-map/source-node": 15
        } ],
        9: [ function(require, module) {
            /* -*- Mode: js; js-indent-level: 2; -*- */
            /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
            if ("function" != typeof define) var define = require("amdefine")(module);
            define(function(require, exports) {
                /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
                function ArraySet() {
                    this._array = [], this._set = {};
                }
                /**
   * Static method for creating ArraySet instances from an existing array.
   */
                ArraySet.fromArray = function(aArray) {
                    for (var set = new ArraySet(), i = 0, len = aArray.length; len > i; i++) set.add(aArray[i]);
                    return set;
                }, /**
   * Because behavior goes wacky when you set `__proto__` on `this._set`, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
                ArraySet.prototype._toSetString = function(aStr) {
                    return "$" + aStr;
                }, /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
                ArraySet.prototype.add = function(aStr) {
                    if (!this.has(aStr)) {
                        var idx = this._array.length;
                        this._array.push(aStr), this._set[this._toSetString(aStr)] = idx;
                    }
                }, /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
                ArraySet.prototype.has = function(aStr) {
                    return Object.prototype.hasOwnProperty.call(this._set, this._toSetString(aStr));
                }, /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
                ArraySet.prototype.indexOf = function(aStr) {
                    if (this.has(aStr)) return this._set[this._toSetString(aStr)];
                    throw new Error('"' + aStr + '" is not in the set.');
                }, /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
                ArraySet.prototype.at = function(aIdx) {
                    if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
                    throw new Error("No element indexed by " + aIdx);
                }, /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
                ArraySet.prototype.toArray = function() {
                    return this._array.slice();
                }, exports.ArraySet = ArraySet;
            });
        }, {
            amdefine: 17
        } ],
        10: [ function(require, module) {
            /* -*- Mode: js; js-indent-level: 2; -*- */
            /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
            if ("function" != typeof define) var define = require("amdefine")(module);
            define(function(require, exports) {
                /**
   * Converts from a two-complement value to a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
                function toVLQSigned(aValue) {
                    return 0 > aValue ? (-aValue << 1) + 1 : (aValue << 1) + 0;
                }
                /**
   * Converts to a two-complement value from a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
                function fromVLQSigned(aValue) {
                    var isNegative = 1 === (1 & aValue), shifted = aValue >> 1;
                    return isNegative ? -shifted : shifted;
                }
                var base64 = require("./base64"), VLQ_BASE_SHIFT = 5, VLQ_BASE = 1 << VLQ_BASE_SHIFT, VLQ_BASE_MASK = VLQ_BASE - 1, VLQ_CONTINUATION_BIT = VLQ_BASE;
                /**
   * Returns the base 64 VLQ encoded value.
   */
                exports.encode = function(aValue) {
                    var digit, encoded = "", vlq = toVLQSigned(aValue);
                    do digit = vlq & VLQ_BASE_MASK, vlq >>>= VLQ_BASE_SHIFT, vlq > 0 && (// There are still more digits in this value, so we must make sure the
                    // continuation bit is marked.
                    digit |= VLQ_CONTINUATION_BIT), encoded += base64.encode(digit); while (vlq > 0);
                    return encoded;
                }, /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string.
   */
                exports.decode = function(aStr) {
                    var continuation, digit, i = 0, strLen = aStr.length, result = 0, shift = 0;
                    do {
                        if (i >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
                        digit = base64.decode(aStr.charAt(i++)), continuation = !!(digit & VLQ_CONTINUATION_BIT), 
                        digit &= VLQ_BASE_MASK, result += digit << shift, shift += VLQ_BASE_SHIFT;
                    } while (continuation);
                    return {
                        value: fromVLQSigned(result),
                        rest: aStr.slice(i)
                    };
                };
            });
        }, {
            "./base64": 11,
            amdefine: 17
        } ],
        11: [ function(require, module) {
            /* -*- Mode: js; js-indent-level: 2; -*- */
            /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
            if ("function" != typeof define) var define = require("amdefine")(module);
            define(function(require, exports) {
                var charToIntMap = {}, intToCharMap = {};
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("").forEach(function(ch, index) {
                    charToIntMap[ch] = index, intToCharMap[index] = ch;
                }), /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
                exports.encode = function(aNumber) {
                    if (aNumber in intToCharMap) return intToCharMap[aNumber];
                    throw new TypeError("Must be between 0 and 63: " + aNumber);
                }, /**
   * Decode a single base 64 digit to an integer.
   */
                exports.decode = function(aChar) {
                    if (aChar in charToIntMap) return charToIntMap[aChar];
                    throw new TypeError("Not a valid base 64 digit: " + aChar);
                };
            });
        }, {
            amdefine: 17
        } ],
        12: [ function(require, module) {
            /* -*- Mode: js; js-indent-level: 2; -*- */
            /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
            if ("function" != typeof define) var define = require("amdefine")(module);
            define(function(require, exports) {
                /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   */
                function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
                    // This function terminates when one of the following is true:
                    //
                    //   1. We find the exact element we are looking for.
                    //
                    //   2. We did not find the exact element, but we can return the next
                    //      closest element that is less than that element.
                    //
                    //   3. We did not find the exact element, and there is no next-closest
                    //      element which is less than the one we are searching for, so we
                    //      return null.
                    var mid = Math.floor((aHigh - aLow) / 2) + aLow, cmp = aCompare(aNeedle, aHaystack[mid]);
                    return 0 === cmp ? aHaystack[mid] : cmp > 0 ? // aHaystack[mid] is greater than our needle.
                    aHigh - mid > 1 ? recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare) : aHaystack[mid] : // aHaystack[mid] is less than our needle.
                    mid - aLow > 1 ? recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare) : 0 > aLow ? null : aHaystack[aLow];
                }
                /**
   * This is an implementation of binary search which will always try and return
   * the next lowest value checked if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   */
                exports.search = function(aNeedle, aHaystack, aCompare) {
                    return aHaystack.length > 0 ? recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare) : null;
                };
            });
        }, {
            amdefine: 17
        } ],
        13: [ function(require, module) {
            /* -*- Mode: js; js-indent-level: 2; -*- */
            /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
            if ("function" != typeof define) var define = require("amdefine")(module);
            define(function(require, exports) {
                /**
   * A SourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
                function SourceMapConsumer(aSourceMap) {
                    var sourceMap = aSourceMap;
                    "string" == typeof aSourceMap && (sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, "")));
                    var version = util.getArg(sourceMap, "version"), sources = util.getArg(sourceMap, "sources"), names = util.getArg(sourceMap, "names"), sourceRoot = util.getArg(sourceMap, "sourceRoot", null), mappings = util.getArg(sourceMap, "mappings"), file = util.getArg(sourceMap, "file");
                    if (version !== this._version) throw new Error("Unsupported version: " + version);
                    this._names = ArraySet.fromArray(names), this._sources = ArraySet.fromArray(sources), 
                    this._sourceRoot = sourceRoot, this.file = file, // `this._generatedMappings` and `this._originalMappings` hold the parsed
                    // mapping coordinates from the source map's "mappings" attribute. Each
                    // object in the array is of the form
                    //
                    //     {
                    //       generatedLine: The line number in the generated code,
                    //       generatedColumn: The column number in the generated code,
                    //       source: The path to the original source file that generated this
                    //               chunk of code,
                    //       originalLine: The line number in the original source that
                    //                     corresponds to this chunk of generated code,
                    //       originalColumn: The column number in the original source that
                    //                       corresponds to this chunk of generated code,
                    //       name: The name of the original symbol which generated this chunk of
                    //             code.
                    //     }
                    //
                    // All properties except for `generatedLine` and `generatedColumn` can be
                    // `null`.
                    //
                    // `this._generatedMappings` is ordered by the generated positions.
                    //
                    // `this._originalMappings` is ordered by the original positions.
                    this._generatedMappings = [], this._originalMappings = [], this._parseMappings(mappings, sourceRoot);
                }
                var util = require("./util"), binarySearch = require("./binary-search"), ArraySet = require("./array-set").ArraySet, base64VLQ = require("./base64-vlq");
                /**
   * The version of the source mapping spec that we are consuming.
   */
                SourceMapConsumer.prototype._version = 3, /**
   * The list of original sources.
   */
                Object.defineProperty(SourceMapConsumer.prototype, "sources", {
                    get: function() {
                        return this._sources.toArray().map(function(s) {
                            return this._sourceRoot ? util.join(this._sourceRoot, s) : s;
                        }, this);
                    }
                }), /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (an ordered list in this._generatedMappings).
   */
                SourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
                    for (var mapping, temp, generatedLine = 1, previousGeneratedColumn = 0, previousOriginalLine = 0, previousOriginalColumn = 0, previousSource = 0, previousName = 0, mappingSeparator = /^[,;]/, str = aStr; str.length > 0; ) if (";" === str.charAt(0)) generatedLine++, 
                    str = str.slice(1), previousGeneratedColumn = 0; else if ("," === str.charAt(0)) str = str.slice(1); else {
                        if (mapping = {}, mapping.generatedLine = generatedLine, // Generated column.
                        temp = base64VLQ.decode(str), mapping.generatedColumn = previousGeneratedColumn + temp.value, 
                        previousGeneratedColumn = mapping.generatedColumn, str = temp.rest, str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
                            if (// Original source.
                            temp = base64VLQ.decode(str), mapping.source = aSourceRoot ? util.join(aSourceRoot, this._sources.at(previousSource + temp.value)) : this._sources.at(previousSource + temp.value), 
                            previousSource += temp.value, str = temp.rest, 0 === str.length || mappingSeparator.test(str.charAt(0))) throw new Error("Found a source, but no line and column");
                            if (// Original line.
                            temp = base64VLQ.decode(str), mapping.originalLine = previousOriginalLine + temp.value, 
                            previousOriginalLine = mapping.originalLine, // Lines are stored 0-based
                            mapping.originalLine += 1, str = temp.rest, 0 === str.length || mappingSeparator.test(str.charAt(0))) throw new Error("Found a source and line, but no column");
                            // Original column.
                            temp = base64VLQ.decode(str), mapping.originalColumn = previousOriginalColumn + temp.value, 
                            previousOriginalColumn = mapping.originalColumn, str = temp.rest, str.length > 0 && !mappingSeparator.test(str.charAt(0)) && (// Original name.
                            temp = base64VLQ.decode(str), mapping.name = this._names.at(previousName + temp.value), 
                            previousName += temp.value, str = temp.rest);
                        }
                        this._generatedMappings.push(mapping), this._originalMappings.push(mapping);
                    }
                    this._originalMappings.sort(this._compareOriginalPositions);
                }, /**
   * Comparator between two mappings where the original positions are compared.
   */
                SourceMapConsumer.prototype._compareOriginalPositions = function(mappingA, mappingB) {
                    if (mappingA.source > mappingB.source) return 1;
                    if (mappingA.source < mappingB.source) return -1;
                    var cmp = mappingA.originalLine - mappingB.originalLine;
                    return 0 === cmp ? mappingA.originalColumn - mappingB.originalColumn : cmp;
                }, /**
   * Comparator between two mappings where the generated positions are compared.
   */
                SourceMapConsumer.prototype._compareGeneratedPositions = function(mappingA, mappingB) {
                    var cmp = mappingA.generatedLine - mappingB.generatedLine;
                    return 0 === cmp ? mappingA.generatedColumn - mappingB.generatedColumn : cmp;
                }, /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
                SourceMapConsumer.prototype._findMapping = function(aNeedle, aMappings, aLineName, aColumnName, aComparator) {
                    // To return the position we are searching for, we must first find the
                    // mapping for the given position and then return the opposite position it
                    // points to. Because the mappings are sorted, we can use binary search to
                    // find the best mapping.
                    if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
                    if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
                    return binarySearch.search(aNeedle, aMappings, aComparator);
                }, /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
                SourceMapConsumer.prototype.originalPositionFor = function(aArgs) {
                    var needle = {
                        generatedLine: util.getArg(aArgs, "line"),
                        generatedColumn: util.getArg(aArgs, "column")
                    }, mapping = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", this._compareGeneratedPositions);
                    return mapping ? {
                        source: util.getArg(mapping, "source", null),
                        line: util.getArg(mapping, "originalLine", null),
                        column: util.getArg(mapping, "originalColumn", null),
                        name: util.getArg(mapping, "name", null)
                    } : {
                        source: null,
                        line: null,
                        column: null,
                        name: null
                    };
                }, /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
                SourceMapConsumer.prototype.generatedPositionFor = function(aArgs) {
                    var needle = {
                        source: util.getArg(aArgs, "source"),
                        originalLine: util.getArg(aArgs, "line"),
                        originalColumn: util.getArg(aArgs, "column")
                    }, mapping = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", this._compareOriginalPositions);
                    return mapping ? {
                        line: util.getArg(mapping, "generatedLine", null),
                        column: util.getArg(mapping, "generatedColumn", null)
                    } : {
                        line: null,
                        column: null
                    };
                }, SourceMapConsumer.GENERATED_ORDER = 1, SourceMapConsumer.ORIGINAL_ORDER = 2, 
                /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping. This function should
   *        not mutate the mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
                SourceMapConsumer.prototype.eachMapping = function(aCallback, aContext, aOrder) {
                    var mappings, context = aContext || null, order = aOrder || SourceMapConsumer.GENERATED_ORDER;
                    switch (order) {
                      case SourceMapConsumer.GENERATED_ORDER:
                        mappings = this._generatedMappings;
                        break;

                      case SourceMapConsumer.ORIGINAL_ORDER:
                        mappings = this._originalMappings;
                        break;

                      default:
                        throw new Error("Unknown order of iteration.");
                    }
                    mappings.forEach(aCallback, context);
                }, exports.SourceMapConsumer = SourceMapConsumer;
            });
        }, {
            "./array-set": 9,
            "./base64-vlq": 10,
            "./binary-search": 12,
            "./util": 16,
            amdefine: 17
        } ],
        14: [ function(require, module) {
            /* -*- Mode: js; js-indent-level: 2; -*- */
            /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
            if ("function" != typeof define) var define = require("amdefine")(module);
            define(function(require, exports) {
                /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. To create a new one, you must pass an object
   * with the following properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: An optional root for all URLs in this source map.
   */
                function SourceMapGenerator(aArgs) {
                    this._file = util.getArg(aArgs, "file"), this._sourceRoot = util.getArg(aArgs, "sourceRoot", null), 
                    this._sources = new ArraySet(), this._names = new ArraySet(), this._mappings = [];
                }
                var base64VLQ = require("./base64-vlq"), util = require("./util"), ArraySet = require("./array-set").ArraySet;
                SourceMapGenerator.prototype._version = 3, /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
                SourceMapGenerator.prototype.addMapping = function(aArgs) {
                    var generated = util.getArg(aArgs, "generated"), original = util.getArg(aArgs, "original", null), source = util.getArg(aArgs, "source", null), name = util.getArg(aArgs, "name", null);
                    this._validateMapping(generated, original, source, name), source && !this._sources.has(source) && this._sources.add(source), 
                    name && !this._names.has(name) && this._names.add(name), this._mappings.push({
                        generated: generated,
                        original: original,
                        source: source,
                        name: name
                    });
                }, /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
                SourceMapGenerator.prototype._validateMapping = function(aGenerated, aOriginal, aSource, aName) {
                    if (!(aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName || aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource)) throw new Error("Invalid mapping.");
                }, /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
                SourceMapGenerator.prototype._serializeMappings = function() {
                    var mapping, previousGeneratedColumn = 0, previousGeneratedLine = 1, previousOriginalColumn = 0, previousOriginalLine = 0, previousName = 0, previousSource = 0, result = "";
                    // The mappings must be guarenteed to be in sorted order before we start
                    // serializing them or else the generated line numbers (which are defined
                    // via the ';' separators) will be all messed up. Note: it might be more
                    // performant to maintain the sorting as we insert them, rather than as we
                    // serialize them, but the big O is the same either way.
                    this._mappings.sort(function(mappingA, mappingB) {
                        var cmp = mappingA.generated.line - mappingB.generated.line;
                        return 0 === cmp ? mappingA.generated.column - mappingB.generated.column : cmp;
                    });
                    for (var i = 0, len = this._mappings.length; len > i; i++) {
                        if (mapping = this._mappings[i], mapping.generated.line !== previousGeneratedLine) for (previousGeneratedColumn = 0; mapping.generated.line !== previousGeneratedLine; ) result += ";", 
                        previousGeneratedLine++; else i > 0 && (result += ",");
                        result += base64VLQ.encode(mapping.generated.column - previousGeneratedColumn), 
                        previousGeneratedColumn = mapping.generated.column, mapping.source && mapping.original && (result += base64VLQ.encode(this._sources.indexOf(mapping.source) - previousSource), 
                        previousSource = this._sources.indexOf(mapping.source), // lines are stored 0-based in SourceMap spec version 3
                        result += base64VLQ.encode(mapping.original.line - 1 - previousOriginalLine), previousOriginalLine = mapping.original.line - 1, 
                        result += base64VLQ.encode(mapping.original.column - previousOriginalColumn), previousOriginalColumn = mapping.original.column, 
                        mapping.name && (result += base64VLQ.encode(this._names.indexOf(mapping.name) - previousName), 
                        previousName = this._names.indexOf(mapping.name)));
                    }
                    return result;
                }, /**
   * Externalize the source map.
   */
                SourceMapGenerator.prototype.toJSON = function() {
                    var map = {
                        version: this._version,
                        file: this._file,
                        sources: this._sources.toArray(),
                        names: this._names.toArray(),
                        mappings: this._serializeMappings()
                    };
                    return this._sourceRoot && (map.sourceRoot = this._sourceRoot), map;
                }, /**
   * Render the source map being generated to a string.
   */
                SourceMapGenerator.prototype.toString = function() {
                    return JSON.stringify(this);
                }, exports.SourceMapGenerator = SourceMapGenerator;
            });
        }, {
            "./array-set": 9,
            "./base64-vlq": 10,
            "./util": 16,
            amdefine: 17
        } ],
        15: [ function(require, module) {
            /* -*- Mode: js; js-indent-level: 2; -*- */
            /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
            if ("function" != typeof define) var define = require("amdefine")(module);
            define(function(require, exports) {
                /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   */
                function SourceNode(aLine, aColumn, aSource, aChunks) {
                    this.children = [], this.line = aLine, this.column = aColumn, this.source = aSource, 
                    null != aChunks && this.add(aChunks);
                }
                var SourceMapGenerator = require("./source-map-generator").SourceMapGenerator;
                /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
                SourceNode.prototype.add = function(aChunk) {
                    if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
                        this.add(chunk);
                    }, this); else {
                        if (!(aChunk instanceof SourceNode || "string" == typeof aChunk)) throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
                        aChunk && this.children.push(aChunk);
                    }
                    return this;
                }, /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
                SourceNode.prototype.prepend = function(aChunk) {
                    if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]); else {
                        if (!(aChunk instanceof SourceNode || "string" == typeof aChunk)) throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
                        this.children.unshift(aChunk);
                    }
                    return this;
                }, /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
                SourceNode.prototype.walk = function(aFn) {
                    this.children.forEach(function(chunk) {
                        chunk instanceof SourceNode ? chunk.walk(aFn) : "" !== chunk && aFn(chunk, {
                            source: this.source,
                            line: this.line,
                            column: this.column
                        });
                    }, this);
                }, /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
                SourceNode.prototype.join = function(aSep) {
                    var newChildren, i, len = this.children.length;
                    if (len > 0) {
                        for (newChildren = [], i = 0; len - 1 > i; i++) newChildren.push(this.children[i]), 
                        newChildren.push(aSep);
                        newChildren.push(this.children[i]), this.children = newChildren;
                    }
                    return this;
                }, /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
                SourceNode.prototype.replaceRight = function(aPattern, aReplacement) {
                    var lastChild = this.children[this.children.length - 1];
                    return lastChild instanceof SourceNode ? lastChild.replaceRight(aPattern, aReplacement) : "string" == typeof lastChild ? this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement) : this.children.push("".replace(aPattern, aReplacement)), 
                    this;
                }, /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
                SourceNode.prototype.toString = function() {
                    var str = "";
                    return this.walk(function(chunk) {
                        str += chunk;
                    }), str;
                }, /**
   * Returns the string representation of this source node along with a source
   * map.
   */
                SourceNode.prototype.toStringWithSourceMap = function(aArgs) {
                    var generated = {
                        code: "",
                        line: 1,
                        column: 0
                    }, map = new SourceMapGenerator(aArgs);
                    return this.walk(function(chunk, original) {
                        generated.code += chunk, null != original.source && null != original.line && null != original.column && map.addMapping({
                            source: original.source,
                            original: {
                                line: original.line,
                                column: original.column
                            },
                            generated: {
                                line: generated.line,
                                column: generated.column
                            }
                        }), chunk.split("").forEach(function(char) {
                            "\n" === char ? (generated.line++, generated.column = 0) : generated.column++;
                        });
                    }), {
                        code: generated.code,
                        map: map
                    };
                }, exports.SourceNode = SourceNode;
            });
        }, {
            "./source-map-generator": 14,
            amdefine: 17
        } ],
        16: [ function(require, module) {
            /* -*- Mode: js; js-indent-level: 2; -*- */
            /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
            if ("function" != typeof define) var define = require("amdefine")(module);
            define(function(require, exports) {
                /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
                function getArg(aArgs, aName, aDefaultValue) {
                    if (aName in aArgs) return aArgs[aName];
                    if (3 === arguments.length) return aDefaultValue;
                    throw new Error('"' + aName + '" is a required argument.');
                }
                function join(aRoot, aPath) {
                    return "/" === aPath.charAt(0) ? aPath : aRoot.replace(/\/*$/, "") + "/" + aPath;
                }
                exports.getArg = getArg, exports.join = join;
            });
        }, {
            amdefine: 17
        } ],
        17: [ function(require, module) {
            /**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
            function amdefine(module, requireFn) {
                "use strict";
                /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
                function trimDots(ary) {
                    var i, part;
                    for (i = 0; ary[i]; i += 1) if (part = ary[i], "." === part) ary.splice(i, 1), i -= 1; else if (".." === part) {
                        if (1 === i && (".." === ary[2] || ".." === ary[0])) //End of the line. Keep at least one non-dot
                        //path segment at the front so it can be mapped
                        //correctly to disk. Otherwise, there is likely
                        //no path mapping for a path starting with '..'.
                        //This can still fail, but catches the most reasonable
                        //uses of ..
                        break;
                        i > 0 && (ary.splice(i - 1, 2), i -= 2);
                    }
                }
                function normalize(name, baseName) {
                    var baseParts;
                    //Adjust any relative paths.
                    return name && "." === name.charAt(0) && //If have a base name, try to normalize against it,
                    //otherwise, assume it is a top-level require that will
                    //be relative to baseUrl in the end.
                    baseName && (baseParts = baseName.split("/"), baseParts = baseParts.slice(0, baseParts.length - 1), 
                    baseParts = baseParts.concat(name.split("/")), trimDots(baseParts), name = baseParts.join("/")), 
                    name;
                }
                /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
                function makeNormalize(relName) {
                    return function(name) {
                        return normalize(name, relName);
                    };
                }
                function makeLoad(id) {
                    function load(value) {
                        loaderCache[id] = value;
                    }
                    return load.fromText = function() {
                        //This one is difficult because the text can/probably uses
                        //define, and any relative paths and requires should be relative
                        //to that id was it would be found on disk. But this would require
                        //bootstrapping a module/require fairly deeply from node core.
                        //Not sure how best to go about that yet.
                        throw new Error("amdefine does not implement load.fromText");
                    }, load;
                }
                function runFactory(id, deps, factory) {
                    var r, e, m, result;
                    if (id) e = loaderCache[id] = {}, m = {
                        id: id,
                        uri: __filename,
                        exports: e
                    }, r = makeRequire(requireFn, e, m, id); else {
                        //Only support one define call per file
                        if (alreadyCalled) throw new Error("amdefine with no module ID cannot be called more than once per file.");
                        alreadyCalled = !0, //Use the real variables from node
                        //Use module.exports for exports, since
                        //the exports in here is amdefine exports.
                        e = module.exports, m = module, r = makeRequire(requireFn, e, m, module.id);
                    }
                    //If there are dependencies, they are strings, so need
                    //to convert them to dependency values.
                    deps && (deps = deps.map(function(depName) {
                        return r(depName);
                    })), //Call the factory with the right dependencies.
                    result = "function" == typeof factory ? factory.apply(m.exports, deps) : factory, 
                    void 0 !== result && (m.exports = result, id && (loaderCache[id] = m.exports));
                }
                //Create a define function specific to the module asking for amdefine.
                function define(id, deps, factory) {
                    Array.isArray(id) ? (factory = deps, deps = id, id = void 0) : "string" != typeof id && (factory = id, 
                    id = deps = void 0), deps && !Array.isArray(deps) && (factory = deps, deps = void 0), 
                    deps || (deps = [ "require", "exports", "module" ]), //Set up properties for this module. If an ID, then use
                    //internal cache. If no ID, then use the external variables
                    //for this node module.
                    id ? //Put the module in deep freeze until there is a
                    //require call for it.
                    defineCache[id] = [ id, deps, factory ] : runFactory(id, deps, factory);
                }
                var makeRequire, stringRequire, defineCache = {}, loaderCache = {}, alreadyCalled = !1, path = require("path");
                return makeRequire = function(systemRequire, exports, module, relId) {
                    function amdRequire(deps, callback) {
                        return "string" == typeof deps ? stringRequire(systemRequire, exports, module, deps, relId) : (//Array of dependencies with a callback.
                        //Convert the dependencies to modules.
                        deps = deps.map(function(depName) {
                            return stringRequire(systemRequire, exports, module, depName, relId);
                        }), //Wait for next tick to call back the require call.
                        process.nextTick(function() {
                            callback.apply(null, deps);
                        }), void 0);
                    }
                    return amdRequire.toUrl = function(filePath) {
                        return 0 === filePath.indexOf(".") ? normalize(filePath, path.dirname(module.filename)) : filePath;
                    }, amdRequire;
                }, //Favor explicit value, passed in if the module wants to support Node 0.4.
                requireFn = requireFn || function() {
                    return module.require.apply(module, arguments);
                }, stringRequire = function(systemRequire, exports, module, id, relId) {
                    //Split the ID by a ! so that
                    var prefix, plugin, index = id.indexOf("!"), originalId = id;
                    if (-1 === index) {
                        //Straight module lookup. If it is one of the special dependencies,
                        //deal with it, otherwise, delegate to node.
                        if (id = normalize(id, relId), "require" === id) return makeRequire(systemRequire, exports, module, relId);
                        if ("exports" === id) return exports;
                        if ("module" === id) return module;
                        if (loaderCache.hasOwnProperty(id)) return loaderCache[id];
                        if (defineCache[id]) return runFactory.apply(null, defineCache[id]), loaderCache[id];
                        if (systemRequire) return systemRequire(originalId);
                        throw new Error("No module with ID: " + id);
                    }
                    //There is a plugin in play.
                    return prefix = id.substring(0, index), id = id.substring(index + 1, id.length), 
                    plugin = stringRequire(systemRequire, exports, module, prefix, relId), id = plugin.normalize ? plugin.normalize(id, makeNormalize(relId)) : normalize(id, relId), 
                    loaderCache[id] ? loaderCache[id] : (plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {}), 
                    loaderCache[id]);
                }, //define.require, which has access to all the values in the
                //cache. Useful for AMD modules that all have IDs in the file,
                //but need to finally export a value to node based on one of those
                //IDs.
                define.require = function(id) {
                    return loaderCache[id] ? loaderCache[id] : defineCache[id] ? (runFactory.apply(null, defineCache[id]), 
                    loaderCache[id]) : void 0;
                }, define.amd = {}, define;
            }
            var process = require("__browserify_process"), __filename = "/../node_modules/jstransform/node_modules/source-map/node_modules/amdefine/amdefine.js";
            module.exports = amdefine;
        }, {
            __browserify_process: 5,
            path: 2
        } ],
        18: [ function(require, module, exports) {
            /**
 * @param {String} contents
 * @return {String}
 */
            function extract(contents) {
                var match = contents.match(docblockRe);
                return match ? match[0].replace(ltrimRe, "") || "" : "";
            }
            /**
 * @param {String} contents
 * @return {Array}
 */
            function parse(docblock) {
                docblock = docblock.replace(commentStartRe, "").replace(commentEndRe, "").replace(wsRe, " ").replace(stringStartRe, "$1");
                for (// Normalize multi-line directives
                var prev = ""; prev != docblock; ) prev = docblock, docblock = docblock.replace(multilineRe, "\n$1 $2\n");
                docblock = docblock.trim();
                for (var match, result = []; match = propertyRe.exec(docblock); ) result.push([ match[1], match[2] ]);
                return result;
            }
            /**
 * Same as parse but returns an object of prop: value instead of array of paris
 * If a property appers more than once the last one will be returned
 *
 * @param {String} contents
 * @return {Object}
 */
            function parseAsObject(docblock) {
                for (var pairs = parse(docblock), result = {}, i = 0; i < pairs.length; i++) result[pairs[i][0]] = pairs[i][1];
                return result;
            }
            /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
            var docblockRe = /^\s*(\/\*\*(.|\r?\n)*?\*\/)/, ltrimRe = /^\s*/, commentStartRe = /^\/\*\*?/, commentEndRe = /\*\/$/, wsRe = /[\t ]+/g, stringStartRe = /(\r?\n|^) *\*/g, multilineRe = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *([^@\r\n\s][^@\r\n]+?) *\r?\n/g, propertyRe = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g;
            exports.extract = extract, exports.parse = parse, exports.parseAsObject = parseAsObject;
        }, {} ],
        19: [ function(require, module, exports) {
            /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
            /*jslint node: true*/
            "use strict";
            /**
 * @param {object} node
 * @param {object} parentNode
 * @return {boolean}
 */
            function _nodeIsClosureScopeBoundary(node, parentNode) {
                if (node.type === Syntax.Program) return !0;
                var parentIsFunction = parentNode.type === Syntax.FunctionDeclaration || parentNode.type === Syntax.FunctionExpression;
                return node.type === Syntax.BlockStatement && parentIsFunction;
            }
            function _nodeIsBlockScopeBoundary(node, parentNode) {
                return node.type === Syntax.Program ? !1 : node.type === Syntax.BlockStatement && parentNode.type === Syntax.CatchClause;
            }
            /**
 * @param {object} node
 * @param {function} visitor
 * @param {array} path
 * @param {object} state
 */
            function traverse(node, path, state) {
                // Only catchup() before and after traversing a child node
                function traverser(node, path, state) {
                    node.range && catchup(node.range[0], state), traverse(node, path, state), node.range && catchup(node.range[1], state);
                }
                // Create a scope stack entry if this is the first node we've encountered in
                // its local scope
                var parentNode = path[0];
                if (!Array.isArray(node) && state.localScope.parentNode !== parentNode) {
                    if (_nodeIsClosureScopeBoundary(node, parentNode)) {
                        var scopeIsStrict = state.scopeIsStrict || node.body.length > 0 && node.body[0].type === Syntax.ExpressionStatement && node.body[0].expression.type === Syntax.Literal && "use strict" === node.body[0].expression.value;
                        if (node.type === Syntax.Program) state = updateState(state, {
                            scopeIsStrict: scopeIsStrict
                        }); else {
                            // Include function arg identifiers in the scope boundaries of the
                            // function
                            if (state = updateState(state, {
                                localScope: {
                                    parentNode: parentNode,
                                    parentScope: state.localScope,
                                    identifiers: {}
                                },
                                scopeIsStrict: scopeIsStrict
                            }), // All functions have an implicit 'arguments' object in scope
                            state.localScope.identifiers.arguments = !0, parentNode.params.length > 0) for (var param, i = 0; i < parentNode.params.length; i++) param = parentNode.params[i], 
                            param.type === Syntax.Identifier && (state.localScope.identifiers[param.name] = !0);
                            // Named FunctionExpressions scope their name within the body block of
                            // themselves only
                            parentNode.type === Syntax.FunctionExpression && parentNode.id && (state.localScope.identifiers[parentNode.id.name] = !0);
                        }
                        // Traverse and find all local identifiers in this closure first to
                        // account for function/variable declaration hoisting
                        collectClosureIdentsAndTraverse(node, path, state);
                    }
                    _nodeIsBlockScopeBoundary(node, parentNode) && (state = updateState(state, {
                        localScope: {
                            parentNode: parentNode,
                            parentScope: state.localScope,
                            identifiers: {}
                        }
                    }), parentNode.type === Syntax.CatchClause && (state.localScope.identifiers[parentNode.param.name] = !0), 
                    collectBlockIdentsAndTraverse(node, path, state));
                }
                analyzeAndTraverse(walker, traverser, node, path, state);
            }
            function collectClosureIdentsAndTraverse(node, path, state) {
                analyzeAndTraverse(visitLocalClosureIdentifiers, collectClosureIdentsAndTraverse, node, path, state);
            }
            function collectBlockIdentsAndTraverse(node, path, state) {
                analyzeAndTraverse(visitLocalBlockIdentifiers, collectBlockIdentsAndTraverse, node, path, state);
            }
            function visitLocalClosureIdentifiers(node, path, state) {
                var identifiers = state.localScope.identifiers;
                switch (node.type) {
                  case Syntax.FunctionExpression:
                    // Function expressions don't get their names (if there is one) added to
                    // the closure scope they're defined in
                    return !1;

                  case Syntax.ClassDeclaration:
                  case Syntax.ClassExpression:
                  case Syntax.FunctionDeclaration:
                    return node.id && (identifiers[node.id.name] = !0), !1;

                  case Syntax.VariableDeclarator:
                    "var" === path[0].kind && (identifiers[node.id.name] = !0);
                }
            }
            function visitLocalBlockIdentifiers(node) {
                // TODO: Support 'let' here...maybe...one day...or something...
                // TODO: Support 'let' here...maybe...one day...or something...
                return node.type === Syntax.CatchClause ? !1 : void 0;
            }
            function walker(node, path, state) {
                for (var visitors = state.g.visitors, i = 0; i < visitors.length; i++) if (visitors[i].test(node, path, state)) return visitors[i](traverse, node, path, state);
            }
            /**
 * Applies all available transformations to the source
 * @param {array} visitors
 * @param {string} source
 * @param {?object} options
 * @return {object}
 */
            function transform(visitors, source, options) {
                options = options || {};
                var ast;
                try {
                    ast = esprima.parse(source, {
                        comment: !0,
                        loc: !0,
                        range: !0
                    });
                } catch (e) {
                    throw e.message = "Parse Error: " + e.message, e;
                }
                var state = createState(source, ast, options);
                if (state.g.visitors = visitors, options.sourceMap) {
                    var SourceMapGenerator = require("source-map").SourceMapGenerator;
                    state.g.sourceMap = new SourceMapGenerator({
                        file: "transformed.js"
                    });
                }
                traverse(ast, [], state), catchup(source.length, state);
                var ret = {
                    code: state.g.buffer
                };
                return options.sourceMap && (ret.sourceMap = state.g.sourceMap, ret.sourceMapFilename = options.filename || "source.js"), 
                ret;
            }
            /**
 * Syntax transfomer for javascript. Takes the source in, spits the source
 * out.
 *
 * Parses input source with esprima, applies the given list of visitors to the
 * AST tree, and returns the resulting output.
 */
            var esprima = require("esprima-fb"), createState = require("./utils").createState, catchup = require("./utils").catchup, updateState = require("./utils").updateState, analyzeAndTraverse = require("./utils").analyzeAndTraverse, Syntax = esprima.Syntax;
            exports.transform = transform;
        }, {
            "./utils": 20,
            "esprima-fb": 6,
            "source-map": 8
        } ],
        20: [ function(require, module, exports) {
            /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
            /*jslint node: true*/
            /**
 * A `state` object represents the state of the parser. It has "local" and
 * "global" parts. Global contains parser position, source, etc. Local contains
 * scope based properties like current class name. State should contain all the
 * info required for transformation. It's the only mandatory object that is
 * being passed to every function in transform chain.
 *
 * @param  {string} source
 * @param  {object} transformOptions
 * @return {object}
 */
            function createState(source, rootNode, transformOptions) {
                return {
                    /**
     * A tree representing the current local scope (and its lexical scope chain)
     * Useful for tracking identifiers from parent scopes, etc.
     * @type {Object}
     */
                    localScope: {
                        parentNode: rootNode,
                        parentScope: null,
                        identifiers: {}
                    },
                    /**
     * The name (and, if applicable, expression) of the super class
     * @type {Object}
     */
                    superClass: null,
                    /**
     * The namespace to use when munging identifiers
     * @type {String}
     */
                    mungeNamespace: "",
                    /**
     * Ref to the node for the FunctionExpression of the enclosing
     * MethodDefinition
     * @type {Object}
     */
                    methodFuncNode: null,
                    /**
     * Name of the enclosing class
     * @type {String}
     */
                    className: null,
                    /**
     * Whether we're currently within a `strict` scope
     * @type {Bool}
     */
                    scopeIsStrict: null,
                    /**
     * Global state (not affected by updateState)
     * @type {Object}
     */
                    g: {
                        /**
       * A set of general options that transformations can consider while doing
       * a transformation:
       *
       * - minify
       *   Specifies that transformation steps should do their best to minify
       *   the output source when possible. This is useful for places where
       *   minification optimizations are possible with higher-level context
       *   info than what jsxmin can provide.
       *
       *   For example, the ES6 class transform will minify munged private
       *   variables if this flag is set.
       */
                        opts: transformOptions,
                        /**
       * Current position in the source code
       * @type {Number}
       */
                        position: 0,
                        /**
       * Buffer containing the result
       * @type {String}
       */
                        buffer: "",
                        /**
       * Indentation offset (only negative offset is supported now)
       * @type {Number}
       */
                        indentBy: 0,
                        /**
       * Source that is being transformed
       * @type {String}
       */
                        source: source,
                        /**
       * Cached parsed docblock (see getDocblock)
       * @type {object}
       */
                        docblock: null,
                        /**
       * Whether the thing was used
       * @type {Boolean}
       */
                        tagNamespaceUsed: !1,
                        /**
       * If using bolt xjs transformation
       * @type {Boolean}
       */
                        isBolt: void 0,
                        /**
       * Whether to record source map (expensive) or not
       * @type {SourceMapGenerator|null}
       */
                        sourceMap: null,
                        /**
       * Filename of the file being processed. Will be returned as a source
       * attribute in the source map
       */
                        sourceMapFilename: "source.js",
                        /**
       * Only when source map is used: last line in the source for which
       * source map was generated
       * @type {Number}
       */
                        sourceLine: 1,
                        /**
       * Only when source map is used: last line in the buffer for which
       * source map was generated
       * @type {Number}
       */
                        bufferLine: 1,
                        /**
       * The top-level Program AST for the original file.
       */
                        originalProgramAST: null,
                        sourceColumn: 0,
                        bufferColumn: 0
                    }
                };
            }
            /**
 * Updates a copy of a given state with "update" and returns an updated state.
 *
 * @param  {object} state
 * @param  {object} update
 * @return {object}
 */
            function updateState(state, update) {
                var ret = Object.create(state);
                return Object.keys(update).forEach(function(updatedKey) {
                    ret[updatedKey] = update[updatedKey];
                }), ret;
            }
            /**
 * Given a state fill the resulting buffer from the original source up to
 * the end
 *
 * @param {number} end
 * @param {object} state
 * @param {?function} contentTransformer Optional callback to transform newly
 *                                       added content.
 */
            function catchup(end, state, contentTransformer) {
                if (!(end < state.g.position)) {
                    var source = state.g.source.substring(state.g.position, end), transformed = updateIndent(source, state);
                    if (state.g.sourceMap && transformed) {
                        // record where we are
                        state.g.sourceMap.addMapping({
                            generated: {
                                line: state.g.bufferLine,
                                column: state.g.bufferColumn
                            },
                            original: {
                                line: state.g.sourceLine,
                                column: state.g.sourceColumn
                            },
                            source: state.g.sourceMapFilename
                        });
                        // Add line break mappings between last known mapping and the end of the
                        // added piece. So for the code piece
                        //  (foo, bar);
                        // > var x = 2;
                        // > var b = 3;
                        //   var c =
                        // only add lines marked with ">": 2, 3.
                        for (var sourceLines = source.split("\n"), transformedLines = transformed.split("\n"), i = 1; i < sourceLines.length - 1; i++) state.g.sourceMap.addMapping({
                            generated: {
                                line: state.g.bufferLine,
                                column: 0
                            },
                            original: {
                                line: state.g.sourceLine,
                                column: 0
                            },
                            source: state.g.sourceMapFilename
                        }), state.g.sourceLine++, state.g.bufferLine++;
                        // offset for the last piece
                        sourceLines.length > 1 && (state.g.sourceLine++, state.g.bufferLine++, state.g.sourceColumn = 0, 
                        state.g.bufferColumn = 0), state.g.sourceColumn += sourceLines[sourceLines.length - 1].length, 
                        state.g.bufferColumn += transformedLines[transformedLines.length - 1].length;
                    }
                    state.g.buffer += contentTransformer ? contentTransformer(transformed) : transformed, 
                    state.g.position = end;
                }
            }
            function stripNonWhite(value) {
                return value.replace(reNonWhite, function() {
                    return "";
                });
            }
            /**
 * Catches up as `catchup` but removes all non-whitespace characters.
 */
            function catchupWhiteSpace(end, state) {
                catchup(end, state, stripNonWhite);
            }
            function stripNonNewline(value) {
                return value.replace(reNonNewline, function() {
                    return "";
                });
            }
            /**
 * Catches up as `catchup` but removes all non-newline characters.
 *
 * Equivalent to appending as many newlines as there are in the original source
 * between the current position and `end`.
 */
            function catchupNewlines(end, state) {
                catchup(end, state, stripNonNewline);
            }
            /**
 * Same as catchup but does not touch the buffer
 *
 * @param  {number} end
 * @param  {object} state
 */
            function move(end, state) {
                // move the internal cursors
                if (state.g.sourceMap) {
                    end < state.g.position && (state.g.position = 0, state.g.sourceLine = 1, state.g.sourceColumn = 0);
                    var source = state.g.source.substring(state.g.position, end), sourceLines = source.split("\n");
                    sourceLines.length > 1 && (state.g.sourceLine += sourceLines.length - 1, state.g.sourceColumn = 0), 
                    state.g.sourceColumn += sourceLines[sourceLines.length - 1].length;
                }
                state.g.position = end;
            }
            /**
 * Appends a string of text to the buffer
 *
 * @param {string} str
 * @param {object} state
 */
            function append(str, state) {
                if (state.g.sourceMap && str) {
                    state.g.sourceMap.addMapping({
                        generated: {
                            line: state.g.bufferLine,
                            column: state.g.bufferColumn
                        },
                        original: {
                            line: state.g.sourceLine,
                            column: state.g.sourceColumn
                        },
                        source: state.g.sourceMapFilename
                    });
                    var transformedLines = str.split("\n");
                    transformedLines.length > 1 && (state.g.bufferLine += transformedLines.length - 1, 
                    state.g.bufferColumn = 0), state.g.bufferColumn += transformedLines[transformedLines.length - 1].length;
                }
                state.g.buffer += str;
            }
            /**
 * Update indent using state.indentBy property. Indent is measured in
 * double spaces. Updates a single line only.
 *
 * @param {string} str
 * @param {object} state
 * @return {string}
 */
            function updateIndent(str, state) {
                for (var i = 0; i < -state.g.indentBy; i++) str = str.replace(/(^|\n)( {2}|\t)/g, "$1");
                return str;
            }
            /**
 * Calculates indent from the beginning of the line until "start" or the first
 * character before start.
 * @example
 *   "  foo.bar()"
 *         ^
 *       start
 *   indent will be 2
 *
 * @param  {number} start
 * @param  {object} state
 * @return {number}
 */
            function indentBefore(start, state) {
                var end = start;
                for (start -= 1; start > 0 && "\n" != state.g.source[start]; ) state.g.source[start].match(/[ \t]/) || (end = start), 
                start--;
                return state.g.source.substring(start + 1, end);
            }
            function getDocblock(state) {
                if (!state.g.docblock) {
                    var docblock = require("./docblock");
                    state.g.docblock = docblock.parseAsObject(docblock.extract(state.g.source));
                }
                return state.g.docblock;
            }
            function identWithinLexicalScope(identName, state, stopBeforeNode) {
                for (var currScope = state.localScope; currScope; ) {
                    if (void 0 !== currScope.identifiers[identName]) return !0;
                    if (stopBeforeNode && currScope.parentNode === stopBeforeNode) break;
                    currScope = currScope.parentScope;
                }
                return !1;
            }
            function identInLocalScope(identName, state) {
                return void 0 !== state.localScope.identifiers[identName];
            }
            function declareIdentInLocalScope(identName, state) {
                state.localScope.identifiers[identName] = !0;
            }
            /**
 * Apply the given analyzer function to the current node. If the analyzer
 * doesn't return false, traverse each child of the current node using the given
 * traverser function.
 *
 * @param {function} analyzer
 * @param {function} traverser
 * @param {object} node
 * @param {function} visitor
 * @param {array} path
 * @param {object} state
 */
            function analyzeAndTraverse(analyzer, traverser, node, path, state) {
                var key, child;
                if (node.type) {
                    if (analyzer(node, path, state) === !1) return;
                    path.unshift(node);
                }
                for (key in node) // skip obviously wrong attributes
                "range" !== key && "loc" !== key && node.hasOwnProperty(key) && (child = node[key], 
                "object" == typeof child && null !== child && traverser(child, path, state));
                node.type && path.shift();
            }
            /**
 * Checks whether a node or any of its sub-nodes contains
 * a syntactic construct of the passed type.
 * @param {object} node - AST node to test.
 * @param {string} type - node type to lookup.
 */
            function containsChildOfType(node, type) {
                function nodeTypeAnalyzer(node) {
                    return node.type === type ? (foundMatchingChild = !0, !1) : void 0;
                }
                function nodeTypeTraverser(child) {
                    foundMatchingChild || (foundMatchingChild = containsChildOfType(child, type));
                }
                var foundMatchingChild = !1;
                return analyzeAndTraverse(nodeTypeAnalyzer, nodeTypeTraverser, node, []), foundMatchingChild;
            }
            /**
 * Removes all non-whitespace characters
 */
            var reNonWhite = /(\S)/g, reNonNewline = /[^\n]/g;
            exports.append = append, exports.catchup = catchup, exports.catchupWhiteSpace = catchupWhiteSpace, 
            exports.catchupNewlines = catchupNewlines, exports.containsChildOfType = containsChildOfType, 
            exports.createState = createState, exports.declareIdentInLocalScope = declareIdentInLocalScope, 
            exports.getDocblock = getDocblock, exports.identWithinLexicalScope = identWithinLexicalScope, 
            exports.identInLocalScope = identInLocalScope, exports.indentBefore = indentBefore, 
            exports.move = move, exports.updateIndent = updateIndent, exports.updateState = updateState, 
            exports.analyzeAndTraverse = analyzeAndTraverse;
        }, {
            "./docblock": 18
        } ],
        21: [ function(require, module, exports) {
            /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
            /*jslint node:true*/
            /**
 * @typechecks
 */
            "use strict";
            /**
 * Used to generate a unique class for use with code-gens for anonymous class
 * expressions.
 *
 * @param {object} state
 * @return {string}
 */
            function _generateAnonymousClassName(state) {
                var mungeNamespace = state.mungeNamespace || "";
                return "____Class" + mungeNamespace + base62.encode(_anonClassUUIDCounter++);
            }
            /**
 * Given an identifier name, munge it using the current state's mungeNamespace.
 *
 * @param {string} identName
 * @param {object} state
 * @return {string}
 */
            function _getMungedName(identName, state) {
                var mungeNamespace = state.mungeNamespace, shouldMinify = state.g.opts.minify;
                if (shouldMinify) {
                    _mungedSymbolMaps[mungeNamespace] || (_mungedSymbolMaps[mungeNamespace] = {
                        symbolMap: {},
                        identUUIDCounter: 0
                    });
                    var symbolMap = _mungedSymbolMaps[mungeNamespace].symbolMap;
                    symbolMap[identName] || (symbolMap[identName] = base62.encode(_mungedSymbolMaps[mungeNamespace].identUUIDCounter++)), 
                    identName = symbolMap[identName];
                }
                return "$" + mungeNamespace + identName;
            }
            /**
 * Extracts super class information from a class node.
 *
 * Information includes name of the super class and/or the expression string
 * (if extending from an expression)
 *
 * @param {object} node
 * @param {object} state
 * @return {object}
 */
            function _getSuperClassInfo(node, state) {
                var ret = {
                    name: null,
                    expression: null
                };
                return node.superClass && (node.superClass.type === Syntax.Identifier ? ret.name = node.superClass.name : (// Extension from an expression
                ret.name = _generateAnonymousClassName(state), ret.expression = state.g.source.substring(node.superClass.range[0], node.superClass.range[1]))), 
                ret;
            }
            /**
 * Used with .filter() to find the constructor method in a list of
 * MethodDefinition nodes.
 *
 * @param {object} classElement
 * @return {boolean}
 */
            function _isConstructorMethod(classElement) {
                return classElement.type === Syntax.MethodDefinition && classElement.key.type === Syntax.Identifier && "constructor" === classElement.key.name;
            }
            /**
 * @param {object} node
 * @param {object} state
 * @return {boolean}
 */
            function _shouldMungeIdentifier(node, state) {
                return !!state.methodFuncNode && !utils.getDocblock(state).hasOwnProperty("preventMunge") && /^_(?!_)/.test(node.name);
            }
            /**
 * @param {function} traverse
 * @param {object} node
 * @param {array} path
 * @param {object} state
 */
            function visitClassMethod(traverse, node, path, state) {
                return utils.catchup(node.range[0], state), path.unshift(node), traverse(node.value, path, state), 
                path.shift(), !1;
            }
            /**
 * @param {function} traverse
 * @param {object} node
 * @param {array} path
 * @param {object} state
 */
            function visitClassFunctionExpression(traverse, node, path, state) {
                var methodNode = path[0];
                if (state = utils.updateState(state, {
                    methodFuncNode: node
                }), "constructor" === methodNode.key.name) utils.append("function " + state.className, state); else {
                    var methodName = methodNode.key.name;
                    _shouldMungeIdentifier(methodNode.key, state) && (methodName = _getMungedName(methodName, state));
                    var prototypeOrStatic = methodNode.static ? "" : "prototype.";
                    utils.append(state.className + "." + prototypeOrStatic + methodName + "=function", state);
                }
                utils.move(methodNode.key.range[1], state);
                var paramName, params = node.params;
                if (params.length > 0) for (var i = 0; i < params.length; i++) utils.catchup(node.params[i].range[0], state), 
                paramName = params[i].name, _shouldMungeIdentifier(params[i], state) && (paramName = _getMungedName(params[i].name, state)), 
                utils.append(paramName, state), utils.move(params[i].range[1], state); else utils.append("(", state);
                return utils.append(")", state), utils.catchupWhiteSpace(node.body.range[0], state), 
                utils.append("{", state), state.scopeIsStrict || utils.append('"use strict";', state), 
                utils.move(node.body.range[0] + "{".length, state), path.unshift(node), traverse(node.body, path, state), 
                path.shift(), utils.catchup(node.body.range[1], state), "constructor" !== methodNode.key.name && utils.append(";", state), 
                !1;
            }
            /**
 * @param {function} traverse
 * @param {object} node
 * @param {array} path
 * @param {object} state
 */
            function _renderClassBody(traverse, node, path, state) {
                var className = state.className, superClass = state.superClass;
                // Set up prototype of constructor on same line as `extends` for line-number
                // preservation. This relies on function-hoisting if a constructor function is
                // defined in the class body.
                if (superClass.name) {
                    // If the super class is an expression, we need to memoize the output of the
                    // expression into the generated class name variable and use that to refer
                    // to the super class going forward. Example:
                    //
                    //   class Foo extends mixin(Bar, Baz) {}
                    //     --transforms to--
                    //   function Foo() {} var ____Class0Blah = mixin(Bar, Baz);
                    null !== superClass.expression && utils.append("var " + superClass.name + "=" + superClass.expression + ";", state);
                    var keyName = superClass.name + "____Key", keyNameDeclarator = "";
                    utils.identWithinLexicalScope(keyName, state) || (keyNameDeclarator = "var ", utils.declareIdentInLocalScope(keyName, state)), 
                    utils.append("for(" + keyNameDeclarator + keyName + " in " + superClass.name + "){" + "if(" + superClass.name + ".hasOwnProperty(" + keyName + ")){" + className + "[" + keyName + "]=" + superClass.name + "[" + keyName + "];" + "}" + "}", state);
                    var superProtoIdentStr = SUPER_PROTO_IDENT_PREFIX + superClass.name;
                    utils.identWithinLexicalScope(superProtoIdentStr, state) || (utils.append("var " + superProtoIdentStr + "=" + superClass.name + "===null?" + "null:" + superClass.name + ".prototype;", state), 
                    utils.declareIdentInLocalScope(superProtoIdentStr, state)), utils.append(className + ".prototype=Object.create(" + superProtoIdentStr + ");", state), 
                    utils.append(className + ".prototype.constructor=" + className + ";", state), utils.append(className + ".__superConstructor__=" + superClass.name + ";", state);
                }
                // If there's no constructor method specified in the class body, create an
                // empty constructor function at the top (same line as the class keyword)
                node.body.body.filter(_isConstructorMethod).pop() || (utils.append("function " + className + "(){", state), 
                state.scopeIsStrict || utils.append('"use strict";', state), superClass.name && utils.append("if(" + superClass.name + "!==null){" + superClass.name + ".apply(this,arguments);}", state), 
                utils.append("}", state)), utils.move(node.body.range[0] + "{".length, state), traverse(node.body, path, state), 
                utils.catchupWhiteSpace(node.range[1], state);
            }
            /**
 * @param {function} traverse
 * @param {object} node
 * @param {array} path
 * @param {object} state
 */
            function visitClassDeclaration(traverse, node, path, state) {
                var className = node.id.name, superClass = _getSuperClassInfo(node, state);
                return state = utils.updateState(state, {
                    mungeNamespace: className,
                    className: className,
                    superClass: superClass
                }), _renderClassBody(traverse, node, path, state), !1;
            }
            /**
 * @param {function} traverse
 * @param {object} node
 * @param {array} path
 * @param {object} state
 */
            function visitClassExpression(traverse, node, path, state) {
                var className = node.id && node.id.name || _generateAnonymousClassName(state), superClass = _getSuperClassInfo(node, state);
                return utils.append("(function(){", state), state = utils.updateState(state, {
                    mungeNamespace: className,
                    className: className,
                    superClass: superClass
                }), _renderClassBody(traverse, node, path, state), utils.append("return " + className + ";})()", state), 
                !1;
            }
            /**
 * @param {function} traverse
 * @param {object} node
 * @param {array} path
 * @param {object} state
 */
            function visitPrivateIdentifier(traverse, node, path, state) {
                utils.append(_getMungedName(node.name, state), state), utils.move(node.range[1], state);
            }
            /**
 * @param {function} traverse
 * @param {object} node
 * @param {array} path
 * @param {object} state
 */
            function visitSuperCallExpression(traverse, node, path, state) {
                var superClassName = state.superClass.name;
                return node.callee.type === Syntax.Identifier ? (utils.append(superClassName + ".call(", state), 
                utils.move(node.callee.range[1], state)) : node.callee.type === Syntax.MemberExpression && (utils.append(SUPER_PROTO_IDENT_PREFIX + superClassName, state), 
                utils.move(node.callee.object.range[1], state), node.callee.computed ? // ["a" + "b"]
                utils.catchup(node.callee.property.range[1] + "]".length, state) : // .ab
                utils.append("." + node.callee.property.name, state), utils.append(".call(", state), 
                utils.move(node.callee.range[1], state)), utils.append("this", state), node.arguments.length > 0 && (utils.append(",", state), 
                utils.catchupWhiteSpace(node.arguments[0].range[0], state), traverse(node.arguments, path, state)), 
                utils.catchupWhiteSpace(node.range[1], state), utils.append(")", state), !1;
            }
            /**
 * @param {function} traverse
 * @param {object} node
 * @param {array} path
 * @param {object} state
 */
            function visitSuperMemberExpression(traverse, node, path, state) {
                var superClassName = state.superClass.name;
                utils.append(SUPER_PROTO_IDENT_PREFIX + superClassName, state), utils.move(node.object.range[1], state);
            }
            var base62 = require("base62"), Syntax = require("esprima-fb").Syntax, utils = require("../src/utils"), SUPER_PROTO_IDENT_PREFIX = "____SuperProtoOf", _anonClassUUIDCounter = 0, _mungedSymbolMaps = {};
            visitClassMethod.test = function(node) {
                return node.type === Syntax.MethodDefinition;
            }, visitClassFunctionExpression.test = function(node, path) {
                return node.type === Syntax.FunctionExpression && path[0].type === Syntax.MethodDefinition;
            }, visitClassDeclaration.test = function(node) {
                return node.type === Syntax.ClassDeclaration;
            }, visitClassExpression.test = function(node) {
                return node.type === Syntax.ClassExpression;
            }, visitPrivateIdentifier.test = function(node, path, state) {
                if (node.type === Syntax.Identifier && _shouldMungeIdentifier(node, state)) {
                    // Always munge non-computed properties of MemberExpressions
                    // (a la preventing access of properties of unowned objects)
                    if (path[0].type === Syntax.MemberExpression && path[0].object !== node && path[0].computed === !1) return !0;
                    // Always munge identifiers that were declared within the method function
                    // scope
                    if (utils.identWithinLexicalScope(node.name, state, state.methodFuncNode)) return !0;
                    // Always munge private keys on object literals defined within a method's
                    // scope.
                    if (path[0].type === Syntax.Property && path[1].type === Syntax.ObjectExpression) return !0;
                    // Always munge function parameters
                    if (path[0].type === Syntax.FunctionExpression || path[0].type === Syntax.FunctionDeclaration) for (var i = 0; i < path[0].params.length; i++) if (path[0].params[i] === node) return !0;
                }
                return !1;
            }, visitSuperCallExpression.test = function(node, path, state) {
                if (state.superClass && node.type === Syntax.CallExpression) {
                    var callee = node.callee;
                    if (callee.type === Syntax.Identifier && "super" === callee.name || callee.type == Syntax.MemberExpression && "super" === callee.object.name) return !0;
                }
                return !1;
            }, visitSuperMemberExpression.test = function(node, path, state) {
                return state.superClass && node.type === Syntax.MemberExpression && node.object.type === Syntax.Identifier && "super" === node.object.name;
            }, exports.visitorList = [ visitClassDeclaration, visitClassExpression, visitClassFunctionExpression, visitClassMethod, visitPrivateIdentifier, visitSuperCallExpression, visitSuperMemberExpression ];
        }, {
            "../src/utils": 20,
            base62: 7,
            "esprima-fb": 6
        } ],
        22: [ function(require, module, exports) {
            /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
            /* jshint browser: true */
            /* jslint evil: true */
            "use strict";
            var runScripts, headEl, transform = require("jstransform").transform, visitors = require("./fbtransform/visitors").transformVisitors, transform = transform.bind(null, visitors.react), docblock = require("jstransform/src/docblock");
            if (exports.transform = transform, exports.exec = function(code) {
                return eval(transform(code).code);
            }, "undefined" != typeof window && null !== window) {
                headEl = document.getElementsByTagName("head")[0];
                var run = exports.run = function(code) {
                    var jsx = docblock.parseAsObject(docblock.extract(code)).jsx, functionBody = jsx ? transform(code).code : code, scriptEl = document.createElement("script");
                    scriptEl.innerHTML = functionBody, headEl.appendChild(scriptEl);
                }, load = exports.load = function(url, callback) {
                    var xhr;
                    return xhr = window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(), 
                    // Disable async since we need to execute scripts in the order they are in the
                    // DOM to mirror normal script loading.
                    xhr.open("GET", url, !1), "overrideMimeType" in xhr && xhr.overrideMimeType("text/plain"), 
                    xhr.onreadystatechange = function() {
                        if (4 === xhr.readyState) {
                            if (0 !== xhr.status && 200 !== xhr.status) throw new Error("Could not load " + url);
                            if (run(xhr.responseText), callback) return callback();
                        }
                    }, xhr.send(null);
                };
                runScripts = function() {
                    var scripts = document.getElementsByTagName("script");
                    scripts = Array.prototype.slice.call(scripts);
                    var jsxScripts = scripts.filter(function(script) {
                        return "text/jsx" === script.type;
                    });
                    console.warn("You are using the in-browser JSX transformer. Be sure to precompile your JSX for production - http://facebook.github.io/react/docs/tooling-integration.html#jsx"), 
                    jsxScripts.forEach(function(script) {
                        script.src ? load(script.src) : run(script.innerHTML);
                    });
                }, window.addEventListener ? window.addEventListener("DOMContentLoaded", runScripts, !1) : window.attachEvent("onload", runScripts);
            }
        }, {
            "./fbtransform/visitors": 26,
            jstransform: 19,
            "jstransform/src/docblock": 18
        } ],
        23: [ function(require, module, exports) {
            /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
            /*global exports:true*/
            "use strict";
            function visitReactTag(traverse, object, path, state) {
                var jsxObjIdent = getDocblock(state).jsx;
                if (catchup(object.openingElement.range[0], state), object.name.namespace) throw new Error("Namespace tags are not supported. ReactJSX is not XML.");
                var isFallbackTag = FALLBACK_TAGS[object.name.name];
                append((isFallbackTag ? jsxObjIdent + "." : "") + object.name.name + "(", state), 
                move(object.name.range[1], state);
                var childrenToRender = object.children.filter(function(child) {
                    return !(child.type === Syntax.Literal && !child.value.match(/\S/));
                });
                // if we don't have any attributes, pass in null
                return 0 === object.attributes.length && append("null", state), // write attributes
                object.attributes.forEach(function(attr, index) {
                    if (catchup(attr.range[0], state), attr.name.namespace) throw new Error("Namespace attributes are not supported. ReactJSX is not XML.");
                    var name = attr.name.name, isFirst = 0 === index, isLast = index === object.attributes.length - 1;
                    isFirst && append("{", state), append(quoteAttrName(name), state), append(":", state), 
                    attr.value ? (move(attr.name.range[1], state), // Use catchupWhiteSpace to skip over the '=' in the attribute
                    catchupWhiteSpace(attr.value.range[0], state), JSX_ATTRIBUTE_TRANSFORMS[attr.name.name] ? (append(JSX_ATTRIBUTE_TRANSFORMS[attr.name.name](attr), state), 
                    move(attr.value.range[1], state), isLast || append(",", state)) : attr.value.type === Syntax.Literal ? renderXJSLiteral(attr.value, isLast, state) : renderXJSExpressionContainer(traverse, attr.value, isLast, path, state)) : (state.g.buffer += "true", 
                    state.g.position = attr.name.range[1], isLast || append(",", state)), isLast && append("}", state), 
                    catchup(attr.range[1], state);
                }), object.selfClosing || (catchup(object.openingElement.range[1] - 1, state), move(object.openingElement.range[1], state)), 
                // filter out whitespace
                childrenToRender.length > 0 && (append(", ", state), object.children.forEach(function(child) {
                    if (child.type !== Syntax.Literal || child.value.match(/\S/)) {
                        catchup(child.range[0], state);
                        var isLast = child === childrenToRender[childrenToRender.length - 1];
                        child.type === Syntax.Literal ? renderXJSLiteral(child, isLast, state) : child.type === Syntax.XJSExpressionContainer ? renderXJSExpressionContainer(traverse, child, isLast, path, state) : (traverse(child, path, state), 
                        isLast || (append(",", state), state.g.buffer = state.g.buffer.replace(/(\s*),$/, ",$1"))), 
                        catchup(child.range[1], state);
                    }
                })), object.selfClosing ? (// everything up to />
                catchup(object.openingElement.range[1] - 2, state), move(object.openingElement.range[1], state)) : (// everything up to </ sdflksjfd>
                catchup(object.closingElement.range[0], state), move(object.closingElement.range[1], state)), 
                append(")", state), !1;
            }
            var Syntax = require("esprima-fb").Syntax, catchup = require("jstransform/src/utils").catchup, catchupWhiteSpace = require("jstransform/src/utils").catchupWhiteSpace, append = require("jstransform/src/utils").append, move = require("jstransform/src/utils").move, getDocblock = require("jstransform/src/utils").getDocblock, FALLBACK_TAGS = require("./xjs").knownTags, renderXJSExpressionContainer = require("./xjs").renderXJSExpressionContainer, renderXJSLiteral = require("./xjs").renderXJSLiteral, quoteAttrName = require("./xjs").quoteAttrName, JSX_ATTRIBUTE_TRANSFORMS = {
                cxName: function(attr) {
                    if (attr.value.type !== Syntax.Literal) throw new Error("cx only accepts a string literal");
                    var classNames = attr.value.value.split(/\s+/g);
                    return "cx(" + classNames.map(JSON.stringify).join(",") + ")";
                }
            };
            visitReactTag.test = function(object, path, state) {
                // only run react when react @jsx namespace is specified in docblock
                var jsx = getDocblock(state).jsx;
                return object.type === Syntax.XJSElement && jsx && jsx.length;
            }, exports.visitReactTag = visitReactTag;
        }, {
            "./xjs": 25,
            "esprima-fb": 6,
            "jstransform/src/utils": 20
        } ],
        24: [ function(require, module, exports) {
            /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
            /*global exports:true*/
            "use strict";
            /**
 * Transforms the following:
 *
 * var MyComponent = React.createClass({
 *    render: ...
 * });
 *
 * into:
 *
 * var MyComponent = React.createClass({
 *    displayName: 'MyComponent',
 *    render: ...
 * });
 */
            function visitReactDisplayName(traverse, object, path, state) {
                if (object.id.type === Syntax.Identifier && object.init && object.init.type === Syntax.CallExpression && object.init.callee.type === Syntax.MemberExpression && object.init.callee.object.type === Syntax.Identifier && "React" === object.init.callee.object.name && object.init.callee.property.type === Syntax.Identifier && "createClass" === object.init.callee.property.name && 1 === object.init.arguments.length && object.init.arguments[0].type === Syntax.ObjectExpression) {
                    var displayName = object.id.name;
                    catchup(object.init.arguments[0].range[0] + 1, state), append("displayName: '" + displayName + "',", state);
                }
            }
            var Syntax = require("esprima-fb").Syntax, catchup = require("jstransform/src/utils").catchup, append = require("jstransform/src/utils").append, getDocblock = require("jstransform/src/utils").getDocblock;
            /**
 * Will only run on @jsx files for now.
 */
            visitReactDisplayName.test = function(object, path, state) {
                return object.type === Syntax.VariableDeclarator && !!getDocblock(state).jsx;
            }, exports.visitReactDisplayName = visitReactDisplayName;
        }, {
            "esprima-fb": 6,
            "jstransform/src/utils": 20
        } ],
        25: [ function(require, module, exports) {
            /**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
            /*global exports:true*/
            "use strict";
            function safeTrim(string) {
                return string.replace(/^[ \t]+/, "").replace(/[ \t]+$/, "");
            }
            // Replace all trailing whitespace characters with a single space character
            function trimWithSingleSpace(string) {
                return string.replace(/^[ \t\xA0]{2,}/, " ").replace(/[ \t\xA0]{2,}$/, " ").replace(/^\s+$/, "");
            }
            /**
 * Special handling for multiline string literals
 * print lines:
 *
 *   line
 *   line
 *
 * as:
 *
 *   "line "+
 *   "line"
 */
            function renderXJSLiteral(object, isLast, state, start, end) {
                /** Added blank check filtering and triming*/
                var trimmedChildValue = safeTrim(object.value), hasFinalNewLine = !1;
                if (trimmedChildValue) {
                    // head whitespace
                    append(object.value.match(/^[\t ]*/)[0], state), start && append(start, state);
                    var trimmedChildValueWithSpace = trimWithSingleSpace(object.value), initialLines = trimmedChildValue.split(/\r\n|\n|\r/), lines = initialLines.filter(function(line) {
                        return safeTrim(line).length > 0;
                    }), hasInitialNewLine = initialLines[0] !== lines[0];
                    hasFinalNewLine = initialLines[initialLines.length - 1] !== lines[lines.length - 1];
                    var numLines = lines.length;
                    lines.forEach(function(line, ii) {
                        var lastLine = ii === numLines - 1, trimmedLine = safeTrim(line);
                        if ("" !== trimmedLine || lastLine) {
                            var preString = "", postString = "", leading = line.match(/^[ \t]*/)[0];
                            0 === ii && (hasInitialNewLine && (preString = " ", leading = "\n" + leading), " " === trimmedChildValueWithSpace.substring(0, 1) && (// If this is the first line, and the original content starts with
                            // whitespace, place a single space at the beginning.
                            preString = " ")), (!lastLine || " " === trimmedChildValueWithSpace.substr(trimmedChildValueWithSpace.length - 1, 1) || hasFinalNewLine) && (// If either not on the last line, or the original content ends with
                            // whitespace, place a single character at the end.
                            postString = " "), append(leading + JSON.stringify(preString + trimmedLine + postString) + (lastLine ? "" : "+") + line.match(/[ \t]*$/)[0], state);
                        } else append(line, state);
                        lastLine || append("\n", state);
                    });
                } else start && append(start, state), append('""', state);
                end && append(end, state), // add comma before trailing whitespace
                isLast || append(",", state), // tail whitespace
                hasFinalNewLine && append("\n", state), append(object.value.match(/[ \t]*$/)[0], state), 
                move(object.range[1], state);
            }
            function renderXJSExpressionContainer(traverse, object, isLast, path, state) {
                // Plus 1 to skip `{`.
                return move(object.range[0] + 1, state), traverse(object.expression, path, state), 
                isLast || object.expression.type === Syntax.XJSEmptyExpression || (// If we need to append a comma, make sure to do so after the expression.
                catchup(object.expression.range[1], state), append(",", state)), // Minus 1 to skip `}`.
                catchup(object.range[1] - 1, state), move(object.range[1], state), !1;
            }
            function quoteAttrName(attr) {
                // Quote invalid JS identifiers.
                // Quote invalid JS identifiers.
                return /^[a-z_$][a-z\d_$]*$/i.test(attr) ? attr : "'" + attr + "'";
            }
            var append = require("jstransform/src/utils").append, catchup = require("jstransform/src/utils").catchup, move = require("jstransform/src/utils").move, Syntax = require("esprima-fb").Syntax, knownTags = {
                a: !0,
                abbr: !0,
                address: !0,
                applet: !0,
                area: !0,
                article: !0,
                aside: !0,
                audio: !0,
                b: !0,
                base: !0,
                bdi: !0,
                bdo: !0,
                big: !0,
                blockquote: !0,
                body: !0,
                br: !0,
                button: !0,
                canvas: !0,
                caption: !0,
                circle: !0,
                cite: !0,
                code: !0,
                col: !0,
                colgroup: !0,
                command: !0,
                data: !0,
                datalist: !0,
                dd: !0,
                del: !0,
                details: !0,
                dfn: !0,
                dialog: !0,
                div: !0,
                dl: !0,
                dt: !0,
                ellipse: !0,
                em: !0,
                embed: !0,
                fieldset: !0,
                figcaption: !0,
                figure: !0,
                footer: !0,
                form: !0,
                g: !0,
                h1: !0,
                h2: !0,
                h3: !0,
                h4: !0,
                h5: !0,
                h6: !0,
                head: !0,
                header: !0,
                hgroup: !0,
                hr: !0,
                html: !0,
                i: !0,
                iframe: !0,
                img: !0,
                input: !0,
                ins: !0,
                kbd: !0,
                keygen: !0,
                label: !0,
                legend: !0,
                li: !0,
                line: !0,
                link: !0,
                main: !0,
                map: !0,
                mark: !0,
                marquee: !0,
                menu: !0,
                menuitem: !0,
                meta: !0,
                meter: !0,
                nav: !0,
                noscript: !0,
                object: !0,
                ol: !0,
                optgroup: !0,
                option: !0,
                output: !0,
                p: !0,
                param: !0,
                path: !0,
                polyline: !0,
                pre: !0,
                progress: !0,
                q: !0,
                rect: !0,
                rp: !0,
                rt: !0,
                ruby: !0,
                s: !0,
                samp: !0,
                script: !0,
                section: !0,
                select: !0,
                small: !0,
                source: !0,
                span: !0,
                strong: !0,
                style: !0,
                sub: !0,
                summary: !0,
                sup: !0,
                svg: !0,
                table: !0,
                tbody: !0,
                td: !0,
                text: !0,
                textarea: !0,
                tfoot: !0,
                th: !0,
                thead: !0,
                time: !0,
                title: !0,
                tr: !0,
                track: !0,
                u: !0,
                ul: !0,
                "var": !0,
                video: !0,
                wbr: !0
            };
            exports.knownTags = knownTags, exports.renderXJSExpressionContainer = renderXJSExpressionContainer, 
            exports.renderXJSLiteral = renderXJSLiteral, exports.quoteAttrName = quoteAttrName;
        }, {
            "esprima-fb": 6,
            "jstransform/src/utils": 20
        } ],
        26: [ function(require, module, exports) {
            /**
 * Given a list of transform names, return the ordered list of visitors to be
 * passed to the transform() function.
 *
 * @param {array?} excludes
 * @return {array}
 */
            function getVisitorsList(excludes) {
                for (var ret = [], i = 0, il = transformRunOrder.length; il > i; i++) excludes && -1 !== excludes.indexOf(transformRunOrder[i]) || (ret = ret.concat(transformVisitors[transformRunOrder[i]]));
                return ret;
            }
            /*global exports:true*/
            var es6Classes = require("jstransform/visitors/es6-class-visitors").visitorList, react = require("./transforms/react"), reactDisplayName = require("./transforms/reactDisplayName"), transformVisitors = {
                "es6-classes": es6Classes,
                react: [ react.visitReactTag, reactDisplayName.visitReactDisplayName ]
            }, transformRunOrder = [ "es6-classes", "react" ];
            exports.getVisitorsList = getVisitorsList, exports.transformVisitors = transformVisitors;
        }, {
            "./transforms/react": 23,
            "./transforms/reactDisplayName": 24,
            "jstransform/visitors/es6-class-visitors": 21
        } ]
    }, {}, [ 22 ])(22);
});
//# sourceMappingURL=test/scripts/source-map.js