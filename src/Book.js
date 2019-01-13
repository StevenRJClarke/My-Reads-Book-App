import React from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {
  state = {
    // Store shelf in state
    shelf: ''
  }

  componentDidMount() {
    this.setState({
      // Set shelf state from props
      shelf: this.props.book.shelf
    })
  }

  // Passes book and shelf to App.js so can be added to books state
  // if book does not exist there already
  addBook = (shelf) => {
    this.props.addBookToShelves(this.props.book, shelf)
  }

  // Sets shelf state, and passes book and shelf to App.js so shelf of book
  // object can be changed
  changeShelf = (shelf) => {
    this.setState((state) => ({
      shelf: shelf
    }))

    this.props.changeBookShelf(this.props.book, shelf)
  }


  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {/* Get image from book object property.
                If it is defined, use it.
                Else provide a placeholder.
              */}
            <img
              className="book-cover"
              style={{ width: 128, height: 193}}
              src={
                (this.props.book.imageLinks && this.props.book.imageLinks.thumbnail)
                ? this.props.book.imageLinks.thumbnail
                : 'http://via.placeholder.com/128x193?text=?'
              }
              alt={this.props.book.title}
            />
            {/* Form to select book shelf in <ShelfChanger/> component */}
            <ShelfChanger
              shelf={this.props.book.shelf}
              addBook={this.addBook}
              changeShelf={this.changeShelf}
            />
          </div>
          {/* Get title from book object property.
              If it is defined, use it.
              Else provide 'No title'.
            */}
          <div className="book-title">{
            this.props.book.title
              ? this.props.book.title
              : 'No title'
          }</div>
          {/* Get authors from book object property.
              If it is defined, combine authors in String.
              Else provide 'Author unknown'.
            */}
          <div className="book-authors">{
            this.props.book.authors
              ? this.props.book.authors.reduce((acc, curr) =>
                  (acc + ', ' + curr)
                )
              : ['Author unknown']
          }</div>
        </div>
      </li>
    )
  }
}

export default Book
