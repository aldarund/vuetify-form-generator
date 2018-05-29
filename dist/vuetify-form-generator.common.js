/**
 * Copyright 2017 Aldarund <shaper.int@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var SignaturePad = _interopDefault(require('signature_pad'));

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var SPECIES = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var _strictMethod = function (method, arg) {
  return !!method && _fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

var $filter = _arrayMethods(2);

_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

var $map = _arrayMethods(1);

_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

// https://github.com/tc39/Array.prototype.includes

var $includes = _arrayIncludes(true);

_export(_export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var INCLUDES = 'includes';

_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~_stringContext(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var dP$1 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || _descriptors && dP$1(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$2
};

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

var setPrototypeOf = _setProto.set;
var _inheritIfRequired = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$3
};

var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var space = '[' + _stringWs + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = _fails(function () {
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(_defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var gOPN = _objectGopn.f;
var gOPD$1 = _objectGopd.f;
var dP$2 = _objectDp.f;
var $trim = _stringTrim.trim;
var NUMBER = 'Number';
var $Number = _global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = _toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = _descriptors ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (_has(Base, key = keys[j]) && !_has($Number, key)) {
      dP$2($Number, key, gOPD$1(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  _redefine(_global, NUMBER, $Number);
}

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var _iterators = {};

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var ITERATOR$1 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME$1 = collections[i];
  var explicit = DOMIterables[NAME$1];
  var Collection = _global[NAME$1];
  var proto$1 = Collection && Collection.prototype;
  var key$1;
  if (proto$1) {
    if (!proto$1[ITERATOR$1]) _hide(proto$1, ITERATOR$1, ArrayValues);
    if (!proto$1[TO_STRING_TAG]) _hide(proto$1, TO_STRING_TAG, NAME$1);
    _iterators[NAME$1] = ArrayValues;
    if (explicit) for (key$1 in es6_array_iterator) if (!proto$1[key$1]) _redefine(proto$1, key$1, es6_array_iterator[key$1], true);
  }
}

var $forEach = _arrayMethods(0);
var STRICT = _strictMethod([].forEach, true);

_export(_export.P + _export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

var abstractField = {
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: null,
      required: false
    },
    scope: {
      type: String,
      default: null,
      required: false
    }
  },
  data: function data() {
    return {
      localValue: this.value || null,
      delay: 600
    };
  },
  mounted: function mounted() {
    this.onInput();
  },
  watch: {
    value: {
      handler: function handler(v) {
        this.localValue = v;
      }
    }
  },
  computed: {
    veeFieldName: function veeFieldName() {
      if (this.scope) {
        return "".concat(this.scope, ".").concat(this.field.name);
      } else {
        return this.field.name;
      }
    },
    errorMessages: function errorMessages() {
      return this.veeField && (this.veeField.dirty || this.veeField.validated) && this.errors.has(this.veeFieldName) ? this.errors.collect(this.field.name) : undefined;
    },
    veeField: function veeField() {
      if (this.scope) {
        return (this.fields["$" + this.scope] || {})[this.field.name];
      } else {
        return this.fields[this.field.name];
      }
    }
  },
  methods: {
    onBlur: function onBlur() {
      this.$emit("blur");
    },
    onChange: function onChange() {
      this.$emit("change");
    },
    onFocus: function onFocus() {
      this.$emit("focus");
    },
    onInput: function onInput() {
      this.$emit("upd", this.localValue, this.field.name);
    }
  }
};

//
var script = {
  mixins: [abstractField],
  fieldTypes: ["text_display"]
};

var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    domProps: {
      innerHTML: _vm._s(_vm.field.label)
    }
  });
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

var __vue_template__ = typeof __vue_render__ !== 'undefined' ? {
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
} : {};
/* style */


var __vue_inject_styles__ = undefined;
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */


var __vue_module_identifier__ = undefined;
/* functional template */


