import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Footer from "../components/footer"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => (
  <Layout location={location}>
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-12 lg:px-16">
      <Helmet title={title} />
      <div>
        <h1 className="mt-0">Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${tag.fieldValue}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer />
  </Layout>
)
export default TagsPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
