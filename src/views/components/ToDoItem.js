import React from 'react';

const ToDoItem = (props) => {
  const { item } = props;
  const input = React.createRef()

  const remove = () => {
    props.onRemove(props.item.id);
  }

  const update = () => {
    item.description = input.current.value;
    props.onUpdate(item);
  }

  const check = () => {
    if (item.isChecked) {
      item.isChecked = false
    } else {
      item.isChecked = true;
    }
    props.onUpdate(item);
  }

  return (
    <li className="todo-list-item">
      <input 
        className="tw-check"
        type="checkbox"
        checked={item.isChecked}
        onChange={check} />
      <input 
        className="tw-input"
        ref={input}
        type="text"
        disabled={item.isChecked}
        defaultValue={item.description} 
        onBlur={update} />
      <button className="tw-btn" onClick={remove} >X</button>
    </li>
  )
}

ToDoItem.defaultProps = {
  item: {},
  onRemove: () => {},
  onUpdate: () => {}
}

export default ToDoItem;