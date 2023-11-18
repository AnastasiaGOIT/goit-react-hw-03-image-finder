import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  handleClick = e => {
    this.props.openModal(this.props.image);
  };
  render() {
    return (
      <li onClick={this.handleClick} className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItemImage}
          src={this.props.image.webformatURL}
          alt={this.props.image.tags}
        />
      </li>
    );
  }
}
