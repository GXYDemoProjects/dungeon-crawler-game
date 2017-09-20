import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducer from './reducers';
import Map from './unit/mapCreator';
import registerServiceWorker from './registerServiceWorker';

const MapCreator = new Map();

const initState = {
  map: MapCreator.createMap(),
  occupiedSpaces: {
    '0x0': {
      type: 'player'
    }
  }
};
console.log(initState);

const store = createStore(reducer, initState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();