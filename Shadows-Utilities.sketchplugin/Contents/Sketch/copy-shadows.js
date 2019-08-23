var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/commands/copy-shadows.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(/*! ./timeout */ "./node_modules/@skpm/timers/timeout.js")

function setImmediate(func, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return timeout.setTimeout(func, 0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
}

function clearImmediate(id) {
  return timeout.clearTimeout(id)
}

module.exports = {
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
}


/***/ }),

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, setImmediate) {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/immediate.js */ "./node_modules/@skpm/timers/immediate.js")["setImmediate"]))

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "./src/commands/copy-shadows.js":
/*!**************************************!*\
  !*** ./src/commands/copy-shadows.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var PS = __webpack_require__(/*! ../scripts/output.js */ "./src/scripts/output.js")["Main"];

exports["copyShadows"] = function () {
  PS.copyOrCutShadows("COPY")();
};

exports["cutShadows"] = function () {
  PS.copyOrCutShadows("CUT")();
};

exports["pasteShadows"] = function () {
  PS.pasteOrRemoveShadows("PASTE")();
};

exports["removeShadows"] = function () {
  PS.pasteOrRemoveShadows("REMOVE")();
};

/***/ }),

/***/ "./src/scripts/output.js":
/*!*******************************!*\
  !*** ./src/scripts/output.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Generated by purs bundle 0.13.3
var PS = {};

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Alt"] = $PS["Control.Alt"] || {};
  var exports = $PS["Control.Alt"];

  var Alt = function Alt(Functor0, alt) {
    this.Functor0 = Functor0;
    this.alt = alt;
  };

  var alt = function alt(dict) {
    return dict.alt;
  };

  exports["Alt"] = Alt;
  exports["alt"] = alt;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Semigroupoid"] = $PS["Control.Semigroupoid"] || {};
  var exports = $PS["Control.Semigroupoid"];

  var Semigroupoid = function Semigroupoid(compose) {
    this.compose = compose;
  };

  var semigroupoidFn = new Semigroupoid(function (f) {
    return function (g) {
      return function (x) {
        return f(g(x));
      };
    };
  });

  var compose = function compose(dict) {
    return dict.compose;
  };

  var composeFlipped = function composeFlipped(dictSemigroupoid) {
    return function (f) {
      return function (g) {
        return compose(dictSemigroupoid)(g)(f);
      };
    };
  };

  exports["compose"] = compose;
  exports["composeFlipped"] = composeFlipped;
  exports["semigroupoidFn"] = semigroupoidFn;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Category"] = $PS["Control.Category"] || {};
  var exports = $PS["Control.Category"];
  var Control_Semigroupoid = $PS["Control.Semigroupoid"];

  var Category = function Category(Semigroupoid0, identity) {
    this.Semigroupoid0 = Semigroupoid0;
    this.identity = identity;
  };

  var identity = function identity(dict) {
    return dict.identity;
  };

  var categoryFn = new Category(function () {
    return Control_Semigroupoid.semigroupoidFn;
  }, function (x) {
    return x;
  });
  exports["identity"] = identity;
  exports["categoryFn"] = categoryFn;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Function"] = $PS["Data.Function"] || {};
  var exports = $PS["Data.Function"];

  var flip = function flip(f) {
    return function (b) {
      return function (a) {
        return f(a)(b);
      };
    };
  };

  var $$const = function $$const(a) {
    return function (v) {
      return a;
    };
  };

  exports["flip"] = flip;
  exports["const"] = $$const;
})(PS);

(function (exports) {
  "use strict";

  exports.arrayMap = function (f) {
    return function (arr) {
      var l = arr.length;
      var result = new Array(l);

      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }

      return result;
    };
  };
})(PS["Data.Functor"] = PS["Data.Functor"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Functor"] = $PS["Data.Functor"] || {};
  var exports = $PS["Data.Functor"];
  var $foreign = $PS["Data.Functor"];
  var Control_Semigroupoid = $PS["Control.Semigroupoid"];

  var Functor = function Functor(map) {
    this.map = map;
  };

  var map = function map(dict) {
    return dict.map;
  };

  var functorFn = new Functor(Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn));
  var functorArray = new Functor($foreign.arrayMap);
  exports["Functor"] = Functor;
  exports["map"] = map;
  exports["functorFn"] = functorFn;
  exports["functorArray"] = functorArray;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Apply"] = $PS["Control.Apply"] || {};
  var exports = $PS["Control.Apply"];
  var Control_Category = $PS["Control.Category"];
  var Data_Function = $PS["Data.Function"];
  var Data_Functor = $PS["Data.Functor"];

  var Apply = function Apply(Functor0, apply) {
    this.Functor0 = Functor0;
    this.apply = apply;
  };

  var apply = function apply(dict) {
    return dict.apply;
  };

  var applySecond = function applySecond(dictApply) {
    return function (a) {
      return function (b) {
        return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"](Control_Category.identity(Control_Category.categoryFn)))(a))(b);
      };
    };
  };

  exports["Apply"] = Apply;
  exports["apply"] = apply;
  exports["applySecond"] = applySecond;
})(PS);

(function (exports) {
  "use strict";

  exports.unit = {};
})(PS["Data.Unit"] = PS["Data.Unit"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Unit"] = $PS["Data.Unit"] || {};
  var exports = $PS["Data.Unit"];
  var $foreign = $PS["Data.Unit"];
  exports["unit"] = $foreign.unit;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Applicative"] = $PS["Control.Applicative"] || {};
  var exports = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Data_Unit = $PS["Data.Unit"];

  var Applicative = function Applicative(Apply0, pure) {
    this.Apply0 = Apply0;
    this.pure = pure;
  };

  var pure = function pure(dict) {
    return dict.pure;
  };

  var unless = function unless(dictApplicative) {
    return function (v) {
      return function (v1) {
        if (!v) {
          return v1;
        }

        ;

        if (v) {
          return pure(dictApplicative)(Data_Unit.unit);
        }

        ;
        throw new Error("Failed pattern match at Control.Applicative (line 62, column 1 - line 62, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };

  var liftA1 = function liftA1(dictApplicative) {
    return function (f) {
      return function (a) {
        return Control_Apply.apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
      };
    };
  };

  exports["Applicative"] = Applicative;
  exports["pure"] = pure;
  exports["liftA1"] = liftA1;
  exports["unless"] = unless;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Bind"] = $PS["Control.Bind"] || {};
  var exports = $PS["Control.Bind"];
  var Data_Function = $PS["Data.Function"];

  var Discard = function Discard(discard) {
    this.discard = discard;
  };

  var Bind = function Bind(Apply0, bind) {
    this.Apply0 = Apply0;
    this.bind = bind;
  };

  var discard = function discard(dict) {
    return dict.discard;
  };

  var bind = function bind(dict) {
    return dict.bind;
  };

  var bindFlipped = function bindFlipped(dictBind) {
    return Data_Function.flip(bind(dictBind));
  };

  var composeKleisli = function composeKleisli(dictBind) {
    return function (f) {
      return function (g) {
        return function (a) {
          return bind(dictBind)(f(a))(g);
        };
      };
    };
  };

  var discardUnit = new Discard(function (dictBind) {
    return bind(dictBind);
  });
  exports["Bind"] = Bind;
  exports["bind"] = bind;
  exports["bindFlipped"] = bindFlipped;
  exports["discard"] = discard;
  exports["composeKleisli"] = composeKleisli;
  exports["discardUnit"] = discardUnit;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Monad"] = $PS["Control.Monad"] || {};
  var exports = $PS["Control.Monad"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Bind = $PS["Control.Bind"];

  var Monad = function Monad(Applicative0, Bind1) {
    this.Applicative0 = Applicative0;
    this.Bind1 = Bind1;
  };

  var ap = function ap(dictMonad) {
    return function (f) {
      return function (a) {
        return Control_Bind.bind(dictMonad.Bind1())(f)(function (v) {
          return Control_Bind.bind(dictMonad.Bind1())(a)(function (v1) {
            return Control_Applicative.pure(dictMonad.Applicative0())(v(v1));
          });
        });
      };
    };
  };

  exports["Monad"] = Monad;
  exports["ap"] = ap;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Monad.Error.Class"] = $PS["Control.Monad.Error.Class"] || {};
  var exports = $PS["Control.Monad.Error.Class"];

  var MonadThrow = function MonadThrow(Monad0, throwError) {
    this.Monad0 = Monad0;
    this.throwError = throwError;
  };

  var throwError = function throwError(dict) {
    return dict.throwError;
  };

  exports["throwError"] = throwError;
  exports["MonadThrow"] = MonadThrow;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Bifunctor"] = $PS["Data.Bifunctor"] || {};
  var exports = $PS["Data.Bifunctor"];
  var Control_Category = $PS["Control.Category"];

  var Bifunctor = function Bifunctor(bimap) {
    this.bimap = bimap;
  };

  var bimap = function bimap(dict) {
    return dict.bimap;
  };

  var lmap = function lmap(dictBifunctor) {
    return function (f) {
      return bimap(dictBifunctor)(f)(Control_Category.identity(Control_Category.categoryFn));
    };
  };

  exports["Bifunctor"] = Bifunctor;
  exports["lmap"] = lmap;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Either"] = $PS["Data.Either"] || {};
  var exports = $PS["Data.Either"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Data_Bifunctor = $PS["Data.Bifunctor"];
  var Data_Functor = $PS["Data.Functor"];

  var Left = function () {
    function Left(value0) {
      this.value0 = value0;
    }

    ;

    Left.create = function (value0) {
      return new Left(value0);
    };

    return Left;
  }();

  var Right = function () {
    function Right(value0) {
      this.value0 = value0;
    }

    ;

    Right.create = function (value0) {
      return new Right(value0);
    };

    return Right;
  }();

  var functorEither = new Data_Functor.Functor(function (f) {
    return function (m) {
      if (m instanceof Left) {
        return new Left(m.value0);
      }

      ;

      if (m instanceof Right) {
        return new Right(f(m.value0));
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 38, column 1 - line 38, column 52): " + [m.constructor.name]);
    };
  });

  var either = function either(v) {
    return function (v1) {
      return function (v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }

        ;

        if (v2 instanceof Right) {
          return v1(v2.value0);
        }

        ;
        throw new Error("Failed pattern match at Data.Either (line 238, column 1 - line 238, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  var bifunctorEither = new Data_Bifunctor.Bifunctor(function (v) {
    return function (v1) {
      return function (v2) {
        if (v2 instanceof Left) {
          return new Left(v(v2.value0));
        }

        ;

        if (v2 instanceof Right) {
          return new Right(v1(v2.value0));
        }

        ;
        throw new Error("Failed pattern match at Data.Either (line 46, column 1 - line 48, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  });
  var applyEither = new Control_Apply.Apply(function () {
    return functorEither;
  }, function (v) {
    return function (v1) {
      if (v instanceof Left) {
        return new Left(v.value0);
      }

      ;

      if (v instanceof Right) {
        return Data_Functor.map(functorEither)(v.value0)(v1);
      }

      ;
      throw new Error("Failed pattern match at Data.Either (line 82, column 1 - line 84, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  });
  var applicativeEither = new Control_Applicative.Applicative(function () {
    return applyEither;
  }, Right.create);
  exports["Left"] = Left;
  exports["Right"] = Right;
  exports["either"] = either;
  exports["functorEither"] = functorEither;
  exports["bifunctorEither"] = bifunctorEither;
  exports["applicativeEither"] = applicativeEither;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Semigroup"] = $PS["Data.Semigroup"] || {};
  var exports = $PS["Data.Semigroup"];

  var Semigroup = function Semigroup(append) {
    this.append = append;
  };

  var append = function append(dict) {
    return dict.append;
  };

  exports["Semigroup"] = Semigroup;
  exports["append"] = append;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Monad.Except.Trans"] = $PS["Control.Monad.Except.Trans"] || {};
  var exports = $PS["Control.Monad.Except.Trans"];
  var Control_Alt = $PS["Control.Alt"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Monad = $PS["Control.Monad"];
  var Control_Monad_Error_Class = $PS["Control.Monad.Error.Class"];
  var Data_Either = $PS["Data.Either"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Semigroup = $PS["Data.Semigroup"];

  var ExceptT = function ExceptT(x) {
    return x;
  };

  var runExceptT = function runExceptT(v) {
    return v;
  };

  var mapExceptT = function mapExceptT(f) {
    return function (v) {
      return f(v);
    };
  };

  var functorExceptT = function functorExceptT(dictFunctor) {
    return new Data_Functor.Functor(function (f) {
      return mapExceptT(Data_Functor.map(dictFunctor)(Data_Functor.map(Data_Either.functorEither)(f)));
    });
  };

  var monadExceptT = function monadExceptT(dictMonad) {
    return new Control_Monad.Monad(function () {
      return applicativeExceptT(dictMonad);
    }, function () {
      return bindExceptT(dictMonad);
    });
  };

  var bindExceptT = function bindExceptT(dictMonad) {
    return new Control_Bind.Bind(function () {
      return applyExceptT(dictMonad);
    }, function (v) {
      return function (k) {
        return Control_Bind.bind(dictMonad.Bind1())(v)(Data_Either.either(function () {
          var $98 = Control_Applicative.pure(dictMonad.Applicative0());
          return function ($99) {
            return $98(Data_Either.Left.create($99));
          };
        }())(function (a) {
          var v1 = k(a);
          return v1;
        }));
      };
    });
  };

  var applyExceptT = function applyExceptT(dictMonad) {
    return new Control_Apply.Apply(function () {
      return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    }, Control_Monad.ap(monadExceptT(dictMonad)));
  };

  var applicativeExceptT = function applicativeExceptT(dictMonad) {
    return new Control_Applicative.Applicative(function () {
      return applyExceptT(dictMonad);
    }, function () {
      var $100 = Control_Applicative.pure(dictMonad.Applicative0());
      return function ($101) {
        return ExceptT($100(Data_Either.Right.create($101)));
      };
    }());
  };

  var monadThrowExceptT = function monadThrowExceptT(dictMonad) {
    return new Control_Monad_Error_Class.MonadThrow(function () {
      return monadExceptT(dictMonad);
    }, function () {
      var $110 = Control_Applicative.pure(dictMonad.Applicative0());
      return function ($111) {
        return ExceptT($110(Data_Either.Left.create($111)));
      };
    }());
  };

  var altExceptT = function altExceptT(dictSemigroup) {
    return function (dictMonad) {
      return new Control_Alt.Alt(function () {
        return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
      }, function (v) {
        return function (v1) {
          return Control_Bind.bind(dictMonad.Bind1())(v)(function (v2) {
            if (v2 instanceof Data_Either.Right) {
              return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(v2.value0));
            }

            ;

            if (v2 instanceof Data_Either.Left) {
              return Control_Bind.bind(dictMonad.Bind1())(v1)(function (v3) {
                if (v3 instanceof Data_Either.Right) {
                  return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(v3.value0));
                }

                ;

                if (v3 instanceof Data_Either.Left) {
                  return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Left(Data_Semigroup.append(dictSemigroup)(v2.value0)(v3.value0)));
                }

                ;
                throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [v3.constructor.name]);
              });
            }

            ;
            throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [v2.constructor.name]);
          });
        };
      });
    };
  };

  exports["runExceptT"] = runExceptT;
  exports["mapExceptT"] = mapExceptT;
  exports["functorExceptT"] = functorExceptT;
  exports["applicativeExceptT"] = applicativeExceptT;
  exports["bindExceptT"] = bindExceptT;
  exports["altExceptT"] = altExceptT;
  exports["monadThrowExceptT"] = monadThrowExceptT;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Newtype"] = $PS["Data.Newtype"] || {};
  var exports = $PS["Data.Newtype"];

  var Newtype = function Newtype(unwrap, wrap) {
    this.unwrap = unwrap;
    this.wrap = wrap;
  };

  var wrap = function wrap(dict) {
    return dict.wrap;
  };

  var unwrap = function unwrap(dict) {
    return dict.unwrap;
  };

  exports["unwrap"] = unwrap;
  exports["wrap"] = wrap;
  exports["Newtype"] = Newtype;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Identity"] = $PS["Data.Identity"] || {};
  var exports = $PS["Data.Identity"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Monad = $PS["Control.Monad"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Newtype = $PS["Data.Newtype"];

  var Identity = function Identity(x) {
    return x;
  };

  var newtypeIdentity = new Data_Newtype.Newtype(function (n) {
    return n;
  }, Identity);
  var functorIdentity = new Data_Functor.Functor(function (f) {
    return function (m) {
      return f(m);
    };
  });
  var applyIdentity = new Control_Apply.Apply(function () {
    return functorIdentity;
  }, function (v) {
    return function (v1) {
      return v(v1);
    };
  });
  var bindIdentity = new Control_Bind.Bind(function () {
    return applyIdentity;
  }, function (v) {
    return function (f) {
      return f(v);
    };
  });
  var applicativeIdentity = new Control_Applicative.Applicative(function () {
    return applyIdentity;
  }, Identity);
  var monadIdentity = new Control_Monad.Monad(function () {
    return applicativeIdentity;
  }, function () {
    return bindIdentity;
  });
  exports["Identity"] = Identity;
  exports["newtypeIdentity"] = newtypeIdentity;
  exports["functorIdentity"] = functorIdentity;
  exports["monadIdentity"] = monadIdentity;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Monad.Except"] = $PS["Control.Monad.Except"] || {};
  var exports = $PS["Control.Monad.Except"];
  var Control_Monad_Except_Trans = $PS["Control.Monad.Except.Trans"];
  var Data_Identity = $PS["Data.Identity"];
  var Data_Newtype = $PS["Data.Newtype"];

  var runExcept = function () {
    var $0 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
    return function ($1) {
      return $0(Control_Monad_Except_Trans.runExceptT($1));
    };
  }();

  var mapExcept = function mapExcept(f) {
    return Control_Monad_Except_Trans.mapExceptT(function () {
      var $2 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
      return function ($3) {
        return Data_Identity.Identity(f($2($3)));
      };
    }());
  };

  exports["runExcept"] = runExcept;
  exports["mapExcept"] = mapExcept;
})(PS);

(function (exports) {
  "use strict";

  exports.map_ = function (f) {
    return function (a) {
      return function () {
        return f(a());
      };
    };
  };

  exports.pure_ = function (a) {
    return function () {
      return a;
    };
  };

  exports.bind_ = function (a) {
    return function (f) {
      return function () {
        return f(a())();
      };
    };
  };
})(PS["Control.Monad.ST.Internal"] = PS["Control.Monad.ST.Internal"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Monad.ST.Internal"] = $PS["Control.Monad.ST.Internal"] || {};
  var exports = $PS["Control.Monad.ST.Internal"];
  var $foreign = $PS["Control.Monad.ST.Internal"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Monad = $PS["Control.Monad"];
  var Data_Functor = $PS["Data.Functor"];
  var functorST = new Data_Functor.Functor($foreign.map_);
  var monadST = new Control_Monad.Monad(function () {
    return applicativeST;
  }, function () {
    return bindST;
  });
  var bindST = new Control_Bind.Bind(function () {
    return applyST;
  }, $foreign.bind_);
  var applyST = new Control_Apply.Apply(function () {
    return functorST;
  }, Control_Monad.ap(monadST));
  var applicativeST = new Control_Applicative.Applicative(function () {
    return applyST;
  }, $foreign.pure_);
  exports["bindST"] = bindST;
  exports["monadST"] = monadST;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Control.Plus"] = $PS["Control.Plus"] || {};
  var exports = $PS["Control.Plus"];

  var Plus = function Plus(Alt0, empty) {
    this.Alt0 = Alt0;
    this.empty = empty;
  };

  var empty = function empty(dict) {
    return dict.empty;
  };

  exports["Plus"] = Plus;
  exports["empty"] = empty;
})(PS);

(function (exports) {
  "use strict"; //------------------------------------------------------------------------------
  // Array creation --------------------------------------------------------------
  //------------------------------------------------------------------------------

  exports.range = function (start) {
    return function (end) {
      var step = start > end ? -1 : 1;
      var result = new Array(step * (end - start) + 1);
      var i = start,
          n = 0;

      while (i !== end) {
        result[n++] = i;
        i += step;
      }

      result[n] = i;
      return result;
    };
  }; //------------------------------------------------------------------------------
  // Array size ------------------------------------------------------------------
  //------------------------------------------------------------------------------


  exports.length = function (xs) {
    return xs.length;
  }; //------------------------------------------------------------------------------
  // Indexed operations ----------------------------------------------------------
  //------------------------------------------------------------------------------


  exports.indexImpl = function (just) {
    return function (nothing) {
      return function (xs) {
        return function (i) {
          return i < 0 || i >= xs.length ? nothing : just(xs[i]);
        };
      };
    };
  }; //------------------------------------------------------------------------------
  // Zipping ---------------------------------------------------------------------
  //------------------------------------------------------------------------------


  exports.zipWith = function (f) {
    return function (xs) {
      return function (ys) {
        var l = xs.length < ys.length ? xs.length : ys.length;
        var result = new Array(l);

        for (var i = 0; i < l; i++) {
          result[i] = f(xs[i])(ys[i]);
        }

        return result;
      };
    };
  };
})(PS["Data.Array"] = PS["Data.Array"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Maybe"] = $PS["Data.Maybe"] || {};
  var exports = $PS["Data.Maybe"];
  var Data_Function = $PS["Data.Function"];
  var Data_Functor = $PS["Data.Functor"];

  var Nothing = function () {
    function Nothing() {}

    ;
    Nothing.value = new Nothing();
    return Nothing;
  }();

  var Just = function () {
    function Just(value0) {
      this.value0 = value0;
    }

    ;

    Just.create = function (value0) {
      return new Just(value0);
    };

    return Just;
  }();

  var maybe = function maybe(v) {
    return function (v1) {
      return function (v2) {
        if (v2 instanceof Nothing) {
          return v;
        }

        ;

        if (v2 instanceof Just) {
          return v1(v2.value0);
        }

        ;
        throw new Error("Failed pattern match at Data.Maybe (line 217, column 1 - line 217, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  var isNothing = maybe(true)(Data_Function["const"](false));
  var functorMaybe = new Data_Functor.Functor(function (v) {
    return function (v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }

      ;
      return Nothing.value;
    };
  });

  var fromJust = function fromJust(dictPartial) {
    return function (v) {
      if (v instanceof Just) {
        return v.value0;
      }

      ;
      throw new Error("Failed pattern match at Data.Maybe (line 268, column 1 - line 268, column 46): " + [v.constructor.name]);
    };
  };

  exports["Nothing"] = Nothing;
  exports["Just"] = Just;
  exports["maybe"] = maybe;
  exports["isNothing"] = isNothing;
  exports["fromJust"] = fromJust;
  exports["functorMaybe"] = functorMaybe;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Array"] = $PS["Data.Array"] || {};
  var exports = $PS["Data.Array"];
  var $foreign = $PS["Data.Array"];
  var Data_Maybe = $PS["Data.Maybe"];
  var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
  exports["index"] = index;
  exports["range"] = $foreign.range;
  exports["length"] = $foreign.length;
  exports["zipWith"] = $foreign.zipWith;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Boolean"] = $PS["Data.Boolean"] || {};
  var exports = $PS["Data.Boolean"];
  var otherwise = true;
  exports["otherwise"] = otherwise;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Const"] = $PS["Data.Const"] || {};
  var exports = $PS["Data.Const"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Newtype = $PS["Data.Newtype"];

  var Const = function Const(x) {
    return x;
  };

  var newtypeConst = new Data_Newtype.Newtype(function (n) {
    return n;
  }, Const);
  var functorConst = new Data_Functor.Functor(function (f) {
    return function (m) {
      return m;
    };
  });
  exports["Const"] = Const;
  exports["newtypeConst"] = newtypeConst;
  exports["functorConst"] = functorConst;
})(PS);

(function (exports) {
  "use strict";

  exports.foldrArray = function (f) {
    return function (init) {
      return function (xs) {
        var acc = init;
        var len = xs.length;

        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }

        return acc;
      };
    };
  };

  exports.foldlArray = function (f) {
    return function (init) {
      return function (xs) {
        var acc = init;
        var len = xs.length;

        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }

        return acc;
      };
    };
  };
})(PS["Data.Foldable"] = PS["Data.Foldable"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Monoid"] = $PS["Data.Monoid"] || {};
  var exports = $PS["Data.Monoid"];

  var mempty = function mempty(dict) {
    return dict.mempty;
  };

  exports["mempty"] = mempty;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Foldable"] = $PS["Data.Foldable"] || {};
  var exports = $PS["Data.Foldable"];
  var $foreign = $PS["Data.Foldable"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Data_Monoid = $PS["Data.Monoid"];
  var Data_Semigroup = $PS["Data.Semigroup"];
  var Data_Unit = $PS["Data.Unit"];

  var Foldable = function Foldable(foldMap, foldl, foldr) {
    this.foldMap = foldMap;
    this.foldl = foldl;
    this.foldr = foldr;
  };

  var foldr = function foldr(dict) {
    return dict.foldr;
  };

  var traverse_ = function traverse_(dictApplicative) {
    return function (dictFoldable) {
      return function (f) {
        return foldr(dictFoldable)(function () {
          var $197 = Control_Apply.applySecond(dictApplicative.Apply0());
          return function ($198) {
            return $197(f($198));
          };
        }())(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
      };
    };
  };

  var foldl = function foldl(dict) {
    return dict.foldl;
  };

  var foldMapDefaultR = function foldMapDefaultR(dictFoldable) {
    return function (dictMonoid) {
      return function (f) {
        return foldr(dictFoldable)(function (x) {
          return function (acc) {
            return Data_Semigroup.append(dictMonoid.Semigroup0())(f(x))(acc);
          };
        })(Data_Monoid.mempty(dictMonoid));
      };
    };
  };

  var foldableArray = new Foldable(function (dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }, $foreign.foldlArray, $foreign.foldrArray);
  exports["Foldable"] = Foldable;
  exports["foldr"] = foldr;
  exports["foldl"] = foldl;
  exports["traverse_"] = traverse_;
  exports["foldableArray"] = foldableArray;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Generic.Rep"] = $PS["Data.Generic.Rep"] || {};
  var exports = $PS["Data.Generic.Rep"];

  var Constructor = function Constructor(x) {
    return x;
  };

  var Generic = function Generic(from, to) {
    this.from = from;
    this.to = to;
  };

  var to = function to(dict) {
    return dict.to;
  };

  var from = function from(dict) {
    return dict.from;
  };

  exports["Generic"] = Generic;
  exports["to"] = to;
  exports["from"] = from;
  exports["Constructor"] = Constructor;
})(PS);

(function (exports) {
  "use strict";

  exports.fromNumberImpl = function (just) {
    return function (nothing) {
      return function (n) {
        /* jshint bitwise: false */
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
})(PS["Data.Int"] = PS["Data.Int"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Int"] = $PS["Data.Int"] || {};
  var exports = $PS["Data.Int"];
  var $foreign = $PS["Data.Int"];
  var Data_Maybe = $PS["Data.Maybe"];
  var fromNumber = $foreign.fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
  exports["fromNumber"] = fromNumber;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.NonEmpty"] = $PS["Data.NonEmpty"] || {};
  var exports = $PS["Data.NonEmpty"];
  var Control_Plus = $PS["Control.Plus"];
  var Data_Functor = $PS["Data.Functor"];

  var NonEmpty = function () {
    function NonEmpty(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }

    ;

    NonEmpty.create = function (value0) {
      return function (value1) {
        return new NonEmpty(value0, value1);
      };
    };

    return NonEmpty;
  }();

  var singleton = function singleton(dictPlus) {
    return function (a) {
      return new NonEmpty(a, Control_Plus.empty(dictPlus));
    };
  };

  var functorNonEmpty = function functorNonEmpty(dictFunctor) {
    return new Data_Functor.Functor(function (f) {
      return function (m) {
        return new NonEmpty(f(m.value0), Data_Functor.map(dictFunctor)(f)(m.value1));
      };
    });
  };

  exports["NonEmpty"] = NonEmpty;
  exports["singleton"] = singleton;
  exports["functorNonEmpty"] = functorNonEmpty;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.List.Types"] = $PS["Data.List.Types"] || {};
  var exports = $PS["Data.List.Types"];
  var Control_Alt = $PS["Control.Alt"];
  var Control_Plus = $PS["Control.Plus"];
  var Data_Foldable = $PS["Data.Foldable"];
  var Data_Function = $PS["Data.Function"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Monoid = $PS["Data.Monoid"];
  var Data_NonEmpty = $PS["Data.NonEmpty"];
  var Data_Semigroup = $PS["Data.Semigroup"];

  var Nil = function () {
    function Nil() {}

    ;
    Nil.value = new Nil();
    return Nil;
  }();

  var Cons = function () {
    function Cons(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }

    ;

    Cons.create = function (value0) {
      return function (value1) {
        return new Cons(value0, value1);
      };
    };

    return Cons;
  }();

  var NonEmptyList = function NonEmptyList(x) {
    return x;
  };

  var toList = function toList(v) {
    return new Cons(v.value0, v.value1);
  };

  var listMap = function listMap(f) {
    var chunkedRevMap = function chunkedRevMap($copy_chunksAcc) {
      return function ($copy_v) {
        var $tco_var_chunksAcc = $copy_chunksAcc;
        var $tco_done = false;
        var $tco_result;

        function $tco_loop(chunksAcc, v) {
          if (v instanceof Cons && v.value1 instanceof Cons && v.value1.value1 instanceof Cons) {
            $tco_var_chunksAcc = new Cons(v, chunksAcc);
            $copy_v = v.value1.value1.value1;
            return;
          }

          ;

          var unrolledMap = function unrolledMap(v1) {
            if (v1 instanceof Cons && v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil) {
              return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
            }

            ;

            if (v1 instanceof Cons && v1.value1 instanceof Nil) {
              return new Cons(f(v1.value0), Nil.value);
            }

            ;
            return Nil.value;
          };

          var reverseUnrolledMap = function reverseUnrolledMap($copy_v1) {
            return function ($copy_acc) {
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;

              function $tco_loop(v1, acc) {
                if (v1 instanceof Cons && v1.value0 instanceof Cons && v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons) {
                  $tco_var_v1 = v1.value1;
                  $copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
                  return;
                }

                ;
                $tco_done = true;
                return acc;
              }

              ;

              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v1, $copy_acc);
              }

              ;
              return $tco_result;
            };
          };

          $tco_done = true;
          return reverseUnrolledMap(chunksAcc)(unrolledMap(v));
        }

        ;

        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
        }

        ;
        return $tco_result;
      };
    };

    return chunkedRevMap(Nil.value);
  };

  var functorList = new Data_Functor.Functor(listMap);
  var functorNonEmptyList = Data_NonEmpty.functorNonEmpty(functorList);
  var foldableList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
      return Data_Foldable.foldl(foldableList)(function (acc) {
        var $202 = Data_Semigroup.append(dictMonoid.Semigroup0())(acc);
        return function ($203) {
          return $202(f($203));
        };
      })(Data_Monoid.mempty(dictMonoid));
    };
  }, function (f) {
    var go = function go($copy_b) {
      return function ($copy_v) {
        var $tco_var_b = $copy_b;
        var $tco_done = false;
        var $tco_result;

        function $tco_loop(b, v) {
          if (v instanceof Nil) {
            $tco_done = true;
            return b;
          }

          ;

          if (v instanceof Cons) {
            $tco_var_b = f(b)(v.value0);
            $copy_v = v.value1;
            return;
          }

          ;
          throw new Error("Failed pattern match at Data.List.Types (line 109, column 12 - line 111, column 30): " + [v.constructor.name]);
        }

        ;

        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_b, $copy_v);
        }

        ;
        return $tco_result;
      };
    };

    return go;
  }, function (f) {
    return function (b) {
      var rev = Data_Foldable.foldl(foldableList)(Data_Function.flip(Cons.create))(Nil.value);
      var $204 = Data_Foldable.foldl(foldableList)(Data_Function.flip(f))(b);
      return function ($205) {
        return $204(rev($205));
      };
    };
  });
  var semigroupList = new Data_Semigroup.Semigroup(function (xs) {
    return function (ys) {
      return Data_Foldable.foldr(foldableList)(Cons.create)(ys)(xs);
    };
  });
  var semigroupNonEmptyList = new Data_Semigroup.Semigroup(function (v) {
    return function (as$prime) {
      return new Data_NonEmpty.NonEmpty(v.value0, Data_Semigroup.append(semigroupList)(v.value1)(toList(as$prime)));
    };
  });
  var altList = new Control_Alt.Alt(function () {
    return functorList;
  }, Data_Semigroup.append(semigroupList));
  var plusList = new Control_Plus.Plus(function () {
    return altList;
  }, Nil.value);
  exports["Nil"] = Nil;
  exports["Cons"] = Cons;
  exports["NonEmptyList"] = NonEmptyList;
  exports["plusList"] = plusList;
  exports["functorNonEmptyList"] = functorNonEmptyList;
  exports["semigroupNonEmptyList"] = semigroupNonEmptyList;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Tuple"] = $PS["Data.Tuple"] || {};
  var exports = $PS["Data.Tuple"];

  var Tuple = function () {
    function Tuple(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }

    ;

    Tuple.create = function (value0) {
      return function (value1) {
        return new Tuple(value0, value1);
      };
    };

    return Tuple;
  }();

  var snd = function snd(v) {
    return v.value1;
  };

  var fst = function fst(v) {
    return v.value0;
  };

  exports["Tuple"] = Tuple;
  exports["fst"] = fst;
  exports["snd"] = snd;
})(PS);

