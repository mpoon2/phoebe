import { autocomplete } from "@algolia/autocomplete-js"
import Typesense from "typesense"
import { SearchResponseAdapter } from "typesense-instantsearch-adapter/lib/SearchResponseAdapter"
import "@algolia/autocomplete-theme-classic"

export default function init_search_field() {
  const client = typesense_client()
  // const adapter = typesense_adapter()
  autocomplete({
    debug: true,
    container: "#root",
    getSources: ({ query }) => [
      {
        sourceId: "r",
        templates: {
          item: ({ item, components }) => {
            return components.Snippet({ hit: item, attribute: "title" })
          },
        },
        getItems: () =>
          client
            .collections("r")
            .documents()
            .search({
              q: query,
              query_by: "title",
            })
            .then(result => {
              return search_response_adapter(result).adapt().hits
            }),
        getItemInputValue: ({ item }) => {
          return item.title
        },
      },
    ],
  })
}

const search_response_adapter = result =>
  new SearchResponseAdapter(
    result,
    { params: {} },
    { geoLocationField: "_geoloc" }
  )

const typesense_client = () =>
  new Typesense.Client({
    apiKey: "8hLCPSQTYcBuK29zY5q6Xhin7ONxHy99",
    nodes: [
      {
        host: "qtg5aekc2iosjh93p.a1.typesense.net",
        port: "443",
        protocol: "https",
      },
    ],
    connectionTimeoutSeconds: 2,
  })
