import { combineReducers } from 'redux';
import occupiedSpaces from './occupiedSpaces';
import map from './map';

const App = combineReducers({
  map,
  occupiedSpaces
});

export default App;
