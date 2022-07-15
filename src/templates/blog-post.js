import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SidebarTOC from "../components/sidebar/sidebar-outline"
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import { animated } from "react-spring"
import { useAnimation } from "../components/sidebar/useAnimation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons"
import "../components/sidebar/sidebar.scss"

const LOCAL_STORAGE_KEY = "isSidebarOpen"

function useSidebar() {
  const persistedState =
    typeof window === "undefined"
      ? false
      : localStorage.getItem(LOCAL_STORAGE_KEY) === "true"

  const [isOpen, setIsOpen] = React.useState(true)
  const toggle = () => setIsOpen(value => !value)

  // Persist to localStorage
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isOpen))
  }, [isOpen])

  // Rehydrate with persisted data
  React.useEffect(() => {
    setIsOpen(persistedState)
  }, [])

  return { isOpen, toggle }
}

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const { isOpen, toggle } = useSidebar()
  const styles = useAnimation(isOpen)

  if (
    location.pathname.includes("/academic/") ||
    location.pathname.includes("/journal/")
  ) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="block">
          <div className="sidebar-div ">
            <animated.div className="sidebar" style={styles.sidebar}>
              <div className="sidebar-top flex flex-row">
                <animated.p
                  className="sidebar-title w-full hideElement"
                  style={styles.hideElement}
                >
                  Sidebar
                </animated.p>
                <button className="sidebar-toggle" onClick={toggle}>
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <FontAwesomeIcon icon={faChevronLeft} size="s" />
                  ) : (
                    <FontAwesomeIcon icon={faChevronRight} size="s" />
                  )}
                </button>
              </div>
            </animated.div>
            <animated.div className="main" style={styles.main}>
              <article
                className="blog-post max-w-screen-sm md:max-w-screen-lg"
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
                  {post.frontmatter.tags.map(tag => {
                    return (
                      <span
                        data-typesense-field="tags"
                        className="metadata-tag"
                      >
                        {tag}
                      </span>
                    )
                  })}
                  <p
                    data-typesense-field="date-created"
                    className="metadata-date-created"
                  >
                    {post.frontmatter.date}
                  </p>
                  <p
                    data-typesense-field="date-modified"
                    className="metadata-date-modified"
                  >
                    {post.frontmatter.modified}
                  </p>
                  <p data-typesense-field="status" className="metadata-status">
                    {post.frontmatter.status}
                  </p>
                </header>
                <div className="hidden">
                  <section
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                    data-typesense-field="raw-markdown-body"
                  />
                </div>
                <SignedIn>
                  <section
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                  />
                </SignedIn>
                <SignedOut>
                  <p>Content is private and only viewable to mattycakes.</p>{" "}
                  <SignInButton />
                </SignedOut>
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
              </article>
            </animated.div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="flex flex-row">
        <div className="sidebar-div flex">
          <animated.div
            className="sidebar hidden md:block"
            style={styles.sidebar}
          >
            <div className="sidebar-top flex flex-row">
              <animated.p
                className="sidebar-title w-full hideElement"
                style={styles.hideElement}
              >
                Sidebar
              </animated.p>
              <button className="sidebar-toggle" onClick={toggle}>
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FontAwesomeIcon icon={faChevronLeft} size="s" />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} size="s" />
                )}
              </button>
            </div>
          </animated.div>
          <animated.div className="main" style={styles.main}>
            <article
              className="blog-post max-w-screen-sm md:max-w-screen-lg"
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
                {post.frontmatter.tags.map(tag => {
                  return (
                    <span data-typesense-field="tags" className="metadata-tag">
                      {tag}
                    </span>
                  )
                })}
                <p
                  data-typesense-field="date-created"
                  className="metadata-date-created"
                >
                  {post.frontmatter.date}
                </p>
                <p
                  data-typesense-field="date-modified"
                  className="metadata-date-modified"
                >
                  {post.frontmatter.modified}
                </p>
                <p data-typesense-field="status" className="metadata-status">
                  {post.frontmatter.status}
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
            </article>
          </animated.div>
          <animated.div className="right-sidebar max-w-[200px] hidden md:block h-screen">
            testing the length capabilities of this right sidebar
          </animated.div>
        </div>
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
