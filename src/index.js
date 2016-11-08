/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/19.
 */

import NativeDevice from './NativeDevice';
import NativeEvent from './NativeEvent';
import NativeStore from './NativeStore';

let plugin = {
  install(airloy) {
    airloy.store = new NativeStore();
    airloy.device = new NativeDevice();
    airloy.event = new NativeEvent();
  }
};

export default plugin;
