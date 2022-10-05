<script setup>
/**
 * DEPENDENCIES
 * 
 */
import { ref, computed, onMounted/*, watch*/ } from "vue";
import { scaleBand, scaleLinear } from "d3-scale";
import { format } from "d3-format";

/**
 * PROPERTIES
 * 
 */
const props      = defineProps({ 
  width      : Number, 
  height     : Number, 
  background : String,
  data       : Array
});

/**
 * CONFIG
 * 
 */
const defaultMargin = ref({top : 10, right : 10, bottom : 50, left : 50});
const defaultHeight = ref(400);
const defaultWidth  = ref(400);
const xLabel     = ref();
const yLabel     = ref();
const minWidth   = ref();
const barWidth   = ref(10);
const color      = ref();
const defaultBackground = ref("white");
const ticks      = ref();

const width      = computed( () => props.width || defaultWidth.value)
const height     = computed( () => props.height || defaultHeight.value)
const background = computed( () => props.background || defaultBackground.value)
const margin     = computed( () => props.margin || defaultMargin.value)

const xScale = computed( () => {
  return scaleBand()
    .domain(props.data.map(d => d.key))
    .range([margin.value.left, width.value - margin.value.right])
    .padding(.1)
})

/**
 * HELPERS
 * 
 */
const f          = format(",");

console.log("data: ", props.data, props.data.map(d => d.key));

</script>
<template>
  <div>
    <h1></h1>
    <svg
      ref="svg"
      xmlns="http://www.w3.org/2000/svg"
      :style="{ background: background }"
      version="1.2"
      baseProfile="tiny"
      width="100%"
      height="100%"
      :viewBox="`0 0 ${width} ${height}`"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="gf_barchart_svg">

      <rect
        v-for="(d, i) of data"
        :key="`bar-${i}`"
        :width="xScale.bandwidth()"
        :height="5"
        :x="xScale(d.key)"
        :y="20"
        class="gf-barchart-item"
        fill-opacity="1"
        :fill="'red'"
        :style="{ fill: 'red' }"></rect>
    </svg>
  </div>
</template>