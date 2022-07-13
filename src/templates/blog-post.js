import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SidebarPost from "../components/sidebar/sidebar-post"

import { 
  SignedIn, 
  SignedOut, 
  SignInButton
} from "@clerk/clerk-react";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  if ((location.pathname.includes('/academic/')) || (location.pathname.includes('/journal/'))) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="flex">
          <SidebarPost />
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header className="metadata">
              <h1 data-typesense-field="title" itemProp="headline" className="metadata-title">{post.frontmatter.title}</h1>
              <p data-typesense-field="description" className="metadata-description">{post.frontmatter.description}</p>
              {post.frontmatter.tags.map(tag => {
                return (
                  <span data-typesense-field="tags" className="metadata-tag">
                    {tag}
                  </span>
                )
              })}
              <p data-typesense-field="date-created" className="metadata-date-created">{post.frontmatter.date}</p>
              <p data-typesense-field="date-modified" className="metadata-date-modified">{post.frontmatter.modified}</p>
              <p data-typesense-field="status" className="metadata-status">{post.frontmatter.status}</p>
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
                <p>Content is private and only viewable to mattycakes.</p> <SignInButton />
              </SignedOut>
            <hr />
            <footer>
              <Bio />
            </footer>
          </article>
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
      <div className="flex">
      <SidebarPost />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="metadata">
            <h1 data-typesense-field="title" itemProp="headline" className="metadata-title">{post.frontmatter.title}</h1>
            <p data-typesense-field="description" className="metadata-description">{post.frontmatter.description}</p>
            {post.frontmatter.tags.map(tag => {
              return (
                <span data-typesense-field="tags" className="metadata-tag">
                  {tag}
                </span>
              )
            })}
            <p data-typesense-field="date-created" className="metadata-date-created">{post.frontmatter.date}</p>
            <p data-typesense-field="date-modified" className="metadata-date-modified">{post.frontmatter.modified}</p>
            <p data-typesense-field="status" className="metadata-status">{post.frontmatter.status}</p>
          </header>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
              data-typesense-field="raw-markdown-body"
            />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
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
