import { graphql, useStaticQuery } from 'gatsby'

function useSiteMetadata() {
  const { site } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          twitterUrl
          author
          repository
          description
        }
      }
    }
  `)
  return site.siteMetadata
}

export default useSiteMetadata
