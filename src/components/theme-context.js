import React, { useState, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import { getColorByProperty, PROPERTIES } from '../utils/common'

const ThemeContext = createContext()

function useTheme() {
  return useContext(ThemeContext)
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    color: getColorByProperty(PROPERTIES[0]),
  })
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useTheme, ThemeProvider }
