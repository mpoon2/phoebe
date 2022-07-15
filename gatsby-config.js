require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `mattycakes`,
    subtitle: `Self-hosted Digital Garden.`,
    author: {
      name: `mattycakes`,
      summary: `who lives and studies in Mississauga.`,
    },
    description: `The digital garden of mattycakes, created in Gatbsy and other technologies.`,
    siteUrl: `https://mattycakes.ca/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true, // boolean, defaults to true - if false API will return unformatted string from new Date()
        formatting: {
          format: "dddd D MMMM YYYY @ h:mm:ss A", // string, defaults to "MM/DD/YYYY" - pass in any acceptable date-and-time format
        },
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: "gatsby-plugin-clerk",
      options: {
        frontendApi: process.env.API_KEY,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Inter:300,400,500,600,700,800,900",
            "Fira Code:300,400,500,600,700",
          ],
        },
      },
    },
    "gatsby-plugin-use-dark-mode",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              isIconAfterHeader: true,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mattycake's Digital Garden`,
        short_name: `Mattycakes`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
        theme_color_in_head: false, // This will avoid adding theme-color meta tag, for dark/light mode.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-typesense`,
      options: {
        attributeForDistinct: "tags",
        distinct: true,
        group_by: "tags",
        rootDir: `${__dirname}/public`, // Required
        collectionSchema: {
          // Required
          name: "mattycakes",
          fields: [
            {
              name: "title",
              type: "string",
              facet: false,
              optional: false,
              index: true,
            },
            {
              name: "page_path",
              type: "string",
              facet: false,
              optional: false,
              index: true,
            },
            {
              name: "page_priority_score",
              type: "int32",
              facet: false,
              optional: false,
              index: true,
            },
            {
              name: "date-created",
              type: "string",
              facet: false,
              optional: true,
              index: true,
            },
            {
              name: "date-modified",
              type: "string",
              facet: false,
              optional: true,
              index: true,
            },
            {
              name: "description",
              type: "string",
              facet: false,
              optional: true,
              index: true,
            },
            {
              name: "tags",
              type: "string[]",
              facet: true,
              optional: true,
              index: true,
            },
            {
              name: "status",
              type: "string",
              facet: false,
              optional: true,
              index: true,
            },
            {
              name: "raw-markdown-body",
              type: "string",
              facet: false,
              optional: true,
              index: true,
            },
          ],
          default_sorting_field: "page_priority_score",
        },
        server: {
          // Required
          apiKey: process.env.TYPESENSE_API_ADMIN,
          nodes: [
            {
              host: "typesense.mattycakes.ca",
              port: "",
              protocol: "https",
            },
          ],
        },
      },
    },
  ],
}
