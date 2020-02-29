import React, { useState, useEffect } from 'react';
import './App.css';

import ToDoList from './views/components/ToDoList';
import NewToDoItem from './views/components/NewToDoItem';

import ToDoActions from './data/actions/ToDoActions';
import ToDoStore from './data/stores/ToDoStore';

const getToDoState = async () => {
  return await ToDoStore.getAll() //UNICO METODO PUBLICO DA STORE POIS NÃO FAZ ALTERAÇÃO NELA
}

const App = () => {

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    console.log('atualizou')
    const _onChange = async () => {
      setTodoList(await getToDoState()); //SEMPRE QUE TIVER ALTERAÇÃO NA STORE EU VOU SETAR O NOVO NO STATE
    }

  _onChange();

    ToDoStore.addChangeListener(_onChange); //SE INSCREVENDO NA STORE PARA OUVIR ALTERAÇÕES
    return () => {
      ToDoStore.removeChangeListener(_onChange); //DESESCREVENDO NA STORE QUANDO O COMPONENTE É "DESMONTADO DA TELA"
    }
  }, [todoList])

  return (
    <div className="App">
      <NewToDoItem onAdd={ToDoActions.create} />
      <hr />
      <button className="tw-btn" onClick={ToDoActions.clear}> Limpar </button>
      <hr />
      <ToDoList items={todoList} onRemove={ToDoActions.remove} onUpdate={ToDoActions.update} />
    </div>
  );
}

export default App;