(function (exports) {
  "use strict";

  exports.unfoldrArrayImpl = function (isNothing) {
    return function (fromJust) {
      return function (fst) {
        return function (snd) {
          return function (f) {
            return function (b) {
              var result = [];
              var value = b;

              while (true) {
                // eslint-disable-line no-constant-condition
                var maybe = f(value);
                if (isNothing(maybe)) return result;
                var tuple = fromJust(maybe);
                result.push(fst(tuple));
                value = snd(tuple);
              }
            };
          };
        };
      };
    };
  };
})(PS["Data.Unfoldable"] = PS["Data.Unfoldable"] || {});

(function (exports) {
  "use strict";

  exports.unfoldr1ArrayImpl = function (isNothing) {
    return function (fromJust) {
      return function (fst) {
        return function (snd) {
          return function (f) {
            return function (b) {
              var result = [];
              var value = b;

              while (true) {
                // eslint-disable-line no-constant-condition
                var tuple = f(value);
                result.push(fst(tuple));
                var maybe = snd(tuple);
                if (isNothing(maybe)) return result;
                value = fromJust(maybe);
              }
            };
          };
        };
      };
    };
  };
})(PS["Data.Unfoldable1"] = PS["Data.Unfoldable1"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Unfoldable1"] = $PS["Data.Unfoldable1"] || {};
  var exports = $PS["Data.Unfoldable1"];
  var $foreign = $PS["Data.Unfoldable1"];
  var Data_Maybe = $PS["Data.Maybe"];
  var Data_Tuple = $PS["Data.Tuple"];

  var Unfoldable1 = function Unfoldable1(unfoldr1) {
    this.unfoldr1 = unfoldr1;
  };

  var unfoldable1Array = new Unfoldable1($foreign.unfoldr1ArrayImpl(Data_Maybe.isNothing)(Data_Maybe.fromJust())(Data_Tuple.fst)(Data_Tuple.snd));
  exports["unfoldable1Array"] = unfoldable1Array;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Unfoldable"] = $PS["Data.Unfoldable"] || {};
  var exports = $PS["Data.Unfoldable"];
  var $foreign = $PS["Data.Unfoldable"];
  var Data_Maybe = $PS["Data.Maybe"];
  var Data_Tuple = $PS["Data.Tuple"];
  var Data_Unfoldable1 = $PS["Data.Unfoldable1"];

  var Unfoldable = function Unfoldable(Unfoldable10, unfoldr) {
    this.Unfoldable10 = Unfoldable10;
    this.unfoldr = unfoldr;
  };

  var unfoldr = function unfoldr(dict) {
    return dict.unfoldr;
  };

  var unfoldableArray = new Unfoldable(function () {
    return Data_Unfoldable1.unfoldable1Array;
  }, $foreign.unfoldrArrayImpl(Data_Maybe.isNothing)(Data_Maybe.fromJust())(Data_Tuple.fst)(Data_Tuple.snd));
  exports["unfoldr"] = unfoldr;
  exports["unfoldableArray"] = unfoldableArray;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.List"] = $PS["Data.List"] || {};
  var exports = $PS["Data.List"];
  var Data_Foldable = $PS["Data.Foldable"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_List_Types = $PS["Data.List.Types"];
  var Data_Maybe = $PS["Data.Maybe"];
  var Data_Tuple = $PS["Data.Tuple"];
  var Data_Unfoldable = $PS["Data.Unfoldable"];

  var uncons = function uncons(v) {
    if (v instanceof Data_List_Types.Nil) {
      return Data_Maybe.Nothing.value;
    }

    ;

    if (v instanceof Data_List_Types.Cons) {
      return new Data_Maybe.Just({
        head: v.value0,
        tail: v.value1
      });
    }

    ;
    throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
  };

  var toUnfoldable = function toUnfoldable(dictUnfoldable) {
    return Data_Unfoldable.unfoldr(dictUnfoldable)(function (xs) {
      return Data_Functor.map(Data_Maybe.functorMaybe)(function (rec) {
        return new Data_Tuple.Tuple(rec.head, rec.tail);
      })(uncons(xs));
    });
  };

  var tail = function tail(v) {
    if (v instanceof Data_List_Types.Nil) {
      return Data_Maybe.Nothing.value;
    }

    ;

    if (v instanceof Data_List_Types.Cons) {
      return new Data_Maybe.Just(v.value1);
    }

    ;
    throw new Error("Failed pattern match at Data.List (line 245, column 1 - line 245, column 43): " + [v.constructor.name]);
  };

  var singleton = function singleton(a) {
    return new Data_List_Types.Cons(a, Data_List_Types.Nil.value);
  };

  var $$null = function $$null(v) {
    if (v instanceof Data_List_Types.Nil) {
      return true;
    }

    ;
    return false;
  };

  var head = function head(v) {
    if (v instanceof Data_List_Types.Nil) {
      return Data_Maybe.Nothing.value;
    }

    ;

    if (v instanceof Data_List_Types.Cons) {
      return new Data_Maybe.Just(v.value0);
    }

    ;
    throw new Error("Failed pattern match at Data.List (line 230, column 1 - line 230, column 22): " + [v.constructor.name]);
  };

  var fromFoldable = function fromFoldable(dictFoldable) {
    return Data_Foldable.foldr(dictFoldable)(Data_List_Types.Cons.create)(Data_List_Types.Nil.value);
  };

  exports["toUnfoldable"] = toUnfoldable;
  exports["fromFoldable"] = fromFoldable;
  exports["singleton"] = singleton;
  exports["null"] = $$null;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.List.NonEmpty"] = $PS["Data.List.NonEmpty"] || {};
  var exports = $PS["Data.List.NonEmpty"];
  var Data_List_Types = $PS["Data.List.Types"];
  var Data_NonEmpty = $PS["Data.NonEmpty"];

  var singleton = function () {
    var $168 = Data_NonEmpty.singleton(Data_List_Types.plusList);
    return function ($169) {
      return Data_List_Types.NonEmptyList($168($169));
    };
  }();

  exports["singleton"] = singleton;
})(PS);

(function (exports) {
  "use strict";

  exports.showIntImpl = function (n) {
    return n.toString();
  };

  exports.showStringImpl = function (s) {
    var l = s.length;
    return "\"" + s.replace(/[\0-\x1F\x7F"\\]/g, // eslint-disable-line no-control-regex
    function (c, i) {
      switch (c) {
        case "\"":
        case "\\":
          return "\\" + c;

        case "\x07":
          return "\\a";

        case "\b":
          return "\\b";

        case "\f":
          return "\\f";

        case "\n":
          return "\\n";

        case "\r":
          return "\\r";

        case "\t":
          return "\\t";

        case "\v":
          return "\\v";
      }

      var k = i + 1;
      var empty = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
      return "\\" + c.charCodeAt(0).toString(10) + empty;
    }) + "\"";
  };
})(PS["Data.Show"] = PS["Data.Show"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Show"] = $PS["Data.Show"] || {};
  var exports = $PS["Data.Show"];
  var $foreign = $PS["Data.Show"];

  var Show = function Show(show) {
    this.show = show;
  };

  var showString = new Show($foreign.showStringImpl);
  var showInt = new Show($foreign.showIntImpl);

  var show = function show(dict) {
    return dict.show;
  };

  exports["show"] = show;
  exports["showInt"] = showInt;
  exports["showString"] = showString;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Symbol"] = $PS["Data.Symbol"] || {};
  var exports = $PS["Data.Symbol"];

  var SProxy = function () {
    function SProxy() {}

    ;
    SProxy.value = new SProxy();
    return SProxy;
  }();

  var IsSymbol = function IsSymbol(reflectSymbol) {
    this.reflectSymbol = reflectSymbol;
  };

  var reflectSymbol = function reflectSymbol(dict) {
    return dict.reflectSymbol;
  };

  exports["IsSymbol"] = IsSymbol;
  exports["reflectSymbol"] = reflectSymbol;
  exports["SProxy"] = SProxy;
})(PS);

(function (exports) {
  "use strict"; // jshint maxparams: 3

  exports.traverseArrayImpl = function () {
    function array1(a) {
      return [a];
    }

    function array2(a) {
      return function (b) {
        return [a, b];
      };
    }

    function array3(a) {
      return function (b) {
        return function (c) {
          return [a, b, c];
        };
      };
    }

    function concat2(xs) {
      return function (ys) {
        return xs.concat(ys);
      };
    }

    return function (apply) {
      return function (map) {
        return function (pure) {
          return function (f) {
            return function (array) {
              function go(bot, top) {
                switch (top - bot) {
                  case 0:
                    return pure([]);

                  case 1:
                    return map(array1)(f(array[bot]));

                  case 2:
                    return apply(map(array2)(f(array[bot])))(f(array[bot + 1]));

                  case 3:
                    return apply(apply(map(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));

                  default:
                    // This slightly tricky pivot selection aims to produce two
                    // even-length partitions where possible.
                    var pivot = bot + Math.floor((top - bot) / 4) * 2;
                    return apply(map(concat2)(go(bot, pivot)))(go(pivot, top));
                }
              }

              return go(0, array.length);
            };
          };
        };
      };
    };
  }();
})(PS["Data.Traversable"] = PS["Data.Traversable"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Data.Traversable"] = $PS["Data.Traversable"] || {};
  var exports = $PS["Data.Traversable"];
  var $foreign = $PS["Data.Traversable"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Control_Category = $PS["Control.Category"];
  var Data_Foldable = $PS["Data.Foldable"];
  var Data_Functor = $PS["Data.Functor"];

  var Traversable = function Traversable(Foldable1, Functor0, sequence, traverse) {
    this.Foldable1 = Foldable1;
    this.Functor0 = Functor0;
    this.sequence = sequence;
    this.traverse = traverse;
  };

  var traverse = function traverse(dict) {
    return dict.traverse;
  };

  var sequenceDefault = function sequenceDefault(dictTraversable) {
    return function (dictApplicative) {
      return traverse(dictTraversable)(dictApplicative)(Control_Category.identity(Control_Category.categoryFn));
    };
  };

  var traversableArray = new Traversable(function () {
    return Data_Foldable.foldableArray;
  }, function () {
    return Data_Functor.functorArray;
  }, function (dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
  }, function (dictApplicative) {
    return $foreign.traverseArrayImpl(Control_Apply.apply(dictApplicative.Apply0()))(Data_Functor.map(dictApplicative.Apply0().Functor0()))(Control_Applicative.pure(dictApplicative));
  });

  var sequence = function sequence(dict) {
    return dict.sequence;
  };

  exports["sequence"] = sequence;
  exports["traversableArray"] = traversableArray;
})(PS);

(function (exports) {
  "use strict";

  exports.pureE = function (a) {
    return function () {
      return a;
    };
  };

  exports.bindE = function (a) {
    return function (f) {
      return function () {
        return f(a())();
      };
    };
  };
})(PS["Effect"] = PS["Effect"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Effect"] = $PS["Effect"] || {};
  var exports = $PS["Effect"];
  var $foreign = $PS["Effect"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Apply = $PS["Control.Apply"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Monad = $PS["Control.Monad"];
  var Data_Functor = $PS["Data.Functor"];
  var monadEffect = new Control_Monad.Monad(function () {
    return applicativeEffect;
  }, function () {
    return bindEffect;
  });
  var bindEffect = new Control_Bind.Bind(function () {
    return applyEffect;
  }, $foreign.bindE);
  var applyEffect = new Control_Apply.Apply(function () {
    return functorEffect;
  }, Control_Monad.ap(monadEffect));
  var applicativeEffect = new Control_Applicative.Applicative(function () {
    return applyEffect;
  }, $foreign.pureE);
  var functorEffect = new Data_Functor.Functor(Control_Applicative.liftA1(applicativeEffect));
  exports["functorEffect"] = functorEffect;
  exports["applicativeEffect"] = applicativeEffect;
  exports["bindEffect"] = bindEffect;
})(PS);

(function (exports) {
  "use strict";

  exports.unsafeToForeign = function (value) {
    return value;
  };

  exports.unsafeFromForeign = function (value) {
    return value;
  };

  exports.typeOf = function (value) {
    return _typeof(value);
  };

  exports.tagOf = function (value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  };

  exports.isNull = function (value) {
    return value === null;
  };

  exports.isUndefined = function (value) {
    return value === undefined;
  };

  exports.isArray = Array.isArray || function (value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  };
})(PS["Foreign"] = PS["Foreign"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign"] = $PS["Foreign"] || {};
  var exports = $PS["Foreign"];
  var $foreign = $PS["Foreign"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Monad_Error_Class = $PS["Control.Monad.Error.Class"];
  var Control_Monad_Except = $PS["Control.Monad.Except"];
  var Control_Monad_Except_Trans = $PS["Control.Monad.Except.Trans"];
  var Data_Boolean = $PS["Data.Boolean"];
  var Data_Either = $PS["Data.Either"];
  var Data_Function = $PS["Data.Function"];
  var Data_Identity = $PS["Data.Identity"];
  var Data_Int = $PS["Data.Int"];
  var Data_List_NonEmpty = $PS["Data.List.NonEmpty"];
  var Data_Maybe = $PS["Data.Maybe"];

  var ForeignError = function () {
    function ForeignError(value0) {
      this.value0 = value0;
    }

    ;

    ForeignError.create = function (value0) {
      return new ForeignError(value0);
    };

    return ForeignError;
  }();

  var TypeMismatch = function () {
    function TypeMismatch(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }

    ;

    TypeMismatch.create = function (value0) {
      return function (value1) {
        return new TypeMismatch(value0, value1);
      };
    };

    return TypeMismatch;
  }();

  var ErrorAtIndex = function () {
    function ErrorAtIndex(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }

    ;

    ErrorAtIndex.create = function (value0) {
      return function (value1) {
        return new ErrorAtIndex(value0, value1);
      };
    };

    return ErrorAtIndex;
  }();

  var ErrorAtProperty = function () {
    function ErrorAtProperty(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }

    ;

    ErrorAtProperty.create = function (value0) {
      return function (value1) {
        return new ErrorAtProperty(value0, value1);
      };
    };

    return ErrorAtProperty;
  }();

  var fail = function () {
    var $107 = Control_Monad_Error_Class.throwError(Control_Monad_Except_Trans.monadThrowExceptT(Data_Identity.monadIdentity));
    return function ($108) {
      return $107(Data_List_NonEmpty.singleton($108));
    };
  }();

  var readArray = function readArray(value) {
    if ($foreign.isArray(value)) {
      return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))($foreign.unsafeFromForeign(value));
    }

    ;

    if (Data_Boolean.otherwise) {
      return fail(new TypeMismatch("array", $foreign.tagOf(value)));
    }

    ;
    throw new Error("Failed pattern match at Foreign (line 147, column 1 - line 147, column 42): " + [value.constructor.name]);
  };

  var unsafeReadTagged = function unsafeReadTagged(tag) {
    return function (value) {
      if ($foreign.tagOf(value) === tag) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))($foreign.unsafeFromForeign(value));
      }

      ;

      if (Data_Boolean.otherwise) {
        return fail(new TypeMismatch(tag, $foreign.tagOf(value)));
      }

      ;
      throw new Error("Failed pattern match at Foreign (line 106, column 1 - line 106, column 55): " + [tag.constructor.name, value.constructor.name]);
    };
  };

  var readBoolean = unsafeReadTagged("Boolean");
  var readNumber = unsafeReadTagged("Number");

  var readInt = function readInt(value) {
    var error = Data_Either.Left.create(Data_List_NonEmpty.singleton(new TypeMismatch("Int", $foreign.tagOf(value))));

    var fromNumber = function () {
      var $109 = Data_Maybe.maybe(error)(Control_Applicative.pure(Data_Either.applicativeEither));
      return function ($110) {
        return $109(Data_Int.fromNumber($110));
      };
    }();

    return Control_Monad_Except.mapExcept(Data_Either.either(Data_Function["const"](error))(fromNumber))(readNumber(value));
  };

  var readString = unsafeReadTagged("String");
  exports["ForeignError"] = ForeignError;
  exports["TypeMismatch"] = TypeMismatch;
  exports["ErrorAtIndex"] = ErrorAtIndex;
  exports["ErrorAtProperty"] = ErrorAtProperty;
  exports["readString"] = readString;
  exports["readBoolean"] = readBoolean;
  exports["readNumber"] = readNumber;
  exports["readInt"] = readInt;
  exports["readArray"] = readArray;
  exports["fail"] = fail;
  exports["unsafeToForeign"] = $foreign.unsafeToForeign;
  exports["typeOf"] = $foreign.typeOf;
  exports["isNull"] = $foreign.isNull;
  exports["isUndefined"] = $foreign.isUndefined;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign.NullOrUndefined"] = $PS["Foreign.NullOrUndefined"] || {};
  var exports = $PS["Foreign.NullOrUndefined"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Monad_Except_Trans = $PS["Control.Monad.Except.Trans"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Identity = $PS["Data.Identity"];
  var Data_Maybe = $PS["Data.Maybe"];
  var Foreign = $PS["Foreign"];

  var readNullOrUndefined = function readNullOrUndefined(v) {
    return function (value) {
      if (Foreign.isNull(value) || Foreign.isUndefined(value)) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Data_Maybe.Nothing.value);
      }

      ;
      return Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Data_Maybe.Just.create)(v(value));
    };
  };

  exports["readNullOrUndefined"] = readNullOrUndefined;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign.Class"] = $PS["Foreign.Class"] || {};
  var exports = $PS["Foreign.Class"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Monad_Except = $PS["Control.Monad.Except"];
  var Control_Monad_Except_Trans = $PS["Control.Monad.Except.Trans"];
  var Data_Array = $PS["Data.Array"];
  var Data_Bifunctor = $PS["Data.Bifunctor"];
  var Data_Either = $PS["Data.Either"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Identity = $PS["Data.Identity"];
  var Data_List_Types = $PS["Data.List.Types"];
  var Data_Traversable = $PS["Data.Traversable"];
  var Foreign = $PS["Foreign"];
  var Foreign_NullOrUndefined = $PS["Foreign.NullOrUndefined"];

  var Encode = function Encode(encode) {
    this.encode = encode;
  };

  var Decode = function Decode(decode) {
    this.decode = decode;
  };

  var stringEncode = new Encode(Foreign.unsafeToForeign);
  var stringDecode = new Decode(Foreign.readString);
  var numberEncode = new Encode(Foreign.unsafeToForeign);
  var numberDecode = new Decode(Foreign.readNumber);
  var intDecode = new Decode(Foreign.readInt);

  var encode = function encode(dict) {
    return dict.encode;
  };

  var decode = function decode(dict) {
    return dict.decode;
  };

  var maybeDecode = function maybeDecode(dictDecode) {
    return new Decode(Foreign_NullOrUndefined.readNullOrUndefined(decode(dictDecode)));
  };

  var booleanEncode = new Encode(Foreign.unsafeToForeign);
  var booleanDecode = new Decode(Foreign.readBoolean);

  var arrayEncode = function arrayEncode(dictEncode) {
    return new Encode(function () {
      var $24 = Data_Functor.map(Data_Functor.functorArray)(encode(dictEncode));
      return function ($25) {
        return Foreign.unsafeToForeign($24($25));
      };
    }());
  };

  var arrayDecode = function arrayDecode(dictDecode) {
    return new Decode(function () {
      var readElement = function readElement(i) {
        return function (value) {
          return Control_Monad_Except.mapExcept(Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Data_Functor.map(Data_List_Types.functorNonEmptyList)(Foreign.ErrorAtIndex.create(i))))(decode(dictDecode)(value));
        };
      };

      var readElements = function readElements(arr) {
        return Data_Traversable.sequence(Data_Traversable.traversableArray)(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Data_Array.zipWith(readElement)(Data_Array.range(0)(Data_Array.length(arr)))(arr));
      };

      return Control_Bind.composeKleisli(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Foreign.readArray)(readElements);
    }());
  };

  exports["decode"] = decode;
  exports["encode"] = encode;
  exports["Decode"] = Decode;
  exports["Encode"] = Encode;
  exports["stringDecode"] = stringDecode;
  exports["booleanDecode"] = booleanDecode;
  exports["numberDecode"] = numberDecode;
  exports["intDecode"] = intDecode;
  exports["arrayDecode"] = arrayDecode;
  exports["maybeDecode"] = maybeDecode;
  exports["stringEncode"] = stringEncode;
  exports["booleanEncode"] = booleanEncode;
  exports["numberEncode"] = numberEncode;
  exports["arrayEncode"] = arrayEncode;
})(PS);

(function (exports) {
  "use strict";

  exports.unsafeReadPropImpl = function (f, s, key, value) {
    return value == null ? f : s(value[key]);
  };

  exports.unsafeHasOwnProperty = function (prop, value) {
    return Object.prototype.hasOwnProperty.call(value, prop);
  };

  exports.unsafeHasProperty = function (prop, value) {
    return prop in value;
  };
})(PS["Foreign.Index"] = PS["Foreign.Index"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign.Index"] = $PS["Foreign.Index"] || {};
  var exports = $PS["Foreign.Index"];
  var $foreign = $PS["Foreign.Index"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Monad_Except_Trans = $PS["Control.Monad.Except.Trans"];
  var Data_Function = $PS["Data.Function"];
  var Data_Identity = $PS["Data.Identity"];
  var Foreign = $PS["Foreign"];

  var Index = function Index(errorAt, hasOwnProperty, hasProperty, index) {
    this.errorAt = errorAt;
    this.hasOwnProperty = hasOwnProperty;
    this.hasProperty = hasProperty;
    this.index = index;
  };

  var unsafeReadProp = function unsafeReadProp(k) {
    return function (value) {
      return $foreign.unsafeReadPropImpl(Foreign.fail(new Foreign.TypeMismatch("object", Foreign.typeOf(value))), Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity)), k, value);
    };
  };

  var readProp = unsafeReadProp;

  var index = function index(dict) {
    return dict.index;
  };

  var hasPropertyImpl = function hasPropertyImpl(v) {
    return function (value) {
      if (Foreign.isNull(value)) {
        return false;
      }

      ;

      if (Foreign.isUndefined(value)) {
        return false;
      }

      ;

      if (Foreign.typeOf(value) === "object" || Foreign.typeOf(value) === "function") {
        return $foreign.unsafeHasProperty(v, value);
      }

      ;
      return false;
    };
  };

  var hasOwnPropertyImpl = function hasOwnPropertyImpl(v) {
    return function (value) {
      if (Foreign.isNull(value)) {
        return false;
      }

      ;

      if (Foreign.isUndefined(value)) {
        return false;
      }

      ;

      if (Foreign.typeOf(value) === "object" || Foreign.typeOf(value) === "function") {
        return $foreign.unsafeHasOwnProperty(v, value);
      }

      ;
      return false;
    };
  };

  var indexString = new Index(Foreign.ErrorAtProperty.create, hasOwnPropertyImpl, hasPropertyImpl, Data_Function.flip(readProp));
  exports["index"] = index;
  exports["indexString"] = indexString;
})(PS);

(function (exports) {
  "use strict";

  exports._copyST = function (m) {
    return function () {
      var r = {};

      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }

      return r;
    };
  };

  exports.empty = {};

  exports.runST = function (f) {
    return f();
  };

  exports._foldM = function (bind) {
    return function (f) {
      return function (mz) {
        return function (m) {
          var acc = mz;

          function g(k) {
            return function (z) {
              return f(z)(k)(m[k]);
            };
          }

          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind(acc)(g(k));
            }
          }

          return acc;
        };
      };
    };
  };

  function toArrayWithKey(f) {
    return function (m) {
      var r = [];

      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }

      return r;
    };
  }
})(PS["Foreign.Object"] = PS["Foreign.Object"] || {});

