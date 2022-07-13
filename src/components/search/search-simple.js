import * as React from "react"
import { Link } from "gatsby"
import { 
  InstantSearch, 
  Hits, 
  Stats, 
  Configure,
  Highlight,
  Snippet
} from "react-instantsearch-dom"
import SearchBox from "./search-box"
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"

/******************************************** 
 * BEGIN: Required for Typesense Connection *
 *******************************************/
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.TYPESENSE_API_SEARCH, // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "typesense.mattycakes.ca",
        port: "",
        protocol: "https",
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: "title, description, raw-markdown-body, tags",
    exhaustive_search: true,
    highlight_fields: "title, description, raw-markdown-body, tags",
    highlight_affix_num_tokens: 8,
    highlight_full_fields: "title, description, tags",
  },
})
const searchStageClient = typesenseInstantsearchAdapter.searchClient
const searchClient = {
  ...searchStageClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return searchStageClient.search(requests);
  },
};
/******************************************
 * END: Required for Typesense Connection *
 *****************************************/

export default function SearchInterface() {
  
  function Hit(props) {
    return (
      <div>
        <Link to={props.hit.page_path}>
          <div className="hit-title font-bold">
            <Highlight attribute="title" hit={props.hit} tagName="mark"/>
          </div>
          <div className="hit-raw-markdown-body">
            <Snippet attribute="raw-markdown-body" hit={props.hit} tagName="mark"/>
          </div>
        </Link>
      </div>
    );
  }

  return (
      <InstantSearch searchClient={searchClient} indexName="mattycakes">
        <Configure hitsPerPage={10} />
        <SearchBox className="search-box flex" autoFocus />
        <Hits hitComponent={Hit} />
        <Stats className="text-sm" />
      </InstantSearch>
  )
}