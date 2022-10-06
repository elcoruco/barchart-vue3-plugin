import { ref, computed, openBlock, createElementBlock, normalizeStyle, unref, Fragment, renderList, createCommentVNode, createElementVNode } from 'vue';
import { scaleBand, scaleLinear } from 'd3-scale';
import { format } from 'd3-format';

const _hoisted_1 = { class: "gf_barchart_container" };
const _hoisted_2 = /*#__PURE__*/createElementVNode("h1", null, null, -1 /* HOISTED */);
const _hoisted_3 = ["viewBox"];
const _hoisted_4 = ["width", "height", "x", "y"];
const _hoisted_5 = ["transform"];
const _hoisted_6 = ["transform"];
const _hoisted_7 = /*#__PURE__*/createElementVNode("line", {
  x1: "0",
  y1: "0",
  x2: "0",
  y2: 3,
  stroke: "black"
}, null, -1 /* HOISTED */);
const _hoisted_8 = ["x1", "x2"];

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

// DEFAULT VALUES
//
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
const y0            = ref(0);

// PROPERTIES
//
const width      = computed( () => props.width || defaultWidth.value);
const height     = computed( () => props.height || defaultHeight.value);
const background = computed( () => props.background || defaultBackground.value);
const margin     = computed( () => props.margin || defaultMargin.value);


// SCALES
//
const xScale = computed( () => {
  return scaleBand()
    .domain(props.data.map(d => d.key))
    .range([margin.value.left, width.value - margin.value.right])
    .padding(.1)
});

const yScale = computed(() => {
  let curr = props.data.map(d => d.value);
  let domain = [y0.value, Math.max(...curr)];
  let range = [height.value - margin.value.bottom, margin.value.top];

  console.log("curr:", curr, domain, range);
  
  return scaleLinear()
    .domain(domain)
        .rangeRound(range);
});

/**
 * HELPERS
 * 
 */
format(",");

console.log("data: ", props.data, props.data.map(d => d.key));


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
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
          height: unref(height) - unref(yScale)(d.value) - unref(margin).bottom,
          x: unref(xScale)(d.key),
          y: unref(yScale)(d.value),
          class: "gf_barchart_item",
          "fill-opacity": "1",
          fill: 'red',
          style: { fill: 'red' }
        }, null, 8 /* PROPS */, _hoisted_4))
      }), 128 /* KEYED_FRAGMENT */)),
      createCommentVNode(" xScaleAxis "),
      createElementVNode("g", {
        transform: `translate(0, ${unref(height) - unref(margin).bottom})`
      }, [
        createCommentVNode(" ticks "),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(xScale).domain(), (tick, i) => {
          return (openBlock(), createElementBlock("g", {
            transform: `translate(${unref(xScale)(tick) + unref(xScale).bandwidth() / 2}, 0)`,
            key: `x-tick-${i}`
          }, [
            _hoisted_7,
            createCommentVNode(" <text\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\"\n            alignment-baseline=\"hanging\"\n            :font-size=\"ticks.fontSize\">\n            {{ short(tick) }}\n          </text> ")
          ], 8 /* PROPS */, _hoisted_6))
        }), 128 /* KEYED_FRAGMENT */)),
        createCommentVNode(" Axis "),
        createElementVNode("line", {
          x1: unref(margin).left,
          y1: "0",
          x2: unref(width) - unref(margin).right,
          y2: "0",
          stroke: "black"
        }, null, 8 /* PROPS */, _hoisted_8)
      ], 8 /* PROPS */, _hoisted_5)
    ], 12 /* STYLE, PROPS */, _hoisted_3))
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
