import SearchBar from "../components/searchBar"
import { useFlexSearch } from 'react-use-flexsearch'
import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import Highlighter from "react-highlight-words"
import "./searchModal.scss"


const SearchModal = ({ data, location }) => {
    const newSearchQuery = useStaticQuery(graphql`
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
    `)
    const isBrowser = () => typeof window !== "undefined"
    const { search } = isBrowser() && window.location
    const query = new URLSearchParams(search).get('s')
    const [searchQuery, setSearchQuery] = useState(query || '')
    const results = useFlexSearch(searchQuery, newSearchQuery.localSearchPages.index, newSearchQuery.localSearchPages.store);
    const unFlattenResults = results =>
    results.map(post => {
        const { date, slug, tags, title, body } = post;
        return { body, slug, frontmatter: { title, date, tags } };
    });
    const finalResults = unFlattenResults(results)

    return (
        <div class="search-area max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div>
                {finalResults.map(finalResults => {
                const testHighlight = searchQuery.split(' ')
                return (
                    <div>
                        <h2>
                            <Link to={finalResults.slug} itemProp="url">
                                <Highlighter
                                    className="matched-result"
                                    highlightClassName="matched-text"
                                    searchWords={testHighlight}
                                    autoEscape={true}
                                    textToHighlight={finalResults.frontmatter.title}
                                    unhighlightClassName="non-matched-text"
                                />
                                <p itemProp="headline">
                                <span>{finalResults.frontmatter.date}</span> <span>{finalResults.slug}</span> 
                                </p>
                            </Link>
                        </h2>
                        <Highlighter
                            className="matched-result"
                            highlightClassName="matched-text"
                            searchWords={testHighlight}
                            autoEscape={true}
                            textToHighlight={finalResults.body}
                            unhighlightClassName="non-matched-text"
                        />
                    </div>
                )})}
            </div>
        </div>
    )
}

export default SearchModal 