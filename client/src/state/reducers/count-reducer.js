import { INCREMENT } from "../types";

const initialState = {
  count: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}
