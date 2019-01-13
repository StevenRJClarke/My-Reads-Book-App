import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    // Store book objects in state
    books: []
  }

  componentDidMount() {
    // When component first mounted, set books from server and add
    // to books state
    BooksAPI.getAll().then(
      (fetchedBooks) => {
        this.setState({
          books: fetchedBooks
        })
      }
    )
    .catch(
      console.log('Error getting books')
    )
  }

  // Adds searched books to books state when shelf is selected
  addBookToShelves = (thisBook, shelf) => {
    //Add shelf property to book
    thisBook.shelf = shelf

    //Check to see if chosen book is already in books state
    let duplicate = 0

    this.state.books.forEach(
      function(book) {
        if(book.id === thisBook.id)
          duplicate++
      }
    )

    //If book is not in books state, push it to books statements
    if(!duplicate)
      this.state.books.push(thisBook)
  }

  // Changes book's shelf on server
  changeBookShelf = (thisBook, newShelf) => {
    this.setState((state) => ({
      books: state.books.map(
        function(book) {
          if(book.id === thisBook.id) {
            book.shelf = newShelf
            return book
          } else {
            return book
          }
        })
    }))

    BooksAPI.update(thisBook, newShelf)
  }

  render() {
    return (
      <div className="app">
        {/* If url is /search, render search page*/}
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              addBookToShelves={this.addBookToShelves}
              changeBookShelf={this.changeBookShelf}
            />
          )}
        />
        {/* If url is /, render book shelves page  */}
        <Route
          exact path='/'
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {/* If shelf is Currently Reading, render the book here */}
                        {
                          this.state.books
                          .filter( (book) => book.shelf === 'currentlyReading' )
                          .map( (book) => (
                            <Book
                              book={book}
                              key={book.id}
                              addBookToShelves={this.addBookToShelves}
                              changeBookShelf={this.changeBookShelf}
                            />
                          ))
                        }
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      {/* If shelf is Want to Read, render the book here */}
                      {
                        this.state.books
                        .filter( (book) => book.shelf === 'wantToRead' )
                        .map( (book) => (
                          <Book
                            book={book}
                            key={book.id}
                            addBookToShelves={this.addBookToShelves}
                            changeBookShelf={this.changeBookShelf}
                          />
                        ))
                      }
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      {/* If shelf is Read, render the book here */}
                      {
                        this.state.books
                        .filter( (book) => book.shelf === 'read' )
                        .map( (book) => (
                          <Book
                            book={book}
                            key={book.id}
                            addBookToShelves={this.addBookToShelves}
                            changeBookShelf={this.changeBookShelf}
                          />
                        ))
                      }
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* Link to search page, changing the url */}
              <Link
                to='/search'
                className="open-search"
              >
                Add a book
              </Link>
            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
