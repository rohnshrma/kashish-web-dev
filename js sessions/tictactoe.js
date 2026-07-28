const testBoard = ["#", "X", "O", "X", "O", "X", "O", "X", "O", "X"];
function displayBoard(board) {
  alert(`${board[7]}  |  ${board[8]}  |  ${board[9]}\n
----------\n
${board[4]}  |  ${board[5]}  |  ${board[6]}\n
----------\n
${board[1]}  |  ${board[2]}  |  ${board[3]}`);
}

// displayBoard(testBoard);

function player_choice() {
  while (true) {
    var choice = prompt("Choose Between X or O : ").toLowerCase();

    if (choice === null) {
      continue;
    }

    if (choice == "x") {
      return { player_1: "X", player_2: "O" };
    }

    if (choice == "o") {
      return { player_1: "O", player_2: "X" };
    }

    alert("Invalid Choice! Please Enter either X or O");
  }
}

// var choices = player_choice();
// console.log(choices);

function choose_first() {
  if (Math.floor(Math.random() * 2) + 1 === 1) {
    return "Player 1";
  } else {
    return "Player 2";
  }
}

// const choice = choose_first();
// console.log(choice);

function place_marker(board, position, marker) {
  board[position] = marker;
  return board;
}

// displayBoard(testBoard);
// place_marker(testBoard, 4, "$")

// displayBoard(testBoard);

function win_check(board, marker) {
  return (
    (board[1] === marker && board[2] === marker && board[3] === marker) ||
    (board[4] === marker && board[5] === marker && board[6] === marker) ||
    (board[7] === marker && board[8] === marker && board[9] === marker) ||
    (board[1] === marker && board[4] === marker && board[7] === marker) ||
    (board[2] === marker && board[5] === marker && board[8] === marker) ||
    (board[3] === marker && board[6] === marker && board[9] === marker) ||
    (board[1] === marker && board[5] === marker && board[9] === marker) ||
    (board[3] === marker && board[5] === marker && board[7] === marker)
  );
}

// displayBoard(testBoard);
// var result = win_check(testBoard, "O");

// console.log(result);

function space_check(board, position) {
  return board[position] === " ";
}

displayBoard(testBoard);
console.log(space_check(testBoard, 1));

place_marker(testBoard, 5, " ");

displayBoard(testBoard);
console.log(space_check(testBoard, 5));

function full_board_check(board) {
  let isBoardFull = true;
  for (var i = 0; i < board.length; i++) {
    if (board[i] === " ") {
      isBoardFull = false;
    }
  }

  return isBoardFull;
}

console.log(full_board_check(testBoard));
