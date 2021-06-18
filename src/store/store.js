import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

import user from '../store/reducers/user';
import room from '../store/reducers/room';
import rooms from '../store/reducers/rooms';
import songbook from '../store/reducers/songbook';
import favorites from '../store/reducers/favorites';

class Store {
  constructor() {
    this.persistConfig = {
      key: "root",
      storage: AsyncStorage,
      blacklist: ['room']
    };

    this.rootReducer = combineReducers({
      user,
      room,
      rooms,
      songbook,
      favorites
    });

    this.persistedReducer = persistReducer(
      this.persistConfig,
      this.rootReducer
    );

    this.store = createStore(this.persistedReducer);

    this.persistor = persistStore(this.store);
  }

  getStore() {
    return this.store;
  }

  getPersistor() {
    return this.persistor;
  }
}

export default new Store();