var __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script$$1 || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\fields\\core\\fieldTextDisplay.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var _wcImport7 = __vue_normalize__(__vue_template__, __vue_inject_styles__, typeof __vue_script__ === 'undefined' ? {} : __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

// 21.1.3.25 String.prototype.trim()
_stringTrim('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

//
	var script$1 = {
		name:"vueSignature",
		props:{
			sigOption: {
				type:Object,
				default:()=>{
					return {
						backgroundColor:'rgb(255,255,255)',
						penColor : 'rgb(0, 0, 0)'
					}
				},
			},
			w:{
				type:String,
				default:"100%"
			},
			h:{
				type:String,
				default:"100%"
			},
			clearOnResize:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				sig:()=>{},
				option:{
					backgroundColor:'rgb(255,255,255)',
					penColor : 'rgb(0, 0, 0)'
				},
				uid:""
			}
		},
		created(){
			var _this = this;
			this.uid = "canvas" + _this._uid;
			var sigOptions = Object.keys(_this.sigOption);
			for(var item of sigOptions){
				_this.option[item] = _this.sigOption[item];
			}
		},
		methods:{
			draw(){
				var _this = this;
				var canvas = document.getElementById(_this.uid);
				_this.sig = new SignaturePad(canvas,_this.option);
				function resizeCanvas() {
					var url;
					if(!_this.isEmpty()){
						url = _this.save();
					}
					var ratio =  Math.max(window.devicePixelRatio || 1, 1);
					canvas.width = canvas.offsetWidth * ratio;
					canvas.height = canvas.offsetHeight * ratio;
					canvas.getContext("2d").scale(ratio, ratio);
					_this.clear();
					!_this.clearOnResize && url !== undefined && _this.fromDataURL(url);
				}
				window.addEventListener("resize", resizeCanvas);
				resizeCanvas();
			},
			clear(){
				var _this = this;
				_this.sig.clear();
			},
			save(format){
				var _this = this;
				return format ? _this.sig.toDataURL(format) :  _this.sig.toDataURL()
				// signaturePad.toDataURL(); // save image as PNG
				// signaturePad.toDataURL("image/jpeg"); // save image as JPEG
				// signaturePad.toDataURL("image/svg+xml"); // save image as SVG
			},
			fromDataURL(url){
				var _this = this;
				_this.sig.fromDataURL(url);
			},
			isEmpty(){
				var _this = this;
				return _this.sig.isEmpty();
			},
			undo(){
				var _this = this;
				var data = _this.sig.toData();
				if(data){
					data.pop();
					_this.sig.fromData(data);
				}
			},
			addWaterMark(data){
				var _this = this;
				if(!(Object.prototype.toString.call(data) == '[object Object]')){
					throw new Error("Expected Object, got "+typeof data+".")
				}else{
					var vCanvas = document.getElementById(_this.uid);

					var textData = {
							text:data.text || '',
							x:data.x || 20,
							y:data.y || 20,
							sx:data.sx || 40,
							sy:data.sy || 40
						};
						
					var ctx = vCanvas.getContext('2d');
						ctx.font = data.font || '20px sans-serif';
						ctx.fillStyle = data.fillStyle || "#333";
						ctx.strokeStyle = data.strokeStyle || "#333";    
    					if(data.style == 'all'){
							ctx.fillText(textData.text,textData.x,textData.y);
							ctx.strokeText(textData.text,textData.sx,textData.sx);
						}else if(data.style == 'stroke'){
							ctx.strokeText(textData.text,textData.sx,textData.sx);
						}else{
							ctx.fillText(textData.text,textData.x,textData.y);
						}

					_this.sig._isEmpty = false;
				}
			}
		},
		mounted(){
			var _this = this;
			this.$nextTick(() => {
				_this.draw();
			});
		}
	}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "\ncanvas {\n\twidth: 100%;\n\theight: 100%;\n}\n";
styleInject(css);

const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { style: { width: _vm.w, height: _vm.h } }, [
    _c("canvas", {
      staticClass: "canvas",
      attrs: { id: _vm.uid, "data-uid": _vm.uid }
    })
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

const __vue_template__$1 = typeof __vue_render__$1 !== 'undefined'
  ? { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }
  : {};
/* style */
const __vue_inject_styles__$1 = undefined;
/* scoped */
const __vue_scope_id__$1 = undefined;
/* module identifier */
const __vue_module_identifier__$1 = undefined;
/* functional template */
const __vue_is_functional_template__$1 = false;
/* component normalizer */
function __vue_normalize__$1(
  template, style, script,
  scope, functional, moduleIdentifier,
  createInjector, createInjectorSSR
) {
  const component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\node_modules\\vue-signature\\src\\lib\\vue-signature.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component
}
/* style inject */
function __vue_create_injector__$1() {
  const head = document.head || document.getElementsByTagName('head')[0];
  const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
  const isOldIE =
    typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      let code = css.source;
      let index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        const el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts
          .filter(Boolean)
          .join('\n');
      } else {
        const textNode = document.createTextNode(code);
        const nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
        else style.element.appendChild(textNode);
      }
    }
  }
}
/* style inject SSR */


var VueSignature = __vue_normalize__$1(
  __vue_template__$1,
  __vue_inject_styles__$1,
  typeof __vue_script__$1 === 'undefined' ? {} : __vue_script__$1,
  __vue_scope_id__$1,
  __vue_is_functional_template__$1,
  __vue_module_identifier__$1,
  typeof __vue_create_injector__$1 !== 'undefined' ? __vue_create_injector__$1 : function () {},
  typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {}
)

var script$2 = {
  inject: ["$validator"],
  components: {
    "vue-signature": VueSignature
  },
  mixins: [abstractField],
  fieldTypes: ["signature"],
  data: function data() {
    var _this = this;
    return {
      mode: "graph",
      textSignature: null,
      option: {
        onEnd: function onEnd() {
          return _this.save();
        }
      }
    };
  },
  methods: {
    save: function save() {
      var sign = this.$refs.signature.save();
      this.$emit("upd", sign, this.field.name);
    },
    onTextSignatureInput: function onTextSignatureInput() {
      this.$emit("upd", this.textSignature, this.field.name);
    },
    typeSignature: function typeSignature() {
      this.mode = "text";
      this.onTextSignatureInput();
    },
    drawSignature: function drawSignature() {
      this.mode = "graph";
      this.save();
    },
    clear: function clear() {
      this.$refs.signature.clear();
      this.$emit("upd", "", this.field.name);
    }
  }
};

