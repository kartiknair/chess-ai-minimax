/*AI Stuff*/
/*--------*/

const minimaxRoot = function(game, depth, maximisingPlayer) {
  var bestMove = -Infinity;
  var bestMoveFound;

  for (var i = 0; i < game.moves().length; i++) {
    game.move(game.moves()[i]);
    var value = minimax(
      game,
      depth - 1,
      -Infinity,
      Infinity,
      !maximisingPlayer
    );
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = game.moves()[i];
    }
  }
  return bestMoveFound;
};

function minimax(position, depth, alpha, beta, maximisingPlayer) {
  if (depth === 0) {
    return -evaluateBoard(position);
  }
  if (maximisingPlayer) {
    let value = -Infinity;
    for (let i = 0; i < position.moves().length; i++) {
      position.move(position.moves()[i]);
      value = Math.max(value, minimax(position, depth - 1, alpha, beta, false));
      position.undo();
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        return value;
      }
    }

    return value;
  } else {
    let value = Infinity;
    for (let i = 0; i < position.moves().length; i++) {
      position.move(game.moves()[i]);
      value = Math.min(value, minimax(position, depth - 1, alpha, beta, true));
      position.undo();
      beta = Math.min(beta, value);
      if (alpha >= beta) {
        return value;
      }
    }
    return value;
  }
}

var board,
  game = new Chess();

const pawnSquareTableVals = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

const pawnSquareTableValsBlack = pawnSquareTableVals.slice().reverse();

const knightSquareTableVals = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50]
];

const knightSquareTableValsBlack = knightSquareTableVals.slice().reverse();

const bishopSquareTableVals = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20]
];

const bishopSquareTableValsBlack = bishopSquareTableVals.slice().reverse();

const rookSquareTableVals = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 10, 10, 10, 10, 5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [0, 0, 0, 5, 5, 0, 0, 0]
];

const rookSquareTableValsBlack = rookSquareTableVals.slice().reverse();

const queenSquareTableVals = [
  [-20, -10, -10, -5, -5, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 5, 5, 5, 0, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [0, 0, 5, 5, 5, 5, 0, -5],
  [-10, 5, 5, 5, 5, 5, 0, -10],
  [-10, 0, 5, 0, 0, 0, 0, -10],
  [-20, -10, -10, -5, -5, -10, -10, -20]
];

const queenSquareTableValsBlack = queenSquareTableVals.slice().reverse();

const kingSquareTableVals = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [20, 20, 0, 0, 0, 0, 20, 20],
  [20, 30, 10, 0, 0, 10, 30, 20]
];

const kingSquareTableValsBlack = kingSquareTableVals.slice().reverse();

const pawnSquareTable = [];

const knightSquareTable = [];

const bishopSquareTable = [];

const rookSquareTable = [];

const queenSquareTable = [];

const kingSquareTable = [];

let numSquares = [];

game.SQUARES.forEach(square => {
  let value;
  if (square.charAt(1) === "8") {
    value = 0;
  } else if (square.charAt(1) === "7") {
    value = 1;
  } else if (square.charAt(1) === "6") {
    value = 2;
  } else if (square.charAt(1) === "5") {
    value = 3;
  } else if (square.charAt(1) === "4") {
    value = 4;
  } else if (square.charAt(1) === "3") {
    value = 5;
  } else if (square.charAt(1) === "2") {
    value = 6;
  } else if (square.charAt(1) === "1") {
    value = 7;
  }

  if (square.charAt(0) === "a") {
    numSquares.push({
      name: square,
      num: [0, value]
    });
  } else if (square.charAt(0) === "b") {
    numSquares.push({
      name: square,
      num: [1, value]
    });
  } else if (square.charAt(0) === "c") {
    numSquares.push({
      name: square,
      num: [2, value]
    });
  } else if (square.charAt(0) === "d") {
    numSquares.push({
      name: square,
      num: [3, value]
    });
  } else if (square.charAt(0) === "e") {
    numSquares.push({
      name: square,
      num: [4, value]
    });
  } else if (square.charAt(0) === "f") {
    numSquares.push({
      name: square,
      num: [5, value]
    });
  } else if (square.charAt(0) === "g") {
    numSquares.push({
      name: square,
      num: [6, value]
    });
  } else if (square.charAt(0) === "h") {
    numSquares.push({
      name: square,
      num: [7, value]
    });
  }
});

