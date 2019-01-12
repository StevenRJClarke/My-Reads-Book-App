import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (newQuery) => {
    this.setState({
      query: newQuery.trim()
    })
  }

  searchBooks = (query) => {
    if(query.trim()) {
      BooksAPI.search(query.trim()).then( (foundBooks) => {
          if(!foundBooks.hasOwnProperty('error'))
            this.setState({
              searchedBooks: foundBooks
            })
        }
      )
      .catch(
        console.log('Error in searching for books')
      )
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
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
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