var css$1 = "@font-face {\n  font-family: Arizonia;\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Arizonia Regular\"),local(Arizonia-Regular),url(//fonts.gstatic.com/s/arizonia/v8/u7E0xBiSyufT4DCm3LWEtfesZW2xOQ-xsNqO47m55DA.eot?#) format(\"eot\"),url(//fonts.gstatic.com/s/arizonia/v8/PwrsyFTYH2Wmsvpn0dx4s_esZW2xOQ-xsNqO47m55DA.woff2) format(\"woff2\"),url(//fonts.gstatic.com/s/arizonia/v8/8Usm7f8XTsZinW2e-ZMd5fesZW2xOQ-xsNqO47m55DA.woff) format(\"woff\");\n}\n.signature-text[data-v-07c301c1] {\n  font-family: Arizonia, sans-serif;\n  font-size: 30px;\n}\n.v-label[data-v-07c301c1] {\n  position: relative;\n  cursor: inherit;\n}\n.signature[data-v-07c301c1] {\n  border: grey dashed 1px;\n}\n";
styleInject(css$1);

var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", [_vm.mode === "graph" ? _c("div", [_vm.field.label ? _c("label", {
    staticClass: "v-label",
    attrs: {
      for: "field.name"
    }
  }, [_vm._v(_vm._s(_vm.field.label))]) : _vm._e(), _c("vue-signature", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: _vm.field.validate,
      expression: "field.validate"
    }],
    ref: "signature",
    staticClass: "signature",
    attrs: {
      "data-vv-scope": _vm.scope,
      "data-vv-as": _vm.field.label,
      "data-vv-name": _vm.field.name,
      "sig-option": _vm.option
    },
    model: {
      value: _vm.localValue,
      callback: function callback($$v) {
        _vm.localValue = $$v;
      },
      expression: "localValue"
    }
  }), _vm.errors.has(_vm.veeFieldName) ? _c("div", {
    staticClass: "v-text-field__details"
  }, [_c("div", {
    staticClass: "v-messages error--text"
  }, _vm._l(_vm.errorMessages, function (error) {
    return _c("div", {
      key: error,
      staticClass: "v-messages__wrapper"
    }, [_c("div", {
      staticClass: "v-messages__message"
    }, [_vm._v(_vm._s(error))])]);
  }))]) : _vm._e(), _c("a", {
    staticClass: "switch-signature",
    on: {
      click: function click($event) {
        _vm.typeSignature();
      }
    }
  }, [_vm._v("Prefer to type your signature? Click here")]), _c("v-btn", {
    on: {
      click: function click($event) {
        _vm.clear();
      }
    }
  }, [_vm._v("clear")])], 1) : _vm.mode === "text" ? _c("div", [_c("div", {
    staticClass: "signature-text"
  }, [_vm._v(_vm._s(_vm.textSignature))]), _c("v-text-field", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: _vm.field.validate,
      expression: "field.validate"
    }],
    attrs: {
      label: _vm.field.label,
      required: _vm.field.required,
      readonly: _vm.field.editable,
      disabled: _vm.field.disabled,
      placeholder: _vm.field.placeholder,
      "data-vv-as": _vm.field.label,
      "data-vv-name": _vm.field.name,
      "data-vv-scope": _vm.scope,
      name: _vm.field.name,
      id: _vm.field.name,
      error: _vm.errors.has(_vm.veeFieldName),
      "error-messages": _vm.errorMessages
    },
    on: {
      input: _vm.onTextSignatureInput
    },
    model: {
      value: _vm.textSignature,
      callback: function callback($$v) {
        _vm.textSignature = typeof $$v === "string" ? $$v.trim() : $$v;
      },
      expression: "textSignature"
    }
  }), _c("a", {
    staticClass: "switch-signature",
    on: {
      click: function click($event) {
        _vm.drawSignature();
      }
    }
  }, [_vm._v("Prefer to draw your signature? Click here")])], 1) : _vm._e()]);
};

var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

var __vue_template__$2 = typeof __vue_render__$2 !== 'undefined' ? {
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
} : {};
/* style */


var __vue_inject_styles__$2 = undefined;
/* scoped */


var __vue_scope_id__$2 = "data-v-07c301c1";
/* module identifier */


var __vue_module_identifier__$2 = undefined;
/* functional template */


var __vue_is_functional_template__$2 = false;
/* component normalizer */

