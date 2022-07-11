import React, { useState } from "react"
import Highlighter from "react-highlight-words"
import "./searchModal.scss"
import Search from "./search-index"
const searchIndices = [{ name: `Pages`, title: `Pages` }]

const SearchModal = ({ data, location }) => {

    return (
        <div class="search-area max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <Search indices={searchIndices} />
        </div>
    )
}

export default SearchModal 