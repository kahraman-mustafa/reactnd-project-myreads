import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from "react-router-dom"
import LinkButton from './LinkButton.js'
import MyLibrary from './MyLibrary.js'

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    myBooks: []
  }

  componentDidMount() {
    // When application first open, page refreshed; data of books saved to library on backend server is fetched
    console.log("componentDidMount is called")
    BooksAPI.getAll().then((books) => {
      this.setState(() => (
        {
          myBooks: books
        }
      ));
    });

    BooksAPI.search("Tolstoy", "10").then((booksTolstoy) => {
      console.log("Search Tolstoy:", booksTolstoy)
    })
  }

  /**
   * When a user changes shelf property of a book, this method gets called
   * @param {*} updatedBook 
   */
  onShelfUpdate = (updatedBook) => {
    const unchangedBooks = this.state.myBooks.filter((book) => (book.id !== updatedBook.id));
    this.setState(() => (
      {
        myBooks: unchangedBooks.concat(updatedBook)
      }
    ))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyLibrary 
            myBooks={this.state.myBooks} 
            onShelfUpdate={this.onShelfUpdate} />
        )} />

        <Route path="/search" render={() => (
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
              <input type="text" placeholder="Search by title or author" />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