function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\fields\\core\\fieldSignature.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$2() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var _wcImport6 = __vue_normalize__$2(__vue_template__$2, __vue_inject_styles__$2, typeof __vue_script__$2 === 'undefined' ? {} : __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, typeof __vue_create_injector__$2 !== 'undefined' ? __vue_create_injector__$2 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//
var script$3 = {
  inject: ["$validator"],
  mixins: [abstractField],
  fieldTypes: ["single_line", "multi_line", "unit_field", "ssn", "phone", "email"]
};

var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("v-text-field", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: _vm.field.validate,
      expression: "field.validate"
    }],
    attrs: {
      label: _vm.field.label,
      required: _vm.field.required,
      maxlength: _vm.field.maxlength,
      readonly: _vm.field.editable,
      disabled: _vm.field.disabled,
      placeholder: _vm.field.placeholder,
      name: _vm.field.name,
      id: _vm.field.name,
      error: _vm.errors.has(_vm.veeFieldName),
      "error-messages": _vm.errorMessages,
      "multi-line": _vm.field.field_id === "multi_line",
      "data-vv-delay": _vm.field.delay,
      "data-vv-as": _vm.field.label,
      "data-vv-name": _vm.field.name,
      "data-vv-scope": _vm.scope,
      mask: _vm.field.mask,
      type: _vm.field.type,
      "data-vv-validate-on": "blur"
    },
    on: {
      blur: _vm.onBlur,
      change: _vm.onChange,
      focus: _vm.onFocus,
      input: _vm.onInput
    },
    model: {
      value: _vm.localValue,
      callback: function callback($$v) {
        _vm.localValue = typeof $$v === "string" ? $$v.trim() : $$v;
      },
      expression: "localValue"
    }
  });
};

var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

var __vue_template__$3 = typeof __vue_render__$3 !== 'undefined' ? {
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
} : {};
/* style */


var __vue_inject_styles__$3 = undefined;
/* scoped */


var __vue_scope_id__$3 = undefined;
/* module identifier */


var __vue_module_identifier__$3 = undefined;
/* functional template */


var __vue_is_functional_template__$3 = false;
/* component normalizer */

function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\fields\\core\\fieldInput.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$3() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var _wcImport5 = __vue_normalize__$3(__vue_template__$3, __vue_inject_styles__$3, typeof __vue_script__$3 === 'undefined' ? {} : __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, typeof __vue_create_injector__$3 !== 'undefined' ? __vue_create_injector__$3 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var _stringRepeat = function repeat(count) {
  var str = String(_defined(this));
  var res = '';
  var n = _toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

// https://github.com/tc39/proposal-string-pad-start-end




var _stringPad = function (that, maxLength, fillString, left) {
  var S = String(_defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = _toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

var navigator$1 = _global.navigator;

var _userAgent = navigator$1 && navigator$1.userAgent || '';

// https://github.com/tc39/proposal-string-pad-start-end




// https://github.com/zloirock/core-js/issues/280
_export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

var _fixReWks = function (KEY, length, exec) {
  var SYMBOL = _wks(KEY);
  var fns = exec(_defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (_fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    _redefine(String.prototype, KEY, strfn);
    _hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

// @@split logic
_fixReWks('split', 2, function (defined, SPLIT, $split) {
  var isRegExp = _isRegexp;
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
var _dateToIsoString = (_fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !_fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()



// PhantomJS / old WebKit has a broken implementations
_export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
  toISOString: _dateToIsoString
});

var script$4 = {
  mixins: [abstractField],
  inject: ["$validator"],
  fieldTypes: ["date_of_birth"],
  data: function data() {
    return {
      menu: false,
      dateFormatted: null
    };
  },
  computed: {
    max: function max() {
      return this.field.min_age ? new Date(new Date().getFullYear() - this.field.min_age, new Date().getMonth(), new Date().getDate()).toISOString().substr(0, 10) : null;
    },
    min: function min() {
      return this.field.max_age ? new Date(new Date().getFullYear() - this.field.max_age, new Date().getMonth(), new Date().getDate()).toISOString().substr(0, 10) : null;
    }
  },
  watch: {
    menu: function menu(val) {
      var _this = this;

      val && this.$nextTick(function () {
        return _this.$refs.picker.activePicker = "YEAR";
      });
    }
  },
  methods: {
    save: function save(date) {
      this.$refs.menu.save(date);
      this.$refs[this.field.name].$emit("input", this.formatDate(date));
    },
    formatDate: function formatDate(date) {
      if (!date) {
        return null;
      }

      var _date$split = date.split("-"),
          _date$split2 = _slicedToArray(_date$split, 3),
          year = _date$split2[0],
          month = _date$split2[1],
          day = _date$split2[2];

      return "".concat(month, "/").concat(day, "/").concat(year);
    },
    parseDate: function parseDate(date) {
      if (!date) {
        return null;
      }

      var _date$split3 = date.split("/"),
          _date$split4 = _slicedToArray(_date$split3, 3),
          month = _date$split4[0],
          day = _date$split4[1],
          year = _date$split4[2];

      return "".concat(year, "-").concat(month.padStart(2, "0"), "-").concat(day.padStart(2, "0"));
    }
  }
};

var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("v-menu", {
    ref: "menu",
    attrs: {
      "close-on-content-click": false,
      "nudge-right": 40,
      lazy: "",
      transition: "scale-transition",
      "offset-y": "",
      "full-width": "",
      "min-width": "290px"
    },
    model: {
      value: _vm.menu,
      callback: function callback($$v) {
        _vm.menu = $$v;
      },
      expression: "menu"
    }
  }, [_c("v-text-field", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: _vm.field.validate,
      expression: "field.validate"
    }],
    ref: _vm.field.name,
    attrs: {
      slot: "activator",
      error: _vm.errors.has(_vm.veeFieldName),
      "error-messages": _vm.errorMessages,
      label: _vm.field.label,
      required: _vm.field.required,
      disabled: _vm.field.disabled,
      "data-vv-as": _vm.field.label,
      "data-vv-scope": _vm.scope,
      placeholder: _vm.field.placeholder,
      name: _vm.field.name,
      readonly: "",
      "data-vv-validate-on": "input"
    },
    on: {
      blur: function blur($event) {
        _vm.localValue = _vm.parseDate(_vm.dateFormatted);
      },
      change: _vm.onChange,
      focus: _vm.onFocus,
      input: _vm.onInput
    },
    slot: "activator",
    model: {
      value: _vm.dateFormatted,
      callback: function callback($$v) {
        _vm.dateFormatted = $$v;
      },
      expression: "dateFormatted"
    }
  }), _c("v-date-picker", {
    ref: "picker",
    attrs: {
      min: _vm.min,
      max: _vm.max
    },
    on: {
      change: _vm.save
    },
    model: {
      value: _vm.localValue,
      callback: function callback($$v) {
        _vm.localValue = $$v;
      },
      expression: "localValue"
    }
  })], 1);
};

var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

var __vue_template__$4 = typeof __vue_render__$4 !== 'undefined' ? {
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
} : {};
/* style */


var __vue_inject_styles__$4 = undefined;
/* scoped */


var __vue_scope_id__$4 = undefined;
/* module identifier */


var __vue_module_identifier__$4 = undefined;
/* functional template */


var __vue_is_functional_template__$4 = false;
/* component normalizer */

function __vue_normalize__$4(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\fields\\core\\fieldDateOfBirth.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$4() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var _wcImport4 = __vue_normalize__$4(__vue_template__$4, __vue_inject_styles__$4, typeof __vue_script__$4 === 'undefined' ? {} : __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, typeof __vue_create_injector__$4 !== 'undefined' ? __vue_create_injector__$4 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var script$5 = {
  mixins: [abstractField],
  fieldTypes: ["date"],
  data: function data() {
    return {
      menu: false,
      dateFormatted: null
    };
  },
  methods: {
    setDate: function setDate(date) {
      this.dateFormatted = this.formatDate(date);
      this.onInput();
    },
    formatDate: function formatDate(date) {
      if (!date) {
        return null;
      }

      var _date$split = date.split("-"),
          _date$split2 = _slicedToArray(_date$split, 3),
          year = _date$split2[0],
          month = _date$split2[1],
          day = _date$split2[2];

      return "".concat(month, "/").concat(day, "/").concat(year);
    },
    parseDate: function parseDate(date) {
      if (!date) {
        return null;
      }

      var _date$split3 = date.split("/"),
          _date$split4 = _slicedToArray(_date$split3, 3),
          month = _date$split4[0],
          day = _date$split4[1],
          year = _date$split4[2];

      return "".concat(year, "-").concat(month.padStart(2, "0"), "-").concat(day.padStart(2, "0"));
    }
  }
};

var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("v-menu", {
    attrs: {
      "close-on-content-click": true,
      "nudge-right": 40,
      lazy: "",
      transition: "scale-transition",
      "offset-y": "",
      "full-width": "",
      "max-width": "290px",
      "min-width": "290px"
    },
    model: {
      value: _vm.menu,
      callback: function callback($$v) {
        _vm.menu = $$v;
      },
      expression: "menu"
    }
  }, [_c("v-text-field", {
    attrs: {
      slot: "activator",
      label: _vm.field.label,
      required: _vm.field.required,
      disabled: _vm.field.disabled,
      placeholder: _vm.field.placeholder,
      readonly: ""
    },
    on: {
      blur: function blur($event) {
        _vm.localValue = _vm.parseDate(_vm.dateFormatted);
      },
      change: _vm.onChange,
      focus: _vm.onFocus,
      input: _vm.onInput
    },
    slot: "activator",
    model: {
      value: _vm.dateFormatted,
      callback: function callback($$v) {
        _vm.dateFormatted = $$v;
      },
      expression: "dateFormatted"
    }
  }), _c("v-date-picker", {
    attrs: {
      "no-title": "",
      scrollable: "",
      actions: ""
    },
    on: {
      input: function input($event) {
        _vm.setDate($event);
      }
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(ref) {
        var save = ref.save;
        var cancel = ref.cancel;
        return [_c("v-card-actions", [_c("v-spacer"), _c("v-btn", {
          attrs: {
            flat: "",
            color: "primary"
          },
          on: {
            click: cancel
          }
        }, [_vm._v("Cancel")]), _c("v-btn", {
          attrs: {
            flat: "",
            color: "primary"
          },
          on: {
            click: save
          }
        }, [_vm._v("OK")])], 1)];
      }
    }]),
    model: {
      value: _vm.localValue,
      callback: function callback($$v) {
        _vm.localValue = $$v;
      },
      expression: "localValue"
    }
  })], 1);
};

var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

var __vue_template__$5 = typeof __vue_render__$5 !== 'undefined' ? {
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
} : {};
/* style */


var __vue_inject_styles__$5 = undefined;
/* scoped */


var __vue_scope_id__$5 = undefined;
/* module identifier */


var __vue_module_identifier__$5 = undefined;
/* functional template */


var __vue_is_functional_template__$5 = false;
/* component normalizer */

function __vue_normalize__$5(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\fields\\core\\fieldDate.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$5() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$5.styles || (__vue_create_injector__$5.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var _wcImport3 = __vue_normalize__$5(__vue_template__$5, __vue_inject_styles__$5, typeof __vue_script__$5 === 'undefined' ? {} : __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, typeof __vue_create_injector__$5 !== 'undefined' ? __vue_create_injector__$5 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//
var script$6 = {
  inject: ["$validator"],
  mixins: [abstractField],
  fieldTypes: ["choice"]
};

var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("v-select", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: _vm.field.required && "required",
      expression: "field.required && 'required'"
    }],
    attrs: {
      items: _vm.field.choices,
      label: _vm.field.label,
      required: _vm.field.required,
      readonly: _vm.field.readonly,
      disabled: _vm.field.disabled,
      error: _vm.errors.has(_vm.veeFieldName),
      "error-messages": _vm.errorMessages,
      name: _vm.field.name,
      "data-vv-delay": _vm.field.delay,
      "data-vv-as": _vm.field.label,
      "data-vv-name": _vm.field.name,
      "data-vv-scope": _vm.scope,
      id: _vm.field.name,
      "item-text": "label",
      "item-value": "value"
    },
    on: {
      blur: _vm.onBlur,
      change: _vm.onChange,
      focus: _vm.onFocus,
      input: _vm.onInput
    },
    model: {
      value: _vm.localValue,
      callback: function callback($$v) {
        _vm.localValue = $$v;
      },
      expression: "localValue"
    }
  });
};

var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

var __vue_template__$6 = typeof __vue_render__$6 !== 'undefined' ? {
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
} : {};
/* style */


var __vue_inject_styles__$6 = undefined;
/* scoped */


var __vue_scope_id__$6 = undefined;
/* module identifier */


var __vue_module_identifier__$6 = undefined;
/* functional template */


var __vue_is_functional_template__$6 = false;
/* component normalizer */

function __vue_normalize__$6(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\fields\\core\\fieldChoice.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$6() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$6.styles || (__vue_create_injector__$6.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var _wcImport2 = __vue_normalize__$6(__vue_template__$6, __vue_inject_styles__$6, typeof __vue_script__$6 === 'undefined' ? {} : __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, typeof __vue_create_injector__$6 !== 'undefined' ? __vue_create_injector__$6 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//
var script$7 = {
  inject: ["$validator"],
  mixins: [abstractField],
  fieldTypes: ["autocomplete", "combobox"],
  data: function data() {
    return {
      combobox: this.field.field_id === "combobox"
    };
  }
};

var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("v-autocomplete", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: _vm.field.required && "required",
      expression: "field.required && 'required'"
    }],
    attrs: {
      items: _vm.field.choices,
      combobox: _vm.combobox,
      chips: _vm.combobox,
      label: _vm.field.label,
      required: _vm.field.required,
      readonly: _vm.field.readonly,
      disabled: _vm.field.disabled,
      error: _vm.errors.has(_vm.veeFieldName),
      "error-messages": _vm.errorMessages,
      name: _vm.field.name,
      "data-vv-delay": _vm.field.delay,
      "data-vv-as": _vm.field.label,
      "data-vv-name": _vm.field.name,
      "data-vv-scope": _vm.scope,
      id: _vm.field.name,
      "item-text": "label",
      "item-value": "value"
    },
    on: {
      blur: _vm.onBlur,
      change: _vm.onChange,
      focus: _vm.onFocus,
      input: _vm.onInput
    },
    model: {
      value: _vm.localValue,
      callback: function callback($$v) {
        _vm.localValue = $$v;
      },
      expression: "localValue"
    }
  });
};

var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

var __vue_template__$7 = typeof __vue_render__$7 !== 'undefined' ? {
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
} : {};
/* style */


var __vue_inject_styles__$7 = undefined;
/* scoped */


var __vue_scope_id__$7 = undefined;
/* module identifier */


var __vue_module_identifier__$7 = undefined;
/* functional template */


var __vue_is_functional_template__$7 = false;
/* component normalizer */

function __vue_normalize__$7(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\fields\\core\\fieldAutocomplete.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$7() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$7.styles || (__vue_create_injector__$7.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var _wcImport = __vue_normalize__$7(__vue_template__$7, __vue_inject_styles__$7, typeof __vue_script__$7 === 'undefined' ? {} : __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, typeof __vue_create_injector__$7 !== 'undefined' ? __vue_create_injector__$7 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var coreFields = {};
coreFields["FieldTextDisplay"] = _wcImport7;
coreFields["FieldSignature"] = _wcImport6;
coreFields["FieldInput"] = _wcImport5;
coreFields["FieldDateOfBirth"] = _wcImport4;
coreFields["FieldDate"] = _wcImport3;
coreFields["FieldChoice"] = _wcImport2;
coreFields["FieldAutocomplete"] = _wcImport;
var fieldComponents = {};
Object.keys(coreFields).forEach(function (key) {
  coreFields[key].fieldTypes.forEach(function (fieldType) {
    fieldComponents[fieldType] = coreFields[key];
  });
});
var script$8 = {
  name: "VFormGeneratorField",
  components: fieldComponents,
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number],
      required: false,
      default: null
    },
    scope: {
      type: String,
      default: null,
      required: false
    }
  },
  methods: {
    onUpd: function onUpd(value, fieldName) {
      this.$emit("upd", value, fieldName);
    }
  }
};

var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", [_c(_vm.field.field_id, {
    tag: "component",
    attrs: {
      field: _vm.field,
      scope: _vm.scope,
      value: _vm.value
    },
    on: {
      upd: _vm.onUpd
    }
  })], 1);
};

