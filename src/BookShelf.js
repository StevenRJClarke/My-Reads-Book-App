import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{
          (this.props.shelf === 'currentlyReading')
          ? ('Currently Reading')
          : (this.props.shelf === 'wantToRead' )
            ? ('Want to Read')
            : ('Read')
        }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* If shelf is Currently Reading, render the book here
                using <Book/> component
              */}
            {
              this.props.books
              .filter( (book) => book.shelf === this.props.shelf )
              .map( (book) => (
                <Book
                  book={book}
                  key={book.id}
                  shelf={this.props.shelf}
                  addBookToShelves={this.props.addBookToShelves}
                  changeBookShelf={this.props.changeBookShelf}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  addBookToShelves: PropTypes.func.isRequired,
  changeBookShelf: PropTypes.func.isRequired
}

export default BookShelf
