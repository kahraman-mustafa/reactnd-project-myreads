import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Book from '../Book.js';

function SearchResults(props) {

    const {foundBooks} = props;

    const onShelfUpdate = (book) => {
        props.onShelfUpdate(book);
    }
    
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {
                    foundBooks.length > 0
                        ? (foundBooks.map((book) => (<Book book={book} onShelfUpdate={onShelfUpdate} key={book.id} />)))
                        : ("No results to show")
                }
            </ol>
        </div>
    );
}

SearchResults.propTypes = {
    foundBooks: PropTypes.array.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
}

export default SearchResults;