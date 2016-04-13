import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

import {Cell} from './cell';
import {TileView} from './tile';
import {GameEndOverlay} from './overlay';

export class BoardView extends Component {
  handleKeyDown(event) {
    if (this.props.won && !this.props.beyond) {
      return;
    }
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      const direction = event.keyCode - 37;
      this.props.move(direction);
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    const merged = _(this.props.board).flatten()
      .map(tile => tile.merged)
      .filter(tile => tile)
      .flatten().value();
    const cells = _(this.props.board).flatten().value();
    const tiles = merged.concat(cells).filter(tile => tile.value !== 0);
    return (
      <div className="board" tabIndex="1">
        {this.props.board.map((row, i) => (
          <div key={i}>
            {row.map((row, i) => (
              <Cell key={i}/>
            ))}
          </div>
        ))}
        {tiles.map((tile, i) => (
          <TileView key={i} tile={tile} />
        ))}
        <GameEndOverlay won={this.props.won} lost={this.props.lost} beyond={this.props.beyond}
          onRestart={this.props.start} onContinue={this.props.continue}/>
      </div>
    );
  }
}

BoardView.propTypes = {
  board: PropTypes.array.isRequired,
  won: PropTypes.bool.isRequired,
  lost: PropTypes.bool.isRequired,
  beyond: PropTypes.bool.isRequired,
  move: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired
};
