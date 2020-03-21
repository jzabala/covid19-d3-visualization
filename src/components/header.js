import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Helmet from 'react-helmet'

import useSiteMetadata from '../hooks/use-sitemetadata'

function Header() {
  const { title, description, twitterUrl, repository } = useSiteMetadata()

  return (
    <header className="flex justify-between mb-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center">
        <a className="mr-3" href={repository}>
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
        <a href={twitterUrl}>
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
      </div>
    </header>
  )
}

export default Header