(function (exports) {
  "use strict";

  exports["new"] = function () {
    return {};
  };

  exports.poke = function (k) {
    return function (v) {
      return function (m) {
        return function () {
          m[k] = v;
          return m;
        };
      };
    };
  };
})(PS["Foreign.Object.ST"] = PS["Foreign.Object.ST"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign.Object.ST"] = $PS["Foreign.Object.ST"] || {};
  var exports = $PS["Foreign.Object.ST"];
  var $foreign = $PS["Foreign.Object.ST"];
  exports["new"] = $foreign["new"];
  exports["poke"] = $foreign.poke;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign.Object"] = $PS["Foreign.Object"] || {};
  var exports = $PS["Foreign.Object"];
  var $foreign = $PS["Foreign.Object"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Monad_ST_Internal = $PS["Control.Monad.ST.Internal"];
  var Foreign_Object_ST = $PS["Foreign.Object.ST"];
  var thawST = $foreign["_copyST"];

  var singleton = function singleton(k) {
    return function (v) {
      return $foreign.runST(Control_Bind.bindFlipped(Control_Monad_ST_Internal.bindST)(Foreign_Object_ST.poke(k)(v))(Foreign_Object_ST["new"]));
    };
  };

  var mutate = function mutate(f) {
    return function (m) {
      return $foreign.runST(function __do() {
        var v = thawST(m)();
        var v1 = f(v)();
        return v;
      });
    };
  };

  var insert = function insert(k) {
    return function (v) {
      return mutate(Foreign_Object_ST.poke(k)(v));
    };
  };

  var foldM = function foldM(dictMonad) {
    return function (f) {
      return function (z) {
        return $foreign["_foldM"](Control_Bind.bind(dictMonad.Bind1()))(f)(Control_Applicative.pure(dictMonad.Applicative0())(z));
      };
    };
  };

  var union = function union(m) {
    return mutate(function (s) {
      return foldM(Control_Monad_ST_Internal.monadST)(function (s$prime) {
        return function (k) {
          return function (v) {
            return Foreign_Object_ST.poke(k)(v)(s$prime);
          };
        };
      })(s)(m);
    });
  };

  exports["singleton"] = singleton;
  exports["insert"] = insert;
  exports["union"] = union;
  exports["empty"] = $foreign.empty;
})(PS);

(function (exports) {
  "use strict";

  exports.unsafeGet = function (label) {
    return function (rec) {
      return rec[label];
    };
  };
})(PS["Record.Unsafe"] = PS["Record.Unsafe"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Record.Unsafe"] = $PS["Record.Unsafe"] || {};
  var exports = $PS["Record.Unsafe"];
  var $foreign = $PS["Record.Unsafe"];
  exports["unsafeGet"] = $foreign.unsafeGet;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Record"] = $PS["Record"] || {};
  var exports = $PS["Record"];
  var Data_Symbol = $PS["Data.Symbol"];
  var Record_Unsafe = $PS["Record.Unsafe"];

  var get = function get(dictIsSymbol) {
    return function (dictCons) {
      return function (l) {
        return function (r) {
          return Record_Unsafe.unsafeGet(Data_Symbol.reflectSymbol(dictIsSymbol)(l))(r);
        };
      };
    };
  };

  exports["get"] = get;
})(PS);

(function (exports) {
  "use strict";

  exports.copyRecord = function (rec) {
    var copy = {};

    for (var key in rec) {
      if ({}.hasOwnProperty.call(rec, key)) {
        copy[key] = rec[key];
      }
    }

    return copy;
  };

  exports.unsafeInsert = function (l) {
    return function (a) {
      return function (rec) {
        rec[l] = a;
        return rec;
      };
    };
  };
})(PS["Record.Builder"] = PS["Record.Builder"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Record.Builder"] = $PS["Record.Builder"] || {};
  var exports = $PS["Record.Builder"];
  var $foreign = $PS["Record.Builder"];
  var Control_Category = $PS["Control.Category"];
  var Control_Semigroupoid = $PS["Control.Semigroupoid"];
  var Data_Symbol = $PS["Data.Symbol"];
  var semigroupoidBuilder = Control_Semigroupoid.semigroupoidFn;

  var insert = function insert(dictCons) {
    return function (dictLacks) {
      return function (dictIsSymbol) {
        return function (l) {
          return function (a) {
            return function (r1) {
              return $foreign.unsafeInsert(Data_Symbol.reflectSymbol(dictIsSymbol)(l))(a)(r1);
            };
          };
        };
      };
    };
  };

  var categoryBuilder = Control_Category.categoryFn;

  var build = function build(v) {
    return function (r1) {
      return v($foreign.copyRecord(r1));
    };
  };

  exports["build"] = build;
  exports["insert"] = insert;
  exports["semigroupoidBuilder"] = semigroupoidBuilder;
  exports["categoryBuilder"] = categoryBuilder;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Type.Data.RowList"] = $PS["Type.Data.RowList"] || {};
  var exports = $PS["Type.Data.RowList"];

  var RLProxy = function () {
    function RLProxy() {}

    ;
    RLProxy.value = new RLProxy();
    return RLProxy;
  }();

  exports["RLProxy"] = RLProxy;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Type.Proxy"] = $PS["Type.Proxy"] || {};
  var exports = $PS["Type.Proxy"];

  var $$Proxy = function () {
    function $$Proxy() {}

    ;
    $$Proxy.value = new $$Proxy();
    return $$Proxy;
  }();

  exports["Proxy"] = $$Proxy;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign.Generic.Class"] = $PS["Foreign.Generic.Class"] || {};
  var exports = $PS["Foreign.Generic.Class"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Category = $PS["Control.Category"];
  var Control_Monad_Except = $PS["Control.Monad.Except"];
  var Control_Monad_Except_Trans = $PS["Control.Monad.Except.Trans"];
  var Control_Semigroupoid = $PS["Control.Semigroupoid"];
  var Data_Bifunctor = $PS["Data.Bifunctor"];
  var Data_Either = $PS["Data.Either"];
  var Data_Foldable = $PS["Data.Foldable"];
  var Data_Function = $PS["Data.Function"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Generic_Rep = $PS["Data.Generic.Rep"];
  var Data_Identity = $PS["Data.Identity"];
  var Data_List = $PS["Data.List"];
  var Data_List_Types = $PS["Data.List.Types"];
  var Data_Maybe = $PS["Data.Maybe"];
  var Data_Show = $PS["Data.Show"];
  var Data_Symbol = $PS["Data.Symbol"];
  var Data_Unfoldable = $PS["Data.Unfoldable"];
  var Foreign = $PS["Foreign"];
  var Foreign_Class = $PS["Foreign.Class"];
  var Foreign_Index = $PS["Foreign.Index"];
  var Foreign_Object = $PS["Foreign.Object"];
  var Record = $PS["Record"];
  var Record_Builder = $PS["Record.Builder"];
  var Type_Data_RowList = $PS["Type.Data.RowList"];
  var Type_Proxy = $PS["Type.Proxy"];

  var GenericEncodeArgs = function GenericEncodeArgs(encodeArgs) {
    this.encodeArgs = encodeArgs;
  };

  var GenericEncode = function GenericEncode(encodeOpts) {
    this.encodeOpts = encodeOpts;
  };

  var GenericDecodeArgs = function GenericDecodeArgs(decodeArgs) {
    this.decodeArgs = decodeArgs;
  };

  var GenericDecode = function GenericDecode(decodeOpts) {
    this.decodeOpts = decodeOpts;
  };

  var GenericCountArgs = function GenericCountArgs(countArgs) {
    this.countArgs = countArgs;
  };

  var Encode_ = function Encode_(encode_) {
    this.encode_ = encode_;
  };

  var EncodeRecord = function EncodeRecord(encodeRecord_) {
    this.encodeRecord_ = encodeRecord_;
  };

  var Decode_ = function Decode_(decode_) {
    this.decode_ = decode_;
  };

  var DecodeRecord = function DecodeRecord(decodeRecord_) {
    this.decodeRecord_ = decodeRecord_;
  };

  var genericCountArgsArgument = new GenericCountArgs(function (v) {
    return new Data_Either.Right(1);
  });

  var encode_Other = function encode_Other(dictEncode) {
    return new Encode_(function (v) {
      return Foreign_Class.encode(dictEncode);
    });
  };

  var encode_ = function encode_(dict) {
    return dict.encode_;
  };

  var genericEncodeArgsArgument = function genericEncodeArgsArgument(dictEncode_) {
    return new GenericEncodeArgs(function (opts) {
      return function (v) {
        return Data_List.singleton(encode_(dictEncode_)(opts)(v));
      };
    });
  };

  var encodeRecord_ = function encodeRecord_(dict) {
    return dict.encodeRecord_;
  };

  var encode_Record = function encode_Record(dictRowToList) {
    return function (dictEncodeRecord) {
      return new Encode_(function (opts) {
        var $147 = encodeRecord_(dictEncodeRecord)(Type_Data_RowList.RLProxy.value)(opts);
        return function ($148) {
          return Foreign.unsafeToForeign($147($148));
        };
      });
    };
  };

  var encodeRecordNil = new EncodeRecord(function (v) {
    return function (v1) {
      return function (v2) {
        return Foreign_Object.empty;
      };
    };
  });

  var encodeRecordCons = function encodeRecordCons(dictCons) {
    return function (dictEncodeRecord) {
      return function (dictIsSymbol) {
        return function (dictEncode_) {
          return new EncodeRecord(function (v) {
            return function (opts) {
              return function (rec) {
                var obj = encodeRecord_(dictEncodeRecord)(Type_Data_RowList.RLProxy.value)(opts)(rec);
                var l = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
                return Foreign_Object.insert(opts.fieldTransform(l))(encode_(dictEncode_)(opts)(Record.get(dictIsSymbol)()(Data_Symbol.SProxy.value)(rec)))(obj);
              };
            };
          });
        };
      };
    };
  };

  var encodeOpts = function encodeOpts(dict) {
    return dict.encodeOpts;
  };

  var encodeArgs = function encodeArgs(dict) {
    return dict.encodeArgs;
  };

  var genericEncodeConstructor = function genericEncodeConstructor(dictIsSymbol) {
    return function (dictGenericEncodeArgs) {
      return new GenericEncode(function (opts) {
        return function (v) {
          var unwrapArguments = function unwrapArguments(v1) {
            if (v1.length === 0) {
              return Data_Maybe.Nothing.value;
            }

            ;

            if (v1.length === 1 && opts.unwrapSingleArguments) {
              return new Data_Maybe.Just(v1[0]);
            }

            ;
            return new Data_Maybe.Just(Foreign.unsafeToForeign(v1));
          };

          var encodeArgsArray = function () {
            var $149 = Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray);
            var $150 = encodeArgs(dictGenericEncodeArgs)(opts);
            return function ($151) {
              return unwrapArguments($149($150($151)));
            };
          }();

          var ctorName = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);

          if (opts.unwrapSingleConstructors) {
            return Data_Maybe.maybe(Foreign.unsafeToForeign({}))(Foreign.unsafeToForeign)(encodeArgsArray(v));
          }

          ;
          return Foreign.unsafeToForeign(Foreign_Object.union(Foreign_Object.singleton(opts.sumEncoding.value0.tagFieldName)(Foreign.unsafeToForeign(opts.sumEncoding.value0.constructorTagTransform(ctorName))))(Data_Maybe.maybe(Foreign_Object.empty)(Foreign_Object.singleton(opts.sumEncoding.value0.contentsFieldName))(encodeArgsArray(v))));
        };
      });
    };
  };

  var decode_Other = function decode_Other(dictDecode) {
    return new Decode_(function (v) {
      return Foreign_Class.decode(dictDecode);
    });
  };

  var decode_ = function decode_(dict) {
    return dict.decode_;
  };

  var genericDecodeArgsArgument = function genericDecodeArgsArgument(dictDecode_) {
    return new GenericDecodeArgs(function (v) {
      return function (v1) {
        return function (v2) {
          if (v2 instanceof Data_List_Types.Cons) {
            return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Control_Monad_Except.mapExcept(Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Data_Functor.map(Data_List_Types.functorNonEmptyList)(Foreign.ErrorAtIndex.create(v1))))(decode_(dictDecode_)(v)(v2.value0)))(function (v3) {
              return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))({
                result: v3,
                rest: v2.value1,
                next: v1 + 1 | 0
              });
            });
          }

          ;
          return Foreign.fail(new Foreign.ForeignError("Not enough constructor arguments"));
        };
      };
    });
  };

  var decodeRecord_ = function decodeRecord_(dict) {
    return dict.decodeRecord_;
  };

  var decode_Record = function decode_Record(dictRowToList) {
    return function (dictDecodeRecord) {
      return new Decode_(function (opts) {
        return Data_Functor.map(Data_Functor.functorFn)(Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Data_Function.flip(Record_Builder.build)({})))(decodeRecord_(dictDecodeRecord)(Type_Data_RowList.RLProxy.value)(opts));
      });
    };
  };

  var decodeRecordNil = new DecodeRecord(function (v) {
    return function (v1) {
      return function (v2) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Control_Category.identity(Record_Builder.categoryBuilder));
      };
    };
  });

  var decodeRecordCons = function decodeRecordCons(dictCons) {
    return function (dictDecodeRecord) {
      return function (dictIsSymbol) {
        return function (dictDecode_) {
          return function (dictLacks) {
            return new DecodeRecord(function (v) {
              return function (opts) {
                return function (f) {
                  return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(decodeRecord_(dictDecodeRecord)(Type_Data_RowList.RLProxy.value)(opts)(f))(function (v1) {
                    var l = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
                    var l_transformed = opts.fieldTransform(l);
                    return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Foreign_Index.index(Foreign_Index.indexString)(f)(l_transformed))(function (v2) {
                      return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Control_Monad_Except.mapExcept(Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Data_Functor.map(Data_List_Types.functorNonEmptyList)(Foreign.ErrorAtProperty.create(l_transformed))))(decode_(dictDecode_)(opts)(v2)))(function (v3) {
                        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Control_Semigroupoid.composeFlipped(Record_Builder.semigroupoidBuilder)(v1)(Record_Builder.insert()()(dictIsSymbol)(Data_Symbol.SProxy.value)(v3)));
                      });
                    });
                  });
                };
              };
            });
          };
        };
      };
    };
  };

  var decodeOpts = function decodeOpts(dict) {
    return dict.decodeOpts;
  };

  var decodeArgs = function decodeArgs(dict) {
    return dict.decodeArgs;
  };

  var countArgs = function countArgs(dict) {
    return dict.countArgs;
  };

  var genericDecodeConstructor = function genericDecodeConstructor(dictIsSymbol) {
    return function (dictGenericDecodeArgs) {
      return function (dictGenericCountArgs) {
        return new GenericDecode(function (opts) {
          return function (f) {
            var numArgs = countArgs(dictGenericCountArgs)(Type_Proxy["Proxy"].value);

            var readArguments = function readArguments(args) {
              if (numArgs instanceof Data_Either.Left) {
                return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(numArgs.value0);
              }

              ;

              if (numArgs instanceof Data_Either.Right && numArgs.value0 === 1 && opts.unwrapSingleArguments) {
                return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(decodeArgs(dictGenericDecodeArgs)(opts)(0)(Data_List.singleton(args)))(function (v) {
                  return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Control_Applicative.unless(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Data_List["null"](v.rest))(Foreign.fail(new Foreign.ForeignError("Expected a single argument"))))(function () {
                    return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(v.result);
                  });
                });
              }

              ;

              if (numArgs instanceof Data_Either.Right) {
                return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Foreign.readArray(args))(function (v) {
                  return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(decodeArgs(dictGenericDecodeArgs)(opts)(0)(Data_List.fromFoldable(Data_Foldable.foldableArray)(v)))(function (v1) {
                    return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Control_Applicative.unless(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(Data_List["null"](v1.rest))(Foreign.fail(new Foreign.ForeignError("Expected " + (Data_Show.show(Data_Show.showInt)(numArgs.value0) + " constructor arguments")))))(function () {
                      return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(v1.result);
                    });
                  });
                });
              }

              ;
              throw new Error("Failed pattern match at Foreign.Generic.Class (line 75, column 9 - line 87, column 24): " + [numArgs.constructor.name]);
            };

            var ctorName = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);

            if (opts.unwrapSingleConstructors) {
              return Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Data_Generic_Rep.Constructor)(readArguments(f));
            }

            ;
            return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Control_Monad_Except.mapExcept(Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Data_Functor.map(Data_List_Types.functorNonEmptyList)(Foreign.ErrorAtProperty.create(opts.sumEncoding.value0.tagFieldName))))(Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Foreign_Index.index(Foreign_Index.indexString)(f)(opts.sumEncoding.value0.tagFieldName))(Foreign.readString))(function (v) {
              var expected = opts.sumEncoding.value0.constructorTagTransform(ctorName);
              return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Control_Applicative.unless(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(v === expected)(Foreign.fail(new Foreign.ForeignError("Expected " + (Data_Show.show(Data_Show.showString)(expected) + " tag")))))(function () {
                return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(v);
              });
            })))(function (v) {
              return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Control_Monad_Except.mapExcept(Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Data_Functor.map(Data_List_Types.functorNonEmptyList)(Foreign.ErrorAtProperty.create(opts.sumEncoding.value0.contentsFieldName))))(Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Data_Identity.monadIdentity))(Foreign_Index.index(Foreign_Index.indexString)(f)(opts.sumEncoding.value0.contentsFieldName))(readArguments)))(function (v1) {
                return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Data_Identity.monadIdentity))(v1);
              });
            });
          };
        });
      };
    };
  };

  exports["decodeOpts"] = decodeOpts;
  exports["encodeOpts"] = encodeOpts;
  exports["genericDecodeConstructor"] = genericDecodeConstructor;
  exports["genericEncodeConstructor"] = genericEncodeConstructor;
  exports["genericDecodeArgsArgument"] = genericDecodeArgsArgument;
  exports["genericEncodeArgsArgument"] = genericEncodeArgsArgument;
  exports["genericCountArgsArgument"] = genericCountArgsArgument;
  exports["decode_Record"] = decode_Record;
  exports["decode_Other"] = decode_Other;
  exports["encode_Record"] = encode_Record;
  exports["encode_Other"] = encode_Other;
  exports["decodeRecordNil"] = decodeRecordNil;
  exports["encodeRecordNil"] = encodeRecordNil;
  exports["decodeRecordCons"] = decodeRecordCons;
  exports["encodeRecordCons"] = encodeRecordCons;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign.Generic.Types"] = $PS["Foreign.Generic.Types"] || {};
  var exports = $PS["Foreign.Generic.Types"];

  var TaggedObject = function () {
    function TaggedObject(value0) {
      this.value0 = value0;
    }

    ;

    TaggedObject.create = function (value0) {
      return new TaggedObject(value0);
    };

    return TaggedObject;
  }();

  exports["TaggedObject"] = TaggedObject;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Foreign.Generic"] = $PS["Foreign.Generic"] || {};
  var exports = $PS["Foreign.Generic"];
  var Control_Category = $PS["Control.Category"];
  var Control_Monad_Except_Trans = $PS["Control.Monad.Except.Trans"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Generic_Rep = $PS["Data.Generic.Rep"];
  var Data_Identity = $PS["Data.Identity"];
  var Foreign_Generic_Class = $PS["Foreign.Generic.Class"];
  var Foreign_Generic_Types = $PS["Foreign.Generic.Types"];

  var genericEncode = function genericEncode(dictGeneric) {
    return function (dictGenericEncode) {
      return function (opts) {
        var $10 = Foreign_Generic_Class.encodeOpts(dictGenericEncode)(opts);
        var $11 = Data_Generic_Rep.from(dictGeneric);
        return function ($12) {
          return $10($11($12));
        };
      };
    };
  };

  var genericDecode = function genericDecode(dictGeneric) {
    return function (dictGenericDecode) {
      return function (opts) {
        var $15 = Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Data_Generic_Rep.to(dictGeneric));
        var $16 = Foreign_Generic_Class.decodeOpts(dictGenericDecode)(opts);
        return function ($17) {
          return $15($16($17));
        };
      };
    };
  };

  var defaultOptions = {
    sumEncoding: new Foreign_Generic_Types.TaggedObject({
      tagFieldName: "tag",
      contentsFieldName: "contents",
      constructorTagTransform: Control_Category.identity(Control_Category.categoryFn)
    }),
    unwrapSingleConstructors: false,
    unwrapSingleArguments: true,
    fieldTransform: Control_Category.identity(Control_Category.categoryFn)
  };
  exports["defaultOptions"] = defaultOptions;
  exports["genericDecode"] = genericDecode;
  exports["genericEncode"] = genericEncode;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Optic.Getter"] = $PS["Optic.Getter"] || {};
  var exports = $PS["Optic.Getter"];
  var Data_Const = $PS["Data.Const"];
  var Data_Function = $PS["Data.Function"];
  var Data_Newtype = $PS["Data.Newtype"];

  var view = function view(asa) {
    return function (s) {
      return Data_Newtype.unwrap(Data_Const.newtypeConst)(asa(Data_Const.Const)(s));
    };
  };

  var weiv = Data_Function.flip(view);
  exports["weiv"] = weiv;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Optic.Lens"] = $PS["Optic.Lens"] || {};
  var exports = $PS["Optic.Lens"];
  var Data_Functor = $PS["Data.Functor"];

  var lens = function lens(s2a) {
    return function (s2b2t) {
      return function (dictFunctor) {
        return function (a2fb) {
          return function (s) {
            return Data_Functor.map(dictFunctor)(s2b2t(s))(a2fb(s2a(s)));
          };
        };
      };
    };
  };

  exports["lens"] = lens;
})(PS);

