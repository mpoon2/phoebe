import React, { createElement } from "react"
import { Link } from "gatsby"

export default function ResultItem({ hit, components }) {
  return (
    <Link to={hit.page_path} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Snippet tagName="mark" hit={hit} attribute="title" />
        </div>
      </div>
    </Link>
  )
}
