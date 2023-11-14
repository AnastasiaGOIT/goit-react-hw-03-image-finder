import { Component } from 'react';
import css from './ ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {};
  render() {
    return (
      <li className={css.imageGalleryItem} key={this.props.image.id}>
        <img
          className={css.imageGalleryItemImage}
          src={this.props.image.webformatURL}
          alt=""
        />
      </li>
    );
  }
}
