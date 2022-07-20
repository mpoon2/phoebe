import * as React from "react"
import { InstantSearch, connectSearchBox } from "react-instantsearch-dom"
import { Autocomplete } from "./search-autocomplete"
import qs from "qs"
import SearchResult from "./search-result"
import Typesense from "typesense"
import { SearchResponseAdapter } from "typesense-instantsearch-adapter/lib/SearchResponseAdapter"
import "@algolia/autocomplete-theme-classic"
import "./search-simple.scss"
import { navigate } from "gatsby"

/** BEGIN: Required for Autocomplete
 */
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
/** END: Required for Autocomplete
 */

export default function SearchInterface() {
  /** BEGIN: Required for Autocomplete
   */
  const isBrowser = () => typeof window !== "undefined"
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
  const onSubmit = React.useCallback(({ state }) => {
    setSearchState(searchState => ({
      ...searchState,
      query: state.query,
    }))
  }, [])
  const onReset = React.useCallback(() => {
    setSearchState(searchState => ({
      ...searchState,
      query: "",
    }))
  }, [])
  const plugins = React.useMemo(() => {
    return [] // add more plugins here
  }, [])
  const search_response_adapter = result =>
    new SearchResponseAdapter(
      result,
      { params: {} },
      { geoLocationField: "_geoloc" }
    )
  const typesense_client = () =>
    new Typesense.Client({
      apiKey: process.env.TYPESENSE_API_SEARCH,
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
  /** END: Required for Autocomplete
   */

  return (
    <InstantSearch
      searchClient={client}
      indexName="mattycakes"
      searchState={searchState}
      onSearchStateChange={setSearchState}
      createURL={createURL}
    >
      <VirtualSearchBox />
      <Autocomplete
        classNames={{
          detachedCancelButton: "transition-all",
          form: "border-none",
          input: "autocomplete-input",
          detachedOverlay: "backdrop-blur-md",
          detachedSearchButtonIcon: "cursor-pointer",
          detachedSearchButton:
            "cursor-pointer px-2 py-2 rounded-md text-regular font-medium",
          detachedSearchButtonPlaceholder: "hidden",
        }}
        placeholder="Quick search..."
        detachedMediaQuery=""
        onSubmit={onSubmit}
        onReset={onReset}
        plugins={plugins}
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
                  query_by: "title, description, raw_markdown_body, tags",
                  group_by: "tags",
                  highlight_start_tag: "__aa-highlight__", // <===== Customize highlight tags
                  highlight_end_tag: "__/aa-highlight__", // <===== Customize highlight tags
                  highlight_fields:
                    "title, description, raw-markdown-body, tags",
                  highlight_affix_num_tokens: 8,
                  highlight_full_fields: "title, description, tags",
                  exhaustive_search: true,
                  typoTolerance: true,
                  ignorePlurals: true,
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
