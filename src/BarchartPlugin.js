import Barchart from "./BarchartView.vue"
export default {
  install : (app, options) => {
    app.component("gf-barchart", Barchart);
  }
}