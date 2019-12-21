let fees = [
  { name: "a", val: 1 },
  { name: "b", val: 2 },
  { name: "c", val: 3 }
];
function countUpto(n) {
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    //console.log("loop output", sum);
    sum += n[i].val;
    console.log("loop output", n[i].val);
  }
  console.log("total output", sum);
}

countUpto(fees);
