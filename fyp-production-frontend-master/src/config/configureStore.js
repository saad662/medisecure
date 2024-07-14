import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducers from '../reducers';
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const getMiddleware = () => {
  const middleware = [reduxThunk];
  return applyMiddleware(...middleware);
};

const persistConfig = {
  key: 'key',
  storage: storage,
}
const persistedReducer = persistReducer(persistConfig, combineReducers({
  ...reducers
}));

export default () => {
  let store = createStore(persistedReducer, getMiddleware())
  let persistor = persistStore(store)
  return { store, persistor };
};