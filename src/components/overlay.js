import React, {Component, PropTypes} from 'react';

export class GameEndOverlay extends Component {
  render() {
    let contents = null;
    if (this.props.won && !this.props.beyond) {
      contents = 'Good Job!';
    }
    if (this.props.lost) {
      contents = 'Game Over';
    }
    if (contents === null) {
      return null;
    }
    return (
      <div className="overlay">
        <p className="message">{contents}</p>
        <button className="tryAgain" onClick={this.props.onRestart.bind(this)}>
          Try again
        </button>
        {
          this.props.won ?
          <button className="tryAgain" onClick={this.props.onContinue.bind(this)}>
            Continue
          </button> :
          null
        }
      </div>
    );
  }
}

GameEndOverlay.propTypes = {
  won: PropTypes.bool.isRequired,
  lost: PropTypes.bool.isRequired,
  beyond: PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired
};
