import {connect} from 'react-redux';
import {BoardView} from '../components/board';
import {move, restart, actionContinue} from './actions';

const mapStateToProps = state => {
  return {
    tiles: state.tiles,
    cells: state.cells,
    won: state.won,
    lost: state.lost,
    beyond: state.beyond
  };
};

const mapDispatchToProps = dispatch => {
  return {
    move: direction => dispatch(move(direction)),
    restart: () => dispatch(restart()),
    continue: () => dispatch(actionContinue())
  };
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardView);
