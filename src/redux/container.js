import {connect} from 'react-redux';
import {ActionCreators} from 'redux-undo';
import {BoardView} from '../components/board';
import {move, start, actionContinue} from './actions';

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
    undo: () => {
      dispatch(ActionCreators.undo()); // Undo hasLost
      dispatch(ActionCreators.undo()); // Undo hasWon
      dispatch(ActionCreators.undo()); // Undo udate
      dispatch(ActionCreators.undo()); // Undo addTile, TODO: should be conditional (flag changed)
      dispatch(ActionCreators.undo()); // Undo move
    }
  };
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardView);