(function (exports) {
  "use strict";

  var dom = __webpack_require__(/*! sketch/dom */ "sketch/dom");

  exports._getSelection = function () {
    return dom.getSelectedDocument().selectedLayers.layers;
  };

  exports._setPropsForLayerID = function (id) {
    return function (path) {
      return function (data) {
        return function () {
          var layer = dom.getSelectedDocument().getLayerWithID(id);

          try {
            eval("layer." + path.join(".") + " = data;");
          } catch (e) {
            console.log(e.message);
          }

          return {};
        };
      };
    };
  };
})(PS["Sketch.Dom"] = PS["Sketch.Dom"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Sketch.Types"] = $PS["Sketch.Types"] || {};
  var exports = $PS["Sketch.Types"];
  var Control_Alt = $PS["Control.Alt"];
  var Control_Monad_Except_Trans = $PS["Control.Monad.Except.Trans"];
  var Data_Functor = $PS["Data.Functor"];
  var Data_Generic_Rep = $PS["Data.Generic.Rep"];
  var Data_Identity = $PS["Data.Identity"];
  var Data_List_Types = $PS["Data.List.Types"];
  var Data_Newtype = $PS["Data.Newtype"];
  var Data_Symbol = $PS["Data.Symbol"];
  var Foreign_Class = $PS["Foreign.Class"];
  var Foreign_Generic = $PS["Foreign.Generic"];
  var Foreign_Generic_Class = $PS["Foreign.Generic.Class"];

  var TextStyle = function TextStyle(x) {
    return x;
  };

  var ImageStyle = function ImageStyle(x) {
    return x;
  };

  var GroupStyle = function GroupStyle(x) {
    return x;
  };

  var ImageLayer = function ImageLayer(x) {
    return x;
  };

  var TextLayer = function TextLayer(x) {
    return x;
  };

  var ShapeStyle = function ShapeStyle(x) {
    return x;
  };

  var ShapeLayer = function ShapeLayer(x) {
    return x;
  };

  var ArtboardLayer = function ArtboardLayer(x) {
    return x;
  };

  var Artboard = function () {
    function Artboard(value0) {
      this.value0 = value0;
    }

    ;

    Artboard.create = function (value0) {
      return new Artboard(value0);
    };

    return Artboard;
  }();

  var Text = function () {
    function Text(value0) {
      this.value0 = value0;
    }

    ;

    Text.create = function (value0) {
      return new Text(value0);
    };

    return Text;
  }();

  var Image = function () {
    function Image(value0) {
      this.value0 = value0;
    }

    ;

    Image.create = function (value0) {
      return new Image(value0);
    };

    return Image;
  }();

  var Shape = function () {
    function Shape(value0) {
      this.value0 = value0;
    }

    ;

    Shape.create = function (value0) {
      return new Shape(value0);
    };

    return Shape;
  }();

  var Group = function () {
    function Group(value0) {
      this.value0 = value0;
    }

    ;

    Group.create = function (value0) {
      return new Group(value0);
    };

    return Group;
  }();

  var GroupLayer = function GroupLayer(x) {
    return x;
  };

  var newtypeTextStyle = new Data_Newtype.Newtype(function (n) {
    return n;
  }, TextStyle);
  var newtypeTextLayer = new Data_Newtype.Newtype(function (n) {
    return n;
  }, TextLayer);
  var newtypeShapeStyle = new Data_Newtype.Newtype(function (n) {
    return n;
  }, ShapeStyle);
  var newtypeShapeLayer = new Data_Newtype.Newtype(function (n) {
    return n;
  }, ShapeLayer);
  var newtypeImageStyle = new Data_Newtype.Newtype(function (n) {
    return n;
  }, ImageStyle);
  var newtypeImageLayer = new Data_Newtype.Newtype(function (n) {
    return n;
  }, ImageLayer);
  var newtypeGroupStyle = new Data_Newtype.Newtype(function (n) {
    return n;
  }, GroupStyle);
  var newtypeGroupLayer = new Data_Newtype.Newtype(function (n) {
    return n;
  }, GroupLayer);
  var newtypeArtboardLayer = new Data_Newtype.Newtype(function (n) {
    return n;
  }, ArtboardLayer);
  var genericTextStyle = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericTextLayer = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericStop = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericShapeStyle = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericShapeLayer = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericShadow = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericPoints = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericPoint = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericImageStyle = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericImageLayer = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericImageData = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericGroupStyle = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericGroupLayer = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericGradient = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericFrame = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericFill = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericExportFormat = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericBorder = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericBackground = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var genericArtboardLayer = new Data_Generic_Rep.Generic(function (x) {
    return x;
  }, function (x) {
    return x;
  });
  var encodeShadow = new Foreign_Class.Encode(Foreign_Generic.genericEncode(genericShadow)(Foreign_Generic_Class.genericEncodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Shadow";
  }))(Foreign_Generic_Class.genericEncodeArgsArgument(Foreign_Generic_Class.encode_Record()(Foreign_Generic_Class.encodeRecordCons()(Foreign_Generic_Class.encodeRecordCons()(Foreign_Generic_Class.encodeRecordCons()(Foreign_Generic_Class.encodeRecordCons()(Foreign_Generic_Class.encodeRecordCons()(Foreign_Generic_Class.encodeRecordCons()(Foreign_Generic_Class.encodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "y";
  }))(Foreign_Generic_Class.encode_Other(Foreign_Class.numberEncode)))(new Data_Symbol.IsSymbol(function () {
    return "x";
  }))(Foreign_Generic_Class.encode_Other(Foreign_Class.numberEncode)))(new Data_Symbol.IsSymbol(function () {
    return "spread";
  }))(Foreign_Generic_Class.encode_Other(Foreign_Class.numberEncode)))(new Data_Symbol.IsSymbol(function () {
    return "enabled";
  }))(Foreign_Generic_Class.encode_Other(Foreign_Class.booleanEncode)))(new Data_Symbol.IsSymbol(function () {
    return "color";
  }))(Foreign_Generic_Class.encode_Other(Foreign_Class.stringEncode)))(new Data_Symbol.IsSymbol(function () {
    return "blur";
  }))(Foreign_Generic_Class.encode_Other(Foreign_Class.numberEncode))))))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeStop = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericStop)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Stop";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "position";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.intDecode))())(new Data_Symbol.IsSymbol(function () {
    return "color";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeShadow = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericShadow)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Shadow";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "y";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "x";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "spread";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "enabled";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "color";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "blur";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeTextStyle = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericTextStyle)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "TextStyle";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "verticalAlignment";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "textTransform";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "textColor";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "shadows";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.maybeDecode(Foreign_Class.arrayDecode(decodeShadow))))())(new Data_Symbol.IsSymbol(function () {
    return "opacity";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "lineHeight";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.maybeDecode(Foreign_Class.numberDecode)))())(new Data_Symbol.IsSymbol(function () {
    return "kerning";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.maybeDecode(Foreign_Class.numberDecode)))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "fontWeight";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "fontSize";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "fontFamily";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "alignment";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodePoint = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericPoint)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Point";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "y";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "x";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodePoints = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericPoints)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Points";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "pointType";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "point";
  }))(Foreign_Generic_Class.decode_Other(decodePoint))())(new Data_Symbol.IsSymbol(function () {
    return "curveTo";
  }))(Foreign_Generic_Class.decode_Other(decodePoint))())(new Data_Symbol.IsSymbol(function () {
    return "curveFrom";
  }))(Foreign_Generic_Class.decode_Other(decodePoint))())(new Data_Symbol.IsSymbol(function () {
    return "cornerRadius";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeImageStyle = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericImageStyle)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "ImageStyle";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "shadows";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.maybeDecode(Foreign_Class.arrayDecode(decodeShadow))))())(new Data_Symbol.IsSymbol(function () {
    return "opacity";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeImageData = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericImageData)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "ImageData";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeGroupStyle = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericGroupStyle)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "GroupStyle";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "shadows";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.maybeDecode(Foreign_Class.arrayDecode(decodeShadow))))())(new Data_Symbol.IsSymbol(function () {
    return "opacity";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeGradient = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericGradient)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Gradient";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "to";
  }))(Foreign_Generic_Class.decode_Other(decodePoint))())(new Data_Symbol.IsSymbol(function () {
    return "stops";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.arrayDecode(decodeStop)))())(new Data_Symbol.IsSymbol(function () {
    return "gradientType";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "from";
  }))(Foreign_Generic_Class.decode_Other(decodePoint))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeFrame = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericFrame)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Frame";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "y";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "x";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "width";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "height";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeImageLayer = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericImageLayer)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "ImageLayer";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "style";
  }))(Foreign_Generic_Class.decode_Other(decodeImageStyle))())(new Data_Symbol.IsSymbol(function () {
    return "name";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "locked";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "image";
  }))(Foreign_Generic_Class.decode_Other(decodeImageData))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "hidden";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "frame";
  }))(Foreign_Generic_Class.decode_Other(decodeFrame))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeTextLayer = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericTextLayer)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "TextLayer";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "text";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "style";
  }))(Foreign_Generic_Class.decode_Other(decodeTextStyle))())(new Data_Symbol.IsSymbol(function () {
    return "name";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "locked";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "lineSpacing";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "hidden";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "frame";
  }))(Foreign_Generic_Class.decode_Other(decodeFrame))())(new Data_Symbol.IsSymbol(function () {
    return "fixedWidth";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeFill = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericFill)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Fill";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "gradient";
  }))(Foreign_Generic_Class.decode_Other(decodeGradient))())(new Data_Symbol.IsSymbol(function () {
    return "fill";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "enabled";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "color";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeExportFormat = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericExportFormat)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "ExportFormat";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "size";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "fileFormat";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeBorder = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericBorder)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Border";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "thickness";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "position";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "fillType";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "enabled";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "color";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeShapeStyle = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericShapeStyle)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "ShapeStyle";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "shadows";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.maybeDecode(Foreign_Class.arrayDecode(decodeShadow))))())(new Data_Symbol.IsSymbol(function () {
    return "opacity";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.numberDecode))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "fills";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.maybeDecode(Foreign_Class.arrayDecode(decodeFill))))())(new Data_Symbol.IsSymbol(function () {
    return "borders";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.maybeDecode(Foreign_Class.arrayDecode(decodeBorder))))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeShapeLayer = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericShapeLayer)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "ShapeLayer";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "style";
  }))(Foreign_Generic_Class.decode_Other(decodeShapeStyle))())(new Data_Symbol.IsSymbol(function () {
    return "shapeType";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "points";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.arrayDecode(decodePoints)))())(new Data_Symbol.IsSymbol(function () {
    return "name";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "locked";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "hidden";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "frame";
  }))(Foreign_Generic_Class.decode_Other(decodeFrame))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeBackground = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericBackground)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "Background";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "includedInExport";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "enabled";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "color";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeLayer = new Foreign_Class.Decode(function (str) {
    return Control_Alt.alt(Control_Monad_Except_Trans.altExceptT(Data_List_Types.semigroupNonEmptyList)(Data_Identity.monadIdentity))(Control_Alt.alt(Control_Monad_Except_Trans.altExceptT(Data_List_Types.semigroupNonEmptyList)(Data_Identity.monadIdentity))(Control_Alt.alt(Control_Monad_Except_Trans.altExceptT(Data_List_Types.semigroupNonEmptyList)(Data_Identity.monadIdentity))(Control_Alt.alt(Control_Monad_Except_Trans.altExceptT(Data_List_Types.semigroupNonEmptyList)(Data_Identity.monadIdentity))(Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Artboard.create)(Foreign_Class.decode(decodeArtboardLayer)(str)))(Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Text.create)(Foreign_Class.decode(decodeTextLayer)(str))))(Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Image.create)(Foreign_Class.decode(decodeImageLayer)(str))))(Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Shape.create)(Foreign_Class.decode(decodeShapeLayer)(str))))(Data_Functor.map(Control_Monad_Except_Trans.functorExceptT(Data_Identity.functorIdentity))(Group.create)(Foreign_Class.decode(decodeGroupLayer)(str)));
  });
  var decodeGroupLayer = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericGroupLayer)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "GroupLayer";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "style";
  }))(Foreign_Generic_Class.decode_Other(decodeGroupStyle))())(new Data_Symbol.IsSymbol(function () {
    return "name";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "locked";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "layers";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.arrayDecode(decodeLayer)))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "hidden";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "frame";
  }))(Foreign_Generic_Class.decode_Other(decodeFrame))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  var decodeArtboardLayer = new Foreign_Class.Decode(Foreign_Generic.genericDecode(genericArtboardLayer)(Foreign_Generic_Class.genericDecodeConstructor(new Data_Symbol.IsSymbol(function () {
    return "ArtboardLayer";
  }))(Foreign_Generic_Class.genericDecodeArgsArgument(Foreign_Generic_Class.decode_Record()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordCons()(Foreign_Generic_Class.decodeRecordNil)(new Data_Symbol.IsSymbol(function () {
    return "type";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "selected";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.booleanDecode))())(new Data_Symbol.IsSymbol(function () {
    return "name";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "layers";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.arrayDecode(decodeLayer)))())(new Data_Symbol.IsSymbol(function () {
    return "id";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.stringDecode))())(new Data_Symbol.IsSymbol(function () {
    return "frame";
  }))(Foreign_Generic_Class.decode_Other(decodeFrame))())(new Data_Symbol.IsSymbol(function () {
    return "exportFormats";
  }))(Foreign_Generic_Class.decode_Other(Foreign_Class.arrayDecode(decodeExportFormat)))())(new Data_Symbol.IsSymbol(function () {
    return "background";
  }))(Foreign_Generic_Class.decode_Other(decodeBackground))())))(Foreign_Generic_Class.genericCountArgsArgument))({
    sumEncoding: Foreign_Generic.defaultOptions.sumEncoding,
    unwrapSingleConstructors: true,
    unwrapSingleArguments: Foreign_Generic.defaultOptions.unwrapSingleArguments,
    fieldTransform: Foreign_Generic.defaultOptions.fieldTransform
  }));
  exports["Artboard"] = Artboard;
  exports["Text"] = Text;
  exports["Image"] = Image;
  exports["Shape"] = Shape;
  exports["Group"] = Group;
  exports["decodeLayer"] = decodeLayer;
  exports["newtypeArtboardLayer"] = newtypeArtboardLayer;
  exports["newtypeTextLayer"] = newtypeTextLayer;
  exports["newtypeTextStyle"] = newtypeTextStyle;
  exports["newtypeGroupLayer"] = newtypeGroupLayer;
  exports["newtypeGroupStyle"] = newtypeGroupStyle;
  exports["newtypeImageLayer"] = newtypeImageLayer;
  exports["newtypeImageStyle"] = newtypeImageStyle;
  exports["newtypeShapeLayer"] = newtypeShapeLayer;
  exports["newtypeShapeStyle"] = newtypeShapeStyle;
  exports["encodeShadow"] = encodeShadow;
  exports["decodeShadow"] = decodeShadow;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Sketch.Utils"] = $PS["Sketch.Utils"] || {};
  var exports = $PS["Sketch.Utils"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Control_Bind = $PS["Control.Bind"];
  var Control_Monad_Except = $PS["Control.Monad.Except"];
  var Data_Either = $PS["Data.Either"];
  var Data_Functor = $PS["Data.Functor"];
  var Effect = $PS["Effect"];
  var Foreign_Class = $PS["Foreign.Class"];

  var runExceptDecode = function runExceptDecode(dictDecode) {
    return function (get) {
      return Control_Bind.bind(Effect.bindEffect)(Data_Functor.map(Effect.functorEffect)(Data_Functor.map(Data_Functor.functorFn)(Control_Monad_Except.runExcept)(Foreign_Class.decode(dictDecode)))(get))(function () {
        var $5 = Control_Applicative.pure(Effect.applicativeEffect);
        return function ($6) {
          return $5(function (v) {
            if (v instanceof Data_Either.Left) {
              return new Data_Either.Left(v.value0);
            }

            ;

            if (v instanceof Data_Either.Right) {
              return new Data_Either.Right(v.value0);
            }

            ;
            throw new Error("Failed pattern match at Sketch.Utils (line 13, column 65 - line 15, column 23): " + [v.constructor.name]);
          }($6));
        };
      }());
    };
  };

  exports["runExceptDecode"] = runExceptDecode;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Sketch.Dom"] = $PS["Sketch.Dom"] || {};
  var exports = $PS["Sketch.Dom"];
  var $foreign = $PS["Sketch.Dom"];
  var Foreign_Class = $PS["Foreign.Class"];
  var Sketch_Types = $PS["Sketch.Types"];
  var Sketch_Utils = $PS["Sketch.Utils"];

  var setPropsForLayerID = function setPropsForLayerID(dictEncode) {
    return function (id) {
      return function (path) {
        return function (val) {
          return $foreign["_setPropsForLayerID"](id)(path)(Foreign_Class.encode(dictEncode)(val));
        };
      };
    };
  };

  var selectedLayers = Sketch_Utils.runExceptDecode(Foreign_Class.arrayDecode(Sketch_Types.decodeLayer))($foreign["_getSelection"]);
  exports["selectedLayers"] = selectedLayers;
  exports["setPropsForLayerID"] = setPropsForLayerID;
})(PS);

