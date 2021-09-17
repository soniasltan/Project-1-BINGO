const makeTableRow = (num) => {
  const $tr = $("<tr>");
  const $tdB = $("<td>").addClass("B").text(num);
  const $tdI = $("<td>").addClass("I").text(num);
  const $tdN = $("<td>").addClass("N").text(num);
  const $tdG = $("<td>").addClass("G").text(num);
  const $tdO = $("<td>").addClass("O").text(num);
  $tr.append($tdB, $tdI, $tdN, $tdG, $tdO);
  return $tr;
};

const makeTable = (tableNums, $parent) => {
  for (let i = 0; i < tableNums.length; i++) {
    const num = tableNums[i].row[i];

    $tr = makeTableRow(num);
    $parent.append($tr);
  }
};

const chooseRandomNums = () => {
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

  console.log(tableNums);
  console.log(tableNums[0].row[0]);
  console.log(availNums);
  const $tbody = $("tbody");
  makeTable(tableNums, $tbody);
};

const main = () => {
  chooseRandomNums();
};

$(main);
