import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import uglify from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.rollup,
      format: 'umd'
    },
    name: 'learn4js',
    plugins: [
      resolve(), // so Rollup can find `ms`
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      uglify()
    ]
  }
];