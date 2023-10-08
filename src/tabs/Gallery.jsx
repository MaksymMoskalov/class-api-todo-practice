import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    qwery: '',
    page: 1,
    images: [],
    total: 0,
  };

  hendlSubmiForm = text => {
    this.setState({ qwery: text });
  };

  componentDidUpdate(prevProps, prevState) {
    const { qwery, page } = this.state;
    if (prevState.qwery !== qwery || prevState.page !== page) {
      this.fetchImages(qwery, page);
    }
  }

  fetchImages = async (qwery, page) => {
    try {
      const { photos, total_results } = await ImageService.getImages(
        qwery,
        page
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        total: total_results,
      }));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  render() {
    console.log(this.state.qwery);
    return (
      <>
        <SearchForm onSubmit={this.hendlSubmiForm} />

        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
