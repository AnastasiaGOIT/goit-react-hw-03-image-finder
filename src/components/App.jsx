import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Audio } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { api } from './services/api';

export class App extends Component {
  state = {
    page: 1,
    value: '',
    image: '',
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page, image } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ loading: true, image: [] });
      api(value, page)
        .then(data => {
          console.log(data);
          this.setState(prevState => ({
            image: [...prevState.image, ...data.hits],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleSearchFormSubmit = value => {
    this.setState({ value });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  // loadEnd = () => {
  //   this.steState(prev => ({
  //     image: [...prev.image, ...hits],
  //     loading: this.state.page < Math.ceil(totalHits / 12),
  //   }));
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
        {/* {this.state.error && } */}
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
        {this.state.image && <Button onLoadMore={this.onLoadMore} />}
        {/* if (this.state.image.hits.length === 12) */}
      </div>
    );
  }
}
