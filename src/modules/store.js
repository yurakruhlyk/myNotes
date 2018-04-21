import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './';

const store = createStore(
  reducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;