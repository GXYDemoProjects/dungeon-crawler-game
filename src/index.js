import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducer from './reducers';
import Map from './unit/mapCreator';
import { entityType } from './constants/gameType';
import registerServiceWorker from './registerServiceWorker';

const MapCreator = new Map();

const initState = {
  entities: {
    player: {
      entityType: entityType.PLAYER,
      x: 0,
      y: 0,
      health: 100,
      weapon: 'stick',
      attack: 7,
      level: 0,
      toNextLevel: 60,
    },
  },
  map: MapCreator.createMap(),
  level: 0,
  width: 48,
  height: 20,
  darkness: false,
};

const store = createStore(reducer, initState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();