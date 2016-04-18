import {connect} from 'react-redux';
import {BoardView} from '../components/board';
import {move, start, actionContinue, undo} from './actions';

const mapStateToProps = state => {
  return {
    board: state.board.present.board,
    won: state.flags.won,
    lost: state.flags.lost,
    beyond: state.flags.beyond
  };
};

const mapDispatchToProps = dispatch => {
  return {
    move: direction => dispatch(move(direction)),
    start: () => dispatch(start()),
    continue: () => dispatch(actionContinue()),
    undo: () => dispatch(undo())
  };
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardView);
