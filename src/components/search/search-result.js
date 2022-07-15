import React, { createElement } from "react"
import { Link } from "gatsby"

export default function ResultItem({ hit, components }) {
  return (
    <div class="aa-ItemWrapper">
      <Link to={hit.page_path} className="aa-ItemLink">
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Snippet tagName="mark" hit={hit} attribute="title" />
          </div>
          <div className="aa-ItemContentDescription">
            <components.Snippet
              tagName="mark"
              hit={hit}
              attribute="raw-markdown-body"
            />
          </div>
        </div>
      </Link>
    </div>
  )
}
