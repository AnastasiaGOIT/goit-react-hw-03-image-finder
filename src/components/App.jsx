import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Audio } from 'react-loader-spinner';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    value: '',
    image: '',
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value && !this.state.loading) {
      this.setState({ loading: true, image: null });
      fetch(
        `https://pixabay.com/api/?q=${this.state.value}&page=1&key=39787944-43ec837227cb503858330c56a&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(image => this.setState({ image }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleSearchFormSubmit = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {/* {this.state.error && } */}
        {this.state.loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        )}
        <ImageGallery value={this.state.value} image={this.state.image} />
        {this.state.image && <Button />}
        {/* if (this.state.image.hits.length === 12) */}
      </div>
    );
  }
}
