<script setup>
import { ref, computed, onMounted/*, watch*/ } from "vue";
import { format } from "d3-format";
const margin     = ref();
const defaultHeight = ref(400);
const defaultWidth  = ref(400);
const xLabel     = ref();
const yLabel     = ref();
const minWidth   = ref();
const barWidth   = ref();
const color      = ref();
const defaultBackground = ref("white");
const ticks      = ref();

const props      = defineProps({ width : Number, height : Number});
const width      = computed( () => props.width || defaultWidth.value)
const height     = computed( () => props.height || defaultHeight.value)
const background = computed( () => props.background || defaultBackground.value)

const f          = format(",");
</script>
<template>
  <div>
    <h1>
      <slot name="title" />
    </h1>
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
    </svg>
  </div>
</template>