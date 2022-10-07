import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input : './src/BarchartPlugin.js',
  output : {
    format : 'esm',
    file : 'dist/BarchartPlugin.js'
  },
  plugins: [ vue(), resolve(), terser() ]
}