import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Store from './src/store/store';

import App from './App';

const Redux = () => {
  return (
    <Provider store={Store.getStore()}>
      <PersistGate persistor={Store.getPersistor()}>
        <App/> 
      </PersistGate>
    </Provider>
  );
}

export default Redux;