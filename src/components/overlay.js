import React, {Component, PropTypes} from 'react';

export class GameEndOverlay extends Component {
  render() {
    const board = this.props.board;
    let contents = '';
    if (board.hasWon()) {
      contents = 'Good Job!';
    } else if (board.hasLost()) {
      contents = 'Game Over';
    }
    if (!contents) {
      return null;
    }
    return (
      <div className="overlay">
        <p className="message">{contents}</p>
        <button className="tryAgain" onClick={this.props.onRestart.bind(this)}>
          Try again
        </button>
      </div>
    );
  }
}

GameEndOverlay.propTypes = {
  board: PropTypes.object.isRequired,
  onRestart: PropTypes.func.isRequired
};
