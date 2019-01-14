import React from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends React.Component {
  state = {
    // Store value in state
    value: ''
  }

  // Change value state according to user input
  changeValue = (newValue) => {
    this.setState({
      value: newValue
    })
  }

  render() {
    return (
      <div className="book-shelf-changer">
        {/* Form value set by state.
            Changes to shelf will add book to App.js books state (if not there already)
            and will change shelf otherwise in both <Book/> and App.js books state and server
          */}
        <select
          value={this.state.value}
          onChange={
            (event) => {
              this.changeValue(event.target.value)
              this.props.addBook(event.target.value)
              this.props.changeShelf(event.target.value)
            }
          }
        >
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

ShelfChanger.propTypes = {
  shelf: PropTypes.string,
  addBook: PropTypes.func.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default ShelfChanger
