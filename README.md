# Vue 3 Bar Chart Plugin

A simple and customizable bar chart component for Vue 3 applications, built with D3.js scales and SVG rendering. Supports both simple and grouped bar charts.

## Features

- 🎨 **Customizable**: Configure colors, dimensions, margins, and styling
- 📊 **Interactive**: Built-in hover tooltips with custom formatting
- 📈 **Grouped Bars**: Support for multiple data series with grouped bars
- 🎯 **Lightweight**: Minimal dependencies (D3.js scales only)
- 🔧 **Flexible**: Extensive props for customization
- 📱 **Responsive**: SVG-based rendering that scales
- ⚡ **Vue 3 Ready**: Built with Composition API

## Quick Start

```bash
npm install @elcoruco/vue3-bars-chart-plugin
```

### Simple Bar Chart

```javascript
// main.js
import { createApp } from 'vue'
import BarchartPlugin from '@elcoruco/vue3-bars-chart-plugin'

const app = createApp(App)
app.use(BarchartPlugin)
app.mount('#app')
```

```vue
<!-- Your component -->
<template>
  <gf-barchart :data="chartData" />
</template>

<script setup>
const chartData = [
  { key: 'Jan', value: 100 },
  { key: 'Feb', value: 150 },
  { key: 'Mar', value: 200 }
]
</script>
```

### Grouped Bar Chart

```vue
<template>
  <gf-barchart 
    :data="groupedData" 
    :colors="['#3498db', '#e74c3c', '#2ecc71']"
    :series="['Product A', 'Product B', 'Product C']"
  />
</template>

<script setup>
const groupedData = [
  { key: 'Jan', values: [100, 150, 120] },
  { key: 'Feb', values: [180, 140, 160] },
  { key: 'Mar', values: [200, 190, 210] }
]
</script>
```

## Documentation

📖 **[Complete Usage Guide](./USAGE.md)** - Detailed documentation with examples and API reference

🚀 **[Publishing Guide](./PUBLISHING.md)** - Instructions for maintaining and updating the package

## Development & Testing

### Quick Test with HTML

A simple `test.html` file is included for quick testing during development:

```bash
# 1. Build the plugin
npx rollup -c

# 2. Start a local server
python3 -m http.server 8080

# 3. Open in browser
# http://localhost:8080/test.html
```

The test file uses Vue 3 from CDN and imports the built plugin directly - no complex setup needed!

### Development Workflow

1. Make changes to `src/BarchartView.vue` or `src/BarchartPlugin.js`
2. Rebuild: `npx rollup -c`
3. Refresh the browser to see your changes

The `test.html` file includes multiple chart examples demonstrating different configurations and features.

## Example

### Simple Bar Chart
```vue
<gf-barchart 
  :data="salesData"
  :width="600"
  :height="400"
  color="#3498db"
  background="#f8f9fa"
  :margin="{ top: 20, right: 30, bottom: 60, left: 70 }"
/>
```

### Grouped Bar Chart
```vue
<gf-barchart 
  :data="groupedSalesData"
  :width="800"
  :height="400"
  :colors="['#3498db', '#e74c3c', '#2ecc71']"
  :series="['Product A', 'Product B', 'Product C']"
  background="#f8f9fa"
  :margin="{ top: 20, right: 30, bottom: 60, left: 70 }"
  :bar-padding="0.3"
  :group-padding="0.05"
/>
```

## Props Overview

| Prop | Type | Description |
|------|------|-------------|
| `data` | Array | Data array with `{key, value}` or `{key, values[]}` objects |
| `width` | Number | Chart width (default: 400) |
| `height` | Number | Chart height (default: 400) |
| `color` | String | Bar color for simple charts (default: "black") |
| `colors` | Array | Array of colors for grouped charts (default: predefined palette) |
| `background` | String | Chart background (default: "white") |
| `margin` | Object | Chart margins |
| `barPadding` | Number | Space between groups |
| `groupPadding` | Number | Space between bars in a group |
| `xAxis` | Object | X-axis configuration |
| `yAxis` | Object | Y-axis configuration |
| `series` | Array | Names for each data series (for tooltips) |
| `tooltipFn` | Function | Custom tooltip formatter |

## Dependencies

- Vue 3.x
- d3-scale
- d3-format
