/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/18.
 */

import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';

const version = process.env.VERSION || require('../package.json').version;

module.exports = {
  entry: 'src/index.js',
  dest: 'airloy-react-native.js',
  format: 'es',
  moduleName: 'AirloyReactNative',
  plugins: [babel(), async()],
  banner:
    `/**
 * AirloyReactNative v${version}
 * (c) ${new Date().getFullYear()} Layman
 * @license MIT
 */`
};
