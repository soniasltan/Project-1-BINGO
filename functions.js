/////////////////
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
  for (let i = 0; i < tableNums[0].num.length; i++) {
    // adds removed numbers back into availCardNums array
    availCardNums[i].nums.push(tableNums[0].num[i]);
    availCardNums[i].nums.push(tableNums[1].num[i]);
    availCardNums[i].nums.push(tableNums[2].num[i]);
    availCardNums[i].nums.push(tableNums[3].num[i]);
    availCardNums[i].nums.push(tableNums[4].num[i]);
  }
};
/////////////////////////////////
// to call bingo numbers
const availBingoNums = [];

const callNumbers = () => {
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

  checkWin();
  /////////////////////////////////
};

/////////////////////////////////
// to evaluate win

const checkWin = () => {
  if (
    $(".player1 .row1 .B").hasClass("hit") &&
    $(".player1 .row1 .I").hasClass("hit") &&
    $(".player1 .row1 .N").hasClass("hit") &&
    $(".player1 .row1 .G").hasClass("hit") &&
    $(".player1 .row1 .O").hasClass("hit") === true
  ) {
    //horizontal wins
    console.log("Player 1 wins with bingo on row 1!");
  } else if (
    $(".player2 .row1 .B").hasClass("hit") &&
    $(".player2 .row1 .I").hasClass("hit") &&
    $(".player2 .row1 .N").hasClass("hit") &&
    $(".player2 .row1 .G").hasClass("hit") &&
    $(".player2 .row1 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 1!");
  } else if (
    $(".player1 .row2 .B").hasClass("hit") &&
    $(".player1 .row2 .I").hasClass("hit") &&
    $(".player1 .row2 .N").hasClass("hit") &&
    $(".player1 .row2 .G").hasClass("hit") &&
    $(".player1 .row2 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 2!");
  } else if (
    $(".player2 .row2 .B").hasClass("hit") &&
    $(".player2 .row2 .I").hasClass("hit") &&
    $(".player2 .row2 .N").hasClass("hit") &&
    $(".player2 .row2 .G").hasClass("hit") &&
    $(".player2 .row2 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 2!");
  } else if (
    $(".player1 .row3 .B").hasClass("hit") &&
    $(".player1 .row3 .I").hasClass("hit") &&
    $(".player1 .row3 .N").hasClass("hit") &&
    $(".player1 .row3 .G").hasClass("hit") &&
    $(".player1 .row3 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 3!");
  } else if (
    $(".player2 .row3 .B").hasClass("hit") &&
    $(".player2 .row3 .I").hasClass("hit") &&
    $(".player2 .row3 .N").hasClass("hit") &&
    $(".player2 .row3 .G").hasClass("hit") &&
    $(".player2 .row3 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 3!");
  } else if (
    $(".player1 .row4 .B").hasClass("hit") &&
    $(".player1 .row4 .I").hasClass("hit") &&
    $(".player1 .row4 .N").hasClass("hit") &&
    $(".player1 .row4 .G").hasClass("hit") &&
    $(".player1 .row4 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 4!");
  } else if (
    $(".player2 .row4 .B").hasClass("hit") &&
    $(".player2 .row4 .I").hasClass("hit") &&
    $(".player2 .row4 .N").hasClass("hit") &&
    $(".player2 .row4 .G").hasClass("hit") &&
    $(".player2 .row4 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 4!");
  } else if (
    $(".player1 .row5 .B").hasClass("hit") &&
    $(".player1 .row5 .I").hasClass("hit") &&
    $(".player1 .row5 .N").hasClass("hit") &&
    $(".player1 .row5 .G").hasClass("hit") &&
    $(".player1 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 5!");
  } else if (
    $(".player2 .row5 .B").hasClass("hit") &&
    $(".player2 .row5 .I").hasClass("hit") &&
    $(".player2 .row5 .N").hasClass("hit") &&
    $(".player2 .row5 .G").hasClass("hit") &&
    $(".player2 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 5!");
  } else if (
    $(".player1 .row1 .B").hasClass("hit") &&
    $(".player1 .row2 .B").hasClass("hit") &&
    $(".player1 .row3 .B").hasClass("hit") &&
    $(".player1 .row4 .B").hasClass("hit") &&
    $(".player1 .row5 .B").hasClass("hit") === true
  ) {
    // vertical wins
    console.log("Player 1 wins with bingo on column B!");
  } else if (
    $(".player2 .row1 .B").hasClass("hit") &&
    $(".player2 .row2 .B").hasClass("hit") &&
    $(".player2 .row3 .B").hasClass("hit") &&
    $(".player2 .row4 .B").hasClass("hit") &&
    $(".player2 .row5 .B").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column B!");
  } else if (
    $(".player1 .row1 .I").hasClass("hit") &&
    $(".player1 .row2 .I").hasClass("hit") &&
    $(".player1 .row3 .I").hasClass("hit") &&
    $(".player1 .row4 .I").hasClass("hit") &&
    $(".player1 .row5 .I").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on column I!");
  } else if (
    $(".player2 .row1 .I").hasClass("hit") &&
    $(".player2 .row2 .I").hasClass("hit") &&
    $(".player2 .row3 .I").hasClass("hit") &&
    $(".player2 .row4 .I").hasClass("hit") &&
    $(".player2 .row5 .I").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column I!");
  } else if (
    $(".player1 .row1 .N").hasClass("hit") &&
    $(".player1 .row2 .N").hasClass("hit") &&
    $(".player1 .row3 .N").hasClass("hit") &&
    $(".player1 .row4 .N").hasClass("hit") &&
    $(".player1 .row5 .N").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on column N!");
  } else if (
    $(".player2 .row1 .N").hasClass("hit") &&
    $(".player2 .row2 .N").hasClass("hit") &&
    $(".player2 .row3 .N").hasClass("hit") &&
    $(".player2 .row4 .N").hasClass("hit") &&
    $(".player2 .row5 .N").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column N!");
  } else if (
    $(".player1 .row1 .G").hasClass("hit") &&
    $(".player1 .row2 .G").hasClass("hit") &&
    $(".player1 .row3 .G").hasClass("hit") &&
    $(".player1 .row4 .G").hasClass("hit") &&
    $(".player1 .row5 .G").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on column G!");
  } else if (
    $(".player2 .row1 .G").hasClass("hit") &&
    $(".player2 .row2 .G").hasClass("hit") &&
    $(".player2 .row3 .G").hasClass("hit") &&
    $(".player2 .row4 .G").hasClass("hit") &&
    $(".player2 .row5 .G").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column G!");
  } else if (
    $(".player1 .row1 .O").hasClass("hit") &&
    $(".player1 .row2 .O").hasClass("hit") &&
    $(".player1 .row3 .O").hasClass("hit") &&
    $(".player1 .row4 .O").hasClass("hit") &&
    $(".player1 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on column O!");
  } else if (
    $(".player2 .row1 .O").hasClass("hit") &&
    $(".player2 .row2 .O").hasClass("hit") &&
    $(".player2 .row3 .O").hasClass("hit") &&
    $(".player2 .row4 .O").hasClass("hit") &&
    $(".player2 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column O!");
  } else if (
    $(".player1 .row1 .B").hasClass("hit") &&
    $(".player1 .row2 .I").hasClass("hit") &&
    $(".player1 .row4 .G").hasClass("hit") &&
    $(".player1 .row5 .O").hasClass("hit") === true
  ) {
    // diagonal win from top left corner
    console.log("Player 1 wins with bingo diagonally from the top left corner!");
  } else if (
    $(".player2 .row1 .B").hasClass("hit") &&
    $(".player2 .row2 .I").hasClass("hit") &&
    $(".player2 .row4 .G").hasClass("hit") &&
    $(".player2 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo diagonally from the top left corner!");
  } else if (
    $(".player1 .row1 .O").hasClass("hit") &&
    $(".player1 .row2 .G").hasClass("hit") &&
    $(".player1 .row4 .I").hasClass("hit") &&
    $(".player1 .row5 .B").hasClass("hit") === true
  ) {
    // diagonal win from top right corner
    console.log("Player 1 wins with bingo diagonally from the top right corner!");
  } else if (
    $(".player2 .row1 .O").hasClass("hit") &&
    $(".player2 .row2 .G").hasClass("hit") &&
    $(".player2 .row4 .I").hasClass("hit") &&
    $(".player2 .row5 .B").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo diagonally from the top right corner!");
  } else {
    console.log("no wins yet!");
  }
};

/////////////////////////////////

const main = () => {
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
  const $numberCalled = $("#numberCalled");
  $numberCalled.on("click", callNumbers); // show new bingo number on click
};

$(main);
