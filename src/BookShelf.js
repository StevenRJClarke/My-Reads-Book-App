import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
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
                  addBookToShelves={this.props.addBookToShelves}
                  changeBookShelf={this.changeBookShelf}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
