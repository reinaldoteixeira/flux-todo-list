import React, { useState } from 'react';

const NewToDoItem = (props) => {
  const [description, setDescription] = useState('');

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    setDescription(value)
  }

  const add = (event) => {
    event.preventDefault();
    if (description) {
      props.onAdd(description);
      setDescription('');
    }
  }

  return (
    <form onSubmit={add}>
      <input
        className="tw-input"
        type="text"
        placeholder="Novo Item"
        name="description"
        value={description}
        onChange={handleChange} />
      <button className="tw-btn"> Adicionar </button>
    </form>
  );
};

NewToDoItem.defaultProps = {
  onAdd: () => {

  }
}

export default NewToDoItem;