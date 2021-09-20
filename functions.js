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
  const $tdB = $("<td>").addClass("B").text(numB);
  const $tdI = $("<td>").addClass("I").text(numI);
  const $tdN = $("<td>").addClass("N").text(numN);
  const $tdG = $("<td>").addClass("G").text(numG);
  const $tdO = $("<td>").addClass("O").text(numO);
  $tr.append($tdB, $tdI, $tdN, $tdG, $tdO);
  return $tr;
};

const makeTable = (tableNums, $parent) => {
  for (let i = 0; i < tableNums.length; i++) {
    const numB = tableNums[i].row[0];
    const numI = tableNums[i].row[1];
    const numN = tableNums[i].row[2];
    const numG = tableNums[i].row[3];
    const numO = tableNums[i].row[4];
    let rowNum = (i+1).toString();
    $tr = makeTableRow(numB, numI, numN, numG, numO).addClass(rowNum);
    $parent.append($tr);
  }
};

const chooseRandomNums = ($parent) => {
  const tableNums = [
    { col: "B", row: null },
    { col: "I", row: null },
    { col: "N", row: null },
    { col: "G", row: null },
    { col: "O", row: null },
  ];
  const fillRow = () => {
    let arr = [];
    for (let i = 0; i < availCardNums.length; i++) {
      const randIndex = Math.floor(Math.random() * availCardNums[0].nums.length);
      arr.push(availCardNums[i].nums[randIndex]);
      availCardNums[i].nums.splice(randIndex, 1);
    }
    return arr;
    // }
  };
  for (let i = 0; i < tableNums.length; i++) {
    tableNums[i].row = fillRow();
  }
  tableNums[2].row[2] = "FREE"; // show 'FREE' in center square
  makeTable(tableNums, $parent);
};
/////////////////////////////////
// to call bingo numbers
const availBingoNums = [];

const callNumbers = () => {
    const $h1 = $("<h1>");
    for (let i=0; i<75; i++) {
        availBingoNums.push(i+1);
    }
    const $numberCalled = $("#numberCalled");
    const bingoIndex = Math.floor(Math.random()*availBingoNums.length);
    $h1.text(availBingoNums[bingoIndex]);
    availBingoNums.splice(bingoIndex,1);
    $numberCalled.append($h1);
}

/////////////////////////////////
// to register a hit if number called is present on bingo card

// const addHit = () => {
//     const currentNum = $("#numberCalled h1").text;
//     const $td = $("td");
//     if ($td.text === currentNum) {
//         $("td:contains(currentNum)").addClass("hit");
//     }
// }


/////////////////////////////////

const main = () => {
  const $player1card = $(".player1");
  const $player2card = $(".player2");
  chooseRandomNums($player1card); // creates ramdom numbers for bingo card
  chooseRandomNums($player2card);
  $(".N:contains('FREE')").addClass("hit").attr("id","N3").css("font-size", "16px");
  const $B1 = $("tr.1 td.B").attr("id","B1"); // create IDs for squares needed for diagonal wins
  const $I2 = $("tr.2 td.I").attr("id","I2");
  const $G4 = $("tr.4 td.G").attr("id","G4");
  const $O5 = $("tr.5 td.O").attr("id","O5");
  const $O1 = $("tr.1 td.O").attr("id","O1");
  const $G2 = $("tr.2 td.G").attr("id","G2");
  const $I4 = $("tr.4 td.I").attr("id","I4");
  const $B5 = $("tr.5 td.B").attr("id","B5");
  
callNumbers();
addHit();
};

$(main);
