import React from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {
  state = {
    shelf: ''
  }

  changeShelf(shelf) {
    this.setState({
      shelf: shelf
    })
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <img className="book-cover" style={{ width: 128, height: 193}} src={this.props.book.imageLinks.thumbnail} alt={this.props.book.title}/>
            <ShelfChanger
              changeShelf={this.changeShelf}
            />
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{
            this.props.book.authors.reduce((acc, curr) =>
              (acc + ', ' + curr)
            )
          }</div>
        </div>
      </li>
    )
  }
}

export default Book
