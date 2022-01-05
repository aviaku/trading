import { ActionTypes } from "../actionTypes/action-types";

const initialState = {
  loading: true,
  bids: [],
  asks: [],
  ticker: {},
};

export const orderBookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_BIDS:
      return { ...state, bids: payload, loading: false };
    case ActionTypes.FETCH_ASKS:
      return { ...state, asks: payload, loading: false };
    case ActionTypes.FETCH_TICKER:
      return { ...state, ticker: payload };
    default:
      return state;
  }
};
