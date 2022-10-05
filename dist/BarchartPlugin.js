import { ref, openBlock, createElementBlock, createElementVNode, renderSlot } from 'vue';
import { format } from 'd3-format';

const _hoisted_1 = /*#__PURE__*/createElementVNode("svg", null, null, -1 /* HOISTED */);

var script = {
  __name: 'BarchartView',
  setup(__props) {

ref();
ref();
ref();
ref();
ref();
ref();
ref();
ref();
ref();

format(",");

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("h1", null, [
      renderSlot(_ctx.$slots, "title")
    ]),
    _hoisted_1
  ]))
}
}

};

script.__file = "src/BarchartView.vue";

var BarchartPlugin = {
  install : (app, options) => {
    app.component("gf-barchart", script);
  }
};

export { BarchartPlugin as default };
