import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };
  onChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            name="input"
            value={this.state.value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}
