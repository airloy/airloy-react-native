/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 2016/11/8.
 */

import {Device} from 'airloy/src';
import {Platform, AsyncStorage} from 'react-native';

export default class NativeDevice extends Device {

  constructor(args) {
    super(args);
    this._init();
  }

  async _init() {
    let deviceId = await await AsyncStorage.getItem('airloy.device.id');
    if (deviceId) {
      this._identifier = deviceId;
    } else {
      this._identifier = Platform.OS + '^react-native^' + this.createGuid();
      AsyncStorage.setItem('airloy.device.id', this._identifier);
    }
  }

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getIdentifier() {
    return this._identifier;
  }
}
