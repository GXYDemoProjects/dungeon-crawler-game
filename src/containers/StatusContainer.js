import React from 'react';
import StatusBar from '../components/StatusBar';
import { entityType } from '../constants/gameType';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

const getEntitiesNumber = ({ entities }, entityType) => {
  let num = 0;
  for(let entityName of Object.keys(entities)) {
    const entity = entities[entityName];
    if(entity.entityType === entityType) {
      num++;
    }
  }
  return num;
};

const mapStateToProps = (state) => {
  return ({
    player: state.entities.player,
    game: {
      enemiesNum: getEntitiesNumber(state, entityType.ENEMY),
      energiesNum: getEntitiesNumber(state, entityType.ENERGY),
      level: state.level
    }
  });
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);


const StatusContainer = connect(mapStateToProps, mapDispatchToProps)(StatusBar);
// BoardContainer = connect(mapStateToProps)(BoardContainer);
export default StatusContainer;
