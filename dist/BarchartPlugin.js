import { ref, computed, openBlock, createElementBlock, normalizeStyle, unref, Fragment, renderList, createElementVNode } from 'vue';
import { scaleBand } from 'd3-scale';
import { format } from 'd3-format';

const _hoisted_1 = /*#__PURE__*/createElementVNode("h1", null, null, -1 /* HOISTED */);
const _hoisted_2 = ["viewBox"];
const _hoisted_3 = ["width", "x"];

/**
 * PROPERTIES
 * 
 */

var script = {
  __name: 'BarchartView',
  props: { 
  width      : Number, 
  height     : Number, 
  background : String,
  data       : Array
},
  setup(__props) {

const props = __props;

/**
 * DEPENDENCIES
 * 
 */


/**
 * CONFIG
 * 
 */
const defaultMargin = ref({top : 10, right : 10, bottom : 50, left : 50});
const defaultHeight = ref(400);
const defaultWidth  = ref(400);
ref();
ref();
ref();
ref(10);
ref();
const defaultBackground = ref("white");
ref();

const width      = computed( () => props.width || defaultWidth.value);
const height     = computed( () => props.height || defaultHeight.value);
const background = computed( () => props.background || defaultBackground.value);
const margin     = computed( () => props.margin || defaultMargin.value);

const xScale = computed( () => {
  return scaleBand()
    .domain(props.data.map(d => d.key))
    .range([margin.value.left, width.value - margin.value.right])
    .padding(.1)
});

/**
 * HELPERS
 * 
 */
format(",");

console.log("data: ", props.data, props.data.map(d => d.key));


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    (openBlock(), createElementBlock("svg", {
      ref: "svg",
      xmlns: "http://www.w3.org/2000/svg",
      style: normalizeStyle({ background: unref(background) }),
      version: "1.2",
      baseProfile: "tiny",
      width: "100%",
      height: "100%",
      viewBox: `0 0 ${unref(width)} ${unref(height)}`,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      class: "gf_barchart_svg"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data, (d, i) => {
        return (openBlock(), createElementBlock("rect", {
          key: `bar-${i}`,
          width: unref(xScale).bandwidth(),
          height: 5,
          x: unref(xScale)(d.key),
          y: 20,
          class: "gf-barchart-item",
          "fill-opacity": "1",
          fill: 'red',
          style: { fill: 'red' }
        }, null, 8 /* PROPS */, _hoisted_3))
      }), 128 /* KEYED_FRAGMENT */))
    ], 12 /* STYLE, PROPS */, _hoisted_2))
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
