import React, { useState, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  getColorByProperty,
  capitalizeFirstLetter,
  PROPERTIES,
} from '../utils/common'

function Tooltip({ countryProperties, coordinates, wrapperRef }) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState({ left: 0, top: 0 })
  useLayoutEffect(() => {
    const bodyWidth = wrapperRef.current.clientWidth
    const { width, height } = containerRef.current.getBoundingClientRect()
    const { x, y } = coordinates
    let left = x + X_OFFSET
    // Check if element fits at the right of the screen it not
    // move it to the left
    if (left + width > bodyWidth) {
      left = x - X_OFFSET - width
    }
    setPosition({
      top: y - height / 2,
      left,
    })
  }, [])
  return (
    <div
      ref={containerRef}
      className="absolute shadow border rounded py-2 px-3 bg-white"
      style={position}
    >
      <h1 className="font-bol mb-1 font-bold text-lg text-center">
        {countryProperties.name}
      </h1>
      <ul>
        {PROPERTIES.map(p => (
          <li key={p} style={{ color: getColorByProperty(p) }}>
            <span className="font-semibold">{capitalizeFirstLetter(p)}: </span>
            {countryProperties[p]}
          </li>
        ))}
      </ul>
    </div>
  )
}

const X_OFFSET = 30

Tooltip.propTypes = {
  countryProperties: PropTypes.shape({
    name: PropTypes.string.isRequired,
    deaths: PropTypes.number.isRequired,
    confirmed: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    recovered: PropTypes.number.isRequired,
  }),
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  wrapperRef: PropTypes.shape({
    current: PropTypes.instanceOf(PropTypes.object),
  }).isRequired,
}

export default Tooltip
