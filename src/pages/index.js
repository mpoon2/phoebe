import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import { useFlexSearch } from 'react-use-flexsearch'

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SearchBar from "../components/search"
import "./index.css"

const BlogIndex = ({ data, location }) => {

  const isBrowser = () => typeof window !== "undefined"

  const { search } = isBrowser() && window.location
  const query = new URLSearchParams(search).get('s')
  const [searchQuery, setSearchQuery] = useState(query || '')
  const siteTitle = data.site.siteMetadata?.title || `Title`
  
  const results = useFlexSearch(searchQuery, data.localSearchPages.index, data.localSearchPages.store);
  const finalResults = unFlattenResults(results)
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
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
      <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
      />
      <div>
      {finalResults.map(finalResults => {
      return (
          <h2>
            <Link to={finalResults.slug} itemProp="url">
              <span itemProp="headline">{finalResults.slug}</span>
            </Link>
          </h2>
      )})}
      </div>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export const unFlattenResults = results =>
    results.map(post => {
        const { date, slug, tags, title } = post;
        return { slug, frontmatter: { title, date, tags } };
    });

export default BlogIndex

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
