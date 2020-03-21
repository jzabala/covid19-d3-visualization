import React from 'react'
import useSiteMetadata from '../hooks/use-sitemetadata'
import { useTheme } from '../components/theme-context'

function Footer() {
  const [theme] = useTheme()
  const { author, twitterUrl } = useSiteMetadata()
  return (
    <footer>
      <nav className="flex justify-evenly my-2">
        <p className="font-bold text-sm">
          Created by{` `}
          <a style={{ color: theme.color }} href={twitterUrl}>
            {author}
          </a>
        </p>
        <p className="font-bold text-sm">
          Data by{` `}
          <a
            style={{ color: theme.color }}
            href="https://github.com/mathdroid/covid-19-api"
          >
            mathdroid
          </a>
        </p>
      </nav>
      <p className="text-xs text-center">
        Disclaimer: I built this site to learn how to use{' '}
        <a href="https://d3js.org">D3.js</a> library. It is not meant to be
        taken as a reliable source of information about COVID-19. I have not
        verified nor I am associated in any way with the api project from where
        the information is coming from.
      </p>
    </footer>
  )
}

export default Footer
