import React, { Component } from 'react';

import Todos from './components/todos';
import NavBar from './components/navBar';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catInput: '',
      todoInput: '',
      selectedCategory: 'Inbox',
      isDeletedList: false,
      isNewList: false,
      categories: [{ name: 'Inbox', todos: [], deleted: [] }],
    };
    this.focusInput = React.createRef();
  }

  eventHandler = e => {
    let input = e.currentTarget.value;

    const initial = input.charAt(0).toUpperCase();
    const restLetters = input.slice(1, input.length);
    const correctedInput = initial + restLetters;

    this.setState({
      [e.currentTarget.name]: correctedInput,
    });
  };

  addCategory = () => {
    const { catInput, categories } = this.state;

    // the module we are pushing
    const newCategory = {
      name: catInput,
      todos: [],
      deleted: [],
    };

    //check if category exists
    let exists = categories.filter(val => val.name === catInput);

    //if there is text in the input and doesn't exits in the categories, create a new category following the module.
    if (catInput && exists.length === 0) {
      this.setState({
        categories: [...categories, newCategory],
        selectedCategory: catInput,
        catInput: '',
      });
    }
    this.toggleNewList();
  };

  addToDo = e => {
    const { categories, selectedCategory } = this.state;

    //if a value was pass like in the redo function apply this funtion as a redo fn
    const todo = e ? e : this.state.todoInput;

    if (todo) {
      //make a copy of the categories list and add the new todo to it
      let newCategoryList = categories.map(val => {
        let todos = val.todos;
        //check and add todo if it doesn't already exist
        let exists = todos.indexOf(todo) > -1;
        if (val.name === selectedCategory && !exists) {
          val.todos.push(todo);
          return val;
        } else return val;
      });

      //replace the old categories with the new one
      this.setState({
        categories: newCategoryList,
        todoInput: '',
      });
    }
  };

  redoTodo = e => {
    const { categories, selectedCategory } = this.state;
    const todo = e.currentTarget.getAttribute('data-todo');

    //trigger the addTodo func with a value
    this.addToDo(todo);

    let newDeleted = categories.map((val, i) => {
      if (val.name === selectedCategory) {
        //delete the clicked todo from the deleted list
        val.deleted = val.deleted.filter(val => val !== todo);
        return val;
      } else return val;
    });

    this.setState({
      ...this.state,
      categories: newDeleted,
    });
  };
  selectCategory = e => {
    let selectedCategory = e.currentTarget.id;
    this.setState({
      selectedCategory,
    });
  };

  removeTodo = e => {
    const { categories, selectedCategory } = this.state;

    //extract clicked todo from the categories
    const todo = e.currentTarget.getAttribute('data-todo');

    let newCategoryList = categories.map((val, i) => {
      if (val.name === selectedCategory) {
        //push the clicked todo to the deleted array before deleting
        val.deleted.push(todo);

        //delete the clicked todo from todos
        val.todos = val.todos.filter(val => val !== todo);

        return val;
      } else return val;
    });

    this.setState({
      ...this.state,
      categories: newCategoryList,
    });
  };

  toggleDeletedList = () => {
    const { isDeletedList } = this.state;
    this.setState({
      isDeletedList: !isDeletedList,
    });
    console.log('yes');
  };

  toggleNewList = () => {
    const { isNewList } = this.state;

    if (!isNewList) {
      setTimeout(() => {
        this.focusInput.current.focus();
      }, 500);
    }
    this.setState({
      isNewList: !isNewList,
      catInput: '',
    });
  };
  render() {
    const {
      todoInput,
      catInput,
      selectedCategory,
      isDeletedList,
      isNewList,
    } = this.state;
    return (
      <>
        <div className='all'>
          <NavBar
            selectFn={this.selectCategory}
            categories={this.state.categories}
            eventHandler={this.eventHandler}
            catInput={catInput}
            addCategory={this.addCategory}
            isNewList={isNewList}
            toggleNewList={this.toggleNewList}
            selectedCategory={selectedCategory}
            focusInput={this.focusInput}
          />

          <Todos
            //pass only the selected category
            category={this.state.categories.filter(
              val => val.name === selectedCategory,
            )}
            selectedCategory={selectedCategory}
            eventHandler={this.eventHandler}
            todoInput={todoInput}
            addToDo={this.addToDo}
            removeTodo={this.removeTodo}
            redoTodo={this.redoTodo}
            isDeletedList={isDeletedList}
            toggleDeletedList={this.toggleDeletedList}
          />
        </div>
      </>
    );
  }
}
