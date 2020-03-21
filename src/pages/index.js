import React, { useState, useEffect } from 'react'

import Layout from '../components/layout'
import GeoChart from '../components/geo-chart'
import ColorLegend from '../components/color-legend'
import Select from '../components/select'
import { useTheme } from '../components/theme-context'
import {
  groupCovid19DatePerCountry,
  mixCovid19AndGeoData,
} from '../utils/data-transformations'
import {
  COLOR_RANGE_PER_PROPERTY,
  PROPERTIES,
  getColorByProperty,
} from '../utils/common'

function IndexPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [property, setProperty] = useState(PROPERTIES[0])
  const [theme, setTheme] = useTheme()

  useEffect(() => {
    setLoading(true)
    fetch('https://covid19.mathdro.id/api/confirmed')
      .then(body => body.json())
      .then(groupCovid19DatePerCountry)
      .then(mixCovid19AndGeoData)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])
  const colorRange = COLOR_RANGE_PER_PROPERTY[property]
  const color = getColorByProperty(property)

  return (
    <Layout>
      {loading ? (
        <div style={{ color }} className="spinner my-auto" />
      ) : error ? (
        <p style={{ color }} className="text-xl font-bold my-auto text-center">
          Sorry, something went wrong. Try again later.
        </p>
      ) : (
        <>
          <div className="flex justify-between flex-col sm:flex-row mb-4 items-center">
            <Select
              classNames={{
                container: 'mb-4 sm:mb-0',
              }}
              value={property}
              onChange={e => {
                const property = e.target.value
                setProperty(property)
                setTheme({ color: getColorByProperty(property) })
              }}
              color={theme.color}
            >
              {PROPERTIES.map(p => (
                <option value={p} key={p}>
                  {p}
                </option>
              ))}
            </Select>
            <ColorLegend
              data={data}
              property={property}
              colorRange={colorRange}
            />
          </div>
          <GeoChart data={data} property={property} colorRange={colorRange} />
        </>
      )}
    </Layout>
  )
}

export default IndexPage
