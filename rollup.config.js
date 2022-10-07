import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import summary from "rollup-plugin-summary";

export default {
  input : './src/BarchartPlugin.js',
  output : {
    format : 'esm',
    file : 'dist/BarchartPlugin.js'
  },
  plugins: [ summary(), vue(), resolve(), terser() ]
}