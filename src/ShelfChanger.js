import React from 'react'

class ShelfChanger extends React.Component {
  state = {
    value: ''
  }

  componentDidMount() {
    this.setState({
      value: this.props.shelf
    })
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          value={this.state.value}
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

export default ShelfChanger
