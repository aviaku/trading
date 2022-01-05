import { combineReducers } from "redux";
import { orderBookReducer } from "./orderBookReducer";

const reducers = combineReducers({
  orderBook: orderBookReducer,
});

export default reducers;
