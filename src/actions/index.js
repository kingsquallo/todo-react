import * as types from './../constants/ActionTypes'

export const listALL = () => {
    return {
        type: types.LIST_ALL
    }
}

export const addTask = task => {
    return {
        type: types.ADD_TASK,
        task // task : task
    }
}

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM,
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM,
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM,
    }
}

export const updateStatus = (id) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        id, // id: id
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id, // id: id
    }
}

export const updateTask = (task) => {
    return {
        type: types.UPDATE_TASK,
        task, // task: task
    }
}

export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task, // task: task
    }
}

export const filterTable = (filter) => {
    return {
        type: types.FILTER_TABLE,
        filter, //filter : { filterName, filterStatus }
    }
}