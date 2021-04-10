import { INCREMENT } from "../types";

export const increment = (count) => (dispatch) => {
  dispatch({
    type: INCREMENT,
    payload: count + 1,
  });
};
