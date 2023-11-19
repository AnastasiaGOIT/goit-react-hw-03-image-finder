import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Audio } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { api } from '../services/api';
import { Modal } from './Modal/Modal';
import { Text } from './Text/Text';

export class App extends Component {
  state = {
    page: '',
    value: '',
    image: [],
    loading: false,
    error: null,
    isShowModal: false,
    selectedImage: null,
    isEmpty: false,
    isVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ loading: true });
      if (!value) return alert('Enter something!');
      api(value, page)
        .then(data => {
          console.log(data);
          if (data.hits.length === 0) {
            this.setState({ isEmpty: true });
          }
          this.setState(prevState => ({
            image: [...prevState.image, ...data.hits],
          }));

          this.loadEnd(data.totalHits);
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleSearchFormSubmit = value => {
    if (!value) {
      alert('Enter something!');
      return;
    }
    this.setState({ value, page: 40, image: [], isEmpty: false });
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

  loadEnd = totalHits => {
    const perPage = 12;
    this.setState(prev => ({
      isVisible: this.state.page < Math.ceil(totalHits / perPage),
    }));
    console.log(this.state.page);
  };
  render() {
    return (
      <div
        style={{
          // height: '100vh',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {this.state.isEmpty && <Text />}
        {/* {error && <h1>{ }</h1>} */}
        {this.state.loading && <Audio />}
        <ImageGallery
          openModal={this.openModal}
          value={this.state.value}
          image={this.state.image}
        />
        {this.state.isVisible && <Button onLoadMore={this.onLoadMore} />}

        {this.state.isShowModal && (
          <Modal onClose={this.closeModal} image={this.state.selectedImage} />
        )}
      </div>
    );
  }
}
