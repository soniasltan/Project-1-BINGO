/////////////////
// to show Classic game screen
const startClassic = () => {
  gameSetUp();
  const $numberCalled = $(".numberCalled");
  $numberCalled.on("click", callNumbersClassic); // show new bingo number on click
};

const checkWinClassic = (player) => {
  if (verticalWin(player) === true) {
    console.log(player + " won vertically");
    return true;
  } else if (horizontalWin(player) === true) {
    console.log(player + " won horizontally");
    return true;
  } else if (diagonalWinL(player) === true) {
    console.log(player + " won diagonally from the top left");
    return true;
  } else if (diagonalWinR(player) === true) {
    console.log(player + " won diagonally from the top right");
    return true;
  } else {
    return false;
  }
};

const showWinClassic = (player) => {
  console.log("winner winner chicken dinner");
  if (diagonalWinL(player) === true) {
    for (let i = 0; i < rowClass.length; i++) {
      winningCombi[player].row.push(rowClass[i]);
      winningCombi[player].col.push(colClass[i]);
    }
  } else if (diagonalWinR(player) === true) {
    for (let i = 0; i < rowClass.length; i++) {
      winningCombi[player].row.push(rowClass[i]);
      winningCombi[player].col.push(colClass[4 - i]);
    }
  } else if (verticalWin(player) === true) {
    for (let i = 0; i < rowClass.length; i++) {
      winningCombi[player].row.push(rowClass[i]);
      winningCombi[player].col.push(colClass[winningCol]);
    }
  } else if (horizontalWin(player) === true) {
    for (let i = 0; i < rowClass.length; i++) {
      winningCombi[player].row.push(rowClass[winningRow]);
      winningCombi[player].col.push(colClass[i]);
    }
  }

  for (let i = 0; i < winningCombi[player].row.length; i++) {
    $(
      player +
        " " +
        winningCombi[player].row[i] +
        " " +
        winningCombi[player].col[i]
    )
      .removeClass("hit")
      .addClass("win");
  }
};

const callNumbersClassic = () => {
  const $h1 = $(".currentNumber");
  const bingoIndex = Math.floor(Math.random() * availBingoNums.length);
  $h1.text(availBingoNums[bingoIndex]);
  availBingoNums.splice(bingoIndex, 1);

  const currentNumber = $h1.text();
  $(".player1 ." + currentNumber).addClass("hit");
  $(".player2 ." + currentNumber).addClass("hit"); //if a td on the bingo card matches the current number being called, adds "hit" class to the td and marks it with a pink circle

  const player1 = ".player1";
  const player2 = ".player2";
  const player1name = $(".player1 caption").text();
  const player2name = $(".player2 caption").text();

  if (checkWinClassic(player1) === true && checkWinClassic(player2) === false) {
    console.log("good player 1 win");
    showWinClassic(player1);
    console.log("congrats player 1 only");
    declareWin();
    $("#winDisplay").text(player1name + " wins!");
  } else if (
    checkWinClassic(player2) === true &&
    checkWinClassic(player1) === false
  ) {
    console.log("good player 2 win");
    showWinClassic(player2);
    console.log("congrats player 2 only");
    declareWin();
    $("#winDisplay").text(player2name + " wins!");
  } else if (
    checkWinClassic(player1) === true &&
    checkWinClassic(player2) === true
  ) {
    console.log("good tie");
    showWinClassic(player1);
    console.log("congrats player 1 tie");
    showWinClassic(player2);
    console.log("congrats player 2 tie");
    declareWin();
    $("#winDisplay").text("It's a tie!");
  } else {
    console.log("no wins yet!");
  }
};
/////////////////

// to show Diamond game screen
const startDiamond = () => {
  gameSetUp();
  const $numberCalled = $(".numberCalled");
  $numberCalled.on("click", callNumbersDiamond); // show new bingo number on click
};

const checkWinDiamond = (player) => {
  if (diamondWin(player) === true) {
    return true;
  } else {
    return false;
  }
};

const showWinDiamond = (player) => {
  console.log("winner winner chicken dinner");
  if (diamondWin(player) === true) {
    winningCombi[player].row.push(
      rowClass[0],
      rowClass[1],
      rowClass[1],
      rowClass[2],
      rowClass[2],
      rowClass[3],
      rowClass[3],
      rowClass[4]
    );
    winningCombi[player].col.push(
      colClass[2],
      colClass[1],
      colClass[3],
      colClass[0],
      colClass[4],
      colClass[1],
      colClass[3],
      colClass[2]
    );
  }

  for (let i = 0; i < winningCombi[player].row.length; i++) {
    $(
      player +
        " " +
        winningCombi[player].row[i] +
        " " +
        winningCombi[player].col[i]
    )
      .removeClass("hit")
      .addClass("win");
  }
};

const callNumbersDiamond = () => {
  const $h1 = $(".currentNumber");
  const bingoIndex = Math.floor(Math.random() * availBingoNums.length);
  $h1.text(availBingoNums[bingoIndex]);
  availBingoNums.splice(bingoIndex, 1);

  const currentNumber = $h1.text();
  $(".player1 ." + currentNumber).addClass("hit");
  $(".player2 ." + currentNumber).addClass("hit"); //if a td on the bingo card matches the current number being called, adds "hit" class to the td and marks it with a pink circle

  const player1 = ".player1";
  const player2 = ".player2";
  const player1name = $(".player1 caption").text();
  const player2name = $(".player2 caption").text();

  if (checkWinDiamond(player1) === true && checkWinDiamond(player2) === false) {
    console.log("good player 1 win");
    showWinDiamond(player1);
    console.log("congrats player 1 only");
    declareWin();
    $("#winDisplay").text(player1name + " wins!");
  } else if (
    checkWinDiamond(player2) === true &&
    checkWinDiamond(player1) === false
  ) {
    console.log("good player 2 win");
    showWinDiamond(player2);
    console.log("congrats player 2 only");
    declareWin();
    $("#winDisplay").text(player2name + " wins!");
  } else if (
    checkWinDiamond(player1) === true &&
    checkWinDiamond(player2) === true
  ) {
    console.log("good tie");
    showWinDiamond(player1);
    console.log("congrats player 1 tie");
    showWinDiamond(player2);
    console.log("congrats player 2 tie");
    declareWin();
    $("#winDisplay").text("It's a tie!");
  } else {
    console.log("no wins yet!");
  }
};
////////////

// to show Edges game screen
const startEdges = () => {
  gameSetUp();
  const $numberCalled = $(".numberCalled");
  $numberCalled.on("click", callNumbersEdges); // show new bingo number on click
};

const checkWinEdges = (player) => {
  if (
    topEdgeWin(player) === true &&
    bottomEdgeWin(player) === true &&
    leftEdgeWin(player) === true &&
    rightEdgeWin(player) === true
  ) {
    console.log(player + " completed all edges!");
    return true;
  } else {
    return false;
  }
};

const showWinEdges = (player) => {
  console.log("winner winner chicken dinner");
  if (topEdgeWin(player) === true) {
    for (let i = 0; i < rowClass.length; i++) {
      winningCombi[player].row.push(rowClass[0]);
      winningCombi[player].col.push(colClass[i]);
    }
  }
  if (bottomEdgeWin(player) === true) {
    for (let i = 0; i < rowClass.length; i++) {
      winningCombi[player].row.push(rowClass[4]);
      winningCombi[player].col.push(colClass[i]);
    }
  }
  if (leftEdgeWin(player) === true) {
    for (let i = 0; i < rowClass.length; i++) {
      winningCombi[player].row.push(rowClass[i]);
      winningCombi[player].col.push(colClass[0]);
    }
  }
  if (rightEdgeWin(player) === true) {
    for (let i = 0; i < rowClass.length; i++) {
      winningCombi[player].row.push(rowClass[i]);
      winningCombi[player].col.push(colClass[4]);
    }
  }

  for (let i = 0; i < winningCombi[player].row.length; i++) {
    $(
      player +
        " " +
        winningCombi[player].row[i] +
        " " +
        winningCombi[player].col[i]
    )
      .removeClass("hit")
      .addClass("win");
  }
};

const callNumbersEdges = () => {
  const $h1 = $(".currentNumber");
  const bingoIndex = Math.floor(Math.random() * availBingoNums.length);
  $h1.text(availBingoNums[bingoIndex]);
  availBingoNums.splice(bingoIndex, 1);

  const currentNumber = $h1.text();
  $(".player1 ." + currentNumber).addClass("hit");
  $(".player2 ." + currentNumber).addClass("hit"); //if a td on the bingo card matches the current number being called, adds "hit" class to the td and marks it with a pink circle

  const player1 = ".player1";
  const player2 = ".player2";
  const player1name = $(".player1 caption").text();
  const player2name = $(".player2 caption").text();

  if (checkWinEdges(player1) === true && checkWinEdges(player2) === false) {
    console.log("good player 1 win");
    showWinEdges(player1);
    console.log("congrats player 1 only");
    declareWin();
    $("#winDisplay").text(player1name + " wins!");
  } else if (
    checkWinEdges(player2) === true &&
    checkWinEdges(player1) === false
  ) {
    console.log("good player 2 win");
    showWinEdges(player2);
    console.log("congrats player 2 only");
    declareWin();
    $("#winDisplay").text(player2name + " wins!");
  } else if (
    checkWinEdges(player1) === true &&
    checkWinEdges(player2) === true
  ) {
    console.log("good tie");
    showWinEdges(player1);
    console.log("congrats player 1 tie");
    showWinEdges(player2);
    console.log("congrats player 2 tie");
    declareWin();
    $("#winDisplay").text("It's a tie!");
  } else {
    console.log("no wins yet!");
  }
};
////////////
const gameSetUp = () => {
  $("#startScreen").toggle();
  $("#gameScreen").toggle();
  const player1input = $("#player1name");
  const player2input = $("#player2name");
  if (player1input.val() === "") {
    $(".player1 caption").text(player1input.attr("placeholder"));
  } else {
    $(".player1 caption").text(player1input.val());
  }
  if (player2input.val() === "") {
    $(".player2 caption").text(player2input.attr("placeholder"));
  } else {
    $(".player2 caption").text(player2input.val());
  }

  for (let i = 0; i < 75; i++) {
    availBingoNums.push(i + 1);
  }

  const $player1card = $(".player1");
  const $player2card = $(".player2");
  chooseRandomNums($player1card); // creates ramdom numbers for bingo card
  $(".player1 tr.row3 td.N").text("FREE");
  chooseRandomNums($player2card);
  $(".player2 tr.row3 td.N").text("FREE");
  $(".N:contains('FREE')")
    .addClass("hit")
    .attr("id", "N3")
    .css("font-size", "24px");

  const reset = () => {
    location.reload();
  };
  $(".reset").on("click", reset);
};

