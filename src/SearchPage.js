import React, { useCallback, useState } from 'react';
import LinkButton from './LinkButton.js';
import PropTypes from 'prop-types';
import Book from './Book.js';
import * as BooksAPI from './BooksAPI.js';
import { debounce } from "lodash";


class SearchPage extends React.Component {

    state = {
        foundBooks: [],
        searchQuery: ""
    }

    clearResults = () => {
        this.setState({ foundBooks: [] })
    }

    onShelfUpdate = (book) => {
        this.props.onShelfUpdate(book);
    }

    onChangeSearchQuery = (event) => {
        this.delayedOnChangeQuery(event);
    }

    delayedOnChangeQuery = useCallback(
        debounce(e => {
            console.log("event: ", e.target);
            this.delayedFunction(e.target.value);
        }, 1000),
        [], // will be created only once initially
    );


    delayedFunction = (inputEntered) => {

        this.clearResults();
        this.setState({ searchQuery: inputEntered.trim() });
        console.log("input: ", inputEntered.trim())

        if (this.state.searchQuery !== "") {
            BooksAPI.search(this.state.searchQuery).then((searchResults) => {
                if (typeof (searchResults) === "undefined") {
                    this.clearResults();
                } else if (typeof (searchResults) === "object") {
                    if (searchResults.hasOwnProperty("error")) {
                        this.clearResults();
                    } else {
                        console.log("results", searchResults)
                        this.setState(() => (
                            {
                                foundBooks: searchResults
                            }
                        ));
                    }
                }
            })
        } else {
            this.clearResults()
        }

    }

    render() {

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
                        <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={this.onChangeSearchQuery} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            (this.state.foundBooks.length > 0 && this.state.searchQuery !== "")
                                ? (this.state.foundBooks.map((book) => (<Book book={book} onShelfUpdate={this.onShelfUpdate} key={book.id} />)))
                                : ("No results to show")
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {
    onShelfUpdate: PropTypes.func.isRequired
}

export default SearchPage;