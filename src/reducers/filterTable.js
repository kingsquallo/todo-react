import * as types from "../constants/ActionTypes";

var initialState = {
    filterName: '',
    filterStatus: -1
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TABLE:
            var {name,status} = action.filter;
            return {...state, filterName : name , filterStatus : parseInt(status,10)};
        default:
            return state;
    }
};

export default myReducer;
