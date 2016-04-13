import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

import {Cell} from './cell';
import {TileView} from './tile';

export class BoardView extends Component {
  constructor() {
    super();
    this.state = {
      board: []
    };
  }

  handleKeyDown(event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      const direction = event.keyCode - 37;

      // MOVE
      // ADD TILE
      // UPDATE
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Subscribe
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));

    // Unsubscribe
  }

  render() {
    const merged = _(this.state.board).flatten().map('merged').compact().flatten().value();
    const cells = _(this.state.board).flatten().value();
    const tiles = _(merged).concat(cells).filter('value').value();
    return (
      <div className="board" tabIndex="1">
        {this.state.board.map((row, i) => (
          <div key={i}>
            {row.map((row, i) => (
              <Cell key={i}/>
            ))}
          </div>
        ))}
        {tiles.map((tile, i) => (
          <TileView key={i} tile={tile} />
        ))}
      </div>
    );
  }
}

BoardView.propTypes = {
  won: PropTypes.bool.isRequired,
  lost: PropTypes.bool.isRequired,
  beyond: PropTypes.bool.isRequired,
  move: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired
};
