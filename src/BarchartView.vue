<script setup>
/**
 * DEPENDENCIES
 * 
 */
import { ref, computed/*, onMounted, watch*/ } from "vue";
import { scaleBand, scaleLinear } from "d3-scale";
import { format } from "d3-format";

/**
 * HELPERS
 * 
 */
 const f = format(",");


/**
 * PROPERTIES
 * 
 */
const props = defineProps({ 
  width        : Number, 
  height       : Number, 
  background   : String,
  data         : Array,
  margin       : Object,
  color        : String,
  colors       : Array,
  barPadding   : Number,
  groupPadding : Number,
  xAxis        : Object,
  yAxis        : Object,
  tooltipFn    : Function,
  series       : Array
});

/**
 * CONFIG
 * 
 */

// DEFAULT VALUES
//
const defaultMargin       = ref({top : 10, right : 10, bottom : 50, left : 50});
const defaultHeight       = ref(400);
const defaultWidth        = ref(400);
const xLabel              = ref();
const yLabel              = ref();
const minWidth            = ref();
const defaultBarPadding   = ref(.1);
const defaultGroupPadding = ref(.05);
const defaultColor        = ref('black');
const defaultColors       = ref(['#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c']);
const defaultBackground   = ref("white");
const y0                  = ref(0);
const defaultXAxis        = ref({ show : true, textClass : '', showGrid : false, gridClass : ''})
const defaultYAxis        = ref({ show : true, textClass : '', showGrid : true, gridClass : ''})
const defaultSeries       = ref([]);

const showTooltip       = ref(false);
const defaultTooltipFn  = d => {
  const seriesName = d.seriesName ? `${d.seriesName}: ` : '';
  return `${d.key} - ${seriesName}${f(d.value)}`;
}
const tooltipHTML       = ref("");
const tooltipTop        = ref('0px');
const tooltipLeft       = ref('0px');
const tooltipBackground = ref("white");
const tooltipOffset     = ref(7);




// PROPERTIES
//
const width        = computed( () => props.width || defaultWidth.value)
const height       = computed( () => props.height || defaultHeight.value)
const background   = computed( () => props.background || defaultBackground.value)
const margin       = computed( () => props.margin || defaultMargin.value)
const color        = computed( () => props.color || defaultColor.value)
const colors       = computed( () => props.colors || defaultColors.value)
const barPadding   = computed( () => props.barPadding || defaultBarPadding.value)
const groupPadding = computed( () => props.groupPadding !== undefined ? props.groupPadding : defaultGroupPadding.value)
const xAxis        = computed( () => props.xAxis ? Object.assign({}, defaultXAxis.value, props.xAxis) : defaultXAxis.value )
const yAxis        = computed( () => props.yAxis ? Object.assign({}, defaultYAxis.value, props.yAxis) : defaultYAxis.value )
const tooltipFn    = computed( () => props.tooltipFn || defaultTooltipFn );
const series       = computed( () => props.series || defaultSeries.value);

// Check if data is grouped (array of arrays)
const isGrouped = computed(() => {
  return props.data && props.data.length > 0 && Array.isArray(props.data[0].values);
});

// Normalized data structure
const normalizedData = computed(() => {
  if (!props.data) return [];
  
  if (isGrouped.value) {
    // Data is already in grouped format: [{key: 'Jan', values: [100, 200, 300]}]
    return props.data;
  } else {
    // Convert simple format to grouped: [{key: 'Jan', value: 100}] -> [{key: 'Jan', values: [100]}]
    return props.data.map(d => ({
      key: d.key,
      values: [d.value]
    }));
  }
});

// Number of series (bars per group)
const seriesCount = computed(() => {
  if (normalizedData.value.length === 0) return 0;
  return normalizedData.value[0].values.length;
});

// SCALES
//
const xScale = computed( () => {
  return scaleBand()
    .domain(normalizedData.value.map(d => d.key))
    .range([margin.value.left, width.value - margin.value.right])
    .padding(barPadding.value)
})

// Scale for positioning bars within a group
const xScaleGroup = computed(() => {
  return scaleBand()
    .domain(Array.from({length: seriesCount.value}, (_, i) => i))
    .range([0, xScale.value.bandwidth()])
    .padding(groupPadding.value)
})

const yScale = computed(() => {
  // Find max value across all series
  let allValues = normalizedData.value.flatMap(d => d.values);
  let domain = [y0.value, Math.max(...allValues)];
  let range = [height.value - margin.value.bottom, margin.value.top];

  return scaleLinear()
    .domain(domain)
    .rangeRound(range);
});

/**
 * TOOLTIP HELPERS
 * 
 */
const tooltipEnter = (e, d, seriesIndex) => {
  showTooltip.value = true;
  
  // Create data object for tooltip function
  const tooltipData = {
    key: d.key,
    value: d.values[seriesIndex],
    seriesIndex: seriesIndex,
    seriesName: series.value[seriesIndex] || `Series ${seriesIndex + 1}`,
    allValues: d.values
  };
  
  tooltipHTML.value = tooltipFn.value(tooltipData);
  tooltipTop.value  = `${e.clientY + tooltipOffset.value}px`;
  tooltipLeft.value = `${e.clientX + tooltipOffset.value}px`;
}

const tooltipMove = e => {
  tooltipTop.value  = `${e.clientY + tooltipOffset.value}px`;
  tooltipLeft.value = `${e.clientX + tooltipOffset.value}px`;
}

const tooltipOut = () => {
  showTooltip.value = false;
}

// Get color for a specific series
const getSeriesColor = (seriesIndex) => {
  if (seriesCount.value === 1) {
    return color.value;
  }
  return colors.value[seriesIndex % colors.value.length];
}
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
            v-if="yAxis.showGrid"
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
            :class="yAxis.textClass"
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

      <!-- Bars (grouped) -->
      <g v-for="(d, i) of normalizedData" :key="`group-${i}`">
        <rect
          v-for="(value, seriesIndex) in d.values"
          :key="`bar-${i}-${seriesIndex}`"
          :width="xScaleGroup.bandwidth()"
          :height="height - yScale(value) - margin.bottom"
          :x="xScale(d.key) + xScaleGroup(seriesIndex)"
          :y="yScale(value)"
          class="gf_barchart_item"
          :fill="getSeriesColor(seriesIndex)"
          @mouseenter="e => tooltipEnter(e, d, seriesIndex)"
          @mousemove="tooltipMove"
          @mouseout="tooltipOut">
        </rect>
      </g>
      
      <!-- xScaleAxis -->
      <g :transform="`translate(0, ${height - margin.bottom})`">
        <!-- ticks -->
        <g v-for="(tick, i) of xScale.domain()"
          :transform="`translate(${xScale(tick) + xScale.bandwidth() / 2}, 0)`"
          :key="`x-tick-${i}`">
          <line v-if="xAxis.showGrid" x1="0" y1="0" x2="0" :y2="3" stroke="black" />
          <text
            x="0"
            y="5"
            text-anchor="middle"
            :class="xAxis.textClass"
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
    <div class="gf-tooltip" 
    :style="{
      top : tooltipTop, 
      left : tooltipLeft,
      display : 'block',
      position : 'fixed',
      background : tooltipBackground
    }"
    v-if="showTooltip"
    v-html="tooltipHTML"></div>
  </div>
</template>