import React from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {
  state = {
    shelf: ''
  }

  componentDidMount() {
    this.setState({
      shelf: this.props.book.shelf
    })
  }

  addBook = () => {}

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
            <ShelfChanger
              shelf={this.props.book.shelf}
              addBook={this.addBook}
              changeShelf={this.changeShelf}
            />
          </div>
          <div className="book-title">{
            this.props.book.title
              ? this.props.book.title
              : 'No title'
          }</div>
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
