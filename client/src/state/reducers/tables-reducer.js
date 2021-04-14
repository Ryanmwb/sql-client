import {
  SET_CREDENTIALS,
  SET_QUERY_TABLES,
  SET_SELECTED_TABLE,
  SET_TABLES,
} from "../types";

const initialState = {
  tables: {},
  selectedTable: {},
  credentials: {},
  queryTables: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };
    case SET_SELECTED_TABLE:
      return {
        ...state,
        selectedTable: action.payload,
      };
    case SET_QUERY_TABLES:
      return {
        ...state,
        queryTables: action.payload,
      };
    case SET_TABLES:
      return {
        ...state,
        tables: action.payload,
      };
    default:
      return state;
  }
}
