/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 2016/11/8.
 */

import {Event} from 'airloy/src';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

export default class NativeEvent extends Event{

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
