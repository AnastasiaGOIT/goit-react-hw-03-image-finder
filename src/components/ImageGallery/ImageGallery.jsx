import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.image_gallery}>
        {this.props.image.map(item => (
          <ImageGalleryItem key={item.id} image={item} />
        ))}
      </ul>
    );
  }
}
