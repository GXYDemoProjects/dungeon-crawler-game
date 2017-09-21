import Main from '../components/App';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => (
  {
    map: state.map,
    occupiedSpaces: state.occupiedSpaces
  }
);

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)(Main);
export default App;
