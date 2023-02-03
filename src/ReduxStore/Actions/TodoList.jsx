import { ActionTypes } from "../Constants/Action_Types";
export const set_Data = (items) => {
  return {
    type: ActionTypes.SET_DATA,
    payload: items,
  };
};

export const isPostData = (item) => {
  return {
    type: ActionTypes.POST_DATA,
    payload: item,
  };
};
export const isEditData = (item) => {
  return {
    type: ActionTypes.EDIT_DATA,
    payload: item,
  };
};

export const isDeleteItem = (item) => {
  return {
    type: ActionTypes.REMOVE_DATA,
    payload: item,
  };
};
