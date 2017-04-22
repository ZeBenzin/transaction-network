import { SET_TRANSACTIONS, SET_VISIBLE_TRANSACTION } from './actions';

export const setTransactions = (transactions, visibleTransaction) => ({ type: SET_TRANSACTIONS, transactions, visibleTransaction });
export const setVisibleTransactions = (blockHeight) => ({ type: SET_VISIBLE_TRANSACTION, blockHeight });
