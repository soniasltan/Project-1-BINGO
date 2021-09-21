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

const declareWin = (square1, square2, square3, square4, square5) => {
  console.log("winner winner chicken dinner");
  square1.removeClass("hit").addClass("win");
  square2.removeClass("hit").addClass("win");
  square3.removeClass("hit").addClass("win");
  square4.removeClass("hit").addClass("win");
  square5.removeClass("hit").addClass("win");
  $(".numberCalled").text("WIN!").addClass("winMessage");
};

const checkWin = () => {
//   const announceWin = (text) => {
//     alert(text);
//   };
  if (
    //horizontal wins
    $(".player1 .row1 .B").hasClass("hit") &&
    $(".player1 .row1 .I").hasClass("hit") &&
    $(".player1 .row1 .N").hasClass("hit") &&
    $(".player1 .row1 .G").hasClass("hit") &&
    $(".player1 .row1 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 1!");
    declareWin(
      $(".player1 .row1 .B"),
      $(".player1 .row1 .I"),
      $(".player1 .row1 .N"),
      $(".player1 .row1 .G"),
      $(".player1 .row1 .O")
    );
    // announceWin("Player 1 wins with bingo on row 1!").delay(1000);
  } else if (
    $(".player2 .row1 .B").hasClass("hit") &&
    $(".player2 .row1 .I").hasClass("hit") &&
    $(".player2 .row1 .N").hasClass("hit") &&
    $(".player2 .row1 .G").hasClass("hit") &&
    $(".player2 .row1 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 1!");
    declareWin(
      $(".player2 .row1 .B"),
      $(".player2 .row1 .I"),
      $(".player2 .row1 .N"),
      $(".player2 .row1 .G"),
      $(".player2 .row1 .O")
    );
    // announceWin("Player 2 wins with bingo on row 1!").delay(1000);
  } else if (
    $(".player1 .row2 .B").hasClass("hit") &&
    $(".player1 .row2 .I").hasClass("hit") &&
    $(".player1 .row2 .N").hasClass("hit") &&
    $(".player1 .row2 .G").hasClass("hit") &&
    $(".player1 .row2 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 2!");
    declareWin(
      $(".player1 .row2 .B"),
      $(".player1 .row2 .I"),
      $(".player1 .row2 .N"),
      $(".player1 .row2 .G"),
      $(".player1 .row2 .O")
    );
    // announceWin("Player 1 wins with bingo on row 2!").delay(1000);
  } else if (
    $(".player2 .row2 .B").hasClass("hit") &&
    $(".player2 .row2 .I").hasClass("hit") &&
    $(".player2 .row2 .N").hasClass("hit") &&
    $(".player2 .row2 .G").hasClass("hit") &&
    $(".player2 .row2 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 2!");
    declareWin(
      $(".player2 .row2 .B"),
      $(".player2 .row2 .I"),
      $(".player2 .row2 .N"),
      $(".player2 .row2 .G"),
      $(".player2 .row2 .O")
    );
    // announceWin("Player 2 wins with bingo on row 2!").delay(1000);
  } else if (
    $(".player1 .row3 .B").hasClass("hit") &&
    $(".player1 .row3 .I").hasClass("hit") &&
    $(".player1 .row3 .N").hasClass("hit") &&
    $(".player1 .row3 .G").hasClass("hit") &&
    $(".player1 .row3 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 3!");
    declareWin(
      $(".player1 .row3 .B"),
      $(".player1 .row3 .I"),
      $(".player1 .row3 .N"),
      $(".player1 .row3 .G"),
      $(".player1 .row3 .O")
    );
    // announceWin("Player 1 wins with bingo on row 3!").delay(1000);
  } else if (
    $(".player2 .row3 .B").hasClass("hit") &&
    $(".player2 .row3 .I").hasClass("hit") &&
    $(".player2 .row3 .N").hasClass("hit") &&
    $(".player2 .row3 .G").hasClass("hit") &&
    $(".player2 .row3 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 3!");
    declareWin(
      $(".player2 .row3 .B"),
      $(".player2 .row3 .I"),
      $(".player2 .row3 .N"),
      $(".player2 .row3 .G"),
      $(".player2 .row3 .O")
    );
    // announceWin("Player 2 wins with bingo on row 3!").delay(1000);
  } else if (
    $(".player1 .row4 .B").hasClass("hit") &&
    $(".player1 .row4 .I").hasClass("hit") &&
    $(".player1 .row4 .N").hasClass("hit") &&
    $(".player1 .row4 .G").hasClass("hit") &&
    $(".player1 .row4 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 4!");
    declareWin(
      $(".player1 .row4 .B"),
      $(".player1 .row4 .I"),
      $(".player1 .row4 .N"),
      $(".player1 .row4 .G"),
      $(".player1 .row4 .O")
    );
    // announceWin("Player 1 wins with bingo on row 4!").delay(1000);
  } else if (
    $(".player2 .row4 .B").hasClass("hit") &&
    $(".player2 .row4 .I").hasClass("hit") &&
    $(".player2 .row4 .N").hasClass("hit") &&
    $(".player2 .row4 .G").hasClass("hit") &&
    $(".player2 .row4 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 4!");
    declareWin(
      $(".player2 .row4 .B"),
      $(".player2 .row4 .I"),
      $(".player2 .row4 .N"),
      $(".player2 .row4 .G"),
      $(".player2 .row4 .O")
    );
    // announceWin("Player 2 wins with bingo on row 4!").delay(1000);
  } else if (
    $(".player1 .row5 .B").hasClass("hit") &&
    $(".player1 .row5 .I").hasClass("hit") &&
    $(".player1 .row5 .N").hasClass("hit") &&
    $(".player1 .row5 .G").hasClass("hit") &&
    $(".player1 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on row 5!");
    declareWin(
      $(".player1 .row5 .B"),
      $(".player1 .row5 .I"),
      $(".player1 .row5 .N"),
      $(".player1 .row5 .G"),
      $(".player1 .row5 .O")
    );
    // announceWin("Player 1 wins with bingo on row 5!").delay(1000);
  } else if (
    $(".player2 .row5 .B").hasClass("hit") &&
    $(".player2 .row5 .I").hasClass("hit") &&
    $(".player2 .row5 .N").hasClass("hit") &&
    $(".player2 .row5 .G").hasClass("hit") &&
    $(".player2 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on row 5!");
    declareWin(
      $(".player2 .row5 .B"),
      $(".player2 .row5 .I"),
      $(".player2 .row5 .N"),
      $(".player2 .row5 .G"),
      $(".player2 .row5 .O")
    );
    // announceWin("Player 2 wins with bingo on row 5!").delay(1000);
  } else if (
    $(".player1 .row1 .B").hasClass("hit") &&
    $(".player1 .row2 .B").hasClass("hit") &&
    $(".player1 .row3 .B").hasClass("hit") &&
    $(".player1 .row4 .B").hasClass("hit") &&
    $(".player1 .row5 .B").hasClass("hit") === true
  ) {
    // vertical wins
    console.log("Player 1 wins with bingo on column B!");
    declareWin(
      $(".player1 .row1 .B"),
      $(".player1 .row2 .B"),
      $(".player1 .row3 .B"),
      $(".player1 .row4 .B"),
      $(".player1 .row5 .B")
    );
    // announceWin("Player 1 wins with bingo on column B!").delay(1000);
  } else if (
    $(".player2 .row1 .B").hasClass("hit") &&
    $(".player2 .row2 .B").hasClass("hit") &&
    $(".player2 .row3 .B").hasClass("hit") &&
    $(".player2 .row4 .B").hasClass("hit") &&
    $(".player2 .row5 .B").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column B!");
    declareWin(
      $(".player2 .row1 .B"),
      $(".player2 .row2 .B"),
      $(".player2 .row3 .B"),
      $(".player2 .row4 .B"),
      $(".player2 .row5 .B")
    );
    // announceWin("Player 2 wins with bingo on column B!").delay(1000);
  } else if (
    $(".player1 .row1 .I").hasClass("hit") &&
    $(".player1 .row2 .I").hasClass("hit") &&
    $(".player1 .row3 .I").hasClass("hit") &&
    $(".player1 .row4 .I").hasClass("hit") &&
    $(".player1 .row5 .I").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on column I!");
    declareWin(
      $(".player1 .row1 .I"),
      $(".player1 .row2 .I"),
      $(".player1 .row3 .I"),
      $(".player1 .row4 .I"),
      $(".player1 .row5 .I")
    );
    // announceWin("Player 1 wins with bingo on column I!").delay(1000);
  } else if (
    $(".player2 .row1 .I").hasClass("hit") &&
    $(".player2 .row2 .I").hasClass("hit") &&
    $(".player2 .row3 .I").hasClass("hit") &&
    $(".player2 .row4 .I").hasClass("hit") &&
    $(".player2 .row5 .I").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column I!");
    declareWin(
      $(".player2 .row1 .I"),
      $(".player2 .row2 .I"),
      $(".player2 .row3 .I"),
      $(".player2 .row4 .I"),
      $(".player2 .row5 .I")
    );
    // announceWin("Player 2 wins with bingo on column I!").delay(1000);
  } else if (
    $(".player1 .row1 .N").hasClass("hit") &&
    $(".player1 .row2 .N").hasClass("hit") &&
    $(".player1 .row3 .N").hasClass("hit") &&
    $(".player1 .row4 .N").hasClass("hit") &&
    $(".player1 .row5 .N").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on column N!");
    declareWin(
      $(".player1 .row1 .N"),
      $(".player1 .row2 .N"),
      $(".player1 .row3 .N"),
      $(".player1 .row4 .N"),
      $(".player1 .row5 .N")
    );
    // announceWin("Player 1 wins with bingo on column N!").delay(1000);
  } else if (
    $(".player2 .row1 .N").hasClass("hit") &&
    $(".player2 .row2 .N").hasClass("hit") &&
    $(".player2 .row3 .N").hasClass("hit") &&
    $(".player2 .row4 .N").hasClass("hit") &&
    $(".player2 .row5 .N").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column N!");
    declareWin(
      $(".player2 .row1 .N"),
      $(".player2 .row2 .N"),
      $(".player2 .row3 .N"),
      $(".player2 .row4 .N"),
      $(".player2 .row5 .N")
    );
    // announceWin("Player 2 wins with bingo on column N!").delay(1000);
  } else if (
    $(".player1 .row1 .G").hasClass("hit") &&
    $(".player1 .row2 .G").hasClass("hit") &&
    $(".player1 .row3 .G").hasClass("hit") &&
    $(".player1 .row4 .G").hasClass("hit") &&
    $(".player1 .row5 .G").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on column G!");
    declareWin(
      $(".player1 .row1 .G"),
      $(".player1 .row2 .G"),
      $(".player1 .row3 .G"),
      $(".player1 .row4 .G"),
      $(".player1 .row5 .G")
    );
    // announceWin("Player 1 wins with bingo on column G!").delay(1000);
  } else if (
    $(".player2 .row1 .G").hasClass("hit") &&
    $(".player2 .row2 .G").hasClass("hit") &&
    $(".player2 .row3 .G").hasClass("hit") &&
    $(".player2 .row4 .G").hasClass("hit") &&
    $(".player2 .row5 .G").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column G!");
    declareWin(
      $(".player2 .row1 .G"),
      $(".player2 .row2 .G"),
      $(".player2 .row3 .G"),
      $(".player2 .row4 .G"),
      $(".player2 .row5 .G")
    );
    // announceWin("Player 2 wins with bingo on column G!").delay(1000);
  } else if (
    $(".player1 .row1 .O").hasClass("hit") &&
    $(".player1 .row2 .O").hasClass("hit") &&
    $(".player1 .row3 .O").hasClass("hit") &&
    $(".player1 .row4 .O").hasClass("hit") &&
    $(".player1 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 1 wins with bingo on column O!");
    declareWin(
      $(".player1 .row1 .O"),
      $(".player1 .row2 .O"),
      $(".player1 .row3 .O"),
      $(".player1 .row4 .O"),
      $(".player1 .row5 .O")
    );
    // announceWin("Player 1 wins with bingo on column O!").delay(1000);
  } else if (
    $(".player2 .row1 .O").hasClass("hit") &&
    $(".player2 .row2 .O").hasClass("hit") &&
    $(".player2 .row3 .O").hasClass("hit") &&
    $(".player2 .row4 .O").hasClass("hit") &&
    $(".player2 .row5 .O").hasClass("hit") === true
  ) {
    console.log("Player 2 wins with bingo on column O!");
    declareWin(
      $(".player2 .row1 .O"),
      $(".player2 .row2 .O"),
      $(".player2 .row3 .O"),
      $(".player2 .row4 .O"),
      $(".player2 .row5 .O")
    );
    // announceWin("Player 2 wins with bingo on column O!").delay(1000);
  } else if (
    $(".player1 .row1 .B").hasClass("hit") &&
    $(".player1 .row2 .I").hasClass("hit") &&
    $(".player1 .row4 .G").hasClass("hit") &&
    $(".player1 .row5 .O").hasClass("hit") === true
  ) {
    // diagonal win from top left corner
    console.log(
      "Player 1 wins with bingo diagonally from the top left corner!"
    );
    declareWin(
      $(".player1 .row1 .B"),
      $(".player1 .row2 .I"),
      $(".player1 .row3 .N"),
      $(".player1 .row4 .G"),
      $(".player1 .row5 .O")
    );
    // announceWin(
    //   "Player 1 wins with bingo diagonally from the top left corner!"
    // ).delay(1000);
  } else if (
    $(".player2 .row1 .B").hasClass("hit") &&
    $(".player2 .row2 .I").hasClass("hit") &&
    $(".player2 .row4 .G").hasClass("hit") &&
    $(".player2 .row5 .O").hasClass("hit") === true
  ) {
    console.log(
      "Player 2 wins with bingo diagonally from the top left corner!"
    );
    declareWin(
      $(".player2 .row1 .B"),
      $(".player2 .row2 .I"),
      $(".player2 .row3 .N"),
      $(".player2 .row4 .G"),
      $(".player2 .row5 .O")
    );
    // announceWin(
    //   "Player 2 wins with bingo diagonally from the top left corner!"
    // ).delay(1000);
  } else if (
    $(".player1 .row1 .O").hasClass("hit") &&
    $(".player1 .row2 .G").hasClass("hit") &&
    $(".player1 .row4 .I").hasClass("hit") &&
    $(".player1 .row5 .B").hasClass("hit") === true
  ) {
    // diagonal win from top right corner
    console.log(
      "Player 1 wins with bingo diagonally from the top right corner!"
    );
    declareWin(
      $(".player1 .row1 .O"),
      $(".player1 .row2 .G"),
      $(".player1 .row3 .N"),
      $(".player1 .row4 .I"),
      $(".player1 .row5 .B")
    );
    // announceWin(
    //   "Player 1 wins with bingo diagonally from the top right corner!"
    // ).delay(1000);
  } else if (
    $(".player2 .row1 .O").hasClass("hit") &&
    $(".player2 .row2 .G").hasClass("hit") &&
    $(".player2 .row4 .I").hasClass("hit") &&
    $(".player2 .row5 .B").hasClass("hit") === true
  ) {
    console.log(
      "Player 2 wins with bingo diagonally from the top right corner!"
    );
    declareWin(
      $(".player2 .row1 .O"),
      $(".player2 .row2 .G"),
      $(".player2 .row3 .N"),
      $(".player2 .row4 .I"),
      $(".player2 .row5 .B")
    );
    // announceWin(
    //   "Player 2 wins with bingo diagonally from the top right corner!"
    // ).delay(1000);
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
  const $numberCalled = $(".numberCalled");
  $numberCalled.on("click", callNumbers); // show new bingo number on click
};

$(main);
