import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = (props) => {
  const { items } = props

  const remove = (id) => {
    props.onRemove(id);
  }

  const update = (item) => {
    props.onUpdate(item);
  }

  if (items.length === 0) {
    return (
      <div> No Items </div>
    )
  }
  return (
    <ul className="todo-list" >
      {
        items.map((item) => {
          return (
            <ToDoItem
              key={item.id}
              item={item}
              onRemove={remove}
              onUpdate={update} />
          );
        })
      }
    </ul>
  )

}

ToDoList.defaultProps = {
  items: {},
  onRemove: () => {},
  onUpdate: () => {}
}

export default ToDoList;