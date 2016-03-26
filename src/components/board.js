import React, {Component} from 'react';

import {Board} from '../game';
import {Cell} from './cell';
import {TileView} from './tile';
import {GameEndOverlay} from './overlay';

export class BoardView extends Component {
  constructor() {
    super();
    this.state = {board: new Board()};
  }

  restartGame() {
    this.setState({board: new Board()});
  }

  handleKeyDown(event) {
    if (this.state.board.hasWon()) {
      return;
    }
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      const direction = event.keyCode - 37;
      this.setState({board: this.state.board.move(direction)});
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    const {cells, tiles} = this.state.board;
    return (
      <div className="board" tabIndex="1">
        {cells.map((row, i) => (
          <div key={i}>
            {row.map((row, i) => (
              <Cell key={i}/>
            ))}
          </div>
        ))}
        {tiles.filter(tile => tile.value !== 0).map((tile, i) => (
          <TileView key={i} tile={tile} />
        ))}
        <GameEndOverlay board={this.state.board} onRestart={this.restartGame.bind(this)} />
      </div>
    );
  }
}
