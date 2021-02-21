import React, { useState, useCallback } from 'react';
import LinkButton from './LinkButton.js';
import PropTypes from 'prop-types';
import Book from './Book.js';
import * as BooksAPI from './BooksAPI.js';
import { debounce } from "lodash";


function SearchPage2(props) {

    const [foundBooks, setFoundBooks] = useState([]);
    const [query, setQuery] = useState("");

    const onShelfUpdate = (book) => {
        props.onShelfUpdate(book);
    }

    const onChangeQuery = (event) => {
        delayedOnChangeQuery(event);
    }

    const delayedOnChangeQuery = useCallback(
        debounce(e => {
            console.log("event: ", e.target);
            delayedFunction(e.target.value);
        }, 1000),
        [], // will be created only once initially
    );

    const delayedFunction = (inputEntered) => {

        setFoundBooks([]);

        setQuery(inputEntered.trim());
        console.log("Query: ", query);

        if (query !== "") {
            BooksAPI.search(query).then((searchResults) => {
                if (typeof (searchResults) === "undefined") {
                    setFoundBooks([]);
                } else if (typeof (searchResults) === "object") {
                    if (searchResults.hasOwnProperty("error")) {
                        setFoundBooks([]);
                    } else {
                        console.log("results", searchResults)
                        setFoundBooks(searchResults)
                    }
                }
            })
        } else {
            setFoundBooks([]);
        }
    }

    return  <div className="search-books">
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
                        <input type="text" placeholder="Search by title or author" value={query} onChange={onChangeQuery} />

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
            </div>;
}

SearchPage2.propTypes = {
    onShelfUpdate: PropTypes.func.isRequired
}

export default SearchPage2;