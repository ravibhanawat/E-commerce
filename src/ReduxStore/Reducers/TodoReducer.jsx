import { ActionTypes } from "../Constants/Action_Types";

const initialState = {
  dataSource: [],
};
export const TodoReducer = (state = initialState, { type, payload }) => {
  
  switch (type) {
    case ActionTypes.SET_DATA:
      return {
        ...state,
        dataSource: payload,
      };

    case ActionTypes.POST_DATA:
      return {
        ...state,
        dataSource: payload,
      };

    case ActionTypes.EDIT_DATA:
      return {
        ...state,
        dataSource: payload,
      };
    case ActionTypes.REMOVE_DATA:
      return {
        ...state,
        dataSource: payload,
      };

    default:
      return state;
  }
};
