import React from "react"
import "./search-modal.scss"
import Search from "./search-simple"
import Icon from "./typesense.inline.svg";


const SearchModal = () => {

    return (
        <div class="search-area max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <Search />
            <p className ="text-sm">
            Search self-hosted and free using
            <Icon className="inline px-1 h-4 w-auto my-auto typesense-logo" />
            </p>
        </div>
    )
}

export default SearchModal 