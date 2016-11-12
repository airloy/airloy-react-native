/**
 * AirloyReactNative v0.9.9
 * (c) 2016 Layman
 * @license MIT
 */
import { Device, Event, Store } from 'airloy';
import { AsyncStorage, DeviceEventEmitter, Platform } from 'react-native';

function __async(g) {
  return new Promise(function (s, j) {
    function c(a, x) {
      try {
        var r = g[x ? "throw" : "next"](a);
      } catch (e) {
        j(e);return;
      }r.done ? s(r.value) : Promise.resolve(r.value).then(c, d);
    }function d(e) {
      c(e, 1);
    }c();
  });
}

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var NativeDevice = function (_Device) {
  inherits(NativeDevice, _Device);

  function NativeDevice(args) {
    classCallCheck(this, NativeDevice);

    var _this = possibleConstructorReturn(this, (NativeDevice.__proto__ || Object.getPrototypeOf(NativeDevice)).call(this, args));

    _this._init();
    return _this;
  }

  createClass(NativeDevice, [{
    key: '_init',
    value: function _init() {return __async(function*(){
      var deviceId = yield yield AsyncStorage.getItem('airloy.device.id');
      if (deviceId) {
        this._identifier = deviceId;
      } else {
        this._identifier = Platform.OS + '^react-native^' + this.createGuid();
        AsyncStorage.setItem('airloy.device.id', this._identifier);
      }
    }.call(this))}
  }, {
    key: 'createGuid',
    value: function createGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
  }, {
    key: 'getIdentifier',
    value: function getIdentifier() {
      return this._identifier;
    }
  }]);
  return NativeDevice;
}(Device);

var NativeEvent = function (_Event) {
  inherits(NativeEvent, _Event);

  function NativeEvent() {
    classCallCheck(this, NativeEvent);
    return possibleConstructorReturn(this, (NativeEvent.__proto__ || Object.getPrototypeOf(NativeEvent)).apply(this, arguments));
  }

  createClass(NativeEvent, [{
    key: 'on',
    value: function on(event, handler) {
      DeviceEventEmitter.addListener(event, handler);
    }
  }, {
    key: 'once',
    value: function once(event, handler) {
      DeviceEventEmitter.once(event, handler);
    }
  }, {
    key: '_off',
    value: function _off(event) {
      DeviceEventEmitter.removeAllListeners(event);
    }
  }, {
    key: 'emit',
    value: function emit(event) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      DeviceEventEmitter.emit.apply(DeviceEventEmitter, [event].concat(data));
    }
  }]);
  return NativeEvent;
}(Event);

var NativeStore = function (_Store) {
  inherits(NativeStore, _Store);

  function NativeStore() {
    classCallCheck(this, NativeStore);
    return possibleConstructorReturn(this, (NativeStore.__proto__ || Object.getPrototypeOf(NativeStore)).apply(this, arguments));
  }

  createClass(NativeStore, [{
    key: 'getItem',
    value: function getItem(key) {return __async(function*(){
      var value = yield AsyncStorage.getItem(key);
      return value;
    }())}
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      AsyncStorage.setItem(key, value);
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      AsyncStorage.removeItem(key);
    }
  }]);
  return NativeStore;
}(Store);

var plugin = {
  install: function install(airloy$$1) {
    airloy$$1.store = new NativeStore();
    airloy$$1.device = new NativeDevice();
    airloy$$1.event = new NativeEvent();
  }
};

export default plugin;
