

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
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
        '@gl-widget/gl-widget': 'GlWidget'
      }
    }
  ],
  external: ['@gl-widget/gl-widget'],
  plugins: [
    typescript({ module: 'ESNext' }),
    babel(),
    resolve({
      jsnext: true,
      main: true,
      preferBuiltins: true
    }),
    builtins(),
    commonjs({ extensions: ['.js', '.ts'] }),
    terser()
    
  ],
  onwarn (warning) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
  }
}