import React from 'react'
import LinkButton from './LinkButton.js'
import Shelf from "./Shelf.js"
import PropTypes from 'prop-types'

const MyLibrary = (props) => {

    const shelves = ["currentlyReading", "wantToRead", "read"]

    const onShelfUpdate = (book) => {
        props.onShelfUpdate(book);
    }

    const {myBooks} = props

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelves.map((shelf) => (
                        <Shelf key={shelf} myBooks={myBooks} shelf={shelf} onShelfUpdate={onShelfUpdate}/>
                    ))}
                </div>
            </div>
            <div className="open-search">
                <LinkButton to='/search'>Add a Book</LinkButton>
            </div>
        </div>
    )
  }

  MyLibrary.propTypes = {
    myBooks: PropTypes.array.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
  }

export default MyLibrary;