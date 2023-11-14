import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Audio } from 'react-loader-spinner';

export class App extends Component {
  state = {
    value: '',
    image: '',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.state.value && !this.state.loading) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=cat&page=1&key=39787944-43ec837227cb503858330c56a&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(image => this.setState({ image }))
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleSearchFormSubmit = value => {
    this.setState({ value });
  };
  // handleImage = image => {
  //   this.setState({ image });
  // };
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
      </div>
    );
  }
}
