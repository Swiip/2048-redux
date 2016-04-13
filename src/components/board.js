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
    // const merged = _.flatten(this.props.cells)
    //   .map(tile => tile.mergedInto);
    //   .filter(tile => tile);
    // console.log('coucou', merged);
    // const tiles = _(this.props.cells)
    //   .flatten()
    //   .map(column => [column.cell, ...column.merged])
    //   .flatten()
    //   .filter(tile => tile.value !== 0)
    //   .value();
    const merged = _(this.props.cells).flatten()
      .map(column => column.merged).flatten().value();
    const cells = _(this.props.cells).flatten()
      .map(column => column.cell).value();
    const tiles = merged.concat(cells).filter(tile => tile.value !== 0);
    return (
      <div className="board" tabIndex="1">
        {this.props.cells.map((row, i) => (
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
  cells: PropTypes.array.isRequired,
  // merged: PropTypes.array.isRequired,
  won: PropTypes.bool.isRequired,
  lost: PropTypes.bool.isRequired,
  beyond: PropTypes.bool.isRequired,
  move: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired
};
