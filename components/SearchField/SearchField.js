import React from 'react';
import './SearchField.scss';

class SearchField extends React.Component{
  constructor(){
    super();
    this.state = {
      city: ''
    }
  }
  
  onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`?city=${this.state.city}`, '_self');
  }

  render(){
    return(
      <form onSubmit={this.onSubmit} className="search-field">
        <input 
          value={this.state.city}
          onChange={ e => this.setState({city: e.target.value})}
        />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchField;