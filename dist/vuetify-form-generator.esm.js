/**
 * Copyright 2017 Aldarund <shaper.int@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import VueSignature from 'vue-signature';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

var stringify$1 = createCommonjsModule(function (module) {
module.exports = { "default": stringify, __esModule: true };
});

unwrapExports(stringify$1);

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
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

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: 'pure',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
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

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

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

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
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

var keys = _core.Object.keys;

var keys$1 = createCommonjsModule(function (module) {
module.exports = { "default": keys, __esModule: true };
});

var _Object$keys = unwrapExports(keys$1);

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
      localValue: this.value,
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
        return this.scope + "." + this.field.name;
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
  return _c("div", { domProps: { innerHTML: _vm._s(_vm.field.label) } });
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

var __vue_template__ = typeof __vue_render__ !== 'undefined' ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ } : {};
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
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var _wcImport6 = __vue_normalize__(__vue_template__, __vue_inject_styles__, typeof __vue_script__ === 'undefined' ? {} : __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//

var script$1 = {
  components: {
    "vue-signature": VueSignature
  },
  mixins: [abstractField],
  fieldTypes: ["signature"],
  data: function data() {
    var _this = this;

    return {
      mode: "graph",
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
    clear: function clear() {
      this.$refs.signature.clear();
      this.$emit("upd", "", this.field.name);
    }
  }
};

var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm.mode === "graph" ? _c("div", [_c("vue-signature", {
    ref: "signature",
    attrs: { "sig-option": _vm.option }
  }), _c("a", {
    on: {
      click: function click($event) {
        _vm.mode = "text";
      }
    }
  }, [_vm._v("Prefer to type your signature? Click here")]), _c("v-btn", {
    on: {
      click: function click($event) {
        _vm.clear();
      }
    }
  }, [_vm._v("clear")])], 1) : _vm.mode === "text" ? _c("div", [_c("div", { staticClass: "signature-text" }, [_vm._v(_vm._s(_vm.localValue))]), _c("v-text-field", {
    attrs: {
      label: _vm.field.label,
      required: _vm.field.required,
      readonly: _vm.field.editable,
      disabled: _vm.field.disabled,
      placeholder: _vm.field.placeholder,
      name: _vm.field.name,
      id: _vm.field.name
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
  }), _c("a", {
    on: {
      click: function click($event) {
        _vm.mode = "graph";
      }
    }
  }, [_vm._v("Prefer to draw your signature? Click here")])], 1) : _vm._e()]);
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

var __vue_template__$1 = typeof __vue_render__$1 !== 'undefined' ? { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 } : {};
/* style */
var __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-099618ec_0", { source: "\n@font-face {\n  font-family: \"Quentin\";\n  src: url(\"./../../assets/fonts/Quentin.woff2\") format(\"woff2\"),\n    url(\"./../../assets/fonts/Quentin.woff\") format(\"woff\");\n  font-weight: bold;\n  font-style: normal;\n}\n.signature-text[data-v-099618ec] {\n  font-family: Quentin, sans-serif;\n  font-size: 30px;\n}\n", map: undefined, media: undefined });
};
/* scoped */
var __vue_scope_id__$1 = "data-v-099618ec";
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* component normalizer */
function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
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

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */
function __vue_create_injector__$1() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var _wcImport5 = __vue_normalize__$1(__vue_template__$1, __vue_inject_styles__$1, typeof __vue_script__$1 === 'undefined' ? {} : __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, typeof __vue_create_injector__$1 !== 'undefined' ? __vue_create_injector__$1 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//

var script$2 = {
  inject: ["$validator"],
  mixins: [abstractField],
  fieldTypes: ["single_line", "multi_line", "unit_field", "ssn", "phone", "email"]
};

var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
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
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

var __vue_template__$2 = typeof __vue_render__$2 !== 'undefined' ? { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 } : {};
/* style */
var __vue_inject_styles__$2 = undefined;
/* scoped */
var __vue_scope_id__$2 = undefined;
/* module identifier */
var __vue_module_identifier__$2 = undefined;
/* functional template */
var __vue_is_functional_template__$2 = false;
/* component normalizer */
function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
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
function __vue_create_injector__$2() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var _wcImport4 = __vue_normalize__$2(__vue_template__$2, __vue_inject_styles__$2, typeof __vue_script__$2 === 'undefined' ? {} : __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, typeof __vue_create_injector__$2 !== 'undefined' ? __vue_create_injector__$2 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var _iterators = {};

var _redefine = _hide;

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
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
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

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$1 = _wks('iterator');

var core_isIterable = _core.isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR$1] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || _iterators.hasOwnProperty(_classof(O));
};

var isIterable = core_isIterable;

var isIterable$1 = createCommonjsModule(function (module) {
module.exports = { "default": isIterable, __esModule: true };
});

unwrapExports(isIterable$1);

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var core_getIterator = _core.getIterator = function (it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return _anObject(iterFn.call(it));
};

var getIterator = core_getIterator;

var getIterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": getIterator, __esModule: true };
});

unwrapExports(getIterator$1);

var slicedToArray = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _isIterable3 = _interopRequireDefault(isIterable$1);



var _getIterator3 = _interopRequireDefault(getIterator$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
});

var _slicedToArray = unwrapExports(slicedToArray);

var script$3 = {
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

      return month + "/" + day + "/" + year;
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

      return year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
    }
  }
};

var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function __vue_render__() {
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
    ref: "picker",
    attrs: { min: _vm.min, max: _vm.max },
    on: { change: _vm.save },
    model: {
      value: _vm.localValue,
      callback: function callback($$v) {
        _vm.localValue = $$v;
      },
      expression: "localValue"
    }
  })], 1);
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

var __vue_template__$3 = typeof __vue_render__$3 !== 'undefined' ? { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 } : {};
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
function __vue_create_injector__$3() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var _wcImport3 = __vue_normalize__$3(__vue_template__$3, __vue_inject_styles__$3, typeof __vue_script__$3 === 'undefined' ? {} : __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, typeof __vue_create_injector__$3 !== 'undefined' ? __vue_create_injector__$3 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//  TOOD fix field. not very usable
var script$4 = {
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

      return month + "/" + day + "/" + year;
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

      return year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
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
    attrs: { "no-title": "", scrollable: "", actions: "" },
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
          attrs: { flat: "", color: "primary" },
          on: { click: cancel }
        }, [_vm._v("Cancel")]), _c("v-btn", {
          attrs: { flat: "", color: "primary" },
          on: { click: save }
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
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

var __vue_template__$4 = typeof __vue_render__$4 !== 'undefined' ? { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 } : {};
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
function __vue_create_injector__$4() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var _wcImport2 = __vue_normalize__$4(__vue_template__$4, __vue_inject_styles__$4, typeof __vue_script__$4 === 'undefined' ? {} : __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, typeof __vue_create_injector__$4 !== 'undefined' ? __vue_create_injector__$4 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//

var script$5 = {
  inject: ["$validator"],
  mixins: [abstractField],
  fieldTypes: ["choice", "state", "combobox"],
  data: function data() {
    return {
      combobox: this.field.field_id === "combobox"
    };
  },

  methods: {}
};

var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function __vue_render__() {
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
      combobox: _vm.combobox,
      autocomplete: _vm.field.autocomplete,
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
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

var __vue_template__$5 = typeof __vue_render__$5 !== 'undefined' ? { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 } : {};
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
function __vue_create_injector__$5() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$5.styles || (__vue_create_injector__$5.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var _wcImport = __vue_normalize__$5(__vue_template__$5, __vue_inject_styles__$5, typeof __vue_script__$5 === 'undefined' ? {} : __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, typeof __vue_create_injector__$5 !== 'undefined' ? __vue_create_injector__$5 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var coreFields = {}; //
coreFields["FieldTextDisplay"] = _wcImport6;
coreFields["FieldSignature"] = _wcImport5;
coreFields["FieldInput"] = _wcImport4;
coreFields["FieldDateOfBirth"] = _wcImport3;
coreFields["FieldDate"] = _wcImport2;
coreFields["FieldChoice"] = _wcImport;

var fieldComponents = {};
_Object$keys(coreFields).forEach(function (key) {
  coreFields[key].fieldTypes.forEach(function (fieldType) {
    fieldComponents[fieldType] = coreFields[key];
  });
});

var script$6 = {
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

var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_c(_vm.field.field_id, {
    tag: "component",
    attrs: { field: _vm.field, scope: _vm.scope, value: _vm.value },
    on: { upd: _vm.onUpd }
  })], 1);
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

var __vue_template__$6 = typeof __vue_render__$6 !== 'undefined' ? { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 } : {};
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
function __vue_create_injector__$6() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$6.styles || (__vue_create_injector__$6.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var formField = __vue_normalize__$6(__vue_template__$6, __vue_inject_styles__$6, typeof __vue_script__$6 === 'undefined' ? {} : __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, typeof __vue_create_injector__$6 !== 'undefined' ? __vue_create_injector__$6 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//

var script$7 = {
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
    $validator: { default: false }
  },
  $_veeValidate: { validator: "new" },
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
    onBlur: function onBlur() {
      // console.info("blur")
    },
    onChange: function onChange() {
      // console.info("change")
    },
    onFocus: function onFocus() {
      // console.info("focus")
    },
    onInput: function onInput(value, fieldName) {
      this.$set(this.model, fieldName, value);
      this.$emit("update:model", this.model);
    }
  }
};

var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", _vm._l(_vm.schema, function (section, index) {
    return _c("div", { key: "vf-" + index }, [_c("v-card", { attrs: { flat: "" } }, [_c("v-card-title", [_vm._v(_vm._s(section.label))]), _c("v-card-text", _vm._l(section.fields, function (field) {
      return _c("div", { key: field.name }, [_c("v-form-generator-field", {
        attrs: {
          field: field,
          value: _vm.model[field.name] || field.value,
          scope: _vm.validationScope
        },
        on: { upd: _vm.onInput }
      })], 1);
    }))], 1)], 1);
  }));
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

var __vue_template__$7 = typeof __vue_render__$7 !== 'undefined' ? { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 } : {};
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
function __vue_create_injector__$7() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$7.styles || (__vue_create_injector__$7.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var VuetifyFormGenerator = __vue_normalize__$7(__vue_template__$7, __vue_inject_styles__$7, typeof __vue_script__$7 === 'undefined' ? {} : __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, typeof __vue_create_injector__$7 !== 'undefined' ? __vue_create_injector__$7 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

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
//
//
//
//
//
//
//
//

var script$8 = {
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

var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "v-display-form" }, _vm._l(_vm.form.sections, function (section, index) {
    return _c("div", { key: "vf-" + index }, [_c("v-card", { attrs: { flat: "" } }, [_c("v-card-title", [_vm._v(_vm._s(section.label))]), _c("v-card-text", [_c("v-container", { attrs: { "grid-list-md": "" } }, _vm._l(section.fields, function (field) {
      return _c("v-layout", {
        key: field.name,
        attrs: { row: "", wrap: "", "pb-2": "", "pt-2": "" }
      }, [field.field_id === "signature" ? [field.value.indexOf("data:image") !== -1 ? _c("v-flex", { attrs: { xs12: "" } }, [_c("img", { attrs: { src: field.value } })]) : _c("v-flex", { staticClass: "signature-text" }, [_c("strong", [_vm._v("\n                  " + _vm._s(field.value) + "\n                ")])])] : field.field_id === "text_display" ? [_c("v-flex", {
        staticClass: "headline",
        attrs: { xs12: "", sm6: "" },
        domProps: { innerHTML: _vm._s(field.label) }
      })] : ["choice", "state", "combobox"].indexOf(field.field_id) !== -1 ? [_c("v-flex", { attrs: { xs12: "", sm6: "" } }, [_vm._v("\n                " + _vm._s(field.label) + "\n              ")]), _c("v-flex", { attrs: { xs12: "", sm6: "" } }, [_c("strong", [_vm._v("\n                  " + _vm._s(_vm.getChoiceValue(field)) + "\n                ")])])] : [_c("v-flex", { attrs: { xs12: "", sm6: "" } }, [_vm._v("\n                " + _vm._s(field.label) + "\n              ")]), _c("v-flex", { attrs: { xs12: "", sm6: "" } }, [_c("strong", [_vm._v("\n                  " + _vm._s(field.value) + "\n                ")])])]], 2);
    }))], 1)], 1)], 1);
  }));
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

var __vue_template__$8 = typeof __vue_render__$8 !== 'undefined' ? { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 } : {};
/* style */
var __vue_inject_styles__$8 = function (inject) {
  if (!inject) return;
  inject("data-v-8babc3f4_0", { source: "\n@font-face {\n  font-family: \"Quentin\";\n  src: url(\"./assets/fonts/Quentin.woff2\") format(\"woff2\"),\n    url(\"./assets/fonts/Quentin.woff\") format(\"woff\");\n  font-weight: bold;\n  font-style: normal;\n}\n.signature-text[data-v-8babc3f4] {\n  font-family: Quentin, sans-serif;\n  font-size: 30px;\n}\n.v-display-form .layout.row[data-v-8babc3f4]:nth-child(2n) {\n  background-color: #f6f6f6;\n}\n", map: undefined, media: undefined });
};
/* scoped */
var __vue_scope_id__$8 = "data-v-8babc3f4";
/* module identifier */
var __vue_module_identifier__$8 = undefined;
/* functional template */
var __vue_is_functional_template__$8 = false;
/* component normalizer */
function __vue_normalize__$8(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
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

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

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
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

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

var VuetifyDisplayForm = __vue_normalize__$8(__vue_template__$8, __vue_inject_styles__$8, typeof __vue_script__$8 === 'undefined' ? {} : __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, typeof __vue_create_injector__$8 !== 'undefined' ? __vue_create_injector__$8 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var LibraryModule = {
  VuetifyFormGenerator: VuetifyFormGenerator,
  VuetifyDisplayForm: VuetifyDisplayForm,
  install: function install(Vue) {
    // Register components with vue
    Vue.component("VuetifyFormGenerator", VuetifyFormGenerator);
    Vue.component("VuetifyDisplayForm", VuetifyDisplayForm);
  }
};

export default LibraryModule;
export { VuetifyFormGenerator, VuetifyDisplayForm };
