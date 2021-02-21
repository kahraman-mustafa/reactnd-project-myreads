import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce, result } from "lodash";
import SearchBar from "./SearchBar.js"
import * as BooksAPI from "../../BooksAPI.js";
import SearchResults from './SearchResults.js';

function SearchPage(props) {

    const {myBooks} = props;

    const [foundBooks, setFoundBooks] = useState([]);
    
    const onShelfUpdate = (book) => {
        props.onShelfUpdate(book);
    }

    const delayedOnChangeQuery = useCallback(
        debounce((e, myBooks) => {
            const debouncedQuery = e.target.value.trim();

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
                            const shelvedSearchResults = [];
                            for(const result of searchResults){
                                result.shelf = "none";
                                for(const myBook of myBooks){
                                    if(result.id === myBook.id){
                                        result.shelf = myBook.shelf;
                                        break;
                                    }
                                }
                                shelvedSearchResults.push(result);
                            }
                            setFoundBooks(shelvedSearchResults);
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

    const clearResults = () => {
        setFoundBooks([]);
    }

    const onChangeQuery = (e) => {
        delayedOnChangeQuery(e, myBooks);
    }

    return (
        <div className="search-books">
            <SearchBar onChangeQuery={onChangeQuery}/>
            <SearchResults foundBooks={foundBooks} onShelfUpdate={onShelfUpdate}/>
        </div>
    );
}

SearchPage.propTypes = {
    myBooks: PropTypes.array.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
}

export default SearchPage;