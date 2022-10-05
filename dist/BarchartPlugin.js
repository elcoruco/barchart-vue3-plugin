import { openBlock, createElementBlock, createElementVNode, renderSlot } from 'vue';

const _hoisted_1 = /*#__PURE__*/createElementVNode("svg", null, null, -1 /* HOISTED */);

function render(_ctx, _cache) {
  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("h1", null, [
      renderSlot(_ctx.$slots, "title")
    ]),
    _hoisted_1
  ]))
}

const script = {};


script.render = render;
script.__file = "src/BarchartView.vue";

var BarchartPlugin = {
  install : (app, options) => {
    app.component("gf-barchart", script);
  }
};

export { BarchartPlugin as default };
