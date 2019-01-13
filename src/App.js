import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
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

  addBook = () => {}

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
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              changeBookShelf={this.changeBookShelf}
            />
          )}
        />
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
                        {
                          this.state.books
                          .filter( (book) => book.shelf === 'currentlyReading' )
                          .map( (book) => (
                            <Book
                              book={book}
                              key={book.id}
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
                      {
                        this.state.books
                        .filter( (book) => book.shelf === 'wantToRead' )
                        .map( (book) => (
                          <Book
                            book={book}
                            key={book.id}
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
                      {
                        this.state.books
                        .filter( (book) => book.shelf === 'read' )
                        .map( (book) => (
                          <Book
                            book={book}
                            key={book.id}
                            changeBookShelf={this.changeBookShelf}
                          />
                        ))
                      }
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
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
