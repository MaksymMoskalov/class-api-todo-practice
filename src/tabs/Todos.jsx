import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  handleFormSubmit = data => {
    console.log(data);
    const newTodo = {
      id: nanoid(),
      text: data,
    };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleFormSubmit} />
        <Grid>
          {this.state.todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo
                text={todo.text}
                id={todo.id}
                index={index + 1}
                deleteTodo={this.deleteTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
