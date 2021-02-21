import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import rootSaga from 'saga';
import Reducers from 'reducers';
import {AppNavigator} from 'src';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'user_data_reducer',
  storage: AsyncStorage,
  // whitelist: ['user_data_reducer'], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, combineReducers(Reducers));

const store = createStore(pReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga).done.catch((e) => console.warn(e));

const App: () => React$Node = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
