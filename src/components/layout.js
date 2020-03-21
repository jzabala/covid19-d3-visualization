import PropTypes from 'prop-types'
import React from 'react'

import Header from './header'
import Footer from './footer'

function Layout({ children }) {
  return (
    <div className="flex flex-col max-w-screen-lg min-h-screen mx-4 lg:mx-auto">
      <Header />
      <main className="flex flex-col flex-1 w-full">{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
