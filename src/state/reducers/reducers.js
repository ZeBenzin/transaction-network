import { SET_TRANSACTIONS, SET_VISIBLE_TRANSACTION } from 'src/state/actions/actions';

const DEFAULT_STATE = {
  visibleTransaction: [],
  transactions: {}
};

const setTransactions = (state, action) => {
  return {
    ...state,
    transactions: action.transactions,
    visibleTransaction: action.visibleTransaction
  };
};

const setVisibleTransactions = (state, action) => {
  return {
    ...state,
    visibleTransaction: state.transactions[action.blockHeight]
  };
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return setTransactions(state, action);
    case SET_VISIBLE_TRANSACTION:
      return setVisibleTransactions(state, action);
    default:
      return state;
  }
};

export default rootReducer;
