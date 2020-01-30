import * as types from "../constants/ActionTypes";
import uuid from "uuid";
import { findIndex } from 'lodash';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var id = '';
    var index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var newTask = {
                id: uuid.v4(),
                name: action.task.name,
                status: action.task.status === 'true' ? true : false,
            }
            localStorage.setItem('tasks', JSON.stringify([...state, newTask]))
            return [...state, newTask];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex([...state], {id : id});
            state[index] = {
                ...state[index],
                status : !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex([...state], {id : id});
            state.splice(index,1);
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];
        default:
            return state;
    }
};

export default myReducer;
