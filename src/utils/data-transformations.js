import geoJson from '../assets/geojson-globe.json'

const groupCovid19DatePerCountry = data =>
  data.reduce((perCountry, d) => {
    if (d.iso2) {
      let cached = perCountry[d.iso2]
      if (cached) {
        cached.confirmed += d.confirmed
        cached.recovered += d.recovered
        cached.deaths += d.deaths
        cached.active += d.active
      } else {
        const { confirmed, recovered, deaths, active, iso2, lastUpdate } = d
        cached = {
          confirmed,
          recovered,
          deaths,
          active,
          iso2,
          lastUpdate,
        }
      }
      perCountry[d.iso2] = cached
    }
    return perCountry
  }, {})

const mixCovid19AndGeoData = covid19 => ({
  type: 'FeatureCollection',
  features: geoJson.features.map(
    ({ type, geometry, properties: { iso2, name } }) => ({
      type,
      geometry,
      properties: {
        iso2,
        name,
        ...covid19[iso2],
      },
    })
  ),
})

export { groupCovid19DatePerCountry, mixCovid19AndGeoData }
