import { combineReducers } from "redux";
import { TodoReducer } from "./TodoReducer";

const reducers = combineReducers({
  allData: TodoReducer,
});

export default reducers;
