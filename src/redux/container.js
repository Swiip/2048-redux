import {connect} from 'react-redux';
import {BoardView} from '../components/board';
import {move, addTile, update} from './actions';

const mapStateToProps = state => {
  return {
    board: state.board,
    changed: state.changed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    move: direction => dispatch(move(direction)),
    addTile: board => dispatch(addTile(board)),
    update: () => dispatch(update())
  };
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardView);
