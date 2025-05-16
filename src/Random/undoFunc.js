const arr = ["add:0:a", "add:1:b", "add:2:c", "add:1:d", "del:2:"];
const k = 2;

/**
 * a
 * ab
 * abc
 * adbc
 * adc
 */

const addElem = (charArr, pos) => {
  const numberOfElems = pos - (charArr.length - 1);
  for (let i = 0; i < numberOfElems; i++) {
    charArr.push("");
  }
};

const addchar = (charArr, pos, char) => {
  if (charArr[pos] !== "") {
    charArr.splice(pos, 0, char);
  } else {
    charArr[pos] = char;
  }
};

const undoRunner = (arr, k) => {
  if (isNaN(k)) return;

  const arrLen = arr.length;
  const charArr = [""];

  for (let i = 0; i < arrLen - +k; i++) {
    const stepArr = arr[i].split(":");

    if (stepArr.length < 3) {
      continue;
    }

    const pos = +stepArr[1];
    if (!charArr[pos]) {
      addElem(charArr, pos);
    }

    if (stepArr[0] === "add") {
      addchar(charArr, pos, stepArr[2]);
    } else {
      charArr[pos] = "";
    }
  }

  console.log(charArr.join(""));
};

undoRunner(arr, k);
