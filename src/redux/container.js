import {connect} from 'react-redux';
import {BoardView} from '../components/board';
import {move} from './actions';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    move: direction => {
      dispatch(move(direction));
    }
  };
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardView);
