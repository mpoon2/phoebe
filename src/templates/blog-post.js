/**
 * Code adpated from https://codepen.io/Sphinxxxx/pen/WjwbEO
 */
import * as React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Footer from "../components/footer"
import SidebarTOC from "../components/sidebar/sidebar-outline"
import SidebarNav from "../components/sidebar/sidebar-navigation"
import Related from "../components/related"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faWandSparkles,
  faArrowRotateRight,
  faBarsProgress,
  faTags,
  faSquareXmark,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons"
import { useKeycloak } from "@react-keycloak/web"
import { animated } from "react-spring"
import {
  setVisibility,
  useAnimation,
} from "../components/sidebar/sidebar-animation"
import "./blog-post.scss"

const BlogPostTemplate = ({ data, location }) => {
  /* Sidebar toggle */
  const LOCAL_STORAGE_KEY = "isSidebarOpen"
  function useSidebar() {
    const persistedState =
      typeof window === "undefined"
        ? false
        : localStorage.getItem(LOCAL_STORAGE_KEY) === "true"
    const [isOpen, setIsOpen] = React.useState(false)
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
  const { isOpen, toggle } = useSidebar()
  const styles = setVisibility(isOpen)
  const animation = useAnimation(isOpen)

  const { keycloak, initialized } = useKeycloak()
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div class="article-body max-w-screen-2xl mx-auto px-4 sm:px-12 lg:px-16">
        <animated.div
          style={animation.sidebar}
          class={`left-sidebar pr-8 ${styles.sidebar}`}
          role="navigation"
        >
          <button
            className="block xl:hidden text-right w-full hero-highlight mb-4"
            onClick={toggle}
          >
            <FontAwesomeIcon icon={faSquareXmark} size="xl" />
          </button>
          <SidebarNav location={location} />
        </animated.div>
        <section>
          <article
            className="blog-post p-0 lg:pr-2 xl:pr-4 "
            itemScope
            itemType="http://schema.org/Article"
          >
            <div className="hero-highlight w-full text-right sticky -top-1 right-0 -mt-6">
              <button className="" onClick={toggle}>
                {isOpen ? (
                  <FontAwesomeIcon icon={faToggleOn} />
                ) : (
                  <FontAwesomeIcon icon={faToggleOff} />
                )}
              </button>
            </div>
            <header className="metadata">
              <nav className="flex breadcrumbs" aria-label="Breadcrumb">
                <ol className="inline-flex m-0 p-0">
                  <li class="inline-flex mr-1">
                    <a href="#" class="inline-flex items-center font-bold">
                      ?????? ?? Home
                    </a>
                  </li>
                  {post.fields.slug.split("/").map((breadcrumb, i, arr) => {
                    if (i === 0) {
                      // first one
                      return
                    } else if (arr.length - 1 === i) {
                      return
                    } else {
                      return (
                        <li>
                          <div class="flex items-center">
                            /
                            <a href="#" class="ml-1 mr-1 font-bold">
                              {breadcrumb}
                            </a>
                          </div>
                        </li>
                      )
                    }
                  })}
                </ol>
              </nav>
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
              <p className="meta">
                <span className="mr-4">
                  <FontAwesomeIcon icon={faTags} className="mr-1" size="xs" />
                  <span className="font-medium text-sm">{` `}</span>
                  {post.frontmatter.tags.map((tag, i, arr) => {
                    if (arr.length - 1 === i) {
                      // last one
                      return (
                        <Link to={`/tags/${tag}`}>
                          <span className="mr-1">{tag}</span>
                        </Link>
                      )
                    } else {
                      // not last one
                      return (
                        <Link to={`/tags/${tag}`}>
                          <span className="mr-1">{tag},</span>
                        </Link>
                      )
                    }
                  })}
                </span>
                <span
                  data-typesense-field="date-created"
                  className="metadata-date-created mr-4 text-sm"
                >
                  <FontAwesomeIcon
                    icon={faWandSparkles}
                    className="mr-1"
                    size="xs"
                  />
                  <span className="font-medium text-sm">{` `}</span>
                  {post.frontmatter.date}
                </span>
                <span
                  data-typesense-field="date-modified"
                  className="metadata-date-modified mr-4 text-sm"
                >
                  <FontAwesomeIcon
                    icon={faArrowRotateRight}
                    className="mr-1"
                    size="xs"
                  />
                  <span className="font-medium text-sm">{` `}</span>
                  {post.frontmatter.modified}
                </span>
                <span
                  data-typesense-field="status"
                  className="metadata-status text-sm"
                >
                  <FontAwesomeIcon
                    icon={faBarsProgress}
                    className="mr-1"
                    size="xs"
                  />
                  <span className="font-medium text-sm">{` `}</span>
                  {post.frontmatter.status}
                </span>
              </p>
            </header>
            {keycloak &&
              keycloak.hasResourceRole("viewers") &&
              (location.pathname.includes("/academic") ||
                location.pathname.includes("/journal")) && (
                <section
                  dangerouslySetInnerHTML={{ __html: post.html }}
                  itemProp="articleBody"
                  data-typesense-field="raw-markdown-body"
                />
              )}
            {keycloak &&
              !keycloak.hasResourceRole("viewers") &&
              (location.pathname.includes("/academic") ||
                location.pathname.includes("/journal")) && (
                <div>
                  Only accessible by mattycakes.{" "}
                  <a onClick={() => keycloak.login()}>Sign in</a>
                </div>
              )}
            {keycloak &&
              (location.pathname.includes("/personal") ||
                location.pathname.includes("/ramblings") ||
                location.pathname.includes("/CHANGELOG")) && (
                <section
                  dangerouslySetInnerHTML={{ __html: post.html }}
                  itemProp="articleBody"
                  data-typesense-field="raw-markdown-body"
                />
              )}
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
                        ??? {previous.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li>
                    {next && (
                      <Link to={next.fields.slug} rel="next">
                        {next.frontmatter.title} ???
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
          <Related
            tags={post.frontmatter.tags}
            limit={3}
            title={post.frontmatter.title}
          />
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
      fields {
        slug
      }
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
