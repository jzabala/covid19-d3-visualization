module.exports = {
  siteMetadata: {
    title: 'COVID-19 World Visualization',
    description: 'A site showing the world map with COVID-19 related data',
    author: 'Johnny Zabala',
    twitterUrl: 'https://twitter.com/jzabalasanchez',
    repository: 'https://github.com/jzabala/covid19-d3-visualization',
  },
  plugins: [
    'gatsby-plugin-eslint',
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4dc0b5`,
        display: `minimal-ui`,
        icon: `src/assets/tailwind-icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./tailwind.config.js`),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === 'production'
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/style.css`],
      },
    },
    `gatsby-plugin-offline`,
  ],
}
