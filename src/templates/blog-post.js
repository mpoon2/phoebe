/**
 * Code adpated from https://codepen.io/Sphinxxxx/pen/WjwbEO
 */
import * as React from "react"
import { Link, graphql } from "gatsby"
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Footer from "../components/footer"
import SidebarTOC from "../components/sidebar/sidebar-outline"
import SidebarNav from "../components/sidebar/sidebar-navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faWandSparkles,
  faArrowRotateRight,
  faBarsProgress,
} from "@fortawesome/free-solid-svg-icons"
import "./blog-post.scss"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div class="article-body">
        <nav class={`left-sidebar hidden xl:block pr-4`} role="navigation">
          <SidebarNav location={location} />
        </nav>
        <section>
          <article
            className="blog-post p-0 xl:pl-4 lg:pr-2 xl:pr-4 "
            itemScope
            itemType="http://schema.org/Article"
          >
            <header className="metadata">
              <h1
                data-typesense-field="title"
                itemProp="headline"
                className="metadata-title"
              >
                {post.frontmatter.title}
              </h1>
              <p
                data-typesense-field="description"
                className="metadata-description"
              >
                {post.frontmatter.description}
              </p>
              <p>
                {post.frontmatter.tags.map(tag => {
                  return (
                    <span
                      data-typesense-field="tags"
                      className="metadata-tag rounded mr-4 mb-4 mt-4 px-4 py-2 font-medium text-sm"
                    >
                      {tag}
                    </span>
                  )
                })}
              </p>
              <p>
                <span
                  data-typesense-field="date-created"
                  className="metadata-date-created mr-4"
                >
                  <FontAwesomeIcon
                    icon={faWandSparkles}
                    className="mr-1"
                    size="xs"
                  />
                  Created {post.frontmatter.date}
                </span>
                <span
                  data-typesense-field="date-modified"
                  className="metadata-date-modified mr-4"
                >
                  <FontAwesomeIcon
                    icon={faArrowRotateRight}
                    className="mr-1"
                    size="xs"
                  />
                  Updated {post.frontmatter.modified}
                </span>
                <span data-typesense-field="status" className="metadata-status">
                  <FontAwesomeIcon
                    icon={faBarsProgress}
                    className="mr-1"
                    size="xs"
                  />
                  {post.frontmatter.status}
                </span>
              </p>
            </header>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
              data-typesense-field="raw-markdown-body"
            />
            <hr />
            <footer>
              <Bio />
              <nav className="blog-post-nav">
                <ul
                  style={{
                    display: `flex`,
                    flexWrap: `wrap`,
                    justifyContent: `space-between`,
                    listStyle: `none`,
                    padding: 0,
                  }}
                >
                  <li>
                    {previous && (
                      <Link to={previous.fields.slug} rel="prev">
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li>
                    {next && (
                      <Link to={next.fields.slug} rel="next">
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </footer>
            <Footer />
          </article>
        </section>
        <nav class="right-sidebar hidden lg:block pl-4" role="navigation">
          <SidebarTOC headings={post.headings} />
        </nav>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      headings {
        value
        depth
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        modified(formatString: "MMMM DD, YYYY")
        description
        tags
        status
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
