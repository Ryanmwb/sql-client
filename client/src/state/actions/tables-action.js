import {
  SET_CREDENTIALS,
  SET_QUERY_TABLES,
  SET_SELECTED_TABLE,
  SET_TABLES,
} from "../types";

export const setCredentials = (credentials) => (dispatch) => {
  dispatch({
    type: SET_CREDENTIALS,
    payload: credentials,
  });
};

export const setSelectedTable = (selectedTable) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_TABLE,
    payload: selectedTable,
  });
};

export const setQueryTables = (queryTables) => (dispatch) => {
  dispatch({
    type: SET_QUERY_TABLES,
    payload: queryTables,
  });
};

export const setTables = (tables) => (dispatch) => {
  dispatch({
    type: SET_TABLES,
    payload: tables,
  });
};
