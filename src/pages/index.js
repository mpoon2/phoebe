import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Footer from "../components/footer"
import Reveal from "../components/reveal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateRight, faTags } from "@fortawesome/free-solid-svg-icons"
import "./index.scss"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <div className="hero-bg">
        <div className="hero-parent max-w-screen-2xl m-auto lg:flex py-16">
          <div className="max-h-fit lg:flex-none lg:w-3/5 lg:pr-0 my-auto px-4 sm:px-12 lg:pr-16 order-2">
            <h1 className="mt-0 hero-header lg:text-left text-center">
              Oh,{" "}
              <Reveal className="hero-highlight" start="Hello" hover="你好" />{" "}
              there.
            </h1>{" "}
            <p className="hero-subtitle font-medium hero-text lg:text-left text-center">
              I'm mattycakes, a student at Athabasca University, mediocore
              photographer, and self-hosted enthusiast. You've stumbled upon a
              place where I collect little snippets of knowledge and practice a
              variety of things (including my mother's native tongue). This is
              my{` `}
              <Reveal
                className="hero-highlight"
                start="digital garden"
                hover="電子禪花園"
              />
              .
            </p>
          </div>
          <div className="max-h-fit lg:flex-auto px-4 sm:px-12 lg:pl-16 lg:pr-0 order-1">
            <div className="xl:text-7xl lg:py-12 text-6xl">
              <p className="chinese-text leading-tight m-auto">
                哦，<span className="hero-highlight">你好</span>
                <br />
                我的名字
                <br />
                是潘怡暉
                <br />
                欢迎来到我的
                <br />
                <span className="hero-highlight">電子禪花園</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-12 lg:px-16 lg:flex block">
        <div className="lg:w-3/5 lg:pr-8">
          <h2 className="writer-header header-div">
            長篇大論 · The Writer's Block
          </h2>
          <ol style={{ listStyle: `none` }}>
            {posts
              // filter the posts for slugs
              .filter(
                filterThis =>
                  filterThis.fields.slug.includes("/ramblings/") ||
                  filterThis.fields.slug.includes("/personal/")
              )
              // limit the return to
              .slice(0, 5)
              // iterate
              .map(post => {
                const title = post.frontmatter.title || post.fields.slug
                return (
                  <li key={post.fields.slug} className="mb-8">
                    <article
                      className="writer-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h2 className="feed-post-header text-lg font-semibold m-0">
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                      </header>
                      <section>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              post.frontmatter.description || post.excerpt,
                          }}
                          itemProp="description"
                          className="writer-post-description p-0 m-0"
                        />
                        <p className="writer-post-metadata p-0 text-sm pt-1">
                          <span className="mr-4">
                            <FontAwesomeIcon
                              icon={faArrowRotateRight}
                              className="mr-1"
                              size="s"
                            />
                            {post.frontmatter.date}
                          </span>
                          <span className="mr-4">
                            <FontAwesomeIcon
                              icon={faTags}
                              className="mr-1"
                              size="s"
                            />
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
                        </p>
                      </section>
                    </article>
                  </li>
                )
              })}
          </ol>
        </div>
        <div className="lg:w-2/5 lg:pl-8">
          <h2 className="writer-header header-div">
            學業曰記 · The Academic Journal
          </h2>
          <ol style={{ listStyle: `none` }}>
            {posts
              // filter the posts for slugs
              .filter(
                filterThis =>
                  filterThis.fields.slug.includes("/academic/") ||
                  filterThis.fields.slug.includes("/journal/")
              )
              // limit the return to
              .slice(0, 5)
              // iterate
              .map(post => {
                const title = post.frontmatter.title || post.fields.slug
                return (
                  <li key={post.fields.slug} className="mb-8">
                    <article
                      className="writer-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h2 className="feed-post-header text-lg font-semibold m-0">
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                      </header>
                      <section>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              post.frontmatter.description || post.excerpt,
                          }}
                          itemProp="description"
                          className="writer-post-description p-0 m-0"
                        />
                        <p className="writer-post-metadata p-0 text-sm pt-1">
                          <span className="mr-4">
                            <FontAwesomeIcon
                              icon={faArrowRotateRight}
                              className="mr-1"
                              size="s"
                            />
                            {post.frontmatter.date}
                          </span>
                          <span className="mr-4">
                            <FontAwesomeIcon
                              icon={faTags}
                              className="mr-1"
                              size="s"
                            />
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
                        </p>
                      </section>
                    </article>
                  </li>
                )
              })}
          </ol>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___modified], order: DESC }
      limit: 500
    ) {
      nodes {
        excerpt
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
`
