<script setup>
import { ref, computed, onMounted/*, watch*/ } from "vue";
import { format } from "d3-format";
const margin     = ref();
const height     = ref();
const xLabel     = ref();
const yLabel     = ref();
const minWidth   = ref();
const barWidth   = ref();
const color      = ref();
const background = ref();
const ticks      = ref();

const f          = format(",");
</script>
<template>
  <div>
    <h1>
      <slot name="title" />
    </h1>
    <svg></svg>
  </div>
</template>