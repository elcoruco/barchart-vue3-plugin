import vue from 'rollup-plugin-vue'

export default {
  input : './src/BarchartPlugin.js',
  output : {
    format : 'esm',
    file : 'dist/BarchartPlugin.js'
  },
  plugins: [ vue() ]
}