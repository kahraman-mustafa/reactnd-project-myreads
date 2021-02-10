import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from "react-router-dom"
import LinkButton from './LinkButton.js'
import MyLibrary from './MyLibrary.js'
import SearchPage from './SearchPage.js'

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
          <SearchPage onShelfUpdate={this.onShelfUpdate}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
