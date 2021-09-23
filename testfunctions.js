/////////////////
// to show game screen
const startGame = () => {
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
    const $numberCalled = $(".numberCalled");
    $numberCalled.on("click", callNumbers); // show new bingo number on click
  };
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
  
    const player1name = $(".player1 caption").text();
    const player2name = $(".player2 caption").text();
  
    checkSingleWin();
    checkTie();
  };

  const checkSingleWin = () => {
    if (checkWinClassic("player1") === true && checkWinClassic("player2") === false) {
      console.log("good player 1 win");
      declareWin();
      $("#winDisplay").text(player1name + " wins!");
    } else if (checkWinClassic("player2") === true && checkWinClassic("player1") === false) {
      console.log("good player 2 win");
      declareWin();
      $("#winDisplay").text(player2name + " wins!");
    } else {
      console.log("no wins yet!");
    }
  };
  
  const checkTie = () => {
    if (checkWin2("player2") === true && checkWin2("player1") === true) {
      console.log("good tie");
      declareWin();
      $("#winDisplay").text("It's a tie!");
    } else {
      console.log("no wins yet!");
    }
  };
  /////////////////////////////////
  // to evaluate win
  
  const showWin = (square1, square2, square3, square4, square5) => {
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

  const cardRows = ["1", "2", "3", "4", "5"];
  const cardCols = ["B", "I", "N", "G", "O"];

  
  for (let i=0; i<5; i++) {
  const winCon1 =
    $("." + player + " .row"+cardRows[i]+" "+cardCols[0]).hasClass("hit") &&
    $("." + player + " .row1 .I").hasClass("hit") &&
    $("." + player + " .row1 .N").hasClass("hit") &&
    $("." + player + " .row1 .G").hasClass("hit") &&
    $("." + player + " .row1 .O").hasClass("hit");
  }
  const winCon2 =
    $("." + player + " .row2 .B").hasClass("hit") &&
    $("." + player + " .row2 .I").hasClass("hit") &&
    $("." + player + " .row2 .N").hasClass("hit") &&
    $("." + player + " .row2 .G").hasClass("hit") &&
    $("." + player + " .row2 .O").hasClass("hit");

  const winCon3 =
    $("." + player + " .row3 .B").hasClass("hit") &&
    $("." + player + " .row3 .I").hasClass("hit") &&
    $("." + player + " .row3 .N").hasClass("hit") &&
    $("." + player + " .row3 .G").hasClass("hit") &&
    $("." + player + " .row3 .O").hasClass("hit");

  const winCon4 =
    $("." + player + " .row4 .B").hasClass("hit") &&
    $("." + player + " .row4 .I").hasClass("hit") &&
    $("." + player + " .row4 .N").hasClass("hit") &&
    $("." + player + " .row4 .G").hasClass("hit") &&
    $("." + player + " .row4 .O").hasClass("hit");

  const winCon5 =
    $("." + player + " .row5 .B").hasClass("hit") &&
    $("." + player + " .row5 .I").hasClass("hit") &&
    $("." + player + " .row5 .N").hasClass("hit") &&
    $("." + player + " .row5 .G").hasClass("hit") &&
    $("." + player + " .row5 .O").hasClass("hit");

  const winCon6 =
    $("." + player + " .row1 .B").hasClass("hit") &&
    $("." + player + " .row2 .B").hasClass("hit") &&
    $("." + player + " .row3 .B").hasClass("hit") &&
    $("." + player + " .row4 .B").hasClass("hit") &&
    $("." + player + " .row5 .B").hasClass("hit");

  const winCon7 =
    $("." + player + " .row1 .I").hasClass("hit") &&
    $("." + player + " .row2 .I").hasClass("hit") &&
    $("." + player + " .row3 .I").hasClass("hit") &&
    $("." + player + " .row4 .I").hasClass("hit") &&
    $("." + player + " .row5 .I").hasClass("hit");

  const winCon8 =
    $("." + player + " .row1 .N").hasClass("hit") &&
    $("." + player + " .row2 .N").hasClass("hit") &&
    $("." + player + " .row3 .N").hasClass("hit") &&
    $("." + player + " .row4 .N").hasClass("hit") &&
    $("." + player + " .row5 .N").hasClass("hit");

  const winCon9 =
    $("." + player + " .row1 .G").hasClass("hit") &&
    $("." + player + " .row2 .G").hasClass("hit") &&
    $("." + player + " .row3 .G").hasClass("hit") &&
    $("." + player + " .row4 .G").hasClass("hit") &&
    $("." + player + " .row5 .G").hasClass("hit");

  const winCon10 =
    $("." + player + " .row1 .O").hasClass("hit") &&
    $("." + player + " .row2 .O").hasClass("hit") &&
    $("." + player + " .row3 .O").hasClass("hit") &&
    $("." + player + " .row4 .O").hasClass("hit") &&
    $("." + player + " .row5 .O").hasClass("hit");

  const winCon11 =
    $("." + player + " .row1 .B").hasClass("hit") &&
    $("." + player + " .row2 .I").hasClass("hit") &&
    $("." + player + " .row3 .N").hasClass("hit") &&
    $("." + player + " .row4 .G").hasClass("hit") &&
    $("." + player + " .row5 .O").hasClass("hit");

  const winCon12 =
    $("." + player + " .row1 .O").hasClass("hit") &&
    $("." + player + " .row2 .G").hasClass("hit") &&
    $("." + player + " .row3 .N").hasClass("hit") &&
    $("." + player + " .row4 .I").hasClass("hit") &&
    $("." + player + " .row5 .B").hasClass("hit");
  
  const checkWinClassic = (player) => {
    console.log(player);
  
    if (
      //horizontal wins
      winCon1 === true
    ) {
      console.log("Player wins with bingo on row 1!");
      showWin(
        $("." + player + " .row1 .B"),
        $("." + player + " .row1 .I"),
        $("." + player + " .row1 .N"),
        $("." + player + " .row1 .G"),
        $("." + player + " .row1 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 1!"
      );
      return true;
    } else if (winCon2 === true) {
      console.log("Player wins with bingo on row 2!");
      showWin(
        $("." + player + " .row2 .B"),
        $("." + player + " .row2 .I"),
        $("." + player + " .row2 .N"),
        $("." + player + " .row2 .G"),
        $("." + player + " .row2 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 2!"
      );
      return true;
    } else if (winCon3 === true) {
      console.log("Player wins with bingo on row 3!");
      showWin(
        $("." + player + " .row3 .B"),
        $("." + player + " .row3 .I"),
        $("." + player + " .row3 .N"),
        $("." + player + " .row3 .G"),
        $("." + player + " .row3 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 3!"
      );
      return true;
    } else if (winCon4 === true) {
      console.log("Player wins with bingo on row 4!");
      showWin(
        $("." + player + " .row4 .B"),
        $("." + player + " .row4 .I"),
        $("." + player + " .row4 .N"),
        $("." + player + " .row4 .G"),
        $("." + player + " .row4 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 4!"
      );
      return true;
    } else if (winCon5 === true) {
      console.log("Player wins with bingo on row 5!");
      showWin(
        $("." + player + " .row5 .B"),
        $("." + player + " .row5 .I"),
        $("." + player + " .row5 .N"),
        $("." + player + " .row5 .G"),
        $("." + player + " .row5 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 5!"
      );
      return true;
    } else if (winCon6 === true) {
      // vertical wins
      console.log("Player wins with bingo on column B!");
      showWin(
        $("." + player + " .row1 .B"),
        $("." + player + " .row2 .B"),
        $("." + player + " .row3 .B"),
        $("." + player + " .row4 .B"),
        $("." + player + " .row5 .B")
        //   ,
        //   playername,
        //   " wins with bingo on column B!"
      );
      return true;
    } else if (winCon7 === true) {
      console.log("Player wins with bingo on column I!");
      showWin(
        $("." + player + " .row1 .I"),
        $("." + player + " .row2 .I"),
        $("." + player + " .row3 .I"),
        $("." + player + " .row4 .I"),
        $("." + player + " .row5 .I")
        //   ,
        //   playername,
        //   " wins with bingo on column I!"
      );
      return true;
    } else if (winCon8 === true) {
      console.log("Player wins with bingo on column N!");
      showWin(
        $("." + player + " .row1 .N"),
        $("." + player + " .row2 .N"),
        $("." + player + " .row3 .N"),
        $("." + player + " .row4 .N"),
        $("." + player + " .row5 .N")
        //   ,
        //   playername,
        //   " wins with bingo on column N!"
      );
      return true;
    } else if (winCon9 === true) {
      console.log("Player wins with bingo on column G!");
      showWin(
        $("." + player + " .row1 .G"),
        $("." + player + " .row2 .G"),
        $("." + player + " .row3 .G"),
        $("." + player + " .row4 .G"),
        $("." + player + " .row5 .G")
        //   ,
        //   playername,
        //   " wins with bingo on column G!"
      );
      return true;
    } else if (winCon10 === true) {
      console.log("Player wins with bingo on column O!");
      showWin(
        $("." + player + " .row1 .O"),
        $("." + player + " .row2 .O"),
        $("." + player + " .row3 .O"),
        $("." + player + " .row4 .O"),
        $("." + player + " .row5 .O")
        //   ,
        //   playername,
        //   " wins with bingo on column O!"
      );
      return true;
    } else if (winCon11 === true) {
      // diagonal win from top left corner
      console.log("Player wins with bingo diagonally from the top left corner!");
      showWin(
        $("." + player + " .row1 .B"),
        $("." + player + " .row2 .I"),
        $("." + player + " .row3 .N"),
        $("." + player + " .row4 .G"),
        $("." + player + " .row5 .O")
        //   ,
        //   playername,
        //   " wins with bingo diagonally from the top left corner!"
      );
      return true;
    } else if (winCon12 === true) {
      // diagonal win from top right corner
      console.log("Player wins with bingo diagonally from the top right corner!");
      showWin(
        $("." + player + " .row1 .O"),
        $("." + player + " .row2 .G"),
        $("." + player + " .row3 .N"),
        $("." + player + " .row4 .I"),
        $("." + player + " .row5 .B")
        //   ,
        //   playername,
        //   " wins with bingo diagonally from the top right corner!"
      );
      return true;
    } else {
      return false;
    }
  };
  
  // /////////////////////////////////
  
  const checkWin2 = (player) => {
    console.log(player);
    const winCon1 =
      $("." + player + " .row1 .B").hasClass("hit") &&
      $("." + player + " .row1 .I").hasClass("hit") &&
      $("." + player + " .row1 .N").hasClass("hit") &&
      $("." + player + " .row1 .G").hasClass("hit") &&
      $("." + player + " .row1 .O").hasClass("hit");
  
    const winCon2 =
      $("." + player + " .row2 .B").hasClass("hit") &&
      $("." + player + " .row2 .I").hasClass("hit") &&
      $("." + player + " .row2 .N").hasClass("hit") &&
      $("." + player + " .row2 .G").hasClass("hit") &&
      $("." + player + " .row2 .O").hasClass("hit");
  
    const winCon3 =
      $("." + player + " .row3 .B").hasClass("hit") &&
      $("." + player + " .row3 .I").hasClass("hit") &&
      $("." + player + " .row3 .N").hasClass("hit") &&
      $("." + player + " .row3 .G").hasClass("hit") &&
      $("." + player + " .row3 .O").hasClass("hit");
  
    const winCon4 =
      $("." + player + " .row4 .B").hasClass("hit") &&
      $("." + player + " .row4 .I").hasClass("hit") &&
      $("." + player + " .row4 .N").hasClass("hit") &&
      $("." + player + " .row4 .G").hasClass("hit") &&
      $("." + player + " .row4 .O").hasClass("hit");
  
    const winCon5 =
      $("." + player + " .row5 .B").hasClass("hit") &&
      $("." + player + " .row5 .I").hasClass("hit") &&
      $("." + player + " .row5 .N").hasClass("hit") &&
      $("." + player + " .row5 .G").hasClass("hit") &&
      $("." + player + " .row5 .O").hasClass("hit");
  
    const winCon6 =
      $("." + player + " .row1 .B").hasClass("hit") &&
      $("." + player + " .row2 .B").hasClass("hit") &&
      $("." + player + " .row3 .B").hasClass("hit") &&
      $("." + player + " .row4 .B").hasClass("hit") &&
      $("." + player + " .row5 .B").hasClass("hit");
  
    const winCon7 =
      $("." + player + " .row1 .I").hasClass("hit") &&
      $("." + player + " .row2 .I").hasClass("hit") &&
      $("." + player + " .row3 .I").hasClass("hit") &&
      $("." + player + " .row4 .I").hasClass("hit") &&
      $("." + player + " .row5 .I").hasClass("hit");
  
    const winCon8 =
      $("." + player + " .row1 .N").hasClass("hit") &&
      $("." + player + " .row2 .N").hasClass("hit") &&
      $("." + player + " .row3 .N").hasClass("hit") &&
      $("." + player + " .row4 .N").hasClass("hit") &&
      $("." + player + " .row5 .N").hasClass("hit");
  
    const winCon9 =
      $("." + player + " .row1 .G").hasClass("hit") &&
      $("." + player + " .row2 .G").hasClass("hit") &&
      $("." + player + " .row3 .G").hasClass("hit") &&
      $("." + player + " .row4 .G").hasClass("hit") &&
      $("." + player + " .row5 .G").hasClass("hit");
  
    const winCon10 =
      $("." + player + " .row1 .O").hasClass("hit") &&
      $("." + player + " .row2 .O").hasClass("hit") &&
      $("." + player + " .row3 .O").hasClass("hit") &&
      $("." + player + " .row4 .O").hasClass("hit") &&
      $("." + player + " .row5 .O").hasClass("hit");
  
    const winCon11 =
      $("." + player + " .row1 .B").hasClass("hit") &&
      $("." + player + " .row2 .I").hasClass("hit") &&
      $("." + player + " .row3 .N").hasClass("hit") &&
      $("." + player + " .row4 .G").hasClass("hit") &&
      $("." + player + " .row5 .O").hasClass("hit");
  
    const winCon12 =
      $("." + player + " .row1 .O").hasClass("hit") &&
      $("." + player + " .row2 .G").hasClass("hit") &&
      $("." + player + " .row3 .N").hasClass("hit") &&
      $("." + player + " .row4 .I").hasClass("hit") &&
      $("." + player + " .row5 .B").hasClass("hit");
  
    if (
      //horizontal wins
      winCon1 === true
    ) {
      console.log("Player wins with bingo on row 1!");
      showWin(
        $("." + player + " .row1 .B"),
        $("." + player + " .row1 .I"),
        $("." + player + " .row1 .N"),
        $("." + player + " .row1 .G"),
        $("." + player + " .row1 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 1!"
      );
      return true;
    } else if (winCon2 === true) {
      console.log("Player wins with bingo on row 2!");
      showWin(
        $("." + player + " .row2 .B"),
        $("." + player + " .row2 .I"),
        $("." + player + " .row2 .N"),
        $("." + player + " .row2 .G"),
        $("." + player + " .row2 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 2!"
      );
      return true;
    } else if (winCon3 === true) {
      console.log("Player wins with bingo on row 3!");
      showWin(
        $("." + player + " .row3 .B"),
        $("." + player + " .row3 .I"),
        $("." + player + " .row3 .N"),
        $("." + player + " .row3 .G"),
        $("." + player + " .row3 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 3!"
      );
      return true;
    } else if (winCon4 === true) {
      console.log("Player wins with bingo on row 4!");
      showWin(
        $("." + player + " .row4 .B"),
        $("." + player + " .row4 .I"),
        $("." + player + " .row4 .N"),
        $("." + player + " .row4 .G"),
        $("." + player + " .row4 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 4!"
      );
      return true;
    } else if (winCon5 === true) {
      console.log("Player wins with bingo on row 5!");
      showWin(
        $("." + player + " .row5 .B"),
        $("." + player + " .row5 .I"),
        $("." + player + " .row5 .N"),
        $("." + player + " .row5 .G"),
        $("." + player + " .row5 .O")
        //   ,
        //   playername,
        //   " wins with bingo on row 5!"
      );
      return true;
    } else if (winCon6 === true) {
      // vertical wins
      console.log("Player wins with bingo on column B!");
      showWin(
        $("." + player + " .row1 .B"),
        $("." + player + " .row2 .B"),
        $("." + player + " .row3 .B"),
        $("." + player + " .row4 .B"),
        $("." + player + " .row5 .B")
        //   ,
        //   playername,
        //   " wins with bingo on column B!"
      );
      return true;
    } else if (winCon7 === true) {
      console.log("Player wins with bingo on column I!");
      showWin(
        $("." + player + " .row1 .I"),
        $("." + player + " .row2 .I"),
        $("." + player + " .row3 .I"),
        $("." + player + " .row4 .I"),
        $("." + player + " .row5 .I")
        //   ,
        //   playername,
        //   " wins with bingo on column I!"
      );
      return true;
    } else if (winCon8 === true) {
      console.log("Player wins with bingo on column N!");
      showWin(
        $("." + player + " .row1 .N"),
        $("." + player + " .row2 .N"),
        $("." + player + " .row3 .N"),
        $("." + player + " .row4 .N"),
        $("." + player + " .row5 .N")
        //   ,
        //   playername,
        //   " wins with bingo on column N!"
      );
      return true;
    } else if (winCon9 === true) {
      console.log("Player wins with bingo on column G!");
      showWin(
        $("." + player + " .row1 .G"),
        $("." + player + " .row2 .G"),
        $("." + player + " .row3 .G"),
        $("." + player + " .row4 .G"),
        $("." + player + " .row5 .G")
        //   ,
        //   playername,
        //   " wins with bingo on column G!"
      );
      return true;
    } else if (winCon10 === true) {
      console.log("Player wins with bingo on column O!");
      showWin(
        $("." + player + " .row1 .O"),
        $("." + player + " .row2 .O"),
        $("." + player + " .row3 .O"),
        $("." + player + " .row4 .O"),
        $("." + player + " .row5 .O")
        //   ,
        //   playername,
        //   " wins with bingo on column O!"
      );
      return true;
    } else if (winCon11 === true) {
      // diagonal win from top left corner
      console.log("Player wins with bingo diagonally from the top left corner!");
      showWin(
        $("." + player + " .row1 .B"),
        $("." + player + " .row2 .I"),
        $("." + player + " .row3 .N"),
        $("." + player + " .row4 .G"),
        $("." + player + " .row5 .O")
        //   ,
        //   playername,
        //   " wins with bingo diagonally from the top left corner!"
      );
      return true;
    } else if (winCon12 === true) {
      // diagonal win from top right corner
      console.log("Player wins with bingo diagonally from the top right corner!");
      showWin(
        $("." + player + " .row1 .O"),
        $("." + player + " .row2 .G"),
        $("." + player + " .row3 .N"),
        $("." + player + " .row4 .I"),
        $("." + player + " .row5 .B")
        //   ,
        //   playername,
        //   " wins with bingo diagonally from the top right corner!"
      );
      return true;
    } else {
      return false;
    }
  };
  
  const main = () => {
    const $classicMode = $("#classicMode");
    const $hardMode = $("#hardMode");
    const $edgesMode = $("#edgesMode");
    $classicMode.on("click", startGame);
    $hardMode.on("click", startGame);
    $edgesMode.on("click", startGame);
  };
  
  $(main);
  