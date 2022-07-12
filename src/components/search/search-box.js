import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(
    ({ refine, currentRefinement, className, onFocus }) => (
        <form className={className} noValidate action="" role="search">
            <input
                className="SearchInput"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={e => refine(e.target.value)}
                value={currentRefinement}
                onFocus={onFocus}
            />
        </form>
    )
)