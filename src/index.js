import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppContainer from './containers/AppContainer';
import reducer from './reducers';
import { entityType } from './constants/gameType';
import registerServiceWorker from './registerServiceWorker';


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
  map: [],
  level: 4,
  width: 48,
  height: 20,
  darkness: false,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initState, composeEnhancers(applyMiddleware(ReduxThunk)));


render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();