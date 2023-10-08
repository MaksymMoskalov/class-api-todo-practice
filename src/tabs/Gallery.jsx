import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    qwery: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
  };

  hendlSubmiForm = text => {
    this.setState({ qwery: text, page: 1, images: [], total: 0 });
    
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
      this.setState({ error: error.message })
      console.log('error: ', error);
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1}))
  }

  render() {
    const { images, total, error, qwery } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.hendlSubmiForm} />
        {error && (
          <Text textAlign="center">Sorry. There are some error {error} ... 😭</Text>
        )}
        {qwery === !'' && images.length === 0 && (
          <Text textAlign="center">
            Sorry. There are no images with request {qwery}... 😭
          </Text>
        )}
        <Grid>
          {images.map(({ id, avg_color, alt, src: { large } }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {images.length < total && (
          <Button onClick={this.onLoadMore}>Load More</Button>
        )}
      </>
    );
  }
}
