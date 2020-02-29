import React from 'react';

const ToDoItem = (props) => {
  const { item } = props;

  const remove = () => {
    props.onRemove(props.item.id);
  }

  return (
    <li className="todo-list-item">
      <input className="tw-check" type="checkbox" checked={item.isChecked} />
      <input className="tw-input" type="text" disabled={item.isChecked} defaultValue={item.description} />
      <button className="tw-btn" onClick={remove} >X</button>
    </li>
  )
}

ToDoItem.defaultProps = {
  item: {},
  onRemove: () => { }
}

export default ToDoItem;