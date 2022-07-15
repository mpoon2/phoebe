import * as React from "react"
import { Link } from "gatsby"
import {
  InstantSearch,
  Highlight,
  Snippet,
  connectSearchBox,
} from "react-instantsearch-dom"
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"
import { Autocomplete } from "./search-autocomplete"
import qs from "qs"
import "@algolia/autocomplete-theme-classic/dist/theme.css"
import SearchResult from "./search-result"
import Typesense from "typesense"
import { SearchResponseAdapter } from "typesense-instantsearch-adapter/lib/SearchResponseAdapter"
import "@algolia/autocomplete-theme-classic"
import "./search-simple.scss"
import { navigate } from "gatsby"

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
      })
    }

    return searchStageClient.search(requests)
  },
}
/******************************************
 * END: Required for Typesense Connection *
 *****************************************/

/************************************
 * BEGIN: Required for Autocomplete *
 ***********************************/
const VirtualSearchBox = connectSearchBox(() => null)

function createURL(searchState) {
  return qs.stringify(searchState, { addQueryPrefix: true })
}

function searchStateToUrl({ location }, searchState) {
  if (Object.keys(searchState).length === 0) {
    return ""
  }

  return `${location.pathname}${createURL(searchState)}`
}

function urlToSearchState({ search }) {
  return qs.parse(search.slice(1))
}
/************************************
 * END: Required for Autocomplete *
 ***********************************/

const isBrowser = () => typeof window !== "undefined"

export default function SearchInterface() {
  const [searchState, setSearchState] = React.useState(
    () => isBrowser() && urlToSearchState(window.location)
  )
  const timerRef = React.useRef(null)

  React.useEffect(() => {
    clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      isBrowser() &&
        window.history.pushState(
          searchState,
          null,
          isBrowser() &&
            searchStateToUrl({ location: window.location }, searchState)
        )
    }, 400)
  }, [searchState])

  function Hit(props) {
    return (
      <div>
        <Link to={props.hit.page_path}>
          <div className="hit-title font-bold">
            <Highlight attribute="title" hit={props.hit} tagName="mark" />
          </div>
          <div className="hit-raw-markdown-body">
            <Snippet
              attribute="raw-markdown-body"
              hit={props.hit}
              tagName="mark"
            />
          </div>
        </Link>
      </div>
    )
  }
  const search_response_adapter = result =>
    new SearchResponseAdapter(
      result,
      { params: {} },
      { geoLocationField: "_geoloc" }
    )

  const typesense_client = () =>
    new Typesense.Client({
      apiKey: process.env.TYPESENSE_API_SEARCH, // Be sure to use the search-only-api-key
      nodes: [
        {
          host: "typesense.mattycakes.ca",
          port: "",
          protocol: "https",
        },
      ],
      connectionTimeoutSeconds: 2,
    })
  const client = typesense_client()

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="mattycakes"
      searchState={searchState}
      onSearchStateChange={setSearchState}
      createURL={createURL}
    >
      <VirtualSearchBox />

      <Autocomplete
        classNames={{
          detachedOverlay: "backdrop-blur-md",
          detachedSearchButtonIcon: "cursor-pointer",
          detachedSearchButton:
            "cursor-pointer px-2 py-2 rounded-md text-regular font-medium",
          detachedSearchButtonPlaceholder: "hidden",
        }}
        placeholder="test"
        detachedMediaQuery=""
        autoFocus
        navigator={{
          navigate({ itemUrl }) {
            navigate(itemUrl)
          },
        }}
        initialState={{
          query: searchState.query,
        }}
        getSources={({ query }) => [
          {
            sourceId: "r",
            getItemUrl({ item }) {
              return item.page_path
            },
            getItems: () =>
              client
                .collections("mattycakes")
                .documents()
                .search({
                  q: query,
                  query_by: "title, description, raw-markdown-body, tags",
                  highlight_start_tag: "__aa-highlight__", // <===== Customize highlight tags
                  highlight_end_tag: "__/aa-highlight__", // <===== Customize highlight tags
                  highlight_fields:
                    "title, description, raw-markdown-body, tags",
                  highlight_affix_num_tokens: 8,
                  highlight_full_fields: "title, description, tags",
                  exhaustive_search: true,
                })
                .then(result => {
                  return search_response_adapter(result).adapt().hits
                }),
            templates: {
              item: ({ item, components }) => {
                return <SearchResult hit={item} components={components} />
              },
            },
          },
        ]}
      />
    </InstantSearch>
  )
}
