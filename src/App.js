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
    const t = todoList;
    t.splice(itemIndex, 1);
    ToDoService.remove(id);
    setTodoList(t);
  }
 
  return (
    <div className="App">
      <NewToDoItem onAdd={add} />
      <hr />
      <ToDoList items={todoList} onRemove={remove} />
    </div>
  );
}

export default App;