numSquares.forEach(square => {
  pawnSquareTable.push({
    square: square,
    wValue: pawnSquareTableVals[square.num[1]][square.num[0]],
    bValue: pawnSquareTableValsBlack[square.num[1]][square.num[0]]
  });

  knightSquareTable.push({
    square: square,
    wValue: knightSquareTableVals[square.num[1]][square.num[0]],
    bValue: knightSquareTableValsBlack[square.num[1]][square.num[0]]
  });

  bishopSquareTable.push({
    square: square,
    wValue: bishopSquareTableVals[square.num[1]][square.num[0]],
    bValue: bishopSquareTableValsBlack[square.num[1]][square.num[0]]
  });

  rookSquareTable.push({
    square: square,
    wValue: rookSquareTableVals[square.num[1]][square.num[0]],
    bValue: rookSquareTableValsBlack[square.num[1]][square.num[0]]
  });

  queenSquareTable.push({
    square: square,
    wValue: queenSquareTableVals[square.num[1]][square.num[0]],
    bValue: queenSquareTableValsBlack[square.num[1]][square.num[0]]
  });
  kingSquareTable.push({
    square: square,
    wValue: kingSquareTableVals[square.num[1]][square.num[0]],
    bValue: kingSquareTableValsBlack[square.num[1]][square.num[0]]
  });
});

const evaluateBoard = function(board) {
  let totalEvaluation = 0;
  board.SQUARES.forEach(square => {
    totalEvaluation += getPieceValue(board.get(square), square);
  });

  if (board.in_checkmate() && board.turn() === "b") {
    return totalEvaluation + 100000;
  } else if (board.in_checkmate() && board.turn() === "w") {
    return totalEvaluation - 100000;
  }
  return totalEvaluation;
};

const getPieceValue = function(piece, square) {
  if (piece === null) {
    return 0;
  }
  const getAbsoluteValue = function(piece) {
    let value;

    if (piece.type === "p") {
      value = 100;
    } else if (piece.type === "r") {
      value = 500;
    } else if (piece.type === "n") {
      value = 320;
    } else if (piece.type === "b") {
      value = 330;
    } else if (piece.type === "q") {
      value = 900;
    } else if (piece.type === "k") {
      value = 20000;
    }

    return value;
  };

  const getSquareValue = function(piece, square) {
    if (piece.color === "w") {
      if (piece.type === "p") {
        let val = pawnSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "r") {
        let val = rookSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "n") {
        let val = knightSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "b") {
        let val = bishopSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "q") {
        let val = queenSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "k") {
        let val = kingSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      }
    } else {
      if (piece.type === "p") {
        let val = pawnSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "r") {
        let val = rookSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "n") {
        let val = knightSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "b") {
        let val = bishopSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "q") {
        let val = queenSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "k") {
        let val = kingSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      }
    }
  };

  let value = getAbsoluteValue(piece) + getSquareValue(piece, square);

  if (piece.color === "w") {
    return value;
  } else {
    return -value;
  }
};

/*Chess Board Stuff*/
/*-----------------*/

function onDragStart(source, piece) {
  if (piece.charAt(0) === "b") {
    return false;
  }
}

function onDrop(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: "q"
  });

  if (move === null) {
    displayLoading(false);
    return "snapback";
  } else {
    displayLoading(true);
    setTimeout(function() {
      makeBestMove(game, 3);
      displayLoading(false);
      chessboard.position(game.fen());
      updateStatus();
    }, 250);
  }

  updateStatus();
}

function onSnapEnd() {
  chessboard.position(game.fen());
}

const $status = $(".status");

function updateStatus() {
  var status = "";

  var moveColor = "White";
  if (game.turn() === "b") {
    moveColor = "Black";
  }

  if (game.in_checkmate()) {
    status = "Game over, " + moveColor + " is in checkmate.";
  } else if (game.in_draw()) {
    status = "Game over, drawn position";
  } else {
    status = moveColor + " to move";

    if (game.in_check()) {
      status += ", " + moveColor + " is in check";
    }
  }

  $status.html(status);
}

const config = {
  pieceTheme: "img/chesspieces/fapieces/{piece}.png",
  showNotation: false,
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};

const chessboard = Chessboard("chessboard", config);

function makeBestMove(game, depth) {
  let bestMove = minimaxRoot(game, depth, true);
  game.move(bestMove);
  setTimeout(function() {
    chessboard.position(game.fen());
  }, 100);
}

const loading = document.querySelector(".loading");

function displayLoading(bool) {
  if (bool) {
    loading.style.visibility = "visible";
  } else {
    loading.style.visibility = "hidden";
  }
}