(function (exports) {
  "use strict";

  var settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

  exports._globalSettingForKey = function (key) {
    return function () {
      return settings.globalSettingForKey(key);
    };
  };

  exports._setGlobalSettingForKey = function (key) {
    return function (data) {
      return function () {
        settings.setGlobalSettingForKey(key, data != "undefined" ? data : {});
        return {};
      };
    };
  };
})(PS["Sketch.Settings"] = PS["Sketch.Settings"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Sketch.Settings"] = $PS["Sketch.Settings"] || {};
  var exports = $PS["Sketch.Settings"];
  var $foreign = $PS["Sketch.Settings"];
  var Foreign_Class = $PS["Foreign.Class"];
  var Sketch_Utils = $PS["Sketch.Utils"];

  var setGlobalSettingForKey = function setGlobalSettingForKey(dictEncode) {
    return function (key) {
      return function (val) {
        return $foreign["_setGlobalSettingForKey"](key)(Foreign_Class.encode(dictEncode)(val));
      };
    };
  };

  var globalSettingForKey = function globalSettingForKey(dictDecode) {
    var $10 = Sketch_Utils.runExceptDecode(dictDecode);
    return function ($11) {
      return $10($foreign["_globalSettingForKey"]($11));
    };
  };

  exports["globalSettingForKey"] = globalSettingForKey;
  exports["setGlobalSettingForKey"] = setGlobalSettingForKey;
})(PS);

