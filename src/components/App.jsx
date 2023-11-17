import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Audio } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { api } from './services/api';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    value: '',
    image: [],
    loading: false,
    error: null,
    isShowModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ loading: true, image: [] });
      api(value, page)
        .then(data => {
          console.log(data);
          this.setState(prevState => ({
            image: [...prevState.image, ...data.hits],
          }));
          this.loadEnd();
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleSearchFormSubmit = value => {
    this.setState({ value });
  };
  openModal = image => {
    this.setState({ isShowModal: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ isShowModal: false, selectedImage: null });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  loadEnd = () => {
    this.setState(prev => ({
      image: [...prev.image, ...this.state.image],
      loading: this.state.page < Math.ceil(this.state.image.totalHits / 12),
    }));
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

        {this.state.loading && <Audio />}
        <ImageGallery
          openModal={this.openModal}
          value={this.state.value}
          image={this.state.image}
        />
        {this.state.image.length >= 12 && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {this.state.isShowModal && (
          <Modal onClose={this.closeModal} image={this.state.selectedImage} />
        )}
      </div>
    );
  }
}
