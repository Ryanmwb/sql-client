import { combineReducers } from "redux";
import tablesReducer from "./tables-reducer";

export default combineReducers({
  database: tablesReducer,
});
