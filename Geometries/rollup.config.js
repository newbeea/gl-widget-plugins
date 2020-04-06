

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

let isProd = process.env.NODE_ENV === 'production'

const basePlugins = [
  typescript({ module: 'ESNext' }),
  babel(),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs({ extensions: ['.js', '.ts'] }),
]
const devPlugins = []
const prodPlugins = [terser()]

let plugins = [...basePlugins].concat(isProd ? prodPlugins : devPlugins)


export default {
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }, {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    }, {
      file: 'dist/index.umd.js',
      name: 'orbit-controls',
      format: 'umd',
      sourcemap: true,
      globals: {
        '@gl-widget/gl-widget': 'GLWidget'
      }
    }
  ],
  external: ['@gl-widget/gl-widget'],
  plugins: plugins
}