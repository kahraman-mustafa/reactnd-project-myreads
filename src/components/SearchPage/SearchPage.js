import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from "lodash";
import SearchBar from "./SearchBar.js"
import * as BooksAPI from "../../BooksAPI.js";
import SearchResults from './SearchResults.js';

function SearchPage(props) {

    //const [query, setQuery] = useState("");

    const [foundBooks, setFoundBooks] = useState([]);
    
    const onShelfUpdate = (book) => {
        props.onShelfUpdate(book);
    }

    // highlight-starts
    const delayedOnChangeQuery = useCallback(
        debounce(e => {
            const debouncedQuery = e.target.value.trim();
            console.log('Debounced Query:', debouncedQuery);

            if (debouncedQuery !== "") {
                BooksAPI.search(debouncedQuery).then((searchResults) => {
                    if (typeof (searchResults) === "undefined") {
                        // if searchResults object is undefined, show nothing
                        clearResults();
                    } else if (typeof (searchResults) === "object") {
                        if (searchResults.hasOwnProperty("error")) {
                            // if searchResults object has errors, show nothing
                            clearResults();
                        } else {
                            console.log('Results:', searchResults)
                            setFoundBooks(searchResults);
                        }
                    }
                })
            } else {
                // if search query is empty, show nothing
                clearResults();
            }
        }, 750),
        [], // will be created only once initially
    );
    // highlight-ends

    const clearResults = () => {
        setFoundBooks([]);
    }

    const onChangeQuery = (e) => {
        console.log('Query:', e.target.value);
        //setQuery(e.target.value);
        delayedOnChangeQuery(e);
    }

    return (
        <div className="search-books">
            <SearchBar onChangeQuery={onChangeQuery}/>
            <SearchResults foundBooks={foundBooks} onShelfUpdate={onShelfUpdate}/>
        </div>
    );
}

SearchPage.propTypes = {
    onShelfUpdate: PropTypes.func.isRequired
}

export default SearchPage;