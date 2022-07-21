import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

const RelatedArticles = ({ posts }) => {
  return (
    <div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <div>
              <Link to={node.fields.slug}>{title}</Link>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  node.frontmatter.description.slice(0, 50) + "..." ||
                  node.excerpt,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export const relatedArticlesQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 30)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`

export default props => {
  const related = []

  return (
    <StaticQuery
      query={relatedArticlesQuery}
      render={data => {
        const {
          allMarkdownRemark: { edges },
        } = data

        // iterate through article vertex
        for (const vertex of edges) {
          // handle base case
          if (related.length >= props.limit) {
            continue
          }

          // abstract tags
          const {
            frontmatter: { tags },
          } = vertex.node

          // handle case where there are no tags or prop tags
          if (!tags || !props.tags) {
            continue
          }

          const formattedTags = tags

          // ensure tags match and article is not the same as current
          if (
            props.tags.some(item => formattedTags.includes(item)) &&
            props.title !== vertex.node.frontmatter.title
          ) {
            related.push(vertex)
          }
        }

        // render posts
        return (
          <>
            <p className="header-div">Related Articles</p>
            <RelatedArticles posts={related} />
          </>
        )
      }}
    />
  )
}
