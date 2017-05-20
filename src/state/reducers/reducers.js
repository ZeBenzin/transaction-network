import {
  SET_TRANSACTIONS,
  SET_VISIBLE_TRANSACTION,
  TOGGLE_SIGN_IN_PAGE
} from 'src/state/actions/actions';

const DEFAULT_STATE = {
  visibleTransaction: [],
  transactions: {},
  signInPageVisible: false
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

const toggleSignInPage = (state, action) => {
  return {
    ...state,
    signInPageVisible: action.status
  };
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return setTransactions(state, action);
    case SET_VISIBLE_TRANSACTION:
      return setVisibleTransactions(state, action);
    case TOGGLE_SIGN_IN_PAGE:
      return toggleSignInPage(state, action);
    default:
      return state;
  }
};

export default rootReducer;
