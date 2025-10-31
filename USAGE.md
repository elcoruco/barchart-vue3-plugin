# Vue 3 Bar Chart Plugin - Usage Guide

A simple and customizable bar chart component for Vue 3 applications, built with D3.js scales and SVG rendering. Supports both simple bar charts and grouped bar charts for comparing multiple data series.

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

The component supports two data formats:

### Simple Bar Chart

For a single data series, use objects with `key` and `value`:

```javascript
const data = [
  { key: 'Category A', value: 100 },
  { key: 'Category B', value: 150 },
  { key: 'Category C', value: 200 }
]
```

- `key`: String - The label for each bar (displayed on X-axis)
- `value`: Number - The numeric value for each bar (determines bar height)

### Grouped Bar Chart

For multiple data series (grouped bars), use objects with `key` and `values` (array):

```javascript
const data = [
  { key: 'Q1', values: [100, 150, 120] },
  { key: 'Q2', values: [180, 140, 160] },
  { key: 'Q3', values: [200, 190, 210] },
  { key: 'Q4', values: [220, 200, 230] }
]
```

- `key`: String - The label for each group (displayed on X-axis)
- `values`: Array of Numbers - The values for each series in the group

Each array in `values` should have the same length across all data points.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | Required | Array of objects with `key` and `value` (simple) or `key` and `values[]` (grouped) |
| `width` | Number | 400 | Chart width in pixels |
| `height` | Number | 400 | Chart height in pixels |
| `background` | String | "white" | Background color of the chart |
| `color` | String | "black" | Fill color for bars (used in simple charts) |
| `colors` | Array | Predefined palette | Array of colors for grouped charts |
| `margin` | Object | `{top: 10, right: 10, bottom: 50, left: 50}` | Chart margins |
| `barPadding` | Number | 0.1 | Padding between bar groups (0-1) |
| `groupPadding` | Number | 0.05 | Padding between bars within a group (0-1) |
| `xAxis` | Object | See below | X-axis configuration |
| `yAxis` | Object | See below | Y-axis configuration |
| `series` | Array | `[]` | Names for each data series (used in tooltips) |
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

### Default Color Palette

For grouped charts, if you don't provide a `colors` prop, the following palette is used:
```javascript
['#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c']
```

## Examples

### Basic Simple Chart
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

### Grouped Bar Chart (Multiple Series)
```vue
<template>
  <gf-barchart 
    :data="productSales"
    :width="800"
    :height="400"
    :colors="['#3498db', '#e74c3c', '#2ecc71']"
    :series="['Product A', 'Product B', 'Product C']"
    background="#f8f9fa"
    :margin="{ top: 20, right: 30, bottom: 60, left: 70 }"
    :bar-padding="0.3"
    :group-padding="0.05"
  />
</template>

<script setup>
const productSales = [
  { key: 'Jan', values: [3200, 2800, 1900] },
  { key: 'Feb', values: [3800, 3200, 2100] },
  { key: 'Mar', values: [2900, 3500, 2400] },
  { key: 'Apr', values: [4200, 2900, 2800] },
  { key: 'May', values: [3600, 3800, 2200] },
  { key: 'Jun', values: [4100, 3300, 2600] }
]
</script>
```

### Demographic Data (Real-world Example)
```vue
<template>
  <gf-barchart 
    :data="demographicsData"
    :width="900"
    :height="500"
    :colors="['#3498db', '#f39c12', '#95a5a6']"
    :series="['Male', 'Female', 'Other']"
    background="#ffffff"
    :margin="{ top: 20, right: 30, bottom: 60, left: 70 }"
    :tooltip-fn="demographicTooltip"
  />
</template>

<script setup>
const demographicsData = [
  { key: '0-10', values: [750, 600, 0] },
  { key: '11-20', values: [1950, 1750, 550] },
  { key: '21-30', values: [2900, 1250, 150] },
  { key: '31-40', values: [3400, 1750, 350] },
  { key: '41-50', values: [1350, 1350, 100] },
  { key: '51-60', values: [2350, 1450, 75] },
  { key: '61-70', values: [2500, 2300, 950] },
  { key: '71-80', values: [4000, 2900, 200] },
  { key: '81-90', values: [1350, 1350, 250] },
  { key: '91-100', values: [2350, 2350, 200] }
]

const demographicTooltip = (d) => {
  return `<strong>${d.key} years</strong><br/>${d.seriesName}: ${d.value.toLocaleString()}`
}
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

#### Simple Chart Tooltip
```vue
<template>
  <gf-barchart 
    :data="chartData"
    :tooltipFn="customTooltip"
  />
</template>

<script setup>
const customTooltip = (d) => {
  // For simple charts, d has: { key, value }
  return `<strong>${d.key}</strong><br>Sales: $${d.value.toLocaleString()}`
}
</script>
```

#### Grouped Chart Tooltip
```vue
<template>
  <gf-barchart 
    :data="groupedData"
    :series="['Product A', 'Product B', 'Product C']"
    :tooltipFn="groupedTooltip"
  />
</template>

<script setup>
const groupedTooltip = (d) => {
  // For grouped charts, d has: 
  // { key, value, seriesIndex, seriesName, allValues }
  return `
    <strong>${d.key}</strong><br/>
    ${d.seriesName}: ${d.value.toLocaleString()}<br/>
    <em>Series ${d.seriesIndex + 1} of ${d.allValues.length}</em>
  `
}
</script>
```

The tooltip function receives different data depending on chart type:
- **Simple charts**: `{ key: string, value: number }`
- **Grouped charts**: `{ key: string, value: number, seriesIndex: number, seriesName: string, allValues: number[] }`

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