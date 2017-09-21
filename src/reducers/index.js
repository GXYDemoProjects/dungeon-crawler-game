import { combineReducers } from 'redux';
import map from './map';
import entities from './entities';
import defaultState from './defaultState';
import level from './level';
import darkness from './darkness';



const App = combineReducers({
  map,
  entities,
  width : defaultState,
  height : defaultState,
  level,
  darkness
});

export default App;
