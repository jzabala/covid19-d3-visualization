const PROPERTIES = ['deaths', 'confirmed', 'recovered', 'active']

const COLOR_RANGE_PER_PROPERTY = {
  deaths: ['#ffb1b1', '#ff1414'],
  confirmed: ['#faf089', '#b7791f'],
  active: ['#fbd38d', '#c05621'],
  recovered: ['#9ae6b4', '#2f855a'],
}

function getColorByProperty(property) {
  return COLOR_RANGE_PER_PROPERTY[property][1]
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export {
  PROPERTIES,
  COLOR_RANGE_PER_PROPERTY,
  getColorByProperty,
  capitalizeFirstLetter,
}
