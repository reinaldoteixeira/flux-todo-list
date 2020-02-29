import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = (props) => {
  const { items } = props

  const remove = (id) => {
    props.onRemove(id);
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
              onRemove={remove} />
          );
        })
      }
    </ul>
  )

}

ToDoList.defaultProps = {
  items: {},
  onRemove: () => { }
}

export default ToDoList;