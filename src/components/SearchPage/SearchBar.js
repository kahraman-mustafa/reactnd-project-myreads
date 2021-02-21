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
                <input name="query" type="text" placeholder="Search by title or author" onChange={onChange} />

            </div>
        </div>
    );
}

SearchBar.propTypes = {
    onChangeQuery: PropTypes.func.isRequired
}

export default SearchBar;