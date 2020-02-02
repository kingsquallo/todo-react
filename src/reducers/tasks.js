import * as types from "../constants/ActionTypes";
import uuid from "uuid";

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
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
            state = [...state, newTask];
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];

        case types.UPDATE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === 'true' ? true : false,
            }
            index = state.findIndex(task => task.id === action.task.id);
            state[index] = task;
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];

        case types.UPDATE_STATUS_TASK:
            index = state.findIndex(task => task.id === action.id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];

        case types.DELETE_TASK:
            localStorage.setItem('tasks', JSON.stringify([...state.filter(task => task.id !== action.id)]))
            return [...state.filter(task => task.id !== action.id)];
        default:
            return state;
    }
};

export default myReducer;
