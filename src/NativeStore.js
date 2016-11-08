/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 2016/11/8.
 */

import {Store} from 'airloy/src';
import {AsyncStorage} from 'react-native';

export default class NativeStore extends Store {

  async getItem(key) {
    let value = await AsyncStorage.getItem(key);
    return value;
  }

  setItem(key, value) {
    AsyncStorage.setItem(key, value);
  }

  removeItem(key) {
    AsyncStorage.removeItem(key);
  }
}
