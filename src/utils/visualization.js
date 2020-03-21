import { extent, scaleLinear } from 'd3'
import PropTypes from 'prop-types'

const visualizationProps = {
  data: PropTypes.object,
  property: PropTypes.string,
  colorRange: PropTypes.arrayOf(PropTypes.string),
}

function colorScaleGenerator({ data, accessor, range, unknown = '#FFF' }) {
  const dataExtent = extent(data, accessor)
  return [
    scaleLinear()
      .domain(dataExtent)
      .range(range)
      .unknown(unknown),
    dataExtent,
  ]
}

export { visualizationProps, colorScaleGenerator }
