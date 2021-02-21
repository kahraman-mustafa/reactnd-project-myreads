import React, { useState, useCallback, useReducer } from 'react';
import LinkButton from './LinkButton.js';
import PropTypes from 'prop-types';
import Book from './Book.js';
import * as BooksAPI from './BooksAPI.js';
import { debounce } from "lodash";


const initialState = {
    query: ""
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}

function SearchPage(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [foundBooks, setFoundBooks] = useState([]);

    // highlight-starts
    const delayedOnChangeQuery = useCallback(
        debounce(e => {
            dispatch({ field: e.target.name, value: e.target.value.trim() });
            console.log('Debounced Input:', e.target.value.trim());
            console.log('Query State:', state.query);
            /*
            clearResults();
            if (state.query !== "") {
                BooksAPI.search(state.query).then((searchResults) => {
                    if (typeof (searchResults) === "undefined") {
                        clearResults();
                    } else if (typeof (searchResults) === "object") {
                        if (searchResults.hasOwnProperty("error")) {
                            clearResults();
                        } else {
                            console.log("results", searchResults);
                            setFoundBooks(searchResults);
                        }
                    }
                })
            } else {
                clearResults();
            }*/
        }, 1000),
        [], // will be created only once initially
    );
    // highlight-ends

    const onShelfUpdate = (book) => {
        props.onShelfUpdate(book);
    }

    const clearResults = () => {
        setFoundBooks([]);
    }

    const onChangeQuery = (e) => {
        console.log('Input:', e.target.value);
        dispatch({ field: e.target.name, value: e.target.value });
        delayedOnChangeQuery(e)
    }

    const { query } = state

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <LinkButton to='/' className="close-search">Add a Book</LinkButton>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input name="query" type="text" placeholder="Search by title or author" value={query} onChange={onChangeQuery} />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        (foundBooks.length > 0 && query !== "")
                            ? (foundBooks.map((book) => (<Book book={book} onShelfUpdate={onShelfUpdate} key={book.id} />)))
                            : ("No results to show")
                    }
                </ol>
            </div>
        </div>
    );
}

SearchPage.propTypes = {
    onShelfUpdate: PropTypes.func.isRequired
}

export default SearchPage;