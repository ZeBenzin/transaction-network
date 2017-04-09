import { SET_TRANSACTIONS } from 'src/state/actions/actions';

const DEFAULT_STATE = {
  transactions: {}
};

const setTransactions = (state, action) => {
  return { ...state, transactions: action.transactions };
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return setTransactions(state, action);
    default:
      return state;
  }
};

export default rootReducer;