(function (exports) {
  "use strict";

  __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");

  var ui = __webpack_require__(/*! sketch/ui */ "sketch/ui");

  var doSomethingAsync =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message, inputType, cb) {
      var options;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = {};

              if (inputType.tag == "STRING") {
                options = {
                  type: ui.INPUT_TYPE.string,
                  initialValue: inputType.contents[0],
                  description: inputType.contents[1]
                };
              } else if (inputType.tag == "SELECTION") {
                options = {
                  type: ui.INPUT_TYPE.selection,
                  possibleValues: inputType.contents[0],
                  description: inputType.contents[1]
                };
              }

              if (inputType.contents[2] != null) {
                options.numberOfLines = inputType.contents[2];
              }

              ui.getInputFromUser(message, options, function (err, value) {
                if (err) cb(true, err);else cb(false, value);
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function doSomethingAsync(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.alert = function (title) {
    return function (helpText) {
      return function () {
        ui.alert(title, helpText);
        return {};
      };
    };
  };

  exports.message = function (text) {
    return function () {
      ui.message(text);
      return {};
    };
  };
})(PS["Sketch.UI"] = PS["Sketch.UI"] || {});

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Sketch.UI"] = $PS["Sketch.UI"] || {};
  var exports = $PS["Sketch.UI"];
  var $foreign = $PS["Sketch.UI"];
  exports["alert"] = $foreign.alert;
  exports["message"] = $foreign.message;
})(PS);

(function ($PS) {
  // Generated by purs version 0.13.3
  "use strict";

  $PS["Main"] = $PS["Main"] || {};
  var exports = $PS["Main"];
  var Control_Applicative = $PS["Control.Applicative"];
  var Data_Array = $PS["Data.Array"];
  var Data_Const = $PS["Data.Const"];
  var Data_Either = $PS["Data.Either"];
  var Data_Foldable = $PS["Data.Foldable"];
  var Data_Maybe = $PS["Data.Maybe"];
  var Data_Newtype = $PS["Data.Newtype"];
  var Data_Unit = $PS["Data.Unit"];
  var Effect = $PS["Effect"];
  var Foreign_Class = $PS["Foreign.Class"];
  var Optic_Getter = $PS["Optic.Getter"];
  var Optic_Lens = $PS["Optic.Lens"];
  var Sketch_Dom = $PS["Sketch.Dom"];
  var Sketch_Settings = $PS["Sketch.Settings"];
  var Sketch_Types = $PS["Sketch.Types"];
  var Sketch_UI = $PS["Sketch.UI"];

  var _style = function _style(dictNewtype) {
    return function (dictFunctor) {
      return Optic_Lens.lens(function () {
        var $68 = Data_Newtype.unwrap(dictNewtype);
        return function ($69) {
          return function (v) {
            return v.style;
          }($68($69));
        };
      }())(function (oldRec) {
        return function (newVal) {
          return Data_Newtype.wrap(dictNewtype)(function () {
            var v = Data_Newtype.unwrap(dictNewtype)(oldRec);
            var $26 = {};

            for (var $27 in v) {
              if ({}.hasOwnProperty.call(v, $27)) {
                $26[$27] = v[$27];
              }

              ;
            }

            ;
            $26.style = newVal;
            return $26;
          }());
        };
      })(dictFunctor);
    };
  };

  var _shadows = function _shadows(dictNewtype) {
    return function (dictFunctor) {
      return Optic_Lens.lens(function () {
        var $72 = Data_Newtype.unwrap(dictNewtype);
        return function ($73) {
          return function (v) {
            return v.shadows;
          }($72($73));
        };
      }())(function (oldRec) {
        return function (newVal) {
          return Data_Newtype.wrap(dictNewtype)(function () {
            var v = Data_Newtype.unwrap(dictNewtype)(oldRec);
            var $32 = {};

            for (var $33 in v) {
              if ({}.hasOwnProperty.call(v, $33)) {
                $32[$33] = v[$33];
              }

              ;
            }

            ;
            $32.shadows = newVal;
            return $32;
          }());
        };
      })(dictFunctor);
    };
  };

  var _id = function _id(dictNewtype) {
    return function (dictFunctor) {
      return Optic_Lens.lens(function () {
        var $74 = Data_Newtype.unwrap(dictNewtype);
        return function ($75) {
          return function (v) {
            return v.id;
          }($74($75));
        };
      }())(function (oldRec) {
        return function (newVal) {
          return Data_Newtype.wrap(dictNewtype)(function () {
            var v = Data_Newtype.unwrap(dictNewtype)(oldRec);
            var $35 = {};

            for (var $36 in v) {
              if ({}.hasOwnProperty.call(v, $36)) {
                $35[$36] = v[$36];
              }

              ;
            }

            ;
            $35.id = newVal;
            return $35;
          }());
        };
      })(dictFunctor);
    };
  };

  var copyOrCutShadows = function copyOrCutShadows(action) {
    var performAction = function performAction(dictEncode) {
      return function (dictNewtype) {
        return function (dictNewtype1) {
          return function (layer) {
            var v = Optic_Getter.weiv(Optic_Getter.weiv(layer)(_style(dictNewtype)(Data_Const.functorConst)))(_shadows(dictNewtype1)(Data_Const.functorConst));

            if (v instanceof Data_Maybe.Nothing) {
              return Control_Applicative.pure(Effect.applicativeEffect)(Data_Unit.unit);
            }

            ;

            if (v instanceof Data_Maybe.Just) {
              return function __do() {
                Sketch_Settings.setGlobalSettingForKey(dictEncode)("copied-shadows")(v.value0)();

                if (action === "CUT") {
                  return Sketch_Dom.setPropsForLayerID(Foreign_Class.arrayEncode(Sketch_Types.encodeShadow))(Optic_Getter.weiv(layer)(_id(dictNewtype)(Data_Const.functorConst)))(["style", "shadows"])([])();
                }

                ;
                return Data_Unit.unit;
              };
            }

            ;
            throw new Error("Failed pattern match at Main (line 36, column 27 - line 42, column 27): " + [v.constructor.name]);
          };
        };
      };
    };

    return function __do() {
      var v = Sketch_Dom.selectedLayers();

      if (v instanceof Data_Either.Left) {
        return Sketch_UI.message("Something went wrong...")();
      }

      ;

      if (v instanceof Data_Either.Right) {
        var v1 = Data_Array.length(v.value0);
        var v2 = Data_Array.index(v.value0)(0);

        if (v1 === 0) {
          return Sketch_UI.alert("No Selection")("Please select a layer and try again...")();
        }

        ;

        if (v2 instanceof Data_Maybe.Just && v2.value0 instanceof Sketch_Types.Shape && v1 === 1) {
          return performAction(Foreign_Class.arrayEncode(Sketch_Types.encodeShadow))(Sketch_Types.newtypeShapeLayer)(Sketch_Types.newtypeShapeStyle)(v2.value0.value0)();
        }

        ;

        if (v2 instanceof Data_Maybe.Just && v2.value0 instanceof Sketch_Types.Text && v1 === 1) {
          return performAction(Foreign_Class.arrayEncode(Sketch_Types.encodeShadow))(Sketch_Types.newtypeTextLayer)(Sketch_Types.newtypeTextStyle)(v2.value0.value0)();
        }

        ;

        if (v2 instanceof Data_Maybe.Just && v2.value0 instanceof Sketch_Types.Image && v1 === 1) {
          return performAction(Foreign_Class.arrayEncode(Sketch_Types.encodeShadow))(Sketch_Types.newtypeImageLayer)(Sketch_Types.newtypeImageStyle)(v2.value0.value0)();
        }

        ;

        if (v2 instanceof Data_Maybe.Just && v2.value0 instanceof Sketch_Types.Group && v1 === 1) {
          return performAction(Foreign_Class.arrayEncode(Sketch_Types.encodeShadow))(Sketch_Types.newtypeGroupLayer)(Sketch_Types.newtypeGroupStyle)(v2.value0.value0)();
        }

        ;

        if (v1 === 1) {
          return Sketch_UI.message("Sketch doesn't support Shadows on selected layer")();
        }

        ;
        return Sketch_UI.alert("More than one layer selected")("Please select only one layer and try again...")();
      }

      ;
      throw new Error("Failed pattern match at Main (line 24, column 50 - line 33, column 121): " + [v.constructor.name]);
    };
  };

  var pasteOrRemoveShadows = function pasteOrRemoveShadows(action) {
    var getLayerId = function getLayerId(layer) {
      if (layer instanceof Sketch_Types.Text) {
        return Optic_Getter.weiv(layer.value0)(_id(Sketch_Types.newtypeTextLayer)(Data_Const.functorConst));
      }

      ;

      if (layer instanceof Sketch_Types.Image) {
        return Optic_Getter.weiv(layer.value0)(_id(Sketch_Types.newtypeImageLayer)(Data_Const.functorConst));
      }

      ;

      if (layer instanceof Sketch_Types.Shape) {
        return Optic_Getter.weiv(layer.value0)(_id(Sketch_Types.newtypeShapeLayer)(Data_Const.functorConst));
      }

      ;

      if (layer instanceof Sketch_Types.Group) {
        return Optic_Getter.weiv(layer.value0)(_id(Sketch_Types.newtypeGroupLayer)(Data_Const.functorConst));
      }

      ;

      if (layer instanceof Sketch_Types.Artboard) {
        return Optic_Getter.weiv(layer.value0)(_id(Sketch_Types.newtypeArtboardLayer)(Data_Const.functorConst));
      }

      ;
      throw new Error("Failed pattern match at Main (line 57, column 24 - line 62, column 33): " + [layer.constructor.name]);
    };

    return function __do() {
      var v = Sketch_Dom.selectedLayers();

      if (v instanceof Data_Either.Left) {
        return Sketch_UI.message("Something went wrong...")();
      }

      ;

      if (v instanceof Data_Either.Right) {
        var v1 = Data_Array.length(v.value0);

        if (v1 === 0) {
          return Sketch_UI.alert("No Selection")("Please select a layer and try again...")();
        }

        ;

        if (action === "REMOVE") {
          return Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Foldable.foldableArray)(function (l) {
            return Sketch_Dom.setPropsForLayerID(Foreign_Class.arrayEncode(Sketch_Types.encodeShadow))(getLayerId(l))(["style", "shadows"])([]);
          })(v.value0)();
        }

        ;

        if (action === "PASTE") {
          var v2 = Sketch_Settings.globalSettingForKey(Foreign_Class.arrayDecode(Sketch_Types.decodeShadow))("copied-shadows")();

          if (v2 instanceof Data_Either.Left) {
            return Sketch_UI.message("Something went wrong...")();
          }

          ;

          if (v2 instanceof Data_Either.Right) {
            return Data_Foldable.traverse_(Effect.applicativeEffect)(Data_Foldable.foldableArray)(function (l) {
              return Sketch_Dom.setPropsForLayerID(Foreign_Class.arrayEncode(Sketch_Types.encodeShadow))(getLayerId(l))(["style", "shadows"])(v2.value0);
            })(v.value0)();
          }

          ;
          throw new Error("Failed pattern match at Main (line 51, column 74 - line 53, column 143): " + [v2.constructor.name]);
        }

        ;
        return Data_Unit.unit;
      }

      ;
      throw new Error("Failed pattern match at Main (line 45, column 54 - line 54, column 27): " + [v.constructor.name]);
    };
  };

  exports["copyOrCutShadows"] = copyOrCutShadows;
  exports["pasteOrRemoveShadows"] = pasteOrRemoveShadows;
})(PS);

module.exports = PS;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['copyShadows'] = __skpm_run.bind(this, 'copyShadows');
that['onRun'] = __skpm_run.bind(this, 'default');
that['pasteShadows'] = __skpm_run.bind(this, 'pasteShadows');
that['cutShadows'] = __skpm_run.bind(this, 'cutShadows');
that['removeShadows'] = __skpm_run.bind(this, 'removeShadows')

//# sourceMappingURL=copy-shadows.js.map