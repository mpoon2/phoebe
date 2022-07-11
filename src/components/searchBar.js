import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form
        action="/"
        method="get"
        autoComplete="off"
    >
        <label htmlFor="header-search" className="block text-sm font-medium text-gray-700">
            <span className="visually-hidden">
                Start typing to begin client side search...
            </span>
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
            <input
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Start typing to begin client side search..."
                name="s"
            />
        </div>
    </form>
)

export default SearchBar 
