let tileId = 0;

export function createTile(value, row, column) {
  // const newTile = {
  return {
    id: tileId++,
    value: value || 0,
    row: row || -1,
    column: column || -1,
    oldRow: -1,
    oldColumn: -1,
    // markForDeletion: false,
    mergedInto: null,
    classes: []
  };
  // tiles.push(newTile);
  // return newTile;
}

export function isNew(tile) {
  return tile.oldRow === -1 && !tile.mergedInto;
}

export function hasMoved(tile) {
  return (
    tile.oldRow !== -1 &&
    (tile.oldRow !== tile.row || tile.oldColumn !== tile.column)
  ) || tile.mergedInto;
}

// function fromRow(tile) {
//   return tile.mergedInto ? tile.row : tile.oldRow;
// }
//
// function fromColumn(tile) {
//   return tile.mergedInto ? tile.column : tile.oldColumn;
// }

// function toRow(tile) {
//   return tile.mergedInto ? tile.mergedInto.row : tile.row;
// }

// function toColumn(tile) {
//   return tile.mergedInto ? tile.mergedInto.column : tile.column;
// }

export function update(board) {
  return updateClasses(updatePositions(board));
}

export function updatePositions(board) {
  return board.map((row, rowIndex) => {
    return row.map((tile, columnIndex) => {
      const tileUpdater = tile => ({
        ...tile,
        oldRow: tile.row,
        oldColumn: tile.column,
        row: rowIndex,
        column: columnIndex
      });

      tile = tileUpdater(tile);
      if (tile.merged) {
        tile.merged = tile.merged.map(tileUpdater);
      }
      return tile;
    });
  });
}

// export function setPositions(cells) {
//   cells.forEach((row, rowIndex) => {
//     row.forEach((tile, columnIndex) => {
//       tile.oldRow = tile.row;
//       tile.oldColumn = tile.column;
//       tile.row = rowIndex;
//       tile.column = columnIndex;
//       tile.markForDeletion = false;
//     });
//   });
// }

export function updateClasses(board) {
  const tileUpdater = (tile, merged = false) => {
    tile = {...tile};
    tile.classes = ['tile'];
    tile.classes.push(`tile${tile.value}`);
    // if (!tile.mergedInto) {
    //   tile.classes.push(`position_${tile.row}_${tile.column}`);
    // }
    // if (tile.mergedInto) {
    //   tile.classes.push('merged');
    // }
    if (merged) {
      tile.classes.push('merged');
    } else {
      tile.classes.push(`position_${tile.row}_${tile.column}`);
    }
    if (isNew(tile)) {
      tile.classes.push('new');
    }
    if (hasMoved(tile)) {
      tile.classes.push(`row_from_${tile.oldRow}_to_${tile.row}`);
      tile.classes.push(`column_from_${tile.oldColumn}_to_${tile.column}`);
      tile.classes.push('isMoving');
    }
    return tile;
  };
  return board.map(row => {
    return row.map(tile => {
      tile = tileUpdater(tile);
      if (tile.merged) {
        tile.merged = tile.merged.map(tile => tileUpdater(tile, true));
      }
      return tile;
    });
  });
}
