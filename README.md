# Vue 3 Bar Chart Plugin

A simple and customizable bar chart component for Vue 3 applications, built with D3.js scales and SVG rendering.

## Features

- 🎨 **Customizable**: Configure colors, dimensions, margins, and styling
- 📊 **Interactive**: Built-in hover tooltips with custom formatting
- 🎯 **Lightweight**: Minimal dependencies (D3.js scales only)
- 🔧 **Flexible**: Extensive props for customization
- 📱 **Responsive**: SVG-based rendering that scales
- ⚡ **Vue 3 Ready**: Built with Composition API

## Quick Start

```bash
npm install @elcoruco/vue3-bars-chart-plugin
```

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

## Documentation

📖 **[Complete Usage Guide](./USAGE.md)** - Detailed documentation with examples and API reference

🚀 **[Publishing Guide](./PUBLISHING.md)** - Instructions for maintaining and updating the package

## Example

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

## Props Overview

| Prop | Type | Description |
|------|------|-------------|
| `data` | Array | Data array with `{key, value}` objects |
| `width` | Number | Chart width (default: 400) |
| `height` | Number | Chart height (default: 400) |
| `color` | String | Bar color (default: "black") |
| `background` | String | Chart background (default: "white") |
| `margin` | Object | Chart margins |
| `barPadding` | Number | Space between bars |
| `xAxis` | Object | X-axis configuration |
| `yAxis` | Object | Y-axis configuration |
| `tooltipFn` | Function | Custom tooltip formatter |

## Dependencies

- Vue 3.x
- d3-scale
- d3-format
