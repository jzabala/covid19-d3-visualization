import React from 'react'
import { ThemeProvider } from './src/components/theme-context'

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <ThemeProvider>{element}</ThemeProvider>
