import React from 'react'
import PropTypes from 'prop-types'
import Book from "../Book.js"

const Shelf = (props) => {

    const onShelfUpdate = (book) => {
        props.onShelfUpdate(book);
    }

    const {myBooks, shelf} = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        myBooks
                            .filter((book) => (book.shelf === shelf))
                            .map((book) => (<Book book={book} key={book.id} onShelfUpdate={onShelfUpdate}/>))
                    }
                </ol>
            </div>
        </div>
    )
  }

  Shelf.propTypes = {
    myBooks: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
  }

export default Shelf;