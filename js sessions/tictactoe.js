var testBoard = ["#", "X", "O", "X", "O", "X", "O", "X", "O", "X"];
function displayBoard(board) {
  alert(`${board[7]}  |  ${board[8]}  |  ${board[9]}\n
----------\n
${board[4]}  |  ${board[5]}  |  ${board[6]}\n
----------\n
${board[1]}  |  ${board[2]}  |  ${board[3]}`);
}

// displayBoard(testBoard);

function player_choice() {
  var choice = prompt("Choose Between X or O : ").toUpperCase();
  while (!["X", "O"].includes(choice)) {
    choice = prompt("Choose Between X or O : ").toUpperCase();
  }

  if (choice == "X") {
    return { player_1: "X", player_2: "O" };
  }

  if (choice == "O") {
    return { player_1: "O", player_2: "X" };
  }

  alert("Invalid Choice! Please Enter either X or O");
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

// var choice = choose_first();
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

// displayBoard(testBoard);
// console.log(space_check(testBoard, 1));

// place_marker(testBoard, 5, " ");

// displayBoard(testBoard);
// console.log(space_check(testBoard, 5));

function full_board_check(board) {
  let isBoardFull = true;
  for (var i = 0; i < board.length; i++) {
    if (board[i] === " ") {
      isBoardFull = false;
    }
  }

  return isBoardFull;
}

function choose_position(board) {
  var position = parseInt(prompt("Choose Your Position 1-9 : "));

  while (
    ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(position) ||
    !space_check(board, position)
  ) {
    position = parseInt(prompt("Choose Your Position 1-9 : "));
  }

  return position;
}

// choose_position(testBoard);

function replay() {
  return (
    prompt("Do you want to play again 'Yes' or 'No' : ").toLowerCase()[0] ===
    "y"
  );
}

while (true) {
  var board = ["#", " ", " ", " ", " ", " ", " ", " ", " ", " "];

  var { player_1, player_2 } = player_choice();

  var turn = choose_first();

  console.log(`${turn} will go first`);

  if (
    prompt("Ready to play the game [Yes] or [No] : ").toLowerCase() === "yes"
  ) {
    var game_on = true;
  } else {
    var game_on = false;
  }

  while (game_on) {
    if (turn === "Player 1") {
      alert(`${turn}'s Turn.`);
      displayBoard(board);
      position = choose_position(board);
      place_marker(board, position, player_1);


      if (win_check(board, player_1)){
        alert("Congratulations! Player 1 You've won!")
        displayBoard(board)
        game_on = false
      }else{
        if (full_board_check(board)){
          alert("Game Draw!")
          displayBoard(board)
          break
        }else{
          turn = "Player 2"
        }
      }

    } else {
      alert(`${turn}'s Turn.`);
      displayBoard(board);
      position = choose_position(board);
      place_marker(board, position, player_2);


      if (win_check(board, player_2)){
        alert("Congratulations! Player 2 You've won!")
        displayBoard(board)
        game_on = false
      }else{
        if (full_board_check(board)){
          alert("Game Draw!")
          displayBoard(board)
          break
        }else{
          turn = "Player 1"
        }
      }
    }
  }

  if (!replay()){
    break
  }
  
}
