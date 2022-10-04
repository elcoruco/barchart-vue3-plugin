import vue from 'rollup-plugin-vue'

export default {
  input : './BarchartPlugin.js',
  output : {
    format : 'esm',
    file : 'dist/BarchartPlugin.js'
  },
  plugins: [ vue() ]
}