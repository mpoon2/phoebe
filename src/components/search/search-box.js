import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import "./search-box.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

export default connectSearchBox(
    ({ refine, currentRefinement, className, onFocus }) => (
        
        <form className={className} noValidate action="" role="search">
            <FontAwesomeIcon className="my-auto" icon={faMagnifyingGlass} size="s" />
            <input
                className="search-input w-full border-none focus:border-none focus:ring-0 caret-black"
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