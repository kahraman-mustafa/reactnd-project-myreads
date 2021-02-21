import React from 'react';
import LinkButton from "../LinkButton.js";
import PropTypes from 'prop-types';

function SearchBar(props) {

    const onChange = (e) => {
        props.onChangeQuery(e);
    }

    return (
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
                <input name="query" type="text" placeholder="Search by title or author" onChange={onChange} />

            </div>
        </div>
    );
}

SearchBar.propTypes = {
    onChangeQuery: PropTypes.func.isRequired
}

export default SearchBar;