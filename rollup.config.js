import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    dir: '.',
    format: 'es'
  },
  plugins: [resolve(), commonjs()]
};
