import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

import {Cell} from './cell';
import {TileView} from './tile';

export class BoardView extends Component {
  handleKeyDown(event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      const direction = event.keyCode - 37;
      this.props.move(direction);
      if (this.props.changed) {
        this.props.addTile(this.props.board);
      }
      this.props.update();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    const merged = _(this.props.board).flatten().map('merged').compact().flatten().value();
    const cells = _(this.props.board).flatten().value();
    const tiles = _(merged).concat(cells).filter('value').value();
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
      </div>
    );
  }
}

BoardView.propTypes = {
  board: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
  addTile: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};
