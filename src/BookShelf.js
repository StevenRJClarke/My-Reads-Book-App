import React from 'react'

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
    )
  }
}

export default BookShelf
