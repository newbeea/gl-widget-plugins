

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import includeText from 'rollup-plugin-include-text';
let isProd = process.env.NODE_ENV === 'production'

const basePlugins = [
  typescript({ module: 'ESNext' }),
  babel(),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  includeText({
    remove: /#pragma\s+.*\)/g,
    include: [
      '**/*.glsl'
    ],
    defaultFileExtension: '.glsl',
    allowedFileExtensions: ['.glsl']
  }),
  commonjs({ extensions: ['.js', '.ts'] }),
]
const devPlugins = []
const prodPlugins = [
  // terser()
]

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
      name: 'materials',
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