////////////
// for bingo cards
const availCardNums = [
  { col: "B", nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
  {
    col: "I",
    nums: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  },
  {
    col: "N",
    nums: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  },
  {
    col: "G",
    nums: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  },
  {
    col: "O",
    nums: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
  },
];

const makeTableRow = (numB, numI, numN, numG, numO) => {
  const $tr = $("<tr>");
  const $tdB = $("<td>")
    .addClass("B " + numB)
    .text(numB);
  const $tdI = $("<td>")
    .addClass("I " + numI)
    .text(numI);
  const $tdN = $("<td>")
    .addClass("N " + numN)
    .text(numN);
  const $tdG = $("<td>")
    .addClass("G " + numG)
    .text(numG);
  const $tdO = $("<td>")
    .addClass("O " + numO)
    .text(numO);
  $tr.append($tdB, $tdI, $tdN, $tdG, $tdO);
  return $tr;
};

const makeTable = (tableNums, $parent) => {
  for (let i = 0; i < tableNums.length; i++) {
    const numB = tableNums[i].num[0];
    const numI = tableNums[i].num[1];
    const numN = tableNums[i].num[2];
    const numG = tableNums[i].num[3];
    const numO = tableNums[i].num[4];
    let rowNum = (i + 1).toString();
    $tr = makeTableRow(numB, numI, numN, numG, numO).addClass("row" + rowNum);
    $parent.append($tr);
  }
};

const tableNums = [
  { row: "1", num: null }, // B1, I1, N1, G1, O1
  { row: "2", num: null },
  { row: "3", num: null },
  { row: "4", num: null },
  { row: "5", num: null },
];
const chooseRandomNums = ($parent) => {
  const fillRow = () => {
    let arr = [];
    for (let i = 0; i < availCardNums.length; i++) {
      const randIndex = Math.floor(
        Math.random() * availCardNums[0].nums.length
      );
      arr.push(availCardNums[i].nums[randIndex]);
      availCardNums[i].nums.splice(randIndex, 1);
    }
    return arr;
  };
  for (let i = 0; i < tableNums.length; i++) {
    tableNums[i].num = fillRow();
  }
  makeTable(tableNums, $parent);
  for (let x = 0; x < tableNums[0].num.length; x++) {
    for (let i = 0; i < tableNums[0].num.length; i++) {
      // adds removed numbers back into availCardNums array
      availCardNums[i].nums.push(tableNums[x].num[i]);
    }
  }
};
/////////////////////////////////
// to call bingo numbers
const availBingoNums = [];

/////////////////////////////////
// to evaluate win

const declareWin = () => {
  $(".numberCalled").text("BINGO!").addClass("winAlert");
  const $topDisplay = $(".topDisplay");
  const $winDisplay = $("<h2>").attr("id", "winDisplay");
  $topDisplay.append($winDisplay);
};

const colClass = [".B", ".I", ".N", ".G", ".O"];
const rowClass = [".row1", ".row2", ".row3", ".row4", ".row5"];
let winningRow = null;
let winningCol = null;

const winningCombi = {
  ".player1": { row: [], col: [] },
  ".player2": { row: [], col: [] },
};

const diamondWin = (player) => {
  if (
    $(player + " " + rowClass[0] + " " + colClass[2]).hasClass("hit") &&
    $(player + " " + rowClass[1] + " " + colClass[1]).hasClass("hit") &&
    $(player + " " + rowClass[1] + " " + colClass[3]).hasClass("hit") &&
    $(player + " " + rowClass[2] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[2] + " " + colClass[4]).hasClass("hit") &&
    $(player + " " + rowClass[3] + " " + colClass[1]).hasClass("hit") &&
    $(player + " " + rowClass[3] + " " + colClass[3]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[2]).hasClass("hit")
  ) {
    return true;
  }
};

const topEdgeWin = (player) => {
  if (
    $(player + " " + rowClass[0] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[0] + " " + colClass[1]).hasClass("hit") &&
    $(player + " " + rowClass[0] + " " + colClass[2]).hasClass("hit") &&
    $(player + " " + rowClass[0] + " " + colClass[3]).hasClass("hit") &&
    $(player + " " + rowClass[0] + " " + colClass[4]).hasClass("hit")
  ) {
    return true;
  }
};

const bottomEdgeWin = (player) => {
  if (
    $(player + " " + rowClass[4] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[1]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[2]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[3]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[4]).hasClass("hit")
  ) {
    return true;
  }
};

const leftEdgeWin = (player) => {
  if (
    $(player + " " + rowClass[0] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[1] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[2] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[3] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[0]).hasClass("hit")
  ) {
    return true;
  }
};

const rightEdgeWin = (player) => {
  if (
    $(player + " " + rowClass[0] + " " + colClass[4]).hasClass("hit") &&
    $(player + " " + rowClass[1] + " " + colClass[4]).hasClass("hit") &&
    $(player + " " + rowClass[2] + " " + colClass[4]).hasClass("hit") &&
    $(player + " " + rowClass[3] + " " + colClass[4]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[4]).hasClass("hit")
  ) {
    return true;
  }
};

const diagonalWinL = (player) => {
  // complete diagonal line of 5 squares with class "hit" starting from top left corner
  if (
    $(player + " " + rowClass[0] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[1] + " " + colClass[1]).hasClass("hit") &&
    $(player + " " + rowClass[2] + " " + colClass[2]).hasClass("hit") &&
    $(player + " " + rowClass[3] + " " + colClass[3]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[4]).hasClass("hit")
  ) {
    return true;
  }
};
const diagonalWinR = (player) => {
  // complete diagonal line of 5 squares with class "hit" starting from top right corner
  if (
    $(player + " " + rowClass[0] + " " + colClass[4]).hasClass("hit") &&
    $(player + " " + rowClass[1] + " " + colClass[3]).hasClass("hit") &&
    $(player + " " + rowClass[2] + " " + colClass[2]).hasClass("hit") &&
    $(player + " " + rowClass[3] + " " + colClass[1]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[0]).hasClass("hit")
  ) {
    return true;
  }
};

const verticalWin = (player) => {
  // loops over each complete vertical line of 5 squares with class "hit", starting from column B
  for (let i = 0; i < rowClass.length; i++) {
    if (
      $(player + " " + rowClass[0] + " " + colClass[i]).hasClass("hit") &&
      $(player + " " + rowClass[1] + " " + colClass[i]).hasClass("hit") &&
      $(player + " " + rowClass[2] + " " + colClass[i]).hasClass("hit") &&
      $(player + " " + rowClass[3] + " " + colClass[i]).hasClass("hit") &&
      $(player + " " + rowClass[4] + " " + colClass[i]).hasClass("hit")
    ) {
      winningCol = i;
      return true;
    }
  }
};
const horizontalWin = (player) => {
  // loops over each complete horizontal line of 5 squares with class "hit", starting from row 1
  for (let i = 0; i < colClass.length; i++) {
    if (
      $(player + " " + rowClass[i] + " " + colClass[0]).hasClass("hit") &&
      $(player + " " + rowClass[i] + " " + colClass[1]).hasClass("hit") &&
      $(player + " " + rowClass[i] + " " + colClass[2]).hasClass("hit") &&
      $(player + " " + rowClass[i] + " " + colClass[3]).hasClass("hit") &&
      $(player + " " + rowClass[i] + " " + colClass[4]).hasClass("hit")
    ) {
      winningRow = i;
      return true;
    }
  }
};

// /////////////////////////////////

const main = () => {
  const $classicMode = $("#classicMode");
  const $diamondMode = $("#diamondMode");
  const $edgesMode = $("#edgesMode");
  $classicMode.on("click", startClassic);
  $diamondMode.on("click", startDiamond);
  $edgesMode.on("click", startEdges);
};

$(main);
