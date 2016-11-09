/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 2016/11/8.
 */

import {Event} from 'airloy/src';
import {DeviceEventEmitter} from 'react-native';

export default class NativeEvent extends Event{

  on(event, handler) {
    DeviceEventEmitter.addListener(event, handler);
  }

  once(event, handler) {
    DeviceEventEmitter.once(event, handler);
  }

  _off(event) {
    DeviceEventEmitter.removeAllListeners(event);
  }

  emit(event, ...data) {
    DeviceEventEmitter.emit(event, ...data);
  }
}
