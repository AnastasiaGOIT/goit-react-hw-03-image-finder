import css from './ ImageGallery.module.css';
import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export class ImageGallery extends Component {
  state = {
    image: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      fetch(
        `https://pixabay.com/api/?q=cat&page=1&key=39787944-43ec837227cb503858330c56a&image_type=photo&orientation=horizontal&per_page=12&${this.props.value}`
      )
        .then(res => res.json())
        .then(image => this.setState({ image }));
    }
  }
  render() {
    return (
      <ul className={css.imageGallery}>
        {this.state.image &&
          this.state.image.hits &&
          this.state.image.hits.length > 0 &&
          this.state.image.hits.map(item => (
            <ImageGalleryItem key={item.id} image={item} />
          ))}
      </ul>
    );
  }
}