var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

var __vue_template__$8 = typeof __vue_render__$8 !== 'undefined' ? {
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
} : {};
/* style */


var __vue_inject_styles__$8 = undefined;
/* scoped */


var __vue_scope_id__$8 = undefined;
/* module identifier */


var __vue_module_identifier__$8 = undefined;
/* functional template */


var __vue_is_functional_template__$8 = false;
/* component normalizer */

function __vue_normalize__$8(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\form-field.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$8() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$8.styles || (__vue_create_injector__$8.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var formField = __vue_normalize__$8(__vue_template__$8, __vue_inject_styles__$8, typeof __vue_script__$8 === 'undefined' ? {} : __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, typeof __vue_create_injector__$8 !== 'undefined' ? __vue_create_injector__$8 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//
var script$9 = {
  name: "VuetifyFormGenerator",
  components: {
    "v-form-generator-field": formField
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    schema: {
      type: Array,
      required: true
    },
    valid: {
      type: Boolean,
      default: false
    },
    validationScope: {
      type: String,
      default: null,
      required: false
    }
  },
  inject: {
    $validator: {
      default: false
    }
  },
  $_veeValidate: {
    validator: "new"
  },
  data: function data() {
    return {};
  },
  created: function created() {
    var _this = this;

    this.$watch(function () {
      return _this.$invalid();
    }, function (value) {
      _this.$emit("update:valid", !value);
    });
  },
  methods: {
    onBlur: function onBlur() {// console.info("blur")
    },
    onChange: function onChange() {// console.info("change")
    },
    onFocus: function onFocus() {// console.info("focus")
    },
    onInput: function onInput(value, fieldName) {
      this.$set(this.model, fieldName, value);
      this.$emit("update:model", this.model);
    }
  }
};

var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", _vm._l(_vm.schema, function (section, index) {
    return _c("div", {
      key: "vf-" + index
    }, [_c("v-card", {
      attrs: {
        flat: ""
      }
    }, [_c("v-card-title", [_vm._v(_vm._s(section.label))]), _c("v-card-text", _vm._l(section.fields, function (field) {
      return _c("div", {
        key: field.name
      }, [_c("v-form-generator-field", {
        attrs: {
          field: field,
          value: _vm.model[field.name] || field.value,
          scope: _vm.validationScope
        },
        on: {
          upd: _vm.onInput
        }
      })], 1);
    }))], 1)], 1);
  }));
};

