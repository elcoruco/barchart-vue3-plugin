import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import summary from "rollup-plugin-summary";
// import css from 'rollup-plugin-css-only'

export default {
  input : './src/BarchartPlugin.js',
  output : {
    format : 'esm',
    file : 'dist/BarchartPlugin.js'
  },
  external : ["vue"],
  plugins: [ summary(), vue(), resolve(), terser() ]
}