import React from 'react';
import PropTypes from 'prop-types';
import FadeIn from 'react-fade-in';

const Todos = props => {
  const {
    selectedCategory,
    category,
    addToDo,
    todoInput,
    eventHandler,
    removeTodo,
    redoTodo,
    isDeletedList,
    toggleDeletedList,
  } = props;

  return (
    <div className='todoSection'>
      <div>
        <input
          type='text'
          onChange={eventHandler}
          name='todoInput'
          value={todoInput}
          placeholder={`Add a to-do in "${selectedCategory}"`}
          onKeyDown={function(event) {
            if (event.keyCode === 13) {
              addToDo();
            }
          }}
        />
        <button style={{ display: 'none' }} onClick={addToDo}>
          Add Todo
        </button>
      </div>
      <ul>
        {category[0].todos.map((todo, i) => {
          return (
            <FadeIn key={`todos-${i}`}>
              <div className='todoContainer'>
                <button onClick={removeTodo} data-todo={todo} id={i}></button>
                <p>{todo}</p>
              </div>
            </FadeIn>
          );
        })}
      </ul>
      <div className='deletedSection'>
        <h5 onClick={toggleDeletedList}>
          {category[0].deleted.length} COMPLETED TO-DOS
        </h5>
        {isDeletedList ? (
          <ul id={isDeletedList ? 'show' : ''}>
            {category[0].deleted.map((todo, i) => {
              return (
                <FadeIn key={`removed-${i}`}>
                  <div className='deletedContainer'>
                    <button onClick={redoTodo} data-todo={todo}></button>

                    <p className='deletedTodos'>{todo}</p>
                  </div>
                </FadeIn>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

//validating props
Todos.propTypes = {
  selectedCategory: PropTypes.string,
  category: PropTypes.array,
  addToDo: PropTypes.func,
  todoInput: PropTypes.string,
  eventHandler: PropTypes.func,
  removeTodo: PropTypes.func,
  isDeletedList: PropTypes.bool,
  toggleDeletedList: PropTypes.func,
};
export default Todos;
