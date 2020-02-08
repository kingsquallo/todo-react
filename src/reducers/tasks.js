import uuid from "uuid";
import { LIST_ALL, UPDATE_TASK, UPDATE_STATUS_TASK, DELETE_TASK, ADD_TASK } from "../constants/ActionTypes";

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case LIST_ALL:
            return state;

        case ADD_TASK:
            console.log('action', action)
            var newTask = {
                id: uuid.v4(),
                name: action.task.name,
                status: (action.task.status === 'true' || action.task.status === true) ? true : false,
            }
            state = [...state, newTask];
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];

        case UPDATE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: (action.task.status === 'true' || action.task.status === true) ? true : false,
            }
            index = state.findIndex(task => task.id === action.task.id);
            state[index] = task;
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];

        case UPDATE_STATUS_TASK:
            index = state.findIndex(task => task.id === action.id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];

        case DELETE_TASK:
            localStorage.setItem('tasks', JSON.stringify([...state.filter(task => task.id !== action.id)]))
            return [...state.filter(task => task.id !== action.id)];
        default:
            return state;
    }
};

export default myReducer;
