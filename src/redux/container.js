import {connect} from 'react-redux';
import {BoardView} from '../components/board';
import {move, start, actionContinue} from './actions';

const mapStateToProps = state => {
  return {
    board: state.board.board,
    won: state.flags.won,
    lost: state.flags.lost,
    beyond: state.flags.beyond
  };
};

const mapDispatchToProps = dispatch => {
  return {
    move: direction => dispatch(move(direction)),
    start: () => dispatch(start()),
    continue: () => dispatch(actionContinue())
  };
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardView);
