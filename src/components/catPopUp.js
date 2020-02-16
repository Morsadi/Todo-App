import React from 'react';
import PropTypes from 'prop-types';

const CatPopUp = props => {
  const {
    addCategory,
    catInput,
    eventHandler,
    toggleNewList,
    isNewList,
    focusInput,
  } = props.props;
  const isAccessible = isNewList ? '1' : '-1';

  return (
    <div className={`popup ${isNewList ? 'slideListUp' : ''}`}>
      <h5>New List</h5>
      <input
        tabIndex={isAccessible}
        ref={focusInput}
        type='text'
        onChange={eventHandler}
        name='catInput'
        value={catInput}
        placeholder='List Name'
        onKeyDown={function(event) {
          if (event.keyCode === 13) {
            addCategory();
          }
        }}
      />
      <div>
        <button
          tabIndex={isAccessible}
          onClick={toggleNewList}
          className='closeList'
        >
          Close
        </button>
        <button tabIndex={isAccessible} onClick={addCategory}>
          Create List
        </button>
      </div>
    </div>
  );
};
//validating props
CatPopUp.propTypes = {
  addCategory: PropTypes.func,
  catInput: PropTypes.string,
  eventHandler: PropTypes.func,
  toggleNewList: PropTypes.func,
  isNewList: PropTypes.bool,
  focusInput: PropTypes.object,
};
export default CatPopUp;
