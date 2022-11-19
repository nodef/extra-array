const resolve  = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const cleanup  = require('rollup-plugin-cleanup');
const dts      = require('rollup-plugin-dts').default;


module.exports = [{
  input: '.build/index.d.ts',
  output: {
    file:    'index.d.ts',
    format:  'es',
    exports: 'auto'
  },
  plugins: [dts()],
}, {
  input: '.build/index.js',
  output: {
    file:    'index.js',
    format:  'cjs',
    exports: 'auto'
  },
  plugins: [resolve(), commonjs(), cleanup({comments: 'none'})],
}, {
  input: '.build/index.js',
  output: {
    file:    'index.mjs',
    format:  'es',
    exports: 'auto'
  },
  plugins: [resolve(), commonjs(), cleanup({comments: 'none'})],
}];
