import {connect} from 'react-redux';
import {BoardView} from '../components/board';
import {move, addTile, update} from './actions';
import {chooseRandomTile} from '../game/add';

const mapStateToProps = state => {
  return {
    board: state.board,
    changed: state.changed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    move: direction => dispatch(move(direction)),
    addTile: board => {
      const tile = chooseRandomTile(board);
      dispatch(addTile(tile.row, tile.column, tile.value));
    },
    update: () => dispatch(update())
  };
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardView);
