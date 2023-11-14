import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = {
    value: '',
    image: '',
  };
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
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery value={this.state.value} />
      </div>
    );
  }
}
