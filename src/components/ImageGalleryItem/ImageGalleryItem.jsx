import { Component } from 'react';
import css from './ ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {};
  render() {
    return (
      <li className={css.imageGalleryItem} key={this.props.image.key}>
        <img
          width={40}
          height={40}
          className={css.imageGalleryItemImage}
          src={this.props.image.item}
          alt=""
        />
      </li>
    );
  }
}
