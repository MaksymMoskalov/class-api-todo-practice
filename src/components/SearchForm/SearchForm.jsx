import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    curentText: '',
  };

  onInputChange = event => {
    this.setState({ curentText: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.curentText);
    this.setState({ curentText: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onFormSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={this.state.curentText}
          onChange={this.onInputChange}
        />
      </SearchFormStyled>
    );
  }
}
