import AppDispatcher from '../dispatcher/AppDispatcher';
import ToDoConstants from '../constants/ToDoConstants';

const ToDoActions = {
    create(description){
        AppDispatcher.dispatch({
            actionType: ToDoConstants.TODO_CREATE,
            description
        })
    },
    update(item){
        AppDispatcher.dispatch({
            actionType: ToDoConstants.TODO_UPDATE,
            item: item
        })
    },
    remove(id){
        AppDispatcher.dispatch({
            actionType: ToDoConstants.TODO_REMOVE,
            id: id
        })
    },
    clear(){
        AppDispatcher.dispatch({
            actionType: ToDoConstants.TODO_CLEAR
        })
    },
}

export default ToDoActions;