import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI.js'

class Book extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            shelf: props.book.shelf
        }
    }

    handleChange = (event) => {
        const newShelf = event.target.value;

        this.setState(() => (
            {
                shelf: newShelf
            }
        ));

        BooksAPI.update(this.props.book, newShelf).then((res) => {
            console.log("BooksAPI.update succesful", res)
            //replace book object's shelf property with new one to update myBooks state in App.js
            const book = this.props.book;
            book.shelf = newShelf;

            // After updating shelf property on the backend successfully, 
            // in order to prevent pulling all books from server whenever a book's shelf change,
            // local myBooks state variable in App.js is also updated
            this.props.onShelfUpdate(book);
        });
    };

    render() {
        const {title, authors} = this.props.book;
        const thumbnailUrl = this.props.book.imageLinks.thumbnail;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnailUrl})` }}></div>
                        <div className="book-shelf-changer">
                        <select value={this.state.shelf} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors.toString()}</div>
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
}

export default Book;