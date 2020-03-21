import React, { useState, useRef, useLayoutEffect } from 'react'
import { select, geoMercator, geoPath, mouse } from 'd3'
import userResizeObserver from '../hooks/use-resize-observer'
import Tooltip from './tooltip'
import { visualizationProps, colorScaleGenerator } from '../utils/visualization'

function GeoChar({ data, property, colorRange }) {
  const containerRef = useRef()
  const svgRef = useRef()
  const dimensions = userResizeObserver(containerRef)
  const [hoveredCountry, setHoveredCountry] = useState(null)

  useLayoutEffect(() => {
    if (data) {
      const { width, height } =
        dimensions || svgRef.current.getBoundingClientRect()

      const [colorScale] = colorScaleGenerator({
        data: data.features,
        accessor: feature => feature.properties[property],
        range: colorRange,
      })

      // projects geo-coordinates on a 2D plane
      const projection = geoMercator().fitSize([width, height], data)

      // takes geojson data.
      // transforms it into the d attribute of a path element
      const pathGenerator = geoPath().projection(projection)

      // Create map
      select(svgRef.current)
        .selectAll('path')
        .data(data.features)
        .join('path')
        .attr(
          'class',
          'transition duration-500 ease-in-out hover:opacity-50 stroke-current text-white'
        )
        .attr('fill', feature => colorScale(feature.properties[property]))
        .attr('d', feature => pathGenerator(feature))
        .on('mouseover', feature => {
          const [x, y] = mouse(containerRef.current)
          setHoveredCountry({
            countryProperties: feature.properties,
            coordinates: { x, y },
          })
        })
        .on('mouseout', () => setHoveredCountry(null))
    }
  }, [data, property, dimensions, hoveredCountry, setHoveredCountry])

  return (
    <div ref={containerRef} className="flex flex-col flex-grow relative">
      <svg ref={svgRef} className="block flex-grow" />
      {hoveredCountry && (
        <Tooltip wrapperRef={containerRef} {...hoveredCountry} />
      )}
    </div>
  )
}

GeoChar.propTypes = visualizationProps

export default GeoChar
