import { createStore } from 'redux';
import rootReducer from 'src/state/reducers/reducers';

const store = createStore(rootReducer);

export default store;
