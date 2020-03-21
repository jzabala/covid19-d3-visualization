import React, { useRef, useLayoutEffect } from 'react'
import { select, scaleLinear, axisBottom } from 'd3'
import { visualizationProps, colorScaleGenerator } from '../utils/visualization'

function ColorLegend({ data, property, colorRange }) {
  const svgRef = useRef()

  useLayoutEffect(() => {
    if (data) {
      const [colorScale, dataExtent] = colorScaleGenerator({
        data: data.features,
        accessor: feature => feature.properties[property],
        range: colorRange,
      })
      // Create linear gradient for color legend
      const svg = select(svgRef.current)
      svg
        .select('#color-legend-gradient')
        .selectAll('stop')
        .data(
          colorScale.ticks().map((t, i, arr) => ({
            offset: `${(100 * i) / arr.length}%`,
            color: colorScale(t),
          }))
        )
        .join('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color)

      const legendAxisScale = scaleLinear()
        .domain(dataExtent)
        .range([0, COLOR_LEGEND_WIDTH])

      const legendAxis = svg.select('.color-legend-axis')
      legendAxis.attr('transform', `translate(0,${COLOR_LEGEND_HEIGHT})`).call(
        axisBottom(legendAxisScale)
          .ticks(COLOR_LEGEND_WIDTH / 50)
          .tickSize(-COLOR_LEGEND_HEIGHT)
      )
      legendAxis.selectAll('line').attr('class', 'stroke-current text-white')
      legendAxis.selectAll('path').attr('class', 'stroke-current text-white')
    }
  }, [data, property])

  return (
    <div className="flex justify-end">
      <svg
        style={{
          height: COLOR_LEGEND_HEIGHT + margin.vertical,
          width: COLOR_LEGEND_WIDTH + margin.horizontal,
        }}
        ref={svgRef}
      >
        <defs>
          <linearGradient id="color-legend-gradient"></linearGradient>
        </defs>
        <g transform={`translate(${margin.horizontal / 2},0)`}>
          <rect
            fill="url(#color-legend-gradient)"
            style={{ width: COLOR_LEGEND_WIDTH, height: COLOR_LEGEND_HEIGHT }}
          />
          <g className="color-legend-axis" />
        </g>
      </svg>
    </div>
  )
}

ColorLegend.propTypes = visualizationProps

const COLOR_LEGEND_WIDTH = 200
const COLOR_LEGEND_HEIGHT = 20
const margin = { vertical: 20, horizontal: 25 }

export default ColorLegend
