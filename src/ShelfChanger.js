import React from 'react'

class ShelfChanger extends React.Component {
  state = {
    value: ''
  }

  componentDidMount() {
    if(!this.state.value) {
      this.setState({
        value: this.props.shelf
      })
    }
  }

  changeValue = (newValue) => {
    this.setState({
      value: newValue
    })
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          value={this.state.value}
          onChange={
            (event) => {
              this.changeValue(event.target.value)
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

export default ShelfChanger
