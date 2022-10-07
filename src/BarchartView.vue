<script setup>
/**
 * DEPENDENCIES
 * 
 */
import { ref, computed/*, onMounted, watch*/ } from "vue";
import { scaleBand, scaleLinear } from "d3-scale";
import { format } from "d3-format";

/**
 * PROPERTIES
 * 
 */
const props = defineProps({ 
  width      : Number, 
  height     : Number, 
  background : String,
  data       : Array,
  margin     : Object,
  color      : String,
  barPadding : Number
});

/**
 * CONFIG
 * 
 */

// DEFAULT VALUES
//
const defaultMargin = ref({top : 10, right : 10, bottom : 50, left : 50});
const defaultHeight = ref(400);
const defaultWidth  = ref(400);
const xLabel        = ref();
const yLabel        = ref();
const minWidth      = ref();
const defaultBarPadding = ref(.1);
const defaultColor      = ref('black');
const defaultBackground = ref("white");
const ticks         = ref();
const y0            = ref(0);

// PROPERTIES
//
const width      = computed( () => props.width || defaultWidth.value)
const height     = computed( () => props.height || defaultHeight.value)
const background = computed( () => props.background || defaultBackground.value)
const margin     = computed( () => props.margin || defaultMargin.value)
const color      = computed( () => props.color || defaultColor.value)
const barPadding = computed( () => props.barPadding || defaultBarPadding.value)


// SCALES
//
const xScale = computed( () => {
  return scaleBand()
    .domain(props.data.map(d => d.key))
    .range([margin.value.left, width.value - margin.value.right])
    .padding(barPadding.value)
})

const yScale = computed(() => {
  let curr = props.data.map(d => d.value);
  let domain = [y0.value, Math.max(...curr)];
  let range = [height.value - margin.value.bottom, margin.value.top];

  
  return scaleLinear()
    .domain(domain)
        .rangeRound(range);
});

/**
 * HELPERS
 * 
 */
const f          = format(",");

</script>
<template>
  <div class="gf_barchart_container">
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

      <!-- yScaleAxis -->
      <g :transform="`translate(${margin.left},0)`">
        <!-- ticks -->
        <g v-for="(tick, i) of yScale.ticks()"
          :transform="`translate(0, ${yScale(tick)})`"
          :key="`y-tick-${i}`">
          <line
            :x1="0"
            y1="0"
            :x2="width - margin.left - margin.right"
            y2="0"
            stroke="grey"
            :fill-opacity=".5" />
          <text
            y="0"
            x="-9"
            text-anchor="end"
            alignment-baseline="middle">
            {{ f(tick) }}
          </text>
        </g>

        <!-- Axis -->
        <!-- <line
          :x1="0"
          :y1="margin.top"
          :x2="0"
          :y2="height - margin.bottom"
          stroke="black" /> -->
      </g>

      <rect
        v-for="(d, i) of data"
        :key="`bar-${i}`"
        :width="xScale.bandwidth()"
        :height="height - yScale(d.value) - margin.bottom"
        :x="xScale(d.key)"
        :y="yScale(d.value)"
        class="gf_barchart_item"
        :fill="color"></rect>
      
      <!-- xScaleAxis -->
      <g :transform="`translate(0, ${height - margin.bottom})`">
        <!-- ticks -->
        <g v-for="(tick, i) of xScale.domain()"
          :transform="`translate(${xScale(tick) + xScale.bandwidth() / 2}, 0)`"
          :key="`x-tick-${i}`">
          <!-- <line x1="0" y1="0" x2="0" :y2="3" stroke="black" /> -->
          <text
            x="0"
            y="5"
            text-anchor="middle"
            alignment-baseline="hanging">
            {{ tick }}
          </text>
        </g>

        <!-- Axis -->
        <line
          :x1="margin.left"
          y1="0"
          :x2="width - margin.right"
          y2="0"
          stroke="black"
          stroke-width="2" />
      </g>
    </svg>
  </div>
</template>