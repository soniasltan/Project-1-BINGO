/////////////////
// for bingo cards
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
    $tr = makeTableRow(numB, numI, numN, numG, numO);
    $parent.append($tr);
  }
};

const chooseRandomNums = ($parent) => {
  const availNums = [
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
  const tableNums = [
    { col: "B", row: null },
    { col: "I", row: null },
    { col: "N", row: null },
    { col: "G", row: null },
    { col: "O", row: null },
  ];
  const fillRow = () => {
    let arr = [];
    for (let i = 0; i < availNums.length; i++) {
      const randIndex = Math.floor(Math.random() * availNums[0].nums.length);
      arr.push(availNums[i].nums[randIndex]);
      availNums[i].nums.splice(randIndex, 1);
    }
    return arr;
    // }
  };
  for (let i = 0; i < tableNums.length; i++) {
    tableNums[i].row= fillRow();
  }
  tableNums[2].row[2] = "FREE"; // show 'FREE' in center square
  makeTable(tableNums, $parent);
};
/////////////////////////////////

const main = () => {
    const $player1card = $(".player1");
    const $player2card = $(".player2")
  chooseRandomNums($player1card); // creates ramdom numbers for bingo card
  chooseRandomNums($player2card);
  $(".N:contains('FREE')").css("font-size", "16px");
};

$(main);
