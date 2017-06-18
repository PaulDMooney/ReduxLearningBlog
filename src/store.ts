import { createStore, applyMiddleware } from 'redux';
import * as ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise,thunk)(createStore);

export default createStoreWithMiddleware(reducers);