var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

var __vue_template__$9 = typeof __vue_render__$9 !== 'undefined' ? {
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
} : {};
/* style */


var __vue_inject_styles__$9 = undefined;
/* scoped */


var __vue_scope_id__$9 = undefined;
/* module identifier */


var __vue_module_identifier__$9 = undefined;
/* functional template */


var __vue_is_functional_template__$9 = false;
/* component normalizer */

function __vue_normalize__$9(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\form-generator.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$9() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$9.styles || (__vue_create_injector__$9.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var VuetifyFormGenerator = __vue_normalize__$9(__vue_template__$9, __vue_inject_styles__$9, typeof __vue_script__$9 === 'undefined' ? {} : __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, typeof __vue_create_injector__$9 !== 'undefined' ? __vue_create_injector__$9 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var $indexOf = _arrayIncludes(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$a = {
  name: "VuetifyDisplayForm",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    getChoiceValue: function getChoiceValue(field) {
      var choice = field.choices.find(function (labelValue) {
        return field.value === labelValue.value;
      });

      if (choice) {
        return choice.label;
      } else {
        return field.value;
      }
    }
  }
};

var css$2 = "@font-face {\n  font-family: Arizonia;\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Arizonia Regular\"),local(Arizonia-Regular),url(//fonts.gstatic.com/s/arizonia/v8/u7E0xBiSyufT4DCm3LWEtfesZW2xOQ-xsNqO47m55DA.eot?#) format(\"eot\"),url(//fonts.gstatic.com/s/arizonia/v8/PwrsyFTYH2Wmsvpn0dx4s_esZW2xOQ-xsNqO47m55DA.woff2) format(\"woff2\"),url(//fonts.gstatic.com/s/arizonia/v8/8Usm7f8XTsZinW2e-ZMd5fesZW2xOQ-xsNqO47m55DA.woff) format(\"woff\");\n}\n.signature-text[data-v-bc91025e] {\n  font-family: Arizonia, sans-serif;\n  font-size: 30px;\n}\n.v-display-form .layout.row[data-v-bc91025e]:nth-child(2n) {\n  background-color: #f6f6f6;\n}\n";
styleInject(css$2);

var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "v-display-form"
  }, _vm._l(_vm.form.sections, function (section, index) {
    return _c("div", {
      key: "vf-" + index
    }, [_c("v-card", {
      attrs: {
        flat: ""
      }
    }, [_c("v-card-title", [_vm._v(_vm._s(section.label))]), _c("v-card-text", [_c("v-container", {
      attrs: {
        "grid-list-md": ""
      }
    }, _vm._l(section.fields, function (field) {
      return _c("v-layout", {
        key: field.name,
        attrs: {
          row: "",
          wrap: "",
          "pb-2": "",
          "pt-2": ""
        }
      }, [field.field_id === "signature" ? [field.value.indexOf("data:image") !== -1 ? _c("v-flex", {
        attrs: {
          xs12: ""
        }
      }, [_c("img", {
        attrs: {
          src: field.value
        }
      })]) : _c("v-flex", {
        staticClass: "signature-text"
      }, [_c("strong", [_vm._v("\n                  " + _vm._s(field.value) + "\n                ")])])] : field.field_id === "text_display" ? [_c("v-flex", {
        staticClass: "headline",
        attrs: {
          xs12: "",
          sm6: ""
        },
        domProps: {
          innerHTML: _vm._s(field.label)
        }
      })] : ["choice", "state", "combobox"].indexOf(field.field_id) !== -1 ? [_c("v-flex", {
        attrs: {
          xs12: "",
          sm6: ""
        }
      }, [_vm._v("\n                " + _vm._s(field.label) + "\n              ")]), _c("v-flex", {
        attrs: {
          xs12: "",
          sm6: ""
        }
      }, [_c("strong", [_vm._v("\n                  " + _vm._s(_vm.getChoiceValue(field)) + "\n                ")])])] : [_c("v-flex", {
        attrs: {
          xs12: "",
          sm6: ""
        }
      }, [_vm._v("\n                " + _vm._s(field.label) + "\n              ")]), _c("v-flex", {
        attrs: {
          xs12: "",
          sm6: ""
        }
      }, [_c("strong", [_vm._v("\n                  " + _vm._s(field.value) + "\n                ")])])]], 2);
    }))], 1)], 1)], 1);
  }));
};

