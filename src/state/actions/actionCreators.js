import { SET_TRANSACTIONS, SET_VISIBLE_TRANSACTION, TOGGLE_SIGN_IN_PAGE } from './actions';

export const setTransactions = (transactions, visibleTransaction) => ({ type: SET_TRANSACTIONS, transactions, visibleTransaction });
export const setVisibleTransactions = (blockHeight) => ({ type: SET_VISIBLE_TRANSACTION, blockHeight });
export const toggleSignInPage = (status) => ({ type: TOGGLE_SIGN_IN_PAGE, status });
