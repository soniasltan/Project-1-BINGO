/////////////////
// to show Classic game screen
const startClassic = () => {
  gameSetUp();
  const $numberCalled = $(".numberCalled");
  $numberCalled.on("click", callNumbersClassic); // show new bingo number on click
};

const callNumbersClassic = () => {
  const $h1 = $(".currentNumber");
  for (let i = 0; i < 75; i++) {
    availBingoNums.push(i + 1);
  }
  const bingoIndex = Math.floor(Math.random() * availBingoNums.length);
  $h1.text(availBingoNums[bingoIndex]);
  availBingoNums.splice(bingoIndex, 1);

  const currentNumber = $h1.text();
  $(".player1 ." + currentNumber).addClass("hit");
  $(".player2 ." + currentNumber).addClass("hit"); //if a td on the bingo card matches the current number being called, adds "hit" class to the td and marks it with a pink circle

  const player1name = $(".player1 caption").text();
  const player2name = $(".player2 caption").text();

  if (checkWin(".player1") === true && checkWin(".player2") === true) {
    console.log("good tie");
    declareWin();
    $("#winDisplay").text("It's a tie!");
  } else if (checkWin(".player1") === true && checkWin(".player2") === false) {
    console.log("good player 1 win");
    declareWin();
    $("#winDisplay").text(player1name + " wins!");
  } else if (checkWin(".player2") === true && checkWin(".player1") === false) {
    console.log("good player 2 win");
    declareWin();
    $("#winDisplay").text(player2name + " wins!");
  } else {
    console.log("no wins yet!");
  }
};
/////////////////

// to show Hard game screen
const startHard = () => {
  gameSetUp();
  const $numberCalled = $(".numberCalled");
  $numberCalled.on("click", callNumbersHard); // show new bingo number on click
};
const callNumbersHard = () => {
  const $h1 = $(".currentNumber");
  for (let i = 0; i < 75; i++) {
    availBingoNums.push(i + 1);
  }
  const bingoIndex = Math.floor(Math.random() * availBingoNums.length);
  $h1.text(availBingoNums[bingoIndex]);
  availBingoNums.splice(bingoIndex, 1);

  const currentNumber = $h1.text();
  $(".player1 ." + currentNumber).addClass("hit");
  $(".player2 ." + currentNumber).addClass("hit"); //if a td on the bingo card matches the current number being called, adds "hit" class to the td and marks it with a pink circle

  checkSingleWin();
  checkTie();
};
////////////

// to show Edges game screen
const startEdges = () => {
  gameSetUp();
  const $numberCalled = $(".numberCalled");
  $numberCalled.on("click", callNumbers); // show new bingo number on click
};
const callNumbersEdges = () => {
  const $h1 = $(".currentNumber");
  for (let i = 0; i < 75; i++) {
    availBingoNums.push(i + 1);
  }
  const bingoIndex = Math.floor(Math.random() * availBingoNums.length);
  $h1.text(availBingoNums[bingoIndex]);
  availBingoNums.splice(bingoIndex, 1);

  const currentNumber = $h1.text();
  $(".player1 ." + currentNumber).addClass("hit");
  $(".player2 ." + currentNumber).addClass("hit"); //if a td on the bingo card matches the current number being called, adds "hit" class to the td and marks it with a pink circle

  checkSingleWin();
  checkTie();
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
  const $player1card = $(".player1");
  const $player2card = $(".player2");
  chooseRandomNums($player1card); // creates ramdom numbers for bingo card
  $(".player1 tr.row3 td.N").text("FREE");
  chooseRandomNums($player2card);
  $(".player2 tr.row3 td.N").text("FREE");
  $(".N:contains('FREE')")
    .addClass("hit")
    .attr("id", "N3")
    .css("font-size", "16px");
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

const showWin = (winCon) => {
  console.log("winner winner chicken dinner");
  square1.removeClass("hit").addClass("win");
  square2.removeClass("hit").addClass("win");
  square3.removeClass("hit").addClass("win");
  square4.removeClass("hit").addClass("win");
  square5.removeClass("hit").addClass("win");
};

const declareWin = () => {
  $(".numberCalled").text("BINGO!").addClass("winAlert");
  const $topDisplay = $(".topDisplay");
  const $winDisplay = $("<h2>").attr("id", "winDisplay");
  $topDisplay.append($winDisplay);
};

const checkWin = (player) => {
  const colClass = [".B", ".I", ".N", ".G", ".O"];
  const rowClass = [".row1", ".row2", ".row3", ".row4", ".row5"];

  const diagonalWinL = // complete diagonal line of 5 squares with class "hit" starting from top left corner
    $(player + " " + rowClass[0] + " " + colClass[0]).hasClass("hit") &&
    $(player + " " + rowClass[1] + " " + colClass[1]).hasClass("hit") &&
    $(player + " " + rowClass[2] + " " + colClass[2]).hasClass("hit") &&
    $(player + " " + rowClass[3] + " " + colClass[3]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[4]).hasClass("hit");
  const diagonalWinR = // complete diagonal line of 5 squares with class "hit" starting from top right corner
    $(player + " " + rowClass[0] + " " + colClass[4]).hasClass("hit") &&
    $(player + " " + rowClass[1] + " " + colClass[3]).hasClass("hit") &&
    $(player + " " + rowClass[2] + " " + colClass[2]).hasClass("hit") &&
    $(player + " " + rowClass[3] + " " + colClass[1]).hasClass("hit") &&
    $(player + " " + rowClass[4] + " " + colClass[0]).hasClass("hit");

  for (let i = 0; i < colClass.length; i++) {
    const verticalWin = // loops over each complete vertical line of 5 squares with class "hit", starting from column B
      $(player + " " + rowClass[0] + " " + colClass[i]).hasClass("hit") &&
      $(player + " " + rowClass[1] + " " + colClass[i]).hasClass("hit") &&
      $(player + " " + rowClass[2] + " " + colClass[i]).hasClass("hit") &&
      $(player + " " + rowClass[3] + " " + colClass[i]).hasClass("hit") &&
      $(player + " " + rowClass[4] + " " + colClass[i]).hasClass("hit");
    const horizontalWin = // loops over each complete horizontal line of 5 squares with class "hit", starting from row 1
      $(player + " " + rowClass[i] + " " + colClass[0]).hasClass("hit") &&
      $(player + " " + rowClass[i] + " " + colClass[1]).hasClass("hit") &&
      $(player + " " + rowClass[i] + " " + colClass[2]).hasClass("hit") &&
      $(player + " " + rowClass[i] + " " + colClass[3]).hasClass("hit") &&
      $(player + " " + rowClass[i] + " " + colClass[4]).hasClass("hit");
    if (verticalWin === true) {
      console.log(player + " won in column " + colClass[i]);
      return true;
    } else if (horizontalWin === true) {
      console.log(player + " won in " + rowClass[i]);
      return true;
    }
  }
  if (diagonalWinL === true) {
    console.log(player + " won diagonally from the top left");
    return true;
  } else if (diagonalWinR === true) {
    console.log(player + " won diagonally from the top right");
    return true;
  } else {
    return false;
  }
};

// /////////////////////////////////

const main = () => {
  const $classicMode = $("#classicMode");
  const $hardMode = $("#hardMode");
  const $edgesMode = $("#edgesMode");
  $classicMode.on("click", startClassic);
  $hardMode.on("click", startHard);
  $edgesMode.on("click", startEdges);
};

$(main);