var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

var __vue_template__$a = typeof __vue_render__$a !== 'undefined' ? {
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
} : {};
/* style */


var __vue_inject_styles__$a = undefined;
/* scoped */


var __vue_scope_id__$a = "data-v-bc91025e";
/* module identifier */


var __vue_module_identifier__$a = undefined;
/* functional template */


var __vue_is_functional_template__$a = false;
/* component normalizer */

function __vue_normalize__$a(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  {
    component.__file = "C:\\Dev\\PycharmProjects\\vuetify-form-generator\\src\\components\\display-form.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */


function __vue_create_injector__$a() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$a.styles || (__vue_create_injector__$a.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: [],
      parts: [],
      element: undefined
    });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;
      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';
        if (css.media) el.setAttribute('media', css.media);

        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */


var VuetifyDisplayForm = __vue_normalize__$a(__vue_template__$a, __vue_inject_styles__$a, typeof __vue_script__$a === 'undefined' ? {} : __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, typeof __vue_create_injector__$a !== 'undefined' ? __vue_create_injector__$a : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var LibraryModule = {
  VuetifyFormGenerator: VuetifyFormGenerator,
  VuetifyDisplayForm: VuetifyDisplayForm,
  install: function install(Vue) {
    // Register components with vue
    Vue.component("VuetifyFormGenerator", VuetifyFormGenerator);
    Vue.component("VuetifyDisplayForm", VuetifyDisplayForm);
  }
};

exports.default = LibraryModule;
exports.VuetifyFormGenerator = VuetifyFormGenerator;
exports.VuetifyDisplayForm = VuetifyDisplayForm;
