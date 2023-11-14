import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li class="gallery-item" key={this.props.key}>
        <img src={this.props.item} alt={this.props.key} />
      </li>
    );
  }
}
