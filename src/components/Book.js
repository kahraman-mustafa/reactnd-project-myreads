import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from "../BooksAPI.js"

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
        // if no image provided, default book icon is displayed in the thumbnail
        const thumbnailUrl = this.props.book.hasOwnProperty("imageLinks") ? this.props.book.imageLinks.thumbnail : "https://www.flaticon.com/svg/vstatic/svg/531/531530.svg?token=exp=1613902376~hmac=ca437a804067a6138fdebd7fb1b55b1f";

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
                    <div className="book-authors">{authors ? ((authors.length > 1) ? authors.join(" & ") : authors[0]) : <span>--No Auther Info--</span>}</div>
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