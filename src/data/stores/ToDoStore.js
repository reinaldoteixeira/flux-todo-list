import AppDispatcher from '../dispatcher/AppDispatcher';
import Events from 'events';
import ToDoConstants from '../constants/ToDoConstants';

import { ToDoService } from "../services/ToDoService";

const Channel = new Events.EventEmitter(); // PARA PODERMOS NOS CADASTRARMOS EM UM EVENTO

const CHANGE_EVENT = 'change';

let _todoList = []; //STORE LISTA DE ITENS

const createItem = (description) => {
  return ToDoService.create({
    description,
    isChecked: false
  })
    .then(newItem => {
      _todoList.push(newItem);
    })
}

const updateItem = (newItem) => {
  const itemIndex = _todoList.findIndex(item => item.id === newItem.id);
  _todoList[itemIndex] = newItem;
  return ToDoService.update(newItem);
}

const removeItem = (id) => {
  const itemIndex = _todoList.findIndex(item => item.id === id);
  _todoList.splice(itemIndex, 1);
  return ToDoService.remove(id);
}

const clearAll = () => {
  const todo = []
  const done = []

  _todoList.forEach(item => {
    if (item.isChecked) {
      done.push(item);
    } else {
      todo.push(item);
    }
  })

  done.forEach(item => {
    removeItem(item.id)
  })
  _todoList = todo;
}

const ToDoStore = {
  async getAll() {
    if (_todoList.length === 0) {
      _todoList = await ToDoService.list();
    }
    return _todoList;
  },
  emitChange() {
    Channel.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    Channel.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    Channel.removeListener(CHANGE_EVENT, callback);
  }
}

const handleAction = async (action) => {
  switch (action.actionType) {
    case ToDoConstants.TODO_CREATE:
      const description = action.description;
      await createItem(description);
      ToDoStore.emitChange(); //EMITIR PARA TODOS OS COMPONENTES (VIEW) INSCRITO QUE HOUVE ALTERAÇÃO
      break;
    case ToDoConstants.TODO_UPDATE:
      const item = action.item;
      await updateItem(item);
      ToDoStore.emitChange();
      break;
    case ToDoConstants.TODO_REMOVE:
      const id = action.id;
      await removeItem(id);
      ToDoStore.emitChange();
      break;
    case ToDoConstants.TODO_CLEAR:
      clearAll();
      ToDoStore.emitChange();
    break;
    default:
      break;
  }
}
ToDoStore.dispatchToken = AppDispatcher.register(handleAction); //REGISTRANDO PARA QUANDO TIVER UM DISPATCHER (AÇÃO) CHAMAR ESSE METODO DA NOSSA STORE, ESSE REGISTRO GERA UM TOKEN NO QUAL ESAMOS SALVANDO NA TODOSTORE
export default ToDoStore;