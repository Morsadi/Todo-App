import React from 'react';
import PropTypes from 'prop-types';
import CatPopUp from './catPopUp';
const menuIcon = require('./menuicon.svg');

const NavBar = props => {
  const { categories, selectFn, toggleNewList, selectedCategory } = props;

  return (
    <div className='navBarSection'>
      <ul>
        {/* since you can't loop through an object, create an array out of the keys to display */}

        {categories.map((category, i) => (
          <button
            onClick={selectFn}
            id={category.name}
            key={i}
            className={selectedCategory === category.name ? 'active' : ''}
          >
            <img alt='category icon' src={menuIcon} />
            {category.name}
            <i>{category.todos.length}</i>
          </button>
        ))}
      </ul>
      <CatPopUp props={props} />
      <button onClick={toggleNewList} className='showPopup'>
        +
      </button>
    </div>
  );
};

//validating props
NavBar.propTypes = {
  categories: PropTypes.array,
  selectFn: PropTypes.func,
};

export default NavBar;
