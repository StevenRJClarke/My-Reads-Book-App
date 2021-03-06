import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
    // States stored:
    // * query in search input
    // * books returned by search from Server
    // * error flag if no books found that match search
    query: '',
    searchedBooks: [],
    shelvesDefined: false,
    searchError: false
  }

  // Change query state when user changes search input
  updateQuery = (newQuery) => {
    this.setState({
      query: newQuery.trim()
    })
  }

  // Use search input to search for books on server and return the book objects
  searchBooks = (query) => {
    // Only if query is not an empty String or null or undefined
    // will the conditional be truthy
    if(query.trim()) {
      BooksAPI.search(query.trim()).then( (foundBooks) => {

          if(!foundBooks.hasOwnProperty('error')) {
            // If books found, store book objects in state
            this.setState({
              searchedBooks: foundBooks,
              searchError: false
            })

            // Books returned by search must have same shelf as those on main page
            foundBooks = this.matchShelf(foundBooks)
          }
          // If no books found, no books are stored or shown
          else {
            this.setState({
              searchedBooks: [],
              searchError: true
            })
          }
        }
      )
      .catch(
        console.log('Error in searching for books')
      )
    }
    // If search query is empty, no books are stored or shown
    else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  // Check if any of the books returned by the search are already on the book
  // shelves. Ensure they have same shelf
  matchShelf(foundBooks) {
    // Find id of books in App.js state
    let idOfStateBook, indexOfMatch

    idOfStateBook = this.props.books.map( (book) => book.id )

    // Loop through each book in search, see if id matched book in books state
    foundBooks.forEach( (book) => {
      if(idOfStateBook.includes(book.id)) {
        indexOfMatch = idOfStateBook.indexOf(book.id)
        // Set matched book's shelf to match
        book.shelf = this.props.books[indexOfMatch].shelf
      }
      // If book doesn't match, set shelf to 'none'
      else {
        book.shelf = 'none'
      }
    })

    this.setState({
      shelvesDefined: true
    })

    return foundBooks
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* Link to book shelf page, changing the url */}
          <Link
            to='/'
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            {/* Search form will update query state and search for books */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={
                (event) => {
                  this.updateQuery(event.target.value)
                  this.searchBooks(event.target.value)
                }
              }
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* Check if books are found by search
                * If no, display error message
                * If yes, display books
              */}
            {
              (
                this.state.searchError
              ) ? (
                <div className="search-books-error">
                  <h3>Cannot find any books that match this search</h3>

                  <p>Please try another search</p>
                </div>
              ) : (
                this.state.searchedBooks.map( (book) => (
                  <Book
                    book={book}
                    key={book.id}
                    shelf={book.shelf}
                    addBookToShelves={this.props.addBookToShelves}
                    changeBookShelf={this.props.changeBookShelf}
                  />
                ))
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  addBookToShelves: PropTypes.func.isRequired,
  changeBookShelf: PropTypes.func.isRequired
}

export default SearchBooks
