/**
 * AirloyReactNative v0.9.8
 * (c) 2016 Layman
 * @license MIT
 */
import { Device, Event, Store } from 'airloy';
import { AsyncStorage, Platform } from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

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

/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 2016/11/8.
 */

class NativeDevice extends Device {

  constructor(args) {
    super(args);
    this._init();
  }

  _init() {return __async(function*(){
    let deviceId = yield yield AsyncStorage.getItem('airloy.device.id');
    if (deviceId) {
      this._identifier = deviceId;
    } else {
      this._identifier = Platform.OS + '^react-native^' + this.createGuid();
      AsyncStorage.setItem('airloy.device.id', this._identifier);
    }
  }.call(this))}

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }

  getIdentifier() {
    return this._identifier;
  }
}

/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 2016/11/8.
 */

class NativeEvent extends Event {

  on(event, handler) {
    RCTDeviceEventEmitter.addListener(event, handler);
  }

  once(event, handler) {
    RCTDeviceEventEmitter.once(event, handler);
  }

  _off(event) {
    RCTDeviceEventEmitter.removeAllListeners(event);
  }

  emit(event, ...data) {
    RCTDeviceEventEmitter.emit(event, ...data);
  }
}

/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 2016/11/8.
 */

class NativeStore extends Store {

  getItem(key) {return __async(function*(){
    let value = yield AsyncStorage.getItem(key);
    return value;
  }())}

  setItem(key, value) {
    AsyncStorage.setItem(key, value);
  }

  removeItem(key) {
    AsyncStorage.removeItem(key);
  }
}

/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/19.
 */

let plugin = {
  install(airloy$$1) {
    airloy$$1.store = new NativeStore();
    airloy$$1.device = new NativeDevice();
    airloy$$1.event = new NativeEvent();
  }
};

export default plugin;
