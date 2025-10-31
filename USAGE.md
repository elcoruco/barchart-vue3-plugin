# Vue 3 Bar Chart Plugin - Usage Guide

A simple and customizable bar chart component for Vue 3 applications, built with D3.js scales and SVG rendering.

## Installation

Install the plugin via npm:

```bash
npm install @elcoruco/vue3-bars-chart-plugin
```

## Basic Setup

### 1. Register the Plugin

In your Vue 3 application's main file (usually `main.js` or `main.ts`):

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import BarchartPlugin from '@elcoruco/vue3-bars-chart-plugin'

const app = createApp(App)
app.use(BarchartPlugin)
app.mount('#app')
```

### 2. Use the Component

After registering the plugin, you can use the `<gf-barchart>` component in any of your Vue components:

```vue
<template>
  <div>
    <gf-barchart :data="chartData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chartData = ref([
  { key: 'January', value: 100 },
  { key: 'February', value: 150 },
  { key: 'March', value: 200 },
  { key: 'April', value: 180 },
  { key: 'May', value: 250 }
])
</script>
```

## Data Format

The component expects data in the following format:

```javascript
const data = [
  { key: 'Category A', value: 100 },
  { key: 'Category B', value: 150 },
  { key: 'Category C', value: 200 }
]
```

- `key`: String - The label for each bar (displayed on X-axis)
- `value`: Number - The numeric value for each bar (determines bar height)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | Required | Array of objects with `key` and `value` properties |
| `width` | Number | 400 | Chart width in pixels |
| `height` | Number | 400 | Chart height in pixels |
| `background` | String | "white" | Background color of the chart |
| `color` | String | "black" | Fill color for the bars |
| `margin` | Object | `{top: 10, right: 10, bottom: 50, left: 50}` | Chart margins |
| `barPadding` | Number | 0.1 | Padding between bars (0-1) |
| `xAxis` | Object | See below | X-axis configuration |
| `yAxis` | Object | See below | Y-axis configuration |
| `tooltipFn` | Function | Default formatter | Custom tooltip content function |

### Axis Configuration

#### xAxis Object
```javascript
{
  show: true,        // Show/hide axis labels
  textClass: '',     // CSS class for axis text
  showGrid: false,   // Show/hide grid lines
  gridClass: ''      // CSS class for grid lines
}
```

#### yAxis Object
```javascript
{
  show: true,        // Show/hide axis labels
  textClass: '',     // CSS class for axis text
  showGrid: true,    // Show/hide grid lines
  gridClass: ''      // CSS class for grid lines
}
```

## Examples

### Basic Chart
```vue
<template>
  <gf-barchart 
    :data="salesData"
    :width="600"
    :height="400"
    color="#3498db"
    background="#f8f9fa"
  />
</template>

<script setup>
const salesData = [
  { key: 'Q1', value: 15000 },
  { key: 'Q2', value: 22000 },
  { key: 'Q3', value: 18000 },
  { key: 'Q4', value: 25000 }
]
</script>
```

### Customized Chart with Margins
```vue
<template>
  <gf-barchart 
    :data="chartData"
    :width="800"
    :height="500"
    :margin="{ top: 20, right: 30, bottom: 80, left: 70 }"
    color="#e74c3c"
    :barPadding="0.2"
  />
</template>
```

### Custom Tooltip
```vue
<template>
  <gf-barchart 
    :data="chartData"
    :tooltipFn="customTooltip"
  />
</template>

<script setup>
const customTooltip = (d) => {
  return `<strong>${d.key}</strong><br>Sales: $${d.value.toLocaleString()}`
}
</script>
```

### Styled Axes
```vue
<template>
  <gf-barchart 
    :data="chartData"
    :xAxis="xAxisConfig"
    :yAxis="yAxisConfig"
  />
</template>

<script setup>
const xAxisConfig = {
  show: true,
  textClass: 'x-axis-text',
  showGrid: true,
  gridClass: 'grid-line'
}

const yAxisConfig = {
  show: true,
  textClass: 'y-axis-text',
  showGrid: true,
  gridClass: 'grid-line'
}
</script>

<style>
.x-axis-text {
  font-size: 12px;
  font-weight: bold;
  fill: #2c3e50;
}

.y-axis-text {
  font-size: 11px;
  fill: #7f8c8d;
}

.grid-line {
  stroke: #ecf0f1;
  stroke-width: 1;
}
</style>
```

### Responsive Chart
```vue
<template>
  <div class="chart-container">
    <gf-barchart 
      :data="chartData"
      :width="containerWidth"
      :height="containerHeight"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerWidth = ref(400)
const containerHeight = ref(300)

const updateDimensions = () => {
  const container = document.querySelector('.chart-container')
  if (container) {
    containerWidth.value = container.clientWidth
    containerHeight.value = container.clientHeight
  }
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', updateDimensions)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>

<style>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
```

## Styling

The component generates the following CSS classes that you can style:

- `.gf_barchart_container` - Main container
- `.gf_barchart_svg` - SVG element
- `.gf_barchart_item` - Individual bars
- `.gf-tooltip` - Tooltip element

### Example Custom Styles
```css
.gf_barchart_container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}

.gf_barchart_item {
  transition: opacity 0.2s ease;
}

.gf_barchart_item:hover {
  opacity: 0.8;
}

.gf-tooltip {
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-size: 14px;
  pointer-events: none;
  z-index: 1000;
}
```

## Dependencies

This plugin uses the following D3.js modules:
- `d3-scale` - For creating scales
- `d3-format` - For number formatting

These are automatically included when you install the plugin.

## Browser Support

- Modern browsers that support ES6+ and SVG
- Vue 3.x

## Troubleshooting

### Common Issues

1. **Chart not displaying**: Ensure your data array is not empty and follows the correct format
2. **Bars too thin**: Increase the `width` prop or decrease `barPadding`
3. **Text overlapping**: Adjust the `margin` prop to provide more space for labels
4. **Tooltip not showing**: Verify that your `tooltipFn` returns valid HTML

### Performance Tips

- For large datasets (>100 bars), consider pagination or data aggregation
- Use consistent data updates to avoid unnecessary re-renders
- Set explicit width/height rather than relying on defaults for better performance