import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoList from './views/components/ToDoList';
import NewToDoItem from './views/components/NewToDoItem';
import { ToDoService } from './data/services/ToDoService';

const App = () => {

  const [todoList, setTodoList] = useState([]);

  const getTodoList = async () => {
    setTodoList(await ToDoService.list());
  };

  useEffect(() => {
    getTodoList();
  })

  const add = (description) => {
    ToDoService.create({
      description,
      isChecked: false
    })
      .then(newItem => {
        todoList.push(newItem);
        setTodoList(todoList);
      })
  }

  const remove = (id) => {
    const itemIndex = todoList.findIndex(item => item.id === id);
    todoList.splice(itemIndex, 1);
    ToDoService.remove(id);
    setTodoList(todoList);
  }

  const update = (newItem) => {
    const itemIndex = todoList.findIndex(item => item.id === newItem.id);
    todoList[itemIndex] = newItem;
    ToDoService.update(newItem);
    setTodoList(todoList);
  }

  const clear = () => {
    const todo = []
    const done = []

    todoList.forEach(item => {
      if (item.isChecked) {
        done.push(item);
      } else {
        todo.push(item);
      }
    })

    done.forEach(item => {
      remove(item.id)
    })

    setTodoList(todo);
  }
 
  return (
    <div className="App">
      <NewToDoItem onAdd={add} />
      <hr />
        <button className="tw-btn" onClick={clear}> Limpar </button>
      <hr />
      <ToDoList items={todoList} onRemove={remove} onUpdate={update} />
    </div>
  );
}

export default App